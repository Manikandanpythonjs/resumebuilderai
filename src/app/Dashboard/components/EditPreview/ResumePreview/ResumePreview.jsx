/* eslint-disable no-unused-vars */
import { Box, IconButton } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ResumeContext } from '../../../../../context/ResumeContext'
import PersonalDetailsPreview from './components/PersonalDetailsPreview/PersonalDetailsPreview'
import SummaryDetailsPreview from './components/SummaryDetailsPreview/SummaryDetailsPreview'
import ProfessionalExperience from './components/ProfessionalExperience/ProfessionalExperience'
import EducationalPreview from './components/EducationalPreview/EducationalPreview'
import SkillPreview from './components/SkillPreview/SkillPreview'
import { Edit, Pencil } from 'lucide-react'

function ResumePreview() {

    const { resumedata, setResumeData, isEditable, ChangeEditableAction } = useContext(ResumeContext)
    return (
        <>

            <Box>
                <Box mb={3} display={"flex"} alignItems={"center"} justifyContent={"end"} >



                    <IconButton
                        onClick={ChangeEditableAction}
                        colorScheme='twitter'
                        aria-label='Call Segun'
                        size='lg'
                        icon={isEditable ? <Edit /> : <Pencil />}
                    />


                </Box>

                <Box className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: resumedata?.themeColor }}>
                    {/* Personal Detail */}



                    <PersonalDetailsPreview resumedata={resumedata} isEditable={isEditable} />
                    {/* Summary */}
                    <SummaryDetailsPreview resumedata={resumedata} isEditable={isEditable} />
                    {/* Professional Experience */}

                    <ProfessionalExperience resumedata={resumedata} isEditable={isEditable} />
                    {/* Educational */}
                    <EducationalPreview resumedata={resumedata} isEditable={isEditable} />
                    {/* Skills */}

                    <SkillPreview resumedata={resumedata} isEditable={isEditable} />
                </Box>
            </Box>
        </>

    )
}

export default ResumePreview