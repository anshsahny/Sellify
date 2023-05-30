import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Products from './Components/Products';
import Product from './Components/Product';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Registration from './Components/Registration';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/registration' element={<Registration />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
