import { useState, useEffect } from 'react'
import { Box, Button, FormControl, Heading, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormLabel, InputGroup, InputRightElement, FormErrorMessage, Flex, Card, CardHeader, CardBody, StackDivider} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { reset, update } from '../Redux/actions/userActions'

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

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { userInfo, error, loading, updateSuccess } = user
    const location = useLocation()
    const toast = useToast()

    useEffect(() => {
        if (updateSuccess) {
            toast({
                description: 'Profile Saved',
                status: 'success',
                isClosable: true
            })
            dispatch(reset())
        }
    }, [updateSuccess, toast, dispatch])

    return (
        userInfo ? 
        <Formik 
            initialValues={{ email: userInfo.email, password: '', name: userInfo.name, confirmPassword: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid Email.').required('Email address is required'),
                password: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required'),
                confirmPassword: Yup.string().min(1, 'Password must be more than 1 character').required('Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match.')
            })}
            onSubmit={(values) => {
                dispatch(update(userInfo._id, values.name, values.email, values.password))
            }}
        >
            {(formik) => (
                <Box 
                    minH='100vh' 
                    maxW={{ base: '3xl', lg: '7xl' }}
                    mx='auto'
                    px={{ base: '4', md: '8', lg: '12' }}
                    py={{ base: '6', md: '8', lg: '12' }}
                >
                    <Stack spacing='10' direction={{ base: 'column', md: 'row' }} align={{ lg: 'flex-start' }}>
                        <Stack flex='1.5' mb={{ base: '2xl', md: 'none' }}>
                            <Heading fontSize='2xl' fontWeight='extrabold'>
                                Profile
                            </Heading>
                            <Stack spacing='6'>
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
                                            Save
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
                            <Card>
                                <CardHeader>
                                    <Heading size='md'>User Report</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box pt='2' fontSize='sm'>
                                            Registered on {new Date(userInfo.createdAt).toDateString()}
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Flex>
                    </Stack>
                </Box>
            )}
        </Formik>
        : 
        <Navigate to='/login' replace={true} state={{ from: location }} />
    )
}

export default Profile