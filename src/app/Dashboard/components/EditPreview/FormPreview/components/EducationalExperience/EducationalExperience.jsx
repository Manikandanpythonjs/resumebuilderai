/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { ResumeContext } from '@/context/ResumeContext'
import { Box, InputGroup, InputLeftElement, Text, Input, Textarea, FormLabel, Button, useToast } from '@chakra-ui/react'
import { ArrowRight, ChevronFirst, Plus } from 'lucide-react'

import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../ExperienceForm/components/RichTextEditor'
import axios from 'axios';
import { useParams } from 'react-router-dom'


function EducationalExperience({ setEnableNext }) {
    const { resumedata, setResumeData } = useContext(ResumeContext)
    const resume_Id = useParams()

    const formField = {

        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        user_profile: resume_Id.resumeId
    }
    const [educationList, setEducationList] = useState([formField])
    const [formData, setFormData] = useState()
    const [isLoading, setIsloading] = useState(false)
    const toast = useToast()
    const HandleToast = (title, decs, type) => {

        toast({
            title: title,
            description: decs,

            status: type,
            duration: 5000,
            isClosable: true
        })

    }




    useEffect(() => {

        setResumeData({
            ...resumedata,
            education: educationList

        })

        setEnableNext(false)


    }, [educationList])


    // useEffect(() => {

    //     resumedata && setEducationList(resumedata?.education
    //     )

    // }, [resumedata])






    const handleinputChange = (index, event) => {

        const newEntries = educationList.slice()
        const { name, value } = event.target;

        newEntries[index][name] = value;

        setEducationList(newEntries);
        setFormData(newEntries)
        console.log(formData);
    }

    const AddNewExp = () => {

        setEducationList([...educationList, formField])
    }


    const RemoveExp = () => {

        setEducationList(educationList => educationList.slice(0, -1))
    }


    const handleRichTextEditor = (e, name, index) => {
        const newEntries = educationList.slice()
        newEntries[index][name] = e.target.value;
        setEducationList(newEntries)




    }

    const saveEducationalDetails = async (e) => {


        e.preventDefault()






        const user_profile = resume_Id.resumeId;
        try {
            const response = await axios.post('http://localhost:8000/api/create-education/', { educationList, user_profile: user_profile }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                HandleToast("Success", "Data Saved!!", "success")


                setEnableNext(true)
                setIsloading(false)



            }
        } catch (error) {
            setIsloading(false);
            HandleToast("Error", error.message, "error")
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
        <form onSubmit={saveEducationalDetails}>
            <Box className="p-5 shadow-lg border-lg border-blue-400 border-t-4">

                <Text className="text-blue-500 font-semibold">Educational Background</Text>
                <Text className="text-gray-800 text-sm">Detail your academic qualifications and achievements</Text>


                <Box mt={5}>
                    {
                        educationList.map((item, index) => (
                            <Box mt={5} key={index}>
                                <Box className='grid grid-cols-2 gap-5'>

                                    <InputGroup className='col-span-2'>
                                        <InputLeftElement pointerEvents='none'>
                                            <ChevronFirst />
                                        </InputLeftElement>
                                        <Input name="degree" required onChange={(event) => handleinputChange(index, event)} type='text' placeholder='Degree' />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <ChevronFirst />
                                        </InputLeftElement>
                                        <Input name="institution" required onChange={(event) => handleinputChange(index, event)} type='text' placeholder='Institution' />
                                    </InputGroup>


                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <ChevronFirst />
                                        </InputLeftElement>
                                        <Input name="location" required onChange={(event) => handleinputChange(index, event)} type='text' placeholder='Location' />
                                    </InputGroup>


                                    <Box>
                                        <FormLabel>Start date</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <ChevronFirst />
                                            </InputLeftElement>

                                            <Input name="startDate" required onChange={(event) => handleinputChange(index, event)} type='date' placeholder='Start date' />
                                        </InputGroup>
                                    </Box>
                                    <Box>
                                        <FormLabel >End date</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <ChevronFirst />
                                            </InputLeftElement>
                                            <Input name="endDate" required onChange={(event) => handleinputChange(index, event)} type='date' placeholder='End date' />
                                        </InputGroup>
                                    </Box>

                                    <Box className='col-span-2'>

                                        <RichTextEditor


                                            onRichTextEditorChange={(event) =>

                                                handleRichTextEditor(event, 'description', index)
                                            } />

                                    </Box>




                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Box mt={5} display={"flex"} alignItems={"center"}
                    justifyContent={"space-between"}


                >
                    <Box className={"flex gap-3"}>
                        <Button onClick={AddNewExp} variant={"outline"} leftIcon={<Plus />}>Add more</Button>
                        <Button onClick={RemoveExp} variant={"outline"} leftIcon={<Plus />}>Remove </Button>
                    </Box>

                    <Button type='submit' variant={"outline"} rightIcon={<ArrowRight />}> Save</Button>

                </Box>
            </Box>
        </form>

    )
}

export default EducationalExperience