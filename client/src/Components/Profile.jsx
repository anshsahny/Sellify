import { useState, useEffect } from 'react'
import { Box, Button, FormControl, Heading, HStack, Stack, Text, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormLabel, InputGroup, InputRightElement, FormErrorMessage} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'

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

    return (
        userInfo ? <p>Profile Screen</p> : <Navigate to='/login' replace={true} state={{ from: location }} />
    )
}

export default Profile