import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, Heading, HStack, Stack, Text, useBreakpointValue, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormLabel, InputGroup, InputRightElement, FormErrorMessage} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { login } from '../Redux/actions/userActions'

const UserInput = props => {
    const [showPassword, setShowPassword] = useState(false)

    const { type, name, placeholder } = props
    const [field, meta] = useField({ type, name, placeholder })

    return (
        <FormControl isInvalid={meta.error && meta.touched} mb='6'>
            <FormLabel noOfLines={1}>{props.label}</FormLabel>
            <InputGroup>
                <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
                {type === 'password' &&
                    <InputRightElement h='full'>
                        <Button variant='ghost' onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                }
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const toast = useToast()

    const user = useSelector((state) => state.user)
    const { loading, error, userInfo } = user

    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' })
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' })

    useEffect(() => {
        if (userInfo) {
            location.state?.from ? navigate(location.state?.from) : navigate('/products')
            toast({
                description: 'Login Successful',
                status: 'success',
                isClosable: true
            })
        }
    }, [userInfo, error, navigate, location.state, toast])

    return (
        <Formik 
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid Email.').required('Email address is required'),
                password: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required')
            })}
            onSubmit={(values) => {
                dispatch(login(values.email, values.password))
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
                                {error && 
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
                                    </Alert>
                                }
                                <Stack spacing='5'>
                                    <FormControl>
                                        <UserInput type='text' name='email' placeholder='you@example.com' label='Email' />
                                        <UserInput type='password' name='password' placeholder='your password' label='Password' />
                                    </FormControl>
                                </Stack>
                                <Stack spacing='6'>
                                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                                        Sign In
                                    </Button>
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