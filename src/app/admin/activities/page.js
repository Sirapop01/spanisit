'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/nav_admin'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'

export default function AddActivityForm() {
    const [year, setYear] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [details, setDetails] = useState('')
    const [images, setImages] = useState([])

    const [errors, setErrors] = useState({})

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        setImages(prev => [...prev, ...files])
    }

    const validateForm = () => {
        const newErrors = {}
        if (!year) newErrors.year = 'กรุณาเลือกปี'
        if (!startDate) newErrors.startDate = 'กรุณาเลือกวันเริ่มกิจกรรม'
        if (!endDate) newErrors.endDate = 'กรุณาเลือกวันสิ้นสุดกิจกรรม'
        if (!title.trim()) newErrors.title = 'กรุณากรอกชื่อโครงการ/กิจกรรม'
        if (!location.trim()) newErrors.location = 'กรุณากรอกสถานที่จัดกิจกรรม'
        if (!details.trim()) newErrors.details = 'กรุณากรอกรายละเอียดกิจกรรม'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        // ✅ ส่งข้อมูล
        console.log({ year, startDate, endDate, title, location, details, images })

        // ✅ เคลียร์ข้อมูล
        setYear('')
        setStartDate(null)
        setEndDate(null)
        setTitle('')
        setLocation('')
        setDetails('')
        setImages([])
        setErrors({})
    }

    return (
        <div>
            <Navbar />
            <h2 className="text-3xl font-semibold text-center text-yellow-600 mb-6 mt-10">
                เพิ่มโครงการ/กิจกรรม
            </h2>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border mt-10 mb-10 text-secondary">

                <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={handleSubmit}>
                    {/* ปี */}
                    <div>
                        <label className="block mb-1">ปีที่จัดโครงการ/กิจกรรม</label>
                        <select
                            className={`w-full border rounded px-3 py-2 ${errors.year ? 'border-red-500' : ''}`}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">เลือกปี</option>
                            <option>2566</option>
                            <option>2567</option>
                        </select>
                        {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                    </div>

                    {/* วันที่ */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block mb-1">วันเริ่มกิจกรรม</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className={`w-full border rounded px-3 py-2 ${errors.startDate ? 'border-red-500' : ''}`}
                                placeholderText="ว/ด/ป"
                            />
                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                        </div>

                        <div>
                            <label className="block mb-1">วันสิ้นสุดกิจกรรม</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className={`w-full border rounded px-3 py-2 ${errors.endDate ? 'border-red-500' : ''}`}
                                placeholderText="ว/ด/ป"
                            />
                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                        </div>
                    </div>

                    {/* ชื่อ */}
                    <div>
                        <label className="block mb-1">ชื่อโครงการ/กิจกรรม</label>
                        <input
                            type="text"
                            className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
                            placeholder="สมาย"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* สถานที่ */}
                    <div>
                        <label className="block mb-1">สถานที่จัดโครงการ/กิจกรรม</label>
                        <input
                            type="text"
                            className={`w-full border rounded px-3 py-2 ${errors.location ? 'border-red-500' : ''}`}
                            placeholder="สถานที่จัดกิจกรรม"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>

                    {/* รายละเอียด */}
                    <div className="md:col-span-2">
                        <label className="block mb-1">รายละเอียดกิจกรรม</label>
                        <textarea
                            className={`w-full border rounded px-3 py-2 ${errors.details ? 'border-red-500' : ''}`}
                            placeholder="รายละเอียดกิจกรรม"
                            rows="4"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                        {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                    </div>

                    {/* รูปภาพ */}
                    <div className="md:col-span-2">
                        <label className="block mb-2">รูปภาพ</label>
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-600">
                                <span className="border px-3 py-1 rounded-full border-gray-400 flex items-center hover:bg-gray-100">
                                    image <AiOutlinePlus className="ml-1" />
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {images.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`uploaded-${index}`}
                                    className="w-full h-32 object-cover rounded-lg shadow"
                                />
                            ))}
                        </div>
                    </div>

                    {/* ปุ่ม */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition duration-200 shadow-sm"
                        >
                            <AiOutlineSave />
                            บันทึก
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}
