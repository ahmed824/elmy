"use client"

import React from 'react'
import { ToastContainer } from 'react-toastify'
import dynamic from 'next/dynamic'

const Register = dynamic(() => import("../components/register/Register"), {
    ssr: false,
});

const BreadCramp = dynamic(() => import('../components/shared/breadCramp/BreadCramp'), {
    ssr: false,
});


export default function RegisterPage() {
    return (
        <div className="min-h-screen">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <BreadCramp title=" إنشاء حساب " />
            <div className="m-auto flex justify-center align-middle py-8">
                <Register />
            </div>
        </div>
    )
}