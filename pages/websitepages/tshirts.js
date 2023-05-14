/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import connectToMongo from '@/middleware/mongooose'
import Product from '@/models/Product';
connectToMongo();
const tshirts = (props) => {
  const { products } = props; // using the destructuring syntax for fetching all the products from the given link.
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font flex justify-around">
        <div className="container px-5 py-24 ">
          <div className="flex flex-wrap items-center">
            {
              products.map((items) => {
                return (
                  <div key={items._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                    <Link href={`../products/${items.slug}`} className="block relative  rounded overflow-hidden">
                      <img alt="ecommerce" className=" h-[40vh] block m-auto" src={items.img} />
                      <div className="mt-4 text-center">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{items.category}</h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">{items.title}</h2>
                        <p className="mt-1">₹{items.price}</p>
                        <p className="mt-1">S, L, XL, XXL</p>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let products = await Product.find({category:'t-shirts'}) // for finding all the products from the database.
  console.log(products)
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}


export default tshirts