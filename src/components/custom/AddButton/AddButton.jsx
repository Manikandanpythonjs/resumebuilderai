/* eslint-disable no-unused-vars */
import {
    useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,

    Input,
    Text,
    useToast,
    Image,
} from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { useState } from "react"

import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../../service/GlobalApi'
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";



function AddButton() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()



    const ShowToast = (title, desc, type) => {


        toast({

            title: title,
            description: desc,
            status: type,
            duration: 5000,
            isClosable: true,

        })

    }

    const [inputTitle, setinputTitle] = useState("")
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const onClsoeModal = () => {
        onClose()
        setinputTitle("")
    }


    const HandleToast = (title, desc, type) => {


        toast({

            title: title,
            description: desc,
            status: type,
            duration: 5000,
            isClosable: true

        })


    }


    const uuid = uuidv4()


    const HandleOnSaveUserProfile = async (e) => {

        e.preventDefault()



        try {
            const userDetails = {
                resume_Id: uuid,
                userId: user?.id,
                resumeTitle: inputTitle,
                email: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                // firstName: "Default",
                // lastName: "Default",
                // phone: "Default",
                // address: "Default",
                // linkedin: "Default",
                // github: "Default",
                // website: "Default",
                // jobTitle: "Default",
                // summary: "Default",
            };
            const response = await axios.post('http://localhost:8000/api/user-profile/', userDetails, {
                headers: {
                    "Content-Type": "application/json",
                },

            });

            console.log(response);
            if (response.status === 201) {

                setIsLoading(false);
                setinputTitle("");
                navigate(`/dashboard/resume/${response.data.data.resume_Id}/edit`);
                console.log('User resume  created successfully:', response.data);
                console.log("The Resume id is ", response.data.data.resume_Id);
            }
        } catch (error) {
            setIsLoading(false);
            HandleToast({ title: "Error", desc: error.message, type: "error" })
            console.error('Error creating user:', error);
            if (error.response) {

                console.error('Error creating user:', error.response.data);
            } else if (error.request) {

                console.error('No response received:', error.request);
            } else {

                console.error('Error setting up request:', error.message);
            }


        }
    };







    return (
        <div onClick={onOpen} id="addButton" className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[300px] cursor-pointer hover:scale-105 transition-all hover:shadow-lg ">
            <Image src="/addgif.gif" />

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={"#000000AA"} />
                <form onSubmit={HandleOnSaveUserProfile}>
                    <ModalContent>
                        <ModalHeader>Create your <span id="gr-text">ai</span>  resume</ModalHeader>
                        <ModalCloseButton onClick={onClsoeModal} />
                        <ModalBody pb={6}>
                            <Text contentEditable={false} className="font-semibold text-md">Name your Resume</Text>
                            <Input autoFocus value={inputTitle} onChange={(e) => setinputTitle(e.target.value)} mt={2} placeholder="ex.Web developer" />
                        </ModalBody>

                        <ModalFooter>

                            <Button type="submit" isLoading={isLoading} isDisabled={!inputTitle || isLoading} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClsoeModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>

            </Modal>
        </div>
    )
}

export default AddButton