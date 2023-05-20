import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Product from './Components/Product';
import Footer from './Components/Footer';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
