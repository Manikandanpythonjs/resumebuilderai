/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Box, Text } from "@chakra-ui/react"


function EducationalPreview({ resumedata, isEditable }) {
    return (
        <div>
            <Box className="my-6">

                <Text color={resumedata?.themeColor} contentEditable={isEditable} className='font-bold text-center text-sm mb-2'>

                    Educational


                </Text>

                <hr style={{ borderColor: resumedata?.themeColor }} />


                {
                    resumedata?.education?.map((edu, index) => (

                        <Box key={index} className="my-5">

                            <Text className="text-sm font-bold" style={{
                                color: resumedata?.themeColor
                            }}>
                                {edu?.institution}
                            </Text>
                            <Text className="text-xs flex justify-between" >{edu?.degree}
                                <span>
                                    {edu?.startDate} - {edu?.endDate}
                                </span>
                            </Text>

                            <Text className="text-xs my-2">{edu?.description}</Text>
                        </Box>
                    ))
                }
            </Box>
        </div>
    )
}

export default EducationalPreview