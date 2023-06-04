import React from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/Bs'
import Head from 'next/head'
import Script from 'next/script'


const checkout = (props) => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal } = props
  const intiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now())
    let txntoken;
    // get a transaction token for intiating the payment process

    const data = { cart, subTotal, oid , email:'email@gmail.com' } // for sending the data to the backend api for creating the token and getting into the frontend for the further operation.
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/paytmTransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    txntoken = await response.json() // for converting the string data into the object of the json.
    console.log(txntoken)
    let config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txntoken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };
    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });

  }
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  crossorigin="anonymous" />
      <div className='container m-auto px-8 md:p-0 md:w-2/3'>
        <h1 className='font-bold text-3xl text-center my-8'>CheckOut</h1>
        <h2 className='text-xl font-semibold my-4'>1. Delivery Details</h2>
        <div className="mx-auto flex">
          <div className="w-1/2">
            <div class="mb-4">
              <label htmlfor="name" class="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Name' />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">
              <label htmlfor="email" class="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Email' />
            </div>
          </div>
        </div>
        {/* text area part is being used  */}
        <div className="w-full">
          <div class="mb-4 ">
            <label htmlfor="address" class="leading-7 text-sm text-gray-600">Address</label>
            <textarea rows={2} cols={10} id="address" name="address" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none" placeholder='Enter Your Address' />
          </div>
        </div>
        {/* Phone number and the City is being entered. */}
        <div className="mx-auto flex">
          <div className="w-1/2">
            <div class="mb-4">
              <label htmlfor="PhoneNumber" class="leading-7 text-sm text-gray-600">Phone Number</label>
              <input type="phone" id="PhoneNumber" name="PhoneNumber" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your Phone-Number' />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">
              <label htmlfor="city" class="leading-7 text-sm text-gray-600">City</label>
              <input type="text" id="city" name="city" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your City' />
            </div>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="w-1/2">
            <div class="mb-4">
              <label htmlfor="state" class="leading-7 text-sm text-gray-600">State</label>
              <input type="text" id="state" name="state" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your State' />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div class="mb-4 ">
              <label htmlfor="pincode" class="leading-7 text-sm text-gray-600">PinCode</label>
              <input type="text" id="pincode" name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Your PinCode' />
            </div>
          </div>
        </div>

        <h2 className='text-xl font-semibold my-4 mb-6'>2. Review Cart Items & Pay</h2>
        <div className="sidebar  bg-pink-100 px-8 py-10 duration-500 w-full">

          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length === 0 && <div className='flex justify-center items-center'>No items in Cart</div>
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
        <Link href={'/websitepages/checkout'}><button onClick={intiatePayment} className="flex justify-center items-center  mt-6 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='me-2' /> <span className='font-semibold'> Pay ₹{subTotal}</span> </button>
        </Link>
      </div>
    </div>
  )
}

export default checkout