import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from '../constraints/products';

export const productsListReducer =(state={product:[]},action)=>{
    switch(action.type){
        case GET_PRODUCTS_REQUEST:
            return {loading: true}
        case GET_PRODUCTS_SUCCESS :
            return {loading: false,products:action.payload}
            
        case GET_PRODUCTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state

    }
}

export const singleProductReducer=(state={product:{review:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQ:
            return{loading:true}
        case PRODUCT_DETAIL_REQ_SUCCESS:
            return {loading:false,product:action.payload}
       case   PRODUCT_DETAIL_REQ_FAIL:
         return{loading:false,error:action.payload}  
         default:
            return state;   
    }
}
