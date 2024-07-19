/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button, Menu, MenuButton, MenuList, MenuItem, Box, Text, Image, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody } from "@chakra-ui/react"
import { Delete, Dot, Edit, EllipsisVertical } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom"

function ResumeCardListItem({ resume }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (



        <Box width="100%" position={"relative"} id="addButton" className="p-14 py-24 border items-center flex flex-col justify-center bg-secondary rounded-lg h-[300px] cursor-pointer hover:scale-105 transition-all hover:shadow-lg ">
            <Box px={2} py={3} position={"absolute"} top={0} right={0}>

                <Popover trigger="hover" placement="top">
                    <PopoverTrigger>
                        <EllipsisVertical color="white" />

                    </PopoverTrigger>
                    <PopoverContent className="shadow-md" bg={"transparent"} width={"10%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexDirection={"column"} gap={2}>


                        <IconButton bg={"white"} icon={<Edit />} />


                        <IconButton bg={"white"} icon={< Delete />} />



                    </PopoverContent>
                </Popover>


            </Box>
            <Link to={`/dashboard/resume/${resume?.resume_Id}/edit`}>

                <Image src="/addAfter.gif" />

                <Box width={"100%"} py={2} px={1} position={"absolute"} bottom={0} left={0} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text className="text-white text-md font-semibold capitalize">{resume?.resumeTitle}</Text>

                </Box>
            </Link >
        </Box>

    )
}

export default ResumeCardListItem