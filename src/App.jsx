import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Box, CssBaseline } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Products from './Page/Products'
import ProductDetails from './Page/ProductDetail'
import LoginRegister from './Page/LoginRegister'
import Cart from './Page/Cart'
import PageNotFound from './Page/404'
import { useSelector } from 'react-redux'
function App() {
  const [count, setCount] = useState(0)
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component={"section"} minHeight={"110vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:categoryName" element={<Products />} />
          <Route
            path="/:categoryName/product-detail/:id/:name"
            element={<ProductDetails />}
          />
          <Route
            path="/cart"
            element={token ? <Cart /> : <Navigate to="/login-register" />}
          />
          {/* <Route
            path="/cart"
            element={<Cart />}/> */}
          <Route
            path="/login-register"
            element={!token ? <LoginRegister /> : <Navigate to={"/"} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App
