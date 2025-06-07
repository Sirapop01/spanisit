'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRegulationById, updateRegulation } from '@/services/regulationsServices';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';

export default function EditRegulationPage() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        year: '',
        category: '',
        title: '',
        url: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

     useEffect(() => {
        if (!id) return;
        const fetchDocument = async () => {
            setIsLoading(true);
            const res = await getRegulationById(id);
            if (res.success) {
                setFormData(res.data);
            } else {
                 Swal.fire('เกิดข้อผิดพลาด', 'ไม่พบข้อมูลไฟล์', 'error')
                    .then(() => router.push('/admin/regulations'));
            }
            setIsLoading(false);
        };
        fetchDocument();
    }, [id, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.year) newErrors.year = 'กรุณากรอกปี พ.ศ.';
        if (!formData.category) newErrors.category = 'กรุณาเลือกหมวดหมู่';
        if (!formData.title) newErrors.title = 'กรุณากรอกชื่อไฟล์';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        
        // ข้อมูลที่จะอัปเดต ไม่รวม URL และ ID
        const dataToUpdate = {
            year: parseInt(formData.year),
            category: formData.category,
            title: formData.title,
        };

        const result = await updateRegulation(id, dataToUpdate);

        if (result.success) {
            Swal.fire('สำเร็จ!', 'อัปเดตข้อมูลเรียบร้อยแล้ว', 'success')
                .then(() => router.push('/admin/regulations'));
        } else {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
         <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 text-secondary">
            <div className="flex items-center mb-8">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200">
                    <Icon icon="mdi:arrow-left" className="w-6 h-6 text-primary" />
                </button>
                <h1 className="text-3xl font-bold text-primary ml-4">แก้ไขข้อมูลไฟล์</h1>
            </div>
            
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
                noValidate
            >
                <div>
                    <label htmlFor="year" className="block text-sm font-medium mb-1">ปี พ.ศ.:</label>
                    <input
                        type="number"
                        id="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 sm:text-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">หมวดหมู่:</label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 sm:text-sm ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="" disabled>-- เลือกหมวดหมู่ --</option>
                        <option value="rules">ระเบียบ</option>
                        <option value="constitutions">ธรรมนูญ</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">ชื่อไฟล์ (สำหรับแสดงผล):</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 sm:text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div className="text-sm text-gray-600">
                    <p>URL ปัจจุบัน (ไม่สามารถแก้ไขได้):</p>
                    <a href={formData.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all hover:underline">{formData.url}</a>
                </div>

                 <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.push('/admin/regulations')} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">
                        ยกเลิก
                    </button>
                    <button type="submit" disabled={isLoading} className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-primary disabled:bg-gray-400 cursor-pointer">
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                </div>
            </form>
        </div>
    );
}