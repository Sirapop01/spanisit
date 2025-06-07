// src/app/admin/announcements/add/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAnnouncement } from '@/services/announcementService';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';

export default function AddAnnouncementPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        link: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "กรุณากรอกหัวข้อประกาศ";
        if (!formData.details.trim()) newErrors.details = "กรุณากรอกรายละเอียด";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            Swal.fire('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย *', 'warning');
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';
            // ตรวจสอบว่ามีไฟล์รูปภาพถูกเลือกหรือไม่
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);
                uploadData.append('imageName', imageFile.name.split('.').slice(0, -1).join('.'));
                uploadData.append('type', 'announcement');
                uploadData.append('year', new Date().getFullYear().toString());

                const response = await axios.post('/admin/api/upload', uploadData);
                imageUrl = response.data.results[0].url;
            }

            const dataToSave = {
                ...formData,
                imageUrl: imageUrl,
            };

            const result = await addAnnouncement(dataToSave);
            if (result.success) {
                Swal.fire('สำเร็จ!', 'เพิ่มประกาศใหม่เรียบร้อยแล้ว', 'success')
                    .then(() => router.push('/admin/announcements'));
            } else {
                throw new Error('ไม่สามารถบันทึกข้อมูลได้');
            }

        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            {isLoading && <LoadingSpinner />}
            <div className="flex items-center mb-8">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200">
                    <Icon icon="mdi:arrow-left" className="w-6 h-6 text-primary" />
                </button>
                <h1 className="text-3xl font-bold text-primary ml-4">เพิ่มประกาศใหม่</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">หัวข้อประกาศ <span className="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                           className={`w-full px-4 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="details" className="block mb-2 font-semibold text-gray-700">รายละเอียด <span className="text-red-500">*</span></label>
                    <textarea id="details" name="details" rows="6" value={formData.details} onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-md ${errors.details ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>
                <div>
                    <label htmlFor="link" className="block mb-2 font-semibold text-gray-700">ลิงก์เพิ่มเติม (ถ้ามี)</label>
                    <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} placeholder="https://example.com"
                           className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">รูปภาพประกอบ (ถ้ามี)</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange}
                           className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 hover:file:bg-indigo-100" />
                    {imageFile && <p className="text-sm text-gray-500 mt-2">ไฟล์ที่เลือก: {imageFile.name}</p>}
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.push('/admin/announcements')}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        ยกเลิก
                    </button>
                    <button type="submit" disabled={isLoading}
                            className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-primary disabled:bg-gray-400">
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกประกาศ'}
                    </button>
                </div>
            </form>
        </div>
    );
}