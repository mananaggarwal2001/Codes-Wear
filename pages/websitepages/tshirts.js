/* eslint-disable @next/next/no-img-element */
import Product from '@/models/Product';
connectToMongo();
import Link from 'next/link'
import React from 'react'
import connectToMongo from '@/middleware/mongooose'
const tshirts = (props) => {
  const { products } = props; // using the destructuring syntax for fetching all the products from the given link.
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font flex justify-around">
        <div className="container px-5 py-24 ">
          <div className="flex flex-wrap items-center">
            {
              Object.keys(products).map((items) => {
                return (
                  <div key={products[items]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                    <Link href={`../products/${products[items].slug}`} className="block relative  rounded overflow-hidden">
                      <a>
                        <img alt="ecommerce" className=" h-[40vh] block m-auto" src={products[items].img} />
                        <div className="mt-4 text-center">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{products[items].category}</h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">{products[items].title}</h2>
                          <p className="mt-1">₹{products[items].price}</p>
                          <div className="mt-1">
                            {products[items].size.includes('S') && <span className='mx-1  border border-gray-700 px-1'>S</span>}
                            {products[items].size.includes('M') && <span className='mx-1  border border-gray-700 px-1 '>M</span>}
                            {products[items].size.includes('L') && <span className='mx-1  border border-gray-700 px-1 '>L</span>}
                            {products[items].size.includes('XL') && <span className='mx-1 border border-gray-700 px-1'>XL</span>}
                            {products[items].size.includes('XXL') && <span className='mx-1 border border-gray-700 px-1'>XXL</span>}
                            {products[items].size.includes('XXXL') && <span className='mx-1 border border-gray-700 px-1 '>XXXL</span>}

                          </div>
                          <div className="mt-3">
                            {products[items].color.includes('Red') && <button className=" mx-1 border-2 bg-red-500 border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                            {products[items].color.includes('Blue') && <button className=" mx-1 border-2 bg-blue-900 border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                            {products[items].color.includes('Black') && <button className=" mx-1 border-2 bg-black border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                            {products[items].color.includes('Green') && <button className=" mx-1 border-2 bg-green-900 border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                            {products[items].color.includes('Yellow') && <button className=" mx-1 border-2 bg-yellow-400 border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                            {products[items].color.includes('Purple') && <button className=" mx-1 border-2 bg-purple-500 border-black rounded-full w-6 h-6 focus:outline-none"></button>}
                          </div>
                        </div>
                      </a>
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
  let finalproducts = await Product.find({ category: 't-shirts' }) // for finding all the products from the database.
  let tshirts = {};
  for (let item of finalproducts) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.avaiableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }

      if (!tshirts[item.title].size.includes(item.size) && item.avaiableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }

    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.avaiableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      } else {
        tshirts[item.title].color = [] // if the tshirts is empty then do this.
        tshirts[item.title].size = []
      }

    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  };
}


export default tshirts