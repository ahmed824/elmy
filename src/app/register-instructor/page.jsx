"use client"
import dynamic from 'next/dynamic'
import React from 'react'
const RegisterInstructor = dynamic(() => import("../components/RegisterInstructor/RegisterInstructor"), {
  ssr: false
})

export default function page() {
  return (
    <div>
      <RegisterInstructor />
    </div>
  )
}
