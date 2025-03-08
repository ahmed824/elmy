import Courses from '@/app/components/courses/Courses'
import React from 'react'

export default function page() {
    return (
        <div>
            {/* Breadcrumb & Header Section */}
            <div
                className="flex justify-center flex-col items-right min-h-[400px] px-6 py-8 md:px-12 md:py-16 -mt-[116px]"
                style={{
                    background: "linear-gradient(75deg, rgba(162, 57, 240, 0.4), #ffffff, rgba(248, 246, 207, 0.5))",
                    padding: "20px 100px",
                }}
            >
                <div className="w-full mt-20">
                    <h1 className="text-[30px] text-center font-medium text-[#121D2F]">دورات مايكروسوفت ويندوز اوفيس</h1>

                    <p className="text-[#121D2F] text-[16px] mt-12 font-medium">
                        دورات مايكروسوفت ويندوز اوفيس
                    </p>

                </div>
            </div>

            <div className='m-auto'>
                <Courses />
            </div>
        </div>
    )
}
