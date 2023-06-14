import { useState } from 'react'
import { Box, Heading, VStack, Flex, Stack, Text, Radio, RadioGroup, useBreakpointValue, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage, Button, Tooltip } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { useDispatch } from 'react-redux'
import { Field, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { setShippingAddress, setShippingAddressError } from '../Redux/actions/orderActions'
import { setExpress } from '../Redux/actions/cartActions'

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
    const [formStateChanged, setFormStateChanged] = useState(false)

    const dispatch = useDispatch()

    const setErrorState = (input, data) => {
        if (!input) {
            dispatch(setShippingAddress(data))
        }
        if ((!formStateChanged && !input) || (formStateChanged && input)) {
            return;
        }
        else {
            setFormStateChanged(input)
            dispatch(setShippingAddressError(input))
        }
    }

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
            {(formik) => (
                <VStack as='form'>
                    <FormControl 
                        onChange={
                            Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                            ? setErrorState(false, formik.values)
                            : setErrorState(true)
                        }
                    >
                        <UserInput name='address' placeholder='Street Address' label='Street Address' />
                        <Flex>
                            <Box flex='1' mr='10'>
                                <UserInput name='postalCode' placeholder='Postal Code' label='Postal Code' />
                            </Box>
                            <Box flex='2'>
                                <UserInput name='city' placeholder='City' label='City' />
                            </Box>
                        </Flex>
                        <UserInput name='country' placeholder='Country' label='Country' />
                    </FormControl>
                    <Box w='100%' h='180px' pr='5'>
                        <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
                            Shipping Method
                        </Heading>
                        <RadioGroup 
                            defaultValue='false'
                            onChange={(e) => {
                                dispatch(setExpress(e))
                            }}
                        >
                            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                                <Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
                                    <Box>
                                        <Radio value='true'>
                                            <Text fontWeight='bold'>Express $14.99</Text>
                                            <Text>Delivered in 24 hours</Text>
                                        </Radio>
                                    </Box>
                                    <Stack spacing='6'>Express</Stack>
                                </Stack>
                                <Radio value='false'>
                                    <Tooltip label='Free Shipping for orders of $1000 or more!'>
                                        <Box>
                                            <Text fontWeight='bold'>Standard $4.99</Text>
                                            <Text>Delivered in 2-3 days</Text>
                                        </Box>
                                    </Tooltip>
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </VStack>
            )}
        </Formik>
    )
}

export default ShippingInformation