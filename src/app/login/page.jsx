"use client";

import React from 'react';
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const LogIn = dynamic(() => import("../components/LogIn/LogIn"), {
    ssr: false,
});

const BreadCramp = dynamic(() => import('../components/shared/breadCramp/BreadCramp'), {
    ssr: false,
});

export default function RegisterPage() {
    return (
        <div className="min-h-screen">
            {/* Toast Container at the top */}
            <ToastContainer
                position="top-center" // Changed to top-center for better visibility
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="mt-4" // Add some margin from the top
            />
            <BreadCramp title="تسجيل الدخول" />
            <div className="m-auto flex justify-center align-middle py-8">
                <LogIn />
            </div>
        </div>
    );
}