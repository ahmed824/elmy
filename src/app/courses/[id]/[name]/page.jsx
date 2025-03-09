"use client"
import Courses from '@/app/components/courses/Courses'
import TrainerSlider from '@/app/components/courses/TrainerSlider';
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
    const { id, name } = useParams();
    const decodedName = decodeURIComponent(name);

    
    return (
        <div>


            <div className='m-auto'>
                <Courses id={id} name={decodedName} />
            </div>

            <div className='m-auto'>
                <TrainerSlider />
            </div>

        </div>
    )
}
