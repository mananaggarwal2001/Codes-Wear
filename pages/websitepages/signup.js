import React, { useEffect, useState } from 'react'
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Logo from '../Images/CodewearTshirtLogo.png'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const signup = () => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)

    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // for preventing the reload of the page when submitting the form after clicking the submit button.
    const data = { Name, Email, Password }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('User Created Successfully!!')
        setName('')
        setEmail('')
        setPassword('')
      } else {
        toast.error(result.error);
      }

      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }

  }
  return (
    <div>
      <div>
        <section className="text-gray-600 body-font relative">
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
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
              <h1 className="sm:text-3xl text-2xl  title-font mb-4 font-bold">Create An Account</h1>
              <div className='flex space-x-2'>
                <span className='font-semibold'>If you already have an account then</span>
                <Link href={'/websitepages/login'} className='hover:underline font-semibold hover:text-pink-500'>
                  <p className=''>Sign In</p>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <form onSubmit={handleSubmit} action="" method="post">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-full">
                    <div >
                      <input onChange={handleChange} value={Name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Name' required />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div >
                      <input onChange={handleChange} value={Email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Email Address' required />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div>
                      <input onChange={handleChange} value={Password} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Password' required />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div>
                      <input type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Repeat Password' required />
                    </div>
                  </div>
                  <div className=" p-2 w-full space-y-7">
                    <button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-semibold">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default signup
