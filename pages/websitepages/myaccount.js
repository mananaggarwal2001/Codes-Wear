import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const myaccount = (props) => {
    const { cart, addToCart, removeFromCart, clearCart, subTotal } = props
    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [address, setaddress] = useState('')
    const [pincode, setpincode] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [name, setname] = useState('')
    const router = useRouter()

    const updateuserpassword = async (e) => {
        e.preventDefault()
        const parsedData = await JSON.parse(localStorage.getItem('myuser'))
        const data = { token: parsedData.token }
        const response = await fetch("http://localhost:3000/api/getuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const finalresponse = await response.json()
        console.log(finalresponse)
    }
    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setname(e.target.value);
        } else if (e.target.name == 'password') {
            setpassword(e.target.value)
        } else if (e.target.name == 'cpassword') {
            setconfirmpassword(e.target.value)
        } else if (e.target.name == 'address') {
            setaddress(e.target.value)
        } else if (e.target.name == 'pincode') {
            setpincode(e.target.value)
        } else if (e.target.name == 'phoneNumber') {
            setphoneNumber(e.target.value)
        }
    }
    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('myuser'))
        if (!result) {
            router.push('/');
        }
        if (result && result.token) {
            setUser(result)
            setEmail(result.email)
        }

    }, [router])

    return (
        <>
            <div className='mt-20 my-10 container px-20'>
                <h1 className='text-3xl text-center font-semibold my-10 mt-10'>Update Your Account</h1>
                <h1 className='font-semibold text-xl mb-4'>1. Default Delivery Details</h1>
                <div className="mx-auto flex">
                    <div className="w-1/2">
                        <div class="mb-4">
                            <label htmlfor="name" class="leading-7 text-sm text-gray-600">Name</label>
                            <input value={name} onChange={handleChange} type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Name' />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div class="mb-4 ">
                            <label htmlfor="email" class="leading-7 text-sm text-gray-600">Email (Cannot Be Updated)</label>

                            <input value={email} type="email" id="email" name="email" class=" read-only:bg-pink-200 text-pink-700 w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' readOnly={true} />

                        </div>
                    </div>
                </div>
                {/* text area part is being used  */}
                <div className="w-full">
                    <div class="mb-4 ">
                        <label htmlfor="address" class="leading-7 text-sm text-gray-600">Address</label>
                        <textarea onChange={handleChange} value={address} rows={2} cols={10} id="address" name="address" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none" placeholder='Enter Your Address' />
                    </div>
                </div>
                {/* Phone number and the City is being entered. */}
                <div className="mx-auto flex">
                    <div className="w-1/2">
                        <div class="mb-4">
                            <label htmlfor="PhoneNumber" class="leading-7 text-sm text-gray-600">Phone Number</label>
                            <input onChange={handleChange} value={phoneNumber} type="phone" id="PhoneNumber" name="phoneNumber" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your 10 Digit Phone Number' />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div class="mb-4 ">
                            <label htmlfor="pincode" class="leading-7 text-sm text-gray-600">PinCode</label>
                            <input value={pincode} onChange={handleChange} type="text" id="pincode" name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your PinCode' />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className=" text-base disabled:bg-pink-300 flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded "><span className='font-semibold'> Submit</span> </button>
                </div>
                <h1 className='font-semibold text-xl mb-4 mt-7'>2. Change Password</h1>
                <div className="mx-auto flex">
                    <div className="w-1/2">
                        <div class="mb-4">
                            <label htmlfor="name" class="leading-7 text-sm text-gray-600">Password</label>
                            <input onChange={handleChange} type="password" id="name" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='New Password' value={password} />
                        </div>
                    </div>
                    <div className="px-2 w-1/2">
                        <div class="mb-4 ">
                            <label htmlfor="email" class="leading-7 text-sm text-gray-600">Confirm Password</label>

                            <input value={confirmpassword} onChange={handleChange} type="password" id="cpassword" name="cpassword" class=" w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Confirm Password' />

                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={updateuserpassword} className=" text-base disabled:bg-pink-300 flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded "><span className='font-semibold'>Change Password</span> </button>
                </div>
            </div>
        </>
    )
}

export default myaccount