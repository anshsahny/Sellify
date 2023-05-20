import { Box, Flex, Heading, HStack, Link, Stack, useColorModeValue as mode, Spinner, Alert, AlertTitle, AlertIcon, AlertDescription, Wrap, Image, Text, Select, CloseButton, Badge, Button } from '@chakra-ui/react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, removeCartItem } from '../Redux/actions/cartActions'

const CartOrderSummary = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const standardShipping = Number(4.99).toFixed(2)
    const cartItems = useSelector((state) => state.cart)
    const { subtotal } = cartItems
    const navigate = useNavigate

    const checkout = () => {
        setButtonLoading(true)
        navigate('/checkout')
    }

    return (
        <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
            <Heading size='md'>Order Summary</Heading>
            <Stack spacing='6'>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>Subtotal</Text>
                    <Text fontWeight='medium'>$ {subtotal}</Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>Shipping</Text>
                    <Text fontWeight='medium'>
                        {subtotal <= 1000 ?
                            standardShipping
                        :
                            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                                Free
                            </Badge>
                        }
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text fontSize='lg' fontWeight='extrabold'>
                        Total
                    </Text>
                    <Text fontSize='lg' fontWeight='extrabold'>
                        $ {subtotal <= 1000 ? Number(subtotal) + Number(standardShipping) : subtotal}
                    </Text>
                </Flex>
            </Stack>
            <Button
                as={ReactLink} 
                to='/checkout' 
                colorScheme='orange' 
                size='lg' 
                rightIcon={<FaArrowRight />}
                isLoading={buttonLoading}
                onClick={() => checkout()}
            />
        </Stack>
    )
}

const CartItem = props => {
    const [cartItem] = useState(props.cartItem)
    const dispatch = useDispatch()

    return (
        <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' align='center'>
            <Stack direction='row' spacing='5' width='full'>
                <Image rounded='lg' w='120px' h='120px' fit='cover' src={cartItem.image} alt={cartItem.name} draggable={false} loading='lazy' />
                <Box pt='4'>
                    <Stack spacing='0.5'>
                        <Text fontWeight='medium'>{cartItem.name}</Text>
                    </Stack>
                </Box>
            </Stack>
            <Flex w='full' mt={{ base: '4', md: '0' }} align={{ base: 'center', md: 'baseline' }} justify='space-between' display='flex'>
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
                <Text fontWeight='bold'>${cartItem.price}</Text>
                <CloseButton onClick={() => dispatch(removeCartItem(cartItem.id))}/>
            </Flex>
        </Flex>
    )
}

const Cart = () => {
    const cartInfo = useSelector((state) => state.cart)
    const { loading, cart, error } = cartInfo

    return (
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
            {loading ?
                <Stack direction='row' spacing={4}>
                    <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
                </Stack>
            : error ?
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Apologies for the inconvenience!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            : cart.length <= 0 ?
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>Your cart is empty.</AlertTitle>
                    <AlertDescription>
                        <Link as={ReactLink} to='/products'>
                            Click here to see our products.
                        </Link>
                    </AlertDescription>
                </Alert>
            :
                <Box
                    maxW={{ base: '3xl', lg: '7xl '}}
                    mx='auto'
                    px={{ base: '4', md: '8', lg: '12' }}
                    py={{ base: '6', md: '8', lg: '12' }}
                >
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        align={{ lg: 'flex-start' }}
                        spacing={{ base: '8', md: '10' }}
                    >
                        <Stack spacing={{ base: '8', md: '10' }} flex='2'>
                            <Heading fontSize='2xl' fontWeight='extrabold'>
                                Shopping Cart {cart.length === 1 ? '(1 item)' : `(${cart.length} items)`}
                            </Heading>
                            <Stack spacing='6'>
                                {cart.map((item) => {
                                    return <CartItem key={item.id} cartItem={item} />
                                })}
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1'>
                            <CartOrderSummary />
                            <HStack mt='6' fontWeight='semibold'>
                                <p>or</p>
                                <Link as={ReactLink} to='/products' color={mode('orange.500', 'orange.200')}>
                                    Continue Shopping
                                </Link>
                            </HStack>
                        </Flex>
                    </Stack>
                </Box>
            }
        </Wrap>
    )
}

export default Cart