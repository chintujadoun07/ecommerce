// src/actions/productActions.js
import axios from 'axios';
import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from '../constraints/products';
import { BASE_URL }  from '../constraints/BASE_URL'


export const getProducts=()=>async(dispatch)=>{
try{
    dispatch({type: GET_PRODUCTS_REQUEST})
    const {data}=await axios.get(`${BASE_URL}/api/products`)
    dispatch({type: GET_PRODUCTS_SUCCESS,payload:data})

}catch(err){
    dispatch({type: GET_PRODUCTS_FAIL,payload:err.message})
}
}

export const getSingleProduct=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAIL_REQ })
        const {data}=await axios.get(`${BASE_URL}/api/products/${id}`)
        dispatch({type:PRODUCT_DETAIL_REQ_SUCCESS,payload:data})

    }catch(err){
        dispatch({type: PRODUCT_DETAIL_REQ_FAIL,payload:err.message})
    }
}