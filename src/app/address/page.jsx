import React from 'react'
import BreadCramp from '../components/shared/breadCramp/BreadCramp'  

export default function page() {
    return (
        <div className="min-h-[50vh]">
            <BreadCramp title="العنوان الوطني" />
            <div className="m-auto flex justify-center align-middle">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <label className="block text-right text-gray-800 font-semibold mb-2">المدينة</label>
                    <div className="relative">
                        <input
                            type="text"
                            value="الرياض"
                            readOnly
                            className="w-full bg-gray-100 text-gray-500 text-right px-4 py-3 rounded-full outline-none shadow-inner cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
