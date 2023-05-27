/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import connectToMongo from '@/middleware/mongooose';
connectToMongo()
import { useRouter } from 'next/router'
import Product from '@/models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Slug = (props) => {
  const { addToCart, clearCart, buyNow } = props;
  const Router = useRouter();
  const { slug } = Router.query;
  const [Pin, setPin] = useState()
  const [Serviciability, setServicablity] = useState()
  const { product, variant } = props;

  // function for checking the services whether the services are present in that particular state or not.
  const checkserviceablity = async () => {
    // then we have use the fetch api for getting the pincodes from the backend server and to do the further services in the frontend services.
    let pin = await fetch('http://localhost:3000/api/pincode');
    let finalpincode = await pin.json();
    if (finalpincode.includes(Number.parseInt(Pin))) {
      toast.success('Pincode is Serviciable')
      setServicablity(true)
    } else {
      toast.error('Sorry! Pincode not Serviciable')
      setServicablity(false)
    }
  }

  // this is the event which is given by default in the function for getting the events.
  const handlePinChange = (e) => {
    setPin(e.target.value)
  }

  const refreshVariant = (newSize, newColor) => {

    console.log(newSize, newColor)
    let url = `http://localhost:3000/products/${variant[newColor][newSize]['slug']}` // for creating the url when the user changes the color then the options will also change in the given url.
    window.location = url; // this option will redirect to that paritcular url by using the window.location method and redirect to the correct url.
  }

  const [color, setcolor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  // for implementing the buy now function to add the product and directly checkout the product on the given function.

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
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
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>


              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}


              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex space-x-1">
                  <span className="mr-3 font-semibold">Color</span>

                  {Object.keys(variant).includes('Red') && Object.keys(variant['Red']).includes(size) && <button onClick={() => refreshVariant(size, 'Red')} className={`border-2  ${color === 'Red' ? 'border-black' : 'border-gray-300'} bg-red-500 rounded-full w-6 h-6 focus:outline-none`}></button>}

                  {Object.keys(variant).includes('Green') && Object.keys(variant['Green']).includes(size) && <button onClick={() => refreshVariant(size, 'Green')} className={`border-2  ${color === 'Green' ? 'border-black' : 'border-gray-300'} bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}

                  {Object.keys(variant).includes('Blue') && Object.keys(variant['Blue']).includes(size) && <button onClick={() => refreshVariant(size, 'Blue')} className={`border-2 ${color === 'Blue' ? 'border-black' : 'border-gray-300'} bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}

                  {Object.keys(variant).includes('Black') && Object.keys(variant['Black']).includes(size) && <button onClick={() => refreshVariant(size, 'Black')} className={`border-2 ${color === 'Black' ? 'border-black' : 'border-gray-300'} bg-black-500 rounded-full w-6 h-6 focus:outline-none`}></button>}

                  {Object.keys(variant).includes('Yellow') && Object.keys(variant['Yellow']).includes(size) && <button onClick={() => refreshVariant(size, 'Yellow')} className={`border-2 ${color === 'Yellow' ? 'border-black' : 'border-gray-300'} bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => refreshVariant(e.target.value, color)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {Object.keys(variant[color]).includes('S') && <option value='S'>S</option>}
                      {Object.keys(variant[color]).includes('M') && <option value='M'>M</option>}
                      {Object.keys(variant[color]).includes('L') && <option value='L'>L</option>}
                      {Object.keys(variant[color]).includes('XL') && <option value='XL'>XL</option>}
                      {Object.keys(variant[color]).includes('XXL') && <option value='XXL'>XXL</option>}

                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button onClick={() => buyNow(slug, 1, product.price, `(${product.title}(${product.size}/${product.color})`, 'XL', 'Red')} className="flex items-center justify-center ml-8 text-white md:text-base font-bold text-xs bg-pink-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                <button onClick={() => { addToCart(slug, 1, product.price, `(${product.title}(${product.size}/${product.color})`, 'XL', 'Red') }} className="flex items-center justify-center ml-3 text-white md:text-base font-bold text-xs bg-pink-500 border-0 py-2 md:px-6 px-2 focus:outline-none hover:bg-pink-600 rounded">Add To Cart</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-6 space-x-2 text-sm flex">
                <input type='phone' className='px-2 border-2 border-gray-400 rounded-md' onChange={handlePinChange} value={Pin} placeholder='Enter Your PinCode' />
                <button onClick={checkserviceablity} className='"flex ml-16 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-semibold'>Check</button>
              </div>
              {
                (Serviciability && Serviciability != null) &&
                <div className="text-green-500 font-bold mt-3">
                  Yay! This Pincode is Serviceable !!
                </div>
              }

              {

                (!Serviciability && Serviciability != null) &&
                <div className="text-red-500 font-bold mt-3">
                  Sorry! We do not deliver to this pincode!!
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  let finalproduct = await Product.findOne({ slug: context.query.slug })// for finding the particular product in the database when the user click on the particular vairant.
  let variants = await Product.find({ title: finalproduct.title, category: finalproduct.category }) // for finding the variants of the t-shirts for the same title and then show in the slug component.
  console.log(variants);
  let colorSizeSlug = {} // for storing the different colors in the given Slug for finding the variants of the TShirts which are available in the market.
  for (let items of variants) {
    if (Object.keys(colorSizeSlug).includes(items.color)) {
      colorSizeSlug[items.color][items.size] = { slug: items.slug } // for making the object of the size variants according to the given color in the slug.
    } else {
      colorSizeSlug[items.color] = {} // if the color is not then we will make the empty object of the given color then we put the size variant according to the given slug.
      colorSizeSlug[items.color][items.size] = { slug: items.slug } // then when the object is made then we will add the size variant in the correnpondance to the particular color given in the slug.
    }
  }

  console.log('color size slug is :- ')
  console.log(colorSizeSlug);

  return {
    props: { product: JSON.parse(JSON.stringify(finalproduct)), variant: JSON.parse(JSON.stringify(colorSizeSlug)) } // for returning the product and the variant for populating the particular slug page for finding the particular product.
  };
}

export default Slug