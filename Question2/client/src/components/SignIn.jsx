import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom'

export default function SignIn() {

  const notify1 = (info) => toast.success(info);
  const notify4 = (msg) => toast.error(msg);

  const initialValue = {
    email: '',
    password: ''
  }

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialValue);
  const { email, password } = userData;

  const onChangeValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }


  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', userData);
      console.log(response.data);

      if (response.data.error) {
        notify4(response.data.error);
      } else {
        const { name, email, id } = jwt_decode(response.data.data);
        localStorage.setItem('token', response.data.data);
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('loggedin', true);

        notify1(response.data.message);
        navigate('/');

        console.log('login');
      }
    } catch (error) {
      notify4('An error occurred during login.');
      console.log('error in login', error);
    }
  }


  return (
    <div className='flex flex-col w-[100%] h-[96vh] '  >
      <div className='flex w-[60%] h-[70%]  bg-white shadow-2xl m-auto p-8 rounded-md'>
        <div className='w-[100%] md:w-[50%] m-auto  mt-0  '>
          <div className=' w-[100%] md:w-[90%]  '>

            <h1 className='font-bold text-2xl mb-5'>Login</h1>
            <p>Your Email</p>
            <input type="email" name="email" id="email" value={email} onChange={(e) => onChangeValue(e)} class="bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            <p>Password</p>

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => onChangeValue(e)}

              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            <button type="button" className=' p-1 rounded-md text-white font-semibold mt-8 bg-blue-500 w-[100%] m-auto' onClick={(e) => onHandleSubmit(e)}>Sign In</button>
            <p className="text-sm font-light mt-3  text-gray-400">
              Don’t have an account yet? <NavLink to="/signup" className="font-medium text-primary-600 hover:underline text-[#e36414]">Sign up</NavLink>
            </p>
          </div>

        </div>
        <div className='w-0  md:w-[80%]'>
          <img className=' md:h-[90%] invisible	 md:visible  ' src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
