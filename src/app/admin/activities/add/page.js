'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Icon } from "@iconify/react";
import axios from 'axios'
import { addActivity } from '@/services/activityServices'
import LoadingSpinner from '@/components/loading'
import "react-datepicker/dist/react-datepicker.css";

export default function AddActivityForm() {
    const router = useRouter();

    const startYear = 2567; // หรือปีเริ่มต้นที่เหมาะสม
    const currentYear = new Date().getFullYear() + 543;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

    const [images, setImages] = useState([])
    const [imageName, setImageName] = useState([])
    const [formData, setFormData] = useState({
        year: '',
        startDate: '',
        endDate: '',
        title: '',
        details: '',
        location: '',
        photoURL: []
    })

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if(images.length + files.length > 10) {
            toast.error("อัปโหลดรูปได้สูงสุด 10 รูป")
            return
        }
        setImages(prev => [...prev, ...files])
        setImageName(prev => [...prev, ...files.map(file => file.name)])
    }

    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        setImageName((prevNames) => prevNames.filter((_, index) => index !== indexToRemove));
    };

    function validateForm(){
        const newErrors = {}
        if (!formData.year) newErrors.year = 'กรุณาเลือกปี'
        if (!formData.startDate) newErrors.startDate = 'กรุณาเลือกวันเริ่มกิจกรรม'
        if (!formData.endDate) newErrors.endDate = 'กรุณาเลือกวันสิ้นสุดกิจกรรม'
        if (!formData.title.trim()) newErrors.title = 'กรุณากรอกชื่อโครงการ/กิจกรรม'
        if (!formData.location.trim()) newErrors.location = 'กรุณากรอกสถานที่จัดกิจกรรม'
        if (!formData.details.trim()) newErrors.details = 'กรุณากรอกรายละเอียดกิจกรรม'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function resetForm() {
        setFormData({
            year: '',
            startDate: '',
            endDate: '',
            title: '',
            location: '',
            details: '',
            photoURL: []
        })
        setImages([]);
        setImageName([]); 
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        const imageToUpload = new FormData();

        if(validateForm()) {
            setIsLoading(true)
            imageToUpload.append('type', 'activity');
            imageToUpload.append('year', formData.year)
            imageToUpload.append('categoryName', formData.title)

            images.forEach((file, index) => {
                const fileNameWithoutExtension = imageName[index].split('.').slice(0, -1).join('.');
                imageToUpload.append('file', file)
                imageToUpload.append('imageName', fileNameWithoutExtension)
            })

            try {
                const response = await axios.post('/admin/api/upload', imageToUpload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log('Upload successful:', response.data);

                const uploadedImageUrls = response.data.results.map(result => result.url)

                console.log(uploadedImageUrls)

                const updatedFormData = {
                    ...formData,
                    startDate: formData.startDate.toISOString().split('T')[0],
                    endDate: formData.endDate.toISOString().split('T')[0],
                    photoURL: uploadedImageUrls
                }
                setFormData(updatedFormData)
                console.log(updatedFormData)

                const result = await addActivity(updatedFormData)

                if(result.success){
                    console.log('Activity added successfully with ID:', result.id)
                    toast.success('บันทึกข้อมูลกิจกรรมสำเร็จ')
                    resetForm()
                } else {
                    toast.error("เกิดข้อผิดพลาด")
                    console.log('Error adding activity:', result.error);
                }
            } catch (error) {
                toast.error("เกิดข้อผิดพลาด")
                console.error('Error uploading image:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("Form has errors", errors);
        }
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prevData => ({
            ...prevData,
            [name]: name === 'year' ? Number(value) : value,
        })))
    }

    function handleDateChange (name, date) {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        setFormData((prevData => ({
            ...prevData,
            [name]: localDate,
        })))
    }

    return (
        <div>
            {isLoading && (
                <LoadingSpinner/>
            )}
            <div>
                <div className='relative w-full max-w-3xl mx-auto mb-4'>
                    <button
                        type='button'
                        onClick={() => router.back()}
                        className='absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full flex items-center cursor-pointer'>
                            <Icon icon="mdi:arrow-left" className='text-4xl text-primary'/>
                    </button>
                    <h2 className="text-3xl font-semibold text-center text-yellow-600 mb-6 mt-10">
                        เพิ่มโครงการ/กิจกรรม
                    </h2>
                </div>
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border mt-10 mb-10 text-secondary">

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={handleSubmit}>
                        {/* ปี */}
                        <div>
                            <div className="block flex items-center gap-1">
                                <label className="block mb-1">ปีการศึกษาที่จัดโครงการ/กิจกรรม</label>
                                <span className="text-red-500 text-xl">*</span>
                            </div>
                            
                            <select
                                className={`w-full border rounded px-3 py-2 ${errors.year ? 'border-red-500' : ''} cursor-pointer`}
                                name='year'
                                value={formData.year}
                                onChange={handleChange}
                            >
                                <option disabled value="">-- เลือกปีการศึกษา --</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}

                        </div>

                        {/* วันที่ */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <div className="block flex items-center gap-1">
                                    <label className="block mb-1">วันเริ่มกิจกรรม</label>
                                    <span className="text-red-500 text-xl">*</span>
                                </div>
                                
                                <DatePicker
                                    name="startDate"
                                    selected={formData.startDate}
                                    onChange={(date) => handleDateChange('startDate', date)}
                                    className={`w-full border rounded px-3 py-2 ${errors.startDate ? 'border-red-500' : ''}`}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="ว/ด/ป"
                                />
                                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                            </div>

                            <div>
                                <div className="block flex items-center gap-1">
                                    <label className="block mb-1">วันสิ้นสุดกิจกรรม</label>
                                    <span className="text-red-500 text-xl">*</span>
                                </div>
                                
                                <DatePicker
                                    name="endDate"
                                    selected={formData.endDate}
                                    onChange={(date) => handleDateChange('endDate', date)}
                                    className={`w-full border rounded px-3 py-2 ${errors.endDate ? 'border-red-500' : ''}`}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="ว/ด/ป"
                                />
                                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                            </div>
                        </div>

                        {/* ชื่อ */}
                        <div>
                            <div className="block flex items-center gap-1">
                                <label className="block mb-1">ชื่อโครงการ/กิจกรรม</label>
                                <span className="text-red-500 text-xl">*</span>
                            </div>
                            
                            <input
                                type="text"
                                className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
                                placeholder="ชื่อกิจกรรม"
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* สถานที่ */}
                        <div>
                            <div className="block flex items-center gap-1">
                                <label className="block mb-1">สถานที่จัดโครงการ/กิจกรรม</label>
                                <span className="text-red-500 text-xl">*</span>
                            </div>
                            
                            <input
                                type="text"
                                className={`w-full border rounded px-3 py-2 ${errors.location ? 'border-red-500' : ''}`}
                                placeholder="สถานที่จัดกิจกรรม"
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        {/* รายละเอียด */}
                        <div className="md:col-span-2">
                            <div className="block flex items-center gap-1">
                                <label className="block mb-1">รายละเอียดกิจกรรม</label>
                                <span className="text-red-500 text-xl">*</span>
                            </div>

                            <textarea
                                className={`w-full border rounded px-3 py-2 ${errors.details ? 'border-red-500' : ''}`}
                                placeholder="รายละเอียดกิจกรรม"
                                rows="4"
                                name='details'
                                value={formData.details}
                                onChange={handleChange}
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
                                    <div key={index} className="relative group">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`uploaded-${index}`}
                                            className="w-full h-32 object-cover rounded-lg shadow"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
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
            </div>
        </div>
    )
}
