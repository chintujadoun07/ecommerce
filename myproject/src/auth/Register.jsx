import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegisterAction } from '../redux/actions/userAction';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
  const { loading,userInfo,error} = userRegisterReducer;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(formdata));
  };

  const handelChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log('userInfo:', userInfo);
    if (userInfo) {

      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Layout>
        {loading && <p className="text-blue-500 text-sm mb-4">Submitting...</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formdata.name}
              onChange={handelChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={handelChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="name@example.com"
              required
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
              value={formdata.password}
              onChange={handelChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>
        
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </Layout>
    </>
  );
};

export default Register;
