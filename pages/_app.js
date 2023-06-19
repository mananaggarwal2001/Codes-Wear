import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Router, { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0)
  const [user, setUser] = useState({ value: null, email: null })
  const [key, setKey] = useState()
  const Router = useRouter();
  const [progress, setProgress] = useState(0) // for setting the progress bar and showing in the top of the use router.
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setProgress(40)
    });
    Router.events.on('routeChangeComplete', () => {
      setProgress(100)
    });
    try {
      if (localStorage.getItem('Cart') && localStorage.getItem('subtotal')) {
        setCart(JSON.parse(localStorage.getItem('Cart')))
        setsubTotal(localStorage.getItem('subtotal'))
      }

    } catch (error) {
      console.log(error.message)
      localStorage.clear();
    }
    const user = JSON.parse(localStorage.getItem('myuser'));
    if (user) {
      setUser({ token: user.token, email: user.email })
    }

  }, [Router.query]) // for re rendering the application on changing of the url of the application so that we haven't to re load the website again and again to change the things.

  // saveCart item is used for saving the item in the localStorage so that  the given items should persist on the reloading of the webpage.
  const saveCart = (myCart) => {
    console.log(myCart)
    try {

      localStorage.setItem('Cart', JSON.stringify(myCart))
    }
    catch (error) {
      console.error(error.message);
      localStorage.clear()
    }
    let subt = 0;
    let keys = Object.keys(Cart)
    console.log(keys.length)
    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].Price * myCart[keys[i]].qty;
      }
      setsubTotal(subt)
      localStorage.setItem('subtotal', subt);
    } else if (keys.length <= 0) {
      setCart({})
      localStorage.clear()
    }
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
    setsubTotal(0)
    localStorage.removeItem('Cart')
    localStorage.removeItem('subtotal')
  }

  const buyNow = (itemCode, qty, Price, Name, size, variant) => {
    let newCart = {}
    newCart[itemCode] = { qty, Price, Name, size, variant }
    setCart(newCart)
    setsubTotal(newCart[itemCode].Price)
    localStorage.setItem('subtotal', newCart[itemCode].Price);
    localStorage.setItem('Cart', JSON.stringify(newCart))
    Router.push('/websitepages/checkout')
  }
  // for logout from the page we have
  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({ value: null })
    setKey(Math.random())
    Router.push('/')
  }

  // this is the remove cart function for removing the items in the cart.
  const removeFromCart = (itemCode, qty, Price, Name, size, variant) => {
    let myCart = Cart;
    // checking whether the given item is zero or not in the given cart.
    if (myCart[itemCode].qty == 0) {
      delete myCart[itemCode];
      localStorage.removeItem('Cart')
    } else if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty - qty;
    }
    setCart(myCart)
    saveCart(myCart)
  }
  return (
    <>
      <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar key={key} logout={logout} user={user} cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component user={user} buyNow={buyNow} cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart}  {...pageProps} subTotal={subTotal} />
      <Footer />
    </>
  )
}
