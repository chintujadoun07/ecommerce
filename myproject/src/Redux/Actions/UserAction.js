import axios from "axios";

import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_FAIL,
    USER_LOGIN_REQ_SUCCESS,

    USER_LOGOUT,
    USER_REGISTER_REQ,
    USER_REGISTER_REQ_FAIL,
    USER_REGISTER_REQ_SUCCESS,


} from "../Constraints/User"

export const userLoginAction = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQ });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            'http://localhost:3000/api/users/login', 
            { email:formdata.email,password:formdata.password}, 
            config
        );

        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
//user logout action
export const userLogoutAction=()=>async(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
    document.location.href='/login'
}

//user register action
export const userRegisterAction=(formdata)=>async(dispatch)=>{
 try{
    dispatch({type: USER_REGISTER_REQ})
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const {data}=await axios.post('http://localhost:3000/api/users',{name:formdata.name,email:formdata.email,password:formdata.password},config)
    dispatch({type: USER_REGISTER_REQ_SUCCESS,payload:data})
    
 }catch(e){
    dispatch({type: USER_REGISTER_REQ_FAIL,payload:e.response?.data?.message || e.message})
 }
}