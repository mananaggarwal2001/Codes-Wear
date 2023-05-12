import React from 'react'
import Image from 'next/image'
import Logo from '../Images/CodewearTshirtLogo.png'
import Link from 'next/link'
const login = () => {
  return (
    <div>
      <section className="text-gray-600 body-font relative">
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
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div >
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' required />
                </div>
              </div>
              <div className="p-2 w-full">
                <div>
                  <input type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Password' required />
                </div>
              </div>
              <div className=" p-2 w-full space-y-7">
                <Link href={'/websitepages/forgotpassword'}><p className='font-semibold hover:text-pink-500 hover:underline'>Forgot Your Password?</p></Link>
                <button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-semibold">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default login
