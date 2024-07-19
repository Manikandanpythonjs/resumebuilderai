/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '@/components/custom/Header/Header'
import { Box } from '@chakra-ui/react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

function HomePage() {
    const [message, setMessage] = useState(null)
    const { user } = useUser();

    return (
        <Box>

            <Header />
            <Box p={5}>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta veniam impedit architecto blanditiis totam eum.</p>
                {message}
            </Box>
        </Box>
    )
}

export default HomePage