import React, { useEffect } from 'react'
import Router from 'next/router'
const myaccount = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Router.push('/');
        }
    }, [Router.query])
    
    return (
        <div>myaccount</div>
    )
}

export default myaccount