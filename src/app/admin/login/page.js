'use client'
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { useUserAuth } from "@/context/UserAuthContext";
import { toast } from 'react-toastify'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error, setError] = useState('')
    const { user, login, resetPassword } = useUserAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.replace('/admin')
        }
    }, [user, router])

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(email, password)
            router.replace('/admin')
        } catch (err) {
            setError(err.message)
            console.log(err)
            toast.error("ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบอีเมลและรหัสผ่าน")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <form className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96" onSubmit={handleLogin}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Admin Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:online-none focus:ring-blue-50 text-black placeholder-gray-400"/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:online-none focus:ring-blue-500 text-black placeholder-gray-400"/>
                <div className="w-full flex justify-end mb-3">
                    <a href="/admin/reset-password" className="text-sm text-primary hover:underline">ลืมรหัสผ่าน</a>    
                </div>
                
                <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg transition duration-200 cursor-pointer">
                    Login
                </button>
            </form>
        </div>
    );
}