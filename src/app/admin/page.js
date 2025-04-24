'use client'
import React, { useState } from "react"
import { useUserAuth } from "@/context/UserAuthContext";
import { useRouter } from 'next/navigation'

export default function AdminHome() {
  const router = useRouter()
  
  const { Logout,user } = useUserAuth()

  console.log(user)

  const handleManageUsers = () => {
    router.push('/admin/member')
  };

  const handleLogout = async () => {
    try {
      await Logout()
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleReset = () => {
    router.push('/admin/reset-password')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome to Admin Dashboard</h1>

      <p className="text-gray-800">Hi, {user?.email}</p>

      <button onClick={handleManageUsers} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition duration-200 cursor-pointer">
        จัดการทำเนียบสภา
      </button>

      <div className="flex flex-row space-x-4">
        <button onClick={handleLogout} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition duration-200 cursor-pointer">
          Logout
        </button>

        <button onClick={handleReset} className="px-5 py-2.5 bg-gray-300 text-black rounded-xl shadow-md transition duration-200 cursor-pointer">
          Reset password
        </button>
      </div>
    </div>
  );
}