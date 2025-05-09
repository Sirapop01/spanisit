'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getMemberById, updateMember } from '@/services/memberServices'
import Swal from 'sweetalert2'
import Image from 'next/image'
import axios from 'axios'

import positionData from "@/data/positionData"
import facultyData from "@/data/facultyData"

export default function EditMemberPage() {
    const currentYear = new Date().getFullYear() + 543
    const startYear = 2567
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i)
    const prefixes = ["นาย", "นางสาว"]

    const router = useRouter()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        year: '',
        prefix: '',
        name: '',
        surname: '',
        nickname: '',
        faculty: '',
        position: '',
        motto: '',
        photoUrl: ''
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!id) return

        Swal.fire({
            title: 'กำลังโหลดข้อมูล...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        })

        const fetchMember = async () => {
            try {
                const res = await getMemberById(id)
                if (res.success) {
                    const { year, prefix, name, surname, nickname, faculty, position, photoUrl, motto } = res.data
                    setFormData({
                        year,
                        prefix,
                        name,
                        surname,
                        nickname,
                        faculty,
                        position,
                        motto,
                        photoUrl
                    })
                    Swal.close()
                } else {
                    Swal.fire('ไม่สามารถโหลดข้อมูลสมาชิกได้', '', 'error')
                }
            } catch (err) {
                Swal.fire('เกิดข้อผิดพลาดในการดึงข้อมูล', '', 'error')
            }
        }

        fetchMember()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' ? Number(value) : value, // แปลง year เป็น number
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.year) newErrors.year = true
        if (!formData.prefix) newErrors.prefix = true
        if (!formData.name) newErrors.name = true
        if (!formData.surname) newErrors.surname = true
        if (!formData.nickname) newErrors.nickname = true
        if (!formData.faculty) newErrors.faculty = true
        if (!formData.position) newErrors.position = true
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        setIsLoading(true)
        Swal.fire({
            title: 'กำลังบันทึกข้อมูล...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })

        try {
            let imageUrl = formData.photoUrl; // ใช้ URL ที่มีอยู่เดิม

            if (imageFile) {
                const fileNameWithoutExtension = imageFile.name.split('.').slice(0, -1).join('.');
                const imageToUpload = new FormData();

                imageToUpload.append('type', 'member');
                imageToUpload.append('year', formData.year); // ปีเป็นตัวเลข
                imageToUpload.append('file', imageFile);
                imageToUpload.append('imageName', fileNameWithoutExtension);

                const response = await axios.post('/admin/api/upload', imageToUpload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Upload successful:', response.data);
                imageUrl = response.data.results[0].url;
            }

            const updatedMember = { ...formData, photoUrl: imageUrl };
            const res = await updateMember(id, updatedMember);
            if (res.success) {
                Swal.fire('บันทึกสำเร็จ', 'ข้อมูลสมาชิกถูกอัปเดตแล้ว', 'success').then(() => {
                    router.push('/admin/member');
                });
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
            }
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 text-black">
            <h1 className="text-2xl font-bold text-center text-primary">แก้ไขข้อมูลสมาชิก</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* รูปภาพด้านซ้าย */}
                <div className="flex flex-col items-center space-y-4 col-span-1">
                    <label className="font-medium">เลือกรูปภาพ:</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full border px-3 py-2 rounded cursor-pointer"
                    />
                    {(imagePreview || formData.photoUrl) && (
                        <Image
                            src={imagePreview || formData.photoUrl}
                            alt="รูปสมาชิก"
                            width={160}
                            height={160}
                            className="object-cover rounded-full border-4 shadow w-40 h-40"
                        />
                    )}
                </div>

                {/* ฟอร์มด้านขวา */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="year" className="block font-medium">ปีวาระ</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-full border ${errors.year ? 'border-red-500' : ''}`}
                        >
                            <option value="">-- เลือกปีวาระ --</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="prefix" className="block font-medium">คำนำหน้า</label>
                        <select
                            name="prefix"
                            value={formData.prefix}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-full border ${errors.prefix ? 'border-red-500' : ''}`}
                        >
                            <option value="">-- เลือกคำนำหน้า --</option>
                            {prefixes.map((p, idx) => (
                                <option key={idx} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block font-medium">ชื่อ</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="ชื่อ"
                            className={`w-full px-4 py-2 rounded-full border ${errors.name ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="surname" className="block font-medium">นามสกุล</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="นามสกุล"
                            className={`w-full px-4 py-2 rounded-full border ${errors.surname ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="nickname" className="block font-medium">ชื่อเล่น</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="ชื่อเล่น"
                            className={`w-full px-4 py-2 rounded-full border ${errors.nickname ? 'border-red-500' : ''}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="faculty" className="block font-medium">คณะ</label>
                        <select
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-full border ${errors.faculty ? 'border-red-500' : ''}`}
                        >
                            <option value="">-- เลือกคณะ --</option>
                            {facultyData.map((f) => (
                                <option key={f.id} value={f.name}>{f.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="position" className="block font-medium">ตำแหน่ง</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-full border ${errors.position ? 'border-red-500' : ''}`}
                        >
                            <option value="">-- เลือกตำแหน่ง --</option>
                            {positionData.map((p, idx) => (
                                <option key={idx} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="motto" className="block font-medium">คำขวัญ (ไม่บังคับ)</label>
                        <input
                            type="text"
                            name="motto"
                            value={formData.motto}
                            onChange={handleChange}
                            placeholder="คำขวัญ"
                            className="w-full px-4 py-2 rounded-full border"
                        />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'บันทึกข้อมูล...' : 'บันทึกข้อมูล'}
                </button>
            </div>
        </div>

    )
}
