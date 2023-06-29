import React, { useEffect, useState } from 'react'
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Logo from '../Images/CodewearTshirtLogo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const forgotpassword = () => {
    const Router = useRouter()
    const [email, setemail] = useState('')
    const [nPassword, setnpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [secret, setsecret] = useState('')
    useEffect(() => {
        if (localStorage.getItem('myuser')) {
            Router.push('/')
        }
    }, [Router])
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setemail(e.target.value)
        } else if (e.target.name === 'npassword') {
            setnpassword(e.target.value)
        } else if (e.target.name === 'cpassword') {
            setcpassword(e.target.value)
        }
    }



    const sendResetEmail = async () => {
        const data = { email, sendMail: true }
        const response = await fetch("http://localhost:3000/api/forgotpassword", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const finalresponse = await response.json()
        console.log(finalresponse)
        if (finalresponse.success) {
            toast.success(finalresponse.message)
        } else {
            toast.error(finalresponse.error)
        }
    }// for sending the reset email
    const resetPassword = async () => {
        if (nPassword === cpassword) {
            const token = Router.query.token

            const data = { nPassword, sendMail: false, token: token, secret: secret }
            console.log(secret);
            const response = await fetch("http://localhost:3000/api/forgotpassword", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const finalresponse = await response.json()
            console.log(finalresponse)
            console.log(finalresponse.success)
            if (finalresponse.success) {
                toast.success(finalresponse.message)
                setTimeout(() => {
                    Router.push('/');
                }, 2500);
            } else {
                toast.error(finalresponse.error)
            }

        } else {
            console.log('new password and confirm password doesn\'t match')
        }


    }// for chaning the password

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
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
                    <div className="flex flex-col text-center w-full mb-5 justify-center items-center">
                        <Image src={Logo} width={100} height={100} alt='CodeWear Logo' className='my-3 border-[2px] border-pink-700 rounded-[100%] p-3 shadow-md' />
                        <h1 className="sm:text-3xl text-2xl  title-font mb-4 font-bold">Forgot Password</h1>
                        <div className='flex space-x-2'>
                            <span className='font-semibold'>or if you remember your password then</span>
                            <Link href={'/websitepages/login'} className='hover:underline font-semibold hover:text-pink-500'>
                                <p className=''>Sign In</p>
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        {Router.query.token && <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div >
                                    <input onChange={handleChange} type="password" id="npassword" name="npassword" value={nPassword} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='New Password' required />
                                </div>
                                <div >
                                    <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Confirm New Password' required />
                                </div>
                            </div>
                            <div className=" p-2 w-full space-y-7">

                                <button disabled={nPassword.length == 0 || cpassword.length == 0} onClick={resetPassword} className=" disabled:bg-pink-300 flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-semibold">Change Password</button>
                            </div>
                            {nPassword !== cpassword && <span className='text-red-500'>Password Not Matched</span>}
                            {nPassword && nPassword === cpassword && <span className='text-green-600'>Password Successfully Matched</span>}
                        </div>
                        }
                        {!Router.query.token &&
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full">
                                    <div >
                                        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email Address' onChange={handleChange} value={email} required />
                                    </div>
                                </div>
                                <div className=" p-2 w-full space-y-7">
                                    <button onClick={sendResetEmail} className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg font-semibold">Continue</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default forgotpassword