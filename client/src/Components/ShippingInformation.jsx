import { useState } from 'react'
import { Box, Heading, VStack, Flex, Stack, Text, Radio, RadioGroup, useBreakpointValue, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage, Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { useDispatch } from 'react-redux'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { setShippingAddress, setShippingAddressError } from '../Redux/actions/orderActions'

const UserInput = props => {
    const { type, name, placeholder } = props
    const [field, meta] = useField({ type, name, placeholder })

    return (
        <FormControl isInvalid={meta.error && meta.touched} mb='6'>
            <FormLabel noOfLines={1}>{props.label}</FormLabel>
            <InputGroup>
                <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
            </InputGroup>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

const ShippingInformation = () => {
    const dispatch = useDispatch()

    return (
        <Formik 
            initialValues={{ address: '', postalCode: '', city: '', country: '' }}
            validationSchema={Yup.object({
                address: Yup.string().required('This field is required').min(2, 'Address is too short'),
                postalCode: Yup.string().required('This field is required').min(2, 'Postal Code is too short'),
                city: Yup.string().required('This field is required').min(2, 'City is too short'),
                country: Yup.string().required('This field is required').min(2, 'Country is too short')
            })}
        >
            {(formik) => <VStack as='form'></VStack>}
        </Formik>
    )
}

export default ShippingInformation