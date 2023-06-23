import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/Bs'
import Head from 'next/head'
import Script from 'next/script'
import logo from '../Images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const checkout = (props) => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal, user } = props
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [address, setaddress] = useState('')
  // for chekcing the disabled property of the given button we have
  const [disabled, setdisabled] = useState(true)
  const [city, setcity] = useState()
  const [state, setstate] = useState()

  const fetchUserDetails = async () => {
    const data = JSON.parse(localStorage.getItem('myuser'));
    const response = await fetch("http://localhost:3000/api/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const finalresponse = await response.json()
    console.log(finalresponse)
    setName(finalresponse.user.Name);
    setaddress(finalresponse.user.Address);
    setpincode(finalresponse.user.Pincode);
    setphone(finalresponse.user.PhoneNumber)
    setstate(finalresponse.user.State)
    setcity(finalresponse.user.City)
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])


  // process for the checking the disablity of the given button whether to enable the particular button for further proceed in the checkout and the payment state for doing the particular task.
  const handleChange = async (e) => {

    if (e.target.name === "name") {
      setName(e.target.value)
    } else if (e.target.name === "email") {
      setemail(e.target.value)
    } else if (e.target.name === 'PhoneNumber') {
      setphone(e.target.value)
    } else if (e.target.name === 'pincode') {
      setpincode(e.target.value)
      if (e.target.value.length >= 6) {
        let pin = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let finalpincode = await pin.json();
        console.log(finalpincode)
        if (Object.keys(finalpincode).includes(e.target.value)) {
          setstate(finalpincode[e.target.value][1])
          setcity(finalpincode[e.target.value][0])
        } else {
          setstate('')
          setcity('')
        }
      } else {
        setstate('')
        setcity('')
      }
    } else if (e.target.name === 'address') {
      setaddress(e.target.value)
    }
      if (user.token) {
        setemail(user.email)
      }
    if (name.length > 2 && email.length > 2 && phone.length > 2 && pincode.length > 2 && address.length > 2) {
        setdisabled(false)
      } else {
        setdisabled(true)
      }
  }

  // for doing the payments
  const intiatePayment = async (e) => {
    e.preventDefault()
    const data = { cart, subTotal, email: email, name, phone, pincode, address, state, city }
    const response = await fetch("http://localhost:3000/api/razorPayTransactions", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const finalresponse = await response.json()
    if (finalresponse.success) {
      const options = {
        "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": Number.parseInt(subTotal) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Codes Wear", //your business name
        "description": "Test Transaction",
        "image": logo,
        "order_id": finalresponse.finalresult.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:3000/api/paymentVerification",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#ec4899"
        }
      };
      const finaloutput = new Razorpay(options)
      finaloutput.open()
    } else {
      toast.error(finalresponse.error);
    }
  }
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className='container m-auto px-8 md:p-0 md:w-2/3'>
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
        <h1 className='font-bold text-3xl text-center my-8'>CheckOut</h1>
        <h2 className='text-xl font-semibold my-4'>1. Delivery Details</h2>
        <div className="mx-auto flex">
          <div className="w-1/2">
            <div class="mb-4">
              <label htmlfor="name" class="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Name' value={name} />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">
              <label htmlfor="email" class="leading-7 text-sm text-gray-600">Email</label>
              {user && user.token ?
                <input onChange={handleChange} value={user.email} type="email" id="email" name="email" class="w-full text-opacity-60 read-only:bg-gray-300 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' readOnly={true} /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' />
              }
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
              <input onChange={handleChange} value={phone} type="phone" id="PhoneNumber" name="PhoneNumber" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your 10 Digit Phone Number' />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">
              <label htmlfor="pincode" class="leading-7 text-sm text-gray-600">PinCode</label>
              <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your PinCode' />
            </div>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="w-1/2">
            <div class="mb-4">
              <label htmlfor="state" class="leading-7 text-sm text-gray-600">State</label>
              <input onChange={handleChange} value={state} type="text" id="state" name="state" class=" read-only:bg-slate-200  w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your State' />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">

              <label htmlfor="city" class="leading-7 text-sm text-gray-600">District</label>
              <input onChange={handleChange} value={city} type="text" id="city" name="city" class=" read-only:bg-slate-200  w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your City' />


            </div>
          </div>
        </div>

        <h2 className='text-xl font-semibold my-4 mb-6'>2. Review Cart Items & Pay</h2>
        <div className="sidebar  bg-pink-100 px-8 py-10 duration-500 w-full">

          <ol className='list-decimal font-semibold'>
            {
              Object.keys(cart).length === 0 && <div className='flex justify-center items-center'>No items in Cart</div>
            }
            {
              Object.keys(cart).map((item) => {
                return (
                  <li key={item}>
                    <div className="item flex my-5">

                      <div className=' font-semibold'>{cart[item].Name}</div>
                      <div className=' w-1/3 flex items-center justify-center font-semibold text-lg '>

                        <AiFillMinusCircle onClick={() => { removeFromCart(item, 1, cart[item].Price, cart[item].Name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>
                          {cart[item].qty}
                        </span><AiFillPlusCircle onClick={() => { addToCart(item, 1, cart[item].Price, cart[item].Name, cart[item].size, cart[item].variant) }} className='cursor-pointer text-pink-500' /></div>
                    </div>
                  </li>
                )
              })
            }

          </ol>
          <div className="total font-semibold mt-6 text-lg">Subtotal: ₹{subTotal}</div>
        </div>
        <Link href={'/websitepages/checkout'}><button disabled={disabled} onClick={intiatePayment} className=" disabled:bg-pink-300 flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='me-2' /> <span className='font-semibold'> Pay ₹{subTotal}</span> </button>
        </Link>
      </div>
    </div>
  )
}

export default checkout