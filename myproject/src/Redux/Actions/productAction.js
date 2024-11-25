// src/actions/productActions.js
import axios from 'axios';
import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,

    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from '../Constraints/productConstants';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST });
        const { data } = await axios.get('http://localhost:3000/api/products');
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

 export   const    getsingleProduct=(id)=>async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAIL_REQ})
        const {data}=await axios.get(`http://localhost:3000/api/products/${id}`)
        dispatch({type:PRODUCT_DETAIL_REQ_SUCCESS,payload:data})


    }catch(error){
        dispatch({type:PRODUCT_DETAIL_REQ_FAIL,payload:error.response?.data?.message || error.message,})
    }
 }
