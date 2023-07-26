import React, { useEffect, useState } from 'react'
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Logo from '../Images/CodewearTshirtLogo.png'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
const login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.push('/'); // when the user is logged in then the given user will be redirected to the home poge and the user will not be able to redirected to the login page as the user is redirecting to the login page before.
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { Email, Password }
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const finalresult = await response.json();
    if (finalresult.success) {

      localStorage.setItem('myuser', JSON.stringify({ token: finalresult.token, email: finalresult.email }))
      toast.success('Sucessfully Logged In !!')
      setTimeout(() => {
        Router.push(process.env.NEXT_PUBLIC_HOST);
      }, 3200);
    } else {
      toast.error(finalresult.error);
    }

  }
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-5 justify-center items-center">
            <Image src={Logo} width={100} height={100} alt='CodeWear Logo' className='my-3 border-[2px] border-pink-700 rounded-[100%] p-3 shadow-md' />
            <h1 className="sm:text-3xl text-2xl  title-font mb-4 font-bold">Sign in to your account</h1>
            <div className='flex space-x-5'>
              <span className='font-semibold'>  or</span>
              <Link href={'/websitepages/signup'} className='hover:underline font-semibold hover:text-pink-500'>
                <p className=''>Sign Up</p>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={handleSubmit} method="post">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div >
                    <input onChange={handleChange} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' value={Email} required />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div>
                    <input onChange={handleChange} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Password' value={Password} required />
                  </div>
                </div>
                <div className=" p-2 w-full space-y-7">
                  <Link href={'/websitepages/forgotpassword'}><p className='font-semibold hover:text-pink-500 hover:underline'>Forgot Your Password?</p></Link>
                  <button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-semibold">Sign In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default login
