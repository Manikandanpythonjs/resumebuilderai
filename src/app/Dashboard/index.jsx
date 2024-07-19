/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import AddButton from "@/components/custom/AddButton/AddButton"
import { Box, Heading, Text } from "@chakra-ui/react"
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import GlobalApi from "../../../service/GlobalApi";
import ResumeCardListItem from "@/components/custom/ResumeCardListItem/ResumeCardListItem";
import axios from "axios";





function DashboardPage() {


    const { user } = useUser()
    const [resumeList, setResumeList] = useState([])
    useEffect(() => {

        user && getUserResumeList()


    }, [user])


    const getUserResumeList = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        console.log("The email is ", email);
        try {
            const response = await axios.get('http://localhost:8000/api/get-user-by-email/', {
                params: {
                    email: email,
                },
            });

            if (response.status === 200) {

                setResumeList(response.data);
                console.log(resumeList);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error fetching users:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };


    // const [message, setMessage] = useState(null)
    // useEffect(() => {
    //     fetch('http://127.0.0.1:8000/api/check')
    //         .then(response => response.json())
    //         .then(data => setMessage(data.message))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    return (
        <Box>
            <Box className="p-10 md:px-29 lg:px-32" >

                <Text className="font-semibold text-3xl">Create AI resume</Text>
                <p className="font-medium text-gray-500 ">Build your perfect resume with AI precision.</p>

                <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
                    <AddButton />



                    {
                        resumeList?.length > 0 && resumeList?.map((resume, index) => (
                            <ResumeCardListItem resume={resume} key={index} />
                        ))
                    }

                </Box>

            </Box>


        </Box>
    )
}

export default DashboardPage