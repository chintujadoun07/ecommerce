// src/reducers/productReducers.js
import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,

    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from '../Constraints/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {  
        case GET_PRODUCTS_REQUEST:
            return { loading: true, products: [] };
        case GET_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload };
        case GET_PRODUCTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};



// single product by id 
export const  singleProductReducer=(state={product:{review:[]}},action)=>{
switch (action.type) {
    case PRODUCT_DETAIL_REQ:
        return{loding:true, ...state};
    case PRODUCT_DETAIL_REQ_SUCCESS:
        return{loading:false, product:action.payload};
    case PRODUCT_DETAIL_REQ_FAIL:  
    return{loging:false,error:action.payload};  
    default:
        return state;
}

}


