import connectToMongo from '@/middleware/mongooose';
import Link from 'next/link';
connectToMongo()
import React, { useEffect, useState } from 'react'
// import { Router } from 'next/router';
const orders = () => {


  const [finalorders, setfinalorders] = useState([])
  const fetchOrders = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: JSON.parse(localStorage.getItem('myuser')).token }),
    });
    let responseorders = await response.json()
    let finalorders = responseorders.orders;
    console.log(finalorders)
    setfinalorders(finalorders)
  }
  useEffect(() => {
    try {

      if (!localStorage.getItem('myuser')) {
        Router.push('/');
      } else if (localStorage.getItem('myuser')) {
        fetchOrders()
      }
    } catch (error) {
      console.log(error.message)
    }

  }, [])
  return (
    <div className='min-h-screen'>
      <div className="container mx-auto">
        <h1 className='font-bold text-3xl text-center py-12 mt-24'>My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden px-14">
                {finalorders.length == 0 ? <div className='text-center font-bold text-xl'>You haven't Placed Any Order Yet!!!!!!!!!!!</div> :
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className='text-lg'>
                        <th scope="col" className="px-6 py-4">OrderID</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Amount</th>
                        <th scope="col" className="px-6 py-4">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalorders.map((items) => {
                        return (
                          <tr key={items._id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{items.orderID}</td>
                            <td className="whitespace-nowrap px-6 py-4">{items.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{items.amount}</td>
                            <td className="whitespace-nowrap px-6 py-4 hover:text-pink-800 hover:underline font-bold"><Link href={`/websitepages/order?Orderid=${items._id}`}>Details</Link></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default orders