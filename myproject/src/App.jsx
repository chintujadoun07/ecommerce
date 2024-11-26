import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Home from "./page/Home"
import ProductDetaile from "./page/ProductDetaile"
import ShoppingCard from "./page/ShoppingCard"
import Login from "./auth/Login"
import Register from "./auth/Register"


const App = () => {
 

  return (
<>
<Router>
  <Routes>
   <Route path="/" element={<Home/>}    ></Route>
   <Route path="/products/:id"  element={<ProductDetaile/>}     ></Route>
   <Route  path="/shoppingCard"  element={<ShoppingCard/>}  ></Route>
   <Route path="/login"    element={<Login/>}  ></Route>
   <Route  path="/register"  element={<Register/>}></Route>
  </Routes>
</Router>

</>


   
  )
}

export default App