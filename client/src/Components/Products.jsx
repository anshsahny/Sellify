import { useEffect, useState } from 'react';
import { Center, Wrap, WrapItem, Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, Button, Tooltip, Stack, Link, HStack, Text, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../Redux/actions/productActions'

const Rating = props => {
    const [iconSize] = useState('14px')

    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon size={iconSize} w='14px' color={props.rating >= i ? 'orange.500' : 'gray.200'} />)
    }

    return (
        <Flex>
            <HStack spacing='2px'>
                {stars}
            </HStack>
            <Text fontSize='md' fontWeight='bold' ml='4px'>
                {props.numberOfReviews} {props.numberOfReviews === 1 ? 'Review' : 'Reviews'}
            </Text>
        </Flex>
    )
}

const ProductCard = props => {
    const [product] = useState(props.product)

    return (
        <Stack
            p='2'
            spacing='3px'
            bg={useColorModeValue('white', 'gray.800')}
            minW='240px'
            h='450px'
            borderWidth='1px'
            rounded='lg'
            shadow='lg'
            position='relative'
        >
            {product.productIsNew && <Circle size='10px' position='absolute' top={2} right={2} bg='green.300' />}
            {product.stock <= 0 && <Circle size='10px' position='absolute' top={2} right={2} bg='red.300' />}
            <Image src={product.image} alt={product.name} roundedTop='lg' />
            <Box flex='1' maxH='5' alignItems='baseline'>
                {product.stock <= 0 && 
                    <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
                        Sold Out
                    </Badge>
                }
                {product.productIsNew && 
                    <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                        New
                    </Badge>
                }
            </Box>
            <Flex mt='1' justifyContent='space-between' alignContent='center'>
                <Link as={ReactLink} to={`/product${product._id}`} pt='2' cursor='pointer'>
                    <Box fontSize='2xl' fontWeight='semibold' lineHeight='tight'>
                        {product.name}
                    </Box>
                </Link>
            </Flex>
            <Flex justifyContent='space-between' alignContent='center' py='2'>
                <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
            </Flex>
            <Flex justify='space-between'>
                <Box fontSize='2xl' color={useColorModeValue('gray.800', 'white')}>
                    <Box as='span' color='gray.600' fontSize='lg'>
                        $
                    </Box>
                    {product.price.toFixed(2)}
                </Box>
                <Tooltip label='Add to Cart' bg='white' placement='top' color='gray.800' fontSize='1.2em'>
                    <Button variant='ghost' display='flex' disabled={product.stock <= 0}>
                        <Icon as={FiShoppingCart} h='7' w='7' alignSelf='center' />
                    </Button>
                </Tooltip>
            </Flex>
        </Stack>
    )
}

const Products = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.products)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

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
            :
                products?.map((product) => {
                    return (
                        <WrapItem key={product._id}>
                            <Center w='250px' h='550px'>
                                <ProductCard product={product} />
                            </Center>
                        </WrapItem>     
                    )
                })
            }
        </Wrap>
    )
}

export default Products