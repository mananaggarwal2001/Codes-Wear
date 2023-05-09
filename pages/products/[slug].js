import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
const Slug = () => {
  const Router = useRouter();
  const {finalquery} = Router.pathname;
  return (
    <div>
      This is the slug page for getting the valuable tshirts:- {finalquery}
    </div>
  )
}

export default Slug