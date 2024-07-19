import { Button } from '@/components/ui/button'
import { Box, Image, Button as ChakraButton } from '@chakra-ui/react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'


function Header() {
    const { isSignedIn } = useUser()
    return (
        <Box py={2} px={5} className='shadow-md' display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Image src='/logo2.png' width={120} />

            <Box>
                {
                    isSignedIn ? (
                        <Box className='flex items-center justify-center gap-5'>
                            <Link to={"/dashboard"}>
                                <ChakraButton colorScheme={"messenger"}>Dashboard</ChakraButton>
                            </Link>
                            <UserButton />
                        </Box>
                    ) : (
                        <Link to={"/auth/sign-in"}>
                            <Button>Create resume</Button>

                        </Link>
                    )
                }
            </Box>
        </Box>
    )
}

export default Header