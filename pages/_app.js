import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)

  useEffect(() => {
    try {
      if (localStorage.getItem('Cart')) {
        setCart(JSON.parse(localStorage.getItem('Cart')))
      }
    } catch (error) {
      console.log(error.message)
      localStorage.clear();
    }
  }, [])

  // saveCart item is used for saving the item in the localStorage so that  the given items should persist on the reloading of the webpage.
  const saveCart = (myCart) => {

    try {

      localStorage.setItem('Cart', JSON.stringify(myCart))
    } catch (error) {
      console.error(error.message);
      localStorage.clear()
    }
    let subt;
    let keys = Object.keys(Cart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].Price * myCart[keys[i]].qty;
    }
    setsubTotal(subt)
  }



  // adding the things to the cart in for getting the desired result.
  const addToCart = (itemCode, qty, Price, Name, size, variant) => {
    let newCart = Cart;
    if (itemCode in Cart) {
      newCart[itemCode].qty = Cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, Price, Name, size, variant }
    }
    setCart(newCart)
    saveCart(newCart)
  }

  // clearCart method is being used for clearing the whole cart.
  const clearCart = () => {
    setCart({})
    localStorage.removeItem('Cart')
  }

  // this is the remove cart function for removing the items in the cart.
  const removeFromCart = (itemCode, qty, Price, Name, size, variant) => {
    let myCart = Cart;
    // checking whether the given item is zero or not in the given cart.
    if (myCart[itemCode]["qty"] <= 0) {
      delete myCart[itemCode];
    } else if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty - qty;
    }
    setCart(myCart)
    saveCart(myCart)
  }
  return (
    <>
      <Navbar cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}  {...pageProps} subTotal={subTotal} />
      <Footer />
    </>
  )
}
