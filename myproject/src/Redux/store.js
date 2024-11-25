import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Change this line

import { productListReducer ,singleProductReducer} from './Reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './Reducers/UserReducer';
import{ cartReducer} from './Reducers/card'
import{orderReducer, orderDetailReducer,orderPaymentReducer,orderListReducer} from './Reducers/Order'
const reducer = combineReducers({
    productList: productListReducer,
    singleproduct:singleProductReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    cartReducer: cartReducer,



     
    orderReducer:orderReducer,
    orderDetailReducer: orderDetailReducer,
    orderPaymentReducer:orderPaymentReducer,
    orderListReducer:orderListReducer,
    // Add other reducers here if needed  // Ex: cartReducer, wishlistReducer, etc.  // Add other reducers here if needed  // Ex: cartReducer, wishlistReducer, etc.  // Add other reducers here if needed  // Ex: cartReducer, wishlistReducer, etc.  // Add other reducers here if needed  // Ex: cartReducer, wishlistReducer

});
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const initialState = {
    userLogin:{ userInfo: userInfoFromStorage }
};


const store = createStore(
    reducer,
    initialState,
   applyMiddleware(thunk)

);

export default store;
