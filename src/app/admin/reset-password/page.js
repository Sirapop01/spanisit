'use client'
import { useState } from 'react'
import { useUserAuth } from '@/context/UserAuthContext'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const { resetPassword } = useUserAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleReset = async (e) => {
    e.preventDefault()
    setError('')

    try {
        await resetPassword(email)  // ส่งคำขอรีเซ็ตรหัสผ่าน
        alert('ถ้าอีเมลนี้มีในระบบ เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณ')
    } catch (err) {
        setError(err.message)  // หากเกิดข้อผิดพลาดจากการรีเซ็ต
        console.log(err)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">เปลี่ยนรหัสผ่าน</h2>

        <input type="email" placeholder="กรอกอีเมลที่ใช้ในการ Login" value={email} onChange={(e) => setEmail(e.target.value)}required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:online-none focus:ring-blue-50 text-black placeholder-gray-400"/>
        <p className="text-sm text-gray-500 mb-4">กรุณากรอกอีเมลที่ได้ลงทะเบียนให้ใช้งานเท่านั้น</p>
        <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg transition duration-200 cursor-pointer">
          ส่งลิงก์รีเซ็ตรหัสผ่าน
        </button>
        <button type="button" onClick={handleBack} className="w-full py-3 bg-gray-300 text-black rounded-lg mt-4 transition duration-200 cursor-pointer">
          Back
        </button>
      </form>
    </div>
  )
}
