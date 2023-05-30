import { useState, useEffect } from 'react'
import { Box, Button, Container, FormControl, Heading, HStack, Stack, Text, useBreakpointValue, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormLabel, InputGroup, InputRightElement, FormErrorMessage} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link as ReactLink } from 'react-router-dom'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { register } from '../Redux/actions/userActions'

const UserInput = props => {
    const [showPassword, setShowPassword] = useState(false)

    const { type, name, placeholder } = props
    const [field, meta] = useField({ type, name, placeholder })

    return (
        <FormControl isInvalid={meta.error && meta.touched} mb='6'>
            <FormLabel noOfLines={1}>{props.label}</FormLabel>
            <InputGroup>
                <Field as={Input} {...field} type={showPassword ? 'text' : type} name={name} placeholder={placeholder} />
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

const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()

    const user = useSelector((state) => state.user)
    const { loading, error, userInfo } = user

    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' })
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' })

    useEffect(() => {
        if (userInfo) {
            navigate('/products')
            toast({
                description: 'Account Created. Welcome Abroad!',
                status: 'success',
                isClosable: true
            })
        }
    }, [userInfo, error, navigate, toast])

    return (
        <Formik 
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid Email.').required('Email address is required'),
                password: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required'),
                confirmPassword: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match.')
            })}
            onSubmit={(values) => {
                dispatch(register(values.name, values.email, values.password))
            }}
        >
            {(formik) => (
                <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl' >
                    <Stack spacing='8'>
                        <Stack spacing='6'>
                            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                                <Heading size={{headingBR}}>Create an account.</Heading>
                                <HStack spacing='1' justify='center'>
                                    <Text color='muted'>Already a User?</Text>
                                    <Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>
                                        Sign In
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
                                        <UserInput type='text' name='name' placeholder='Your first and last name' label='Full Name' />
                                        <UserInput type='text' name='email' placeholder='you@example.com' label='Email' />
                                        <UserInput type='password' name='password' placeholder='your password' label='Password' />
                                        <UserInput type='password' name='confirmPassword' placeholder='Confirm your password' label='Confirm Password' />
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

export default Registration