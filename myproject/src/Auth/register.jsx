import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../Layouts/Layout';
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../Redux/Actions/UserAction";

const Register = () => {
  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const userRegisterReducer = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegisterReducer;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(formdata));
  
   
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  // useEffect to log userInfo and redirect if user is registered
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      // // Redirect to home page after successful registration
       navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className='space-y-11'>
        <Layout>
          {
            loading ? (<h1>Loading...</h1>)
              : error ? (<h1>{error}</h1>)
                : (
                  <div className='flex items-center justify-center'>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={submitHandler}>
                      {/* Name Field */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          required
                          shadow
                          value={formdata.name}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@flowbite.com"
                          required
                          shadow
                          value={formdata.email}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Password Field */}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput
                          id="password"
                          name="password"
                          type="password"
                          required
                          shadow
                          value={formdata.password}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Agree to Terms */}
                      <div className="flex items-center gap-2">
                        <Checkbox id="agree" />
                        <Label htmlFor="agree" className="flex">
                          I agree with the&nbsp;
                          <Link to="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                          </Link>
                        </Label>
                      </div>
                      
                      <Button type="submit">Register new account</Button>
                    </form>
                  </div>
                )
          }
        </Layout>
      </div>
    </>
  );
};

export default Register;
