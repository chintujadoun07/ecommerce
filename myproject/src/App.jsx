import Home from './pages/Home'
import ProductDetails from './pages/ProductDetalis'
import Login from './Auth/login'
import Register from './Auth/register'

import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
 } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Checkout from './pages/Checkout'
import PlaceOrder from './pages/PlaceOrder'
import { OrderHistory } from './pages/OrderHistory'
import OrderConfirmation from './pages/OrderConfirm'


const App = () => {
  const userLoginReducer=useSelector((state)=>state.userLogin)
  const {userInfo}= userLoginReducer

  return (
    <Router>
    <Routes>
      <Route  exact path='/'  element={<Home/>}></Route>
      <Route path="/products/:id" element={<ProductDetails/>}></Route>
      <Route exact  path='/checkout' element={<Checkout/>}></Route>
      <Route exact path="/placeorder" element={<PlaceOrder />}></Route>
      <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
           <Route path="/order/:id" element={<OrderConfirmation />} />
           <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  </Router>

  )
}

export default App