import { useState, useEffect } from 'react'
import { Box, Button, Checkbox, Container, FormControl, Heading, HStack, Stack, Text, useBreakpointValue, useColorModeValue, Alert, AlertIcon, AlertTitle, AlertDescription, useToast} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
    const dispatch = useDispatch()

    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' })
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' })

    return (
        <Formik 
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid Email.').required('Email address is required'),
                password: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required')
            })}
            onSubmit={(values) => {
                {/* dispatch(login(values.email, values.password)) */}
            }}
        >
            {(formik) => (
                <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl' >
                    <Stack spacing='8'>
                        <Stack spacing='6'>
                            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                                <Heading size={{headingBR}}>Log in to your account</Heading>
                                <HStack spacing='1' justify='center'>
                                    <Text color='muted'>Don't have an account?</Text>
                                    <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>
                                        Sign Up
                                    </Button>
                                </HStack>
                            </Stack>
                        </Stack>
                        <Box 
                            py={{ base: '0', md: '8' }} 
                            px={{ base: '4', md: '10' }} 
                            bg={{ boxBR }}
                            boxShadow={{ base: 'none', md: 'xl' }} 
                        >
                            <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                                {/*error && 
                                    <Alert 
                                        status='error'
                                        flexDirection='column'
                                        alignItems='center'
                                        justifyContent='center'
                                        textAlign='center'
                                    >
                                        <AlertIcon />
                                        <AlertTitle>Apologies for the inconvenience!</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>*/
                                }
                                <Stack spacing='5'>
                                    <FormControl>

                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            )}
        </Formik>
    )
}
export default Login