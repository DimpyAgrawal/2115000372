import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

  const notify1 = () => toast.success("SignUp successfully");
  const notify4 = (msg) => toast.error(msg);
  const initialValue = {
    name: '',
    email: '',
    password: '',
    


  }

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialValue);
  const { name, email, password} = userData;

  const onChangeValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
 
  }
   
  const onHandleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/register', userData)
      .then(response => {
        // console.log(response.data);
        if(response.data.error){notify4(response.data.error)}
        else notify1();
      })
      .catch(error => {
        console.log("error " + error);
      });
      navigate('/signin')
  }

  return (



    <div className='flex flex-col w-[100%] h-[96vh] '  >
      <div className='flex w-[60%] h-[80%]  bg-white shadow-2xl m-auto p-8 rounded-md'>
        <div className='w-[100%] md:w-[50%] m-auto  mt-0  '>
          <div className=' w-[100%] md:w-[90%]  '>

            <h1 className='font-bold text-2xl mb-5'>Create an Account</h1>

            <p>Your Name</p>
            <input type="name" name="name" id="name" value={name} onChange={(e) => onChangeValue(e)} class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required="" />
            <p>Your Email</p>
            <input type="email" name="email" id="email" value={email} onChange={(e) => onChangeValue(e)} class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />  
            <p>Password</p>
            <input type="password" name="password" id="password" value={password} placeholder="••••••••" onChange={(e) => onChangeValue(e)} 
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
           
            

            <button type="button" className=' p-1 rounded-md text-white font-semibold mt-8 bg-blue-500 w-[100%] m-auto' onClick={(e) => onHandleSubmit(e)}>Submit</button>
          </div>

        </div>
        <div className='w-0  md:w-[80%]'>
          <img className=' md:h-[90%] invisible	 md:visible  ' src="	https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="" />
        </div>
      </div>
    </div>

  )
}
