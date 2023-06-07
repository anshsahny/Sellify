import { useState, useEffect, useCallback } from 'react'
import { Box, Heading, Stack, Flex, useColorModeValue as mode, Image, Text, Spacer, Select, Divider, Badge, Link } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, Link as ReactLink } from 'react-router-dom'
import { createOrder } from '../Redux/actions/orderActions'
import { addCartItem } from '../Redux/actions/cartActions'
import PayPalButton from '../PayPal/PayPalButton'

const CheckoutItem = props => {
    const { cartItem } = props
    const dispatch = useDispatch()

    return (
        <>
            <Flex>
                <Image rounded='lg' w='120px' h='120px' fit='cover' src={cartItem.image} alt={cartItem.name} draggable={false} loading='lazy' />
                <Flex direction='column' align='strech' flex='1' mx='2' spacing='4'>
                    <Text noOfLines='2' maxW='150px'>
                        {cartItem.name}
                    </Text>
                    <Spacer />
                    <Select 
                        maxW='64px' 
                        focusBorderColor={mode('orange.500', 'orange.200')} 
                        value={cartItem.qty}
                        onChange={(e) => {
                            dispatch(addCartItem(cartItem.id, e.target.value))
                        }}
                    >
                        {[...Array(Number(cartItem.stock)).keys()].map((x) => {
                            return (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            )
                        })}
                    </Select>
                </Flex>
                <Box>
                    <Text fontWeight='bold'>${cartItem.price}</Text>
                </Box>
            </Flex>
            <Divider bg={mode('gray.400', 'gray.800')} />
        </>
    )
}

const CheckoutOrderSummary = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const colorMode = mode('gray.600', 'gray.400')

    const cartItems = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user)
    const shippingInfo = useSelector((state) => state.order)

    const { cart, subtotal, expressShipping } = cartItems
    const { userInfo } = user
    const { error, shippingAddress } = shippingInfo

    const dispatch = useDispatch()

    const shipping = useCallback(() => 
        expressShipping === 'true' ? 14.99 : subtotal <= 1000 ? 4.99 : 0
    , [expressShipping, subtotal])

    const total = useCallback(() => 
        Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2)
    , [shipping, subtotal])

    const onPaymentSuccess = () => {
        alert('Order Successful')
    }

    const onPaymentError = () => {
        alert('Order Error')
    }

    return (
        <Stack spacing='8' rounded='xl' padding='8' width='full'>
            <Heading size='md'>Order Summary</Heading>
            {cart.map((item) => {
                return <CheckoutItem key={item.id} cartItem={item} />
            })}
            <Stack spacing='6'>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={colorMode}>
                        Subtotal
                    </Text>
                    <Text fontWeight='medium' color={colorMode}>
                        {subtotal}
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={colorMode}>
                        Shipping
                    </Text>
                    <Text fontWeight='medium' color={colorMode}>
                        {shipping() === 0 ?
                            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                                Free
                            </Badge>
                        :
                            `$${shipping()}`
                        }
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontSize='lg' fontWeight='semibold'>
                        Total
                    </Text>
                    <Text fontSize='xl' fontWeight='extrabold'>
                        ${Number(total())}
                    </Text>
                </Flex>
            </Stack>
            <PayPalButton total={total} onPaymentError={onPaymentError} onPaymentSuccess={onPaymentSuccess} />
            <Box align='center'>
                <Text fontSize='sm'>Have Questions or Need Help to Complete Your Order?</Text>
                <Flex justifyContent='center' color={mode('orange.500', 'orange.100')}>
                    <Flex align='center'>
                        <ChatIcon />
                        <Text m='2'>Live Chat</Text>
                    </Flex>
                    <Flex align='center'>
                        <PhoneIcon />
                        <Text m='2'>Phone</Text>
                    </Flex>
                    <Flex align='center'>
                        <EmailIcon />
                        <Text m='2'>Email</Text>
                    </Flex>
                </Flex>
            </Box>
            <Divider bg={mode('gray.400', 'gray.800')} />
            <Flex justifyContent='center' my='6' fontWeight='semibold'>
                <p>or</p>
                <Link as={ReactLink} to='/products' ml='1'>
                    Continue Shopping
                </Link>
            </Flex>
        </Stack>
    )
}

const Checkout = () => {
    const user = useSelector((state) => state.user)
    const { userInfo } = user
    const location = useLocation()

    return (
        userInfo ?
        <Box
            minH='100vh'
            maxW={{ base: '3xl', lg: '7xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
        >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack spacing={{ base: '8', md: '10' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
                    <Heading fontSize='2xl' fontWeight='extrabold'>
                        Shipping Information
                    </Heading>
                    <Stack spacing='6'>
                        {/* ShippingInfo */}
                    </Stack>
                </Stack>
                <Flex direction='column' align='center' flex='1'>
                    <CheckoutOrderSummary />
                </Flex>
            </Stack>
        </Box>
        :
        <Navigate to='/login' replace={true} state={{ from: location }} />
    )
}

export default Checkout