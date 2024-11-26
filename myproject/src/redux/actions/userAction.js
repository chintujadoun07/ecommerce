import axios from "axios";
import{
    USER_REGISTER_REQ,
    USER_REGISTER_REQ_SUCCESS,
    USER_REGISTER_REQ_FAIL,
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_SUCCESS,
    USER_LOGIN_REQ_FAIL,
    USER_LOGOUT 
} from '../constraints/user'
import { BASE_URL }  from '../constraints/BASE_URL'
export const userLoginAction=(email,password)=>async(dispatch)=>{
 try{
    dispatch({type:USER_LOGIN_REQ})
   const config={
     headers:{
       'Content-Type':'application/json'
     }
   };
   const {data}=await axios.post(`${BASE_URL }/api/users/login`,{
    email:email,password:password
   },config)
   dispatch({type:USER_LOGIN_REQ_SUCCESS,payload:data})
   localStorage.setItem('userInfo',data)
 }catch(e){
    dispatch({type:USER_LOGIN_REQ_FAIL,payload:e.response.data.msg})
 }
}

export const userLogoutAction=()=>async(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({type:USER_LOGOUT})
  document.location.href='/login'
}


export const userRegisterAction=(formdata)=>async(dispatch)=>{
  try{
   // Add your code to register user here
  dispatch({type: USER_REGISTER_REQ})
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  };
  const {data}=await axios.post(`${BASE_URL }/api/users `,{name:formdata.name,email:formdata.email,password:formdata.password},config)
  console.log('API Response:', data);
  dispatch({type: USER_REGISTER_REQ_SUCCESS,payload:data})

}catch(e){
  dispatch({type: USER_REGISTER_REQ_FAIL,payload:e.response.data.msg})

}
}