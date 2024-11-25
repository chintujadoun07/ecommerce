import { useEffect, useState } from "react";
import { Button} from "flowbite-react";
import Layout from '../Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../Redux/Actions/UserAction'; // Assuming you have this action
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: '',
    password: ''
  });

  const userLoginReducer = useSelector((state) => state.userLogin);
  const { loading, error } = userLoginReducer; // Destructure loading, error, and userInfo
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(formdata));
  };


  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  
  // // useEffect to log userInfo and redirect if user is registered
  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     // // Redirect to home page after successful registration
  //      navigate('/');
  //   }
  // }, [userInfo, navigate]);

  return (
   <>
    <Layout>
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <form className="max-w-sm mx-auto h-5/6" onSubmit={submitHandler}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                   name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  value={formdata.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formdata.password}
                  onChange={handleChange}
                />
              </div>
              
              {/* <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button> */}
               <Button type="submit">login</Button>
            </form>
          </>
        )}
      </Layout>
   </>
  );
};

export default Login;
