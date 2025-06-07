'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';
import { addDocument } from '@/services/regulationsServices';

export default function AddRulePage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        year: '',
        category: '',
        title: '',
    });

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files ? e.target.files[0] : null);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.year) newErrors.year = 'กรุณากรอกปี พ.ศ.';
        if (!formData.category) newErrors.category = 'กรุณาเลือกหมวดหมู่';
        if (!formData.title) newErrors.title = 'กรุณากรอกชื่อไฟล์';
        if (!file) newErrors.file = 'กรุณาเลือกไฟล์';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData({ year: '', category: '', title: '' });
        setFile(null);
        setErrors({});
        if (document.getElementById('fileInput')) {
            document.getElementById('fileInput').value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.warn('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        setIsLoading(true);
        const uploadData = new FormData();

        // ---- ✨ สร้างชื่อไฟล์พร้อมนามสกุล ✨ ----
        const originalFileName = file.name;
        const fileExtension = originalFileName.slice(originalFileName.lastIndexOf('.'));
        const fileNameWithExtension = formData.title.trim() + fileExtension;

        uploadData.append('imageName', fileNameWithExtension);
        uploadData.append('file', file);
        uploadData.append('year', formData.year);
        uploadData.append('type', formData.category);

        try {
            const uploadResponse = await axios.post('/admin/api/uploadfile', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const uploadedFileUrl = uploadResponse.data.results[0].url;

            const documentData = {
                year: parseInt(formData.year),
                title: formData.title,
                category: formData.category,
                url: uploadedFileUrl,
            };

            const result = await addDocument(documentData);

            if (result.success) {
                toast.success("บันทึกข้อมูลเอกสารสำเร็จ!");
                resetForm();
            } else {
                toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 text-secondary">
            {isLoading && <LoadingSpinner />}
            <h1 className="text-3xl font-bold mb-8 text-center text-primary">
                เพิ่มระเบียบและธรรมนูญนิสิต
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
                noValidate
            >
                {/* Year Input */}
                <div>
                    <label htmlFor="year" className="block text-sm font-medium mb-1">ปี พ.ศ.:</label>
                    <input
                        type="number"
                        id="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 sm:text-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="เช่น 2567"
                    />
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>

                {/* Category Select */}
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

                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">ชื่อไฟล์ (สำหรับแสดงผล):</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 sm:text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="เช่น ระเบียบการแต่งกาย"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* File Input */}
                <div>
                    <label htmlFor="fileInput" className="block text-sm font-medium mb-1">เลือกไฟล์:</label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        className={`mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 ${errors.file ? 'text-red-500' : ''}`}
                        accept=".pdf,.doc,.docx"
                    />
                    {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                    {file && <p className="text-sm text-gray-500 mt-2">ไฟล์ที่เลือก: {file.name}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-primary text-white font-semibold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 transition duration-150 ease-in-out"
                >
                    {isLoading ? 'กำลังอัปโหลด...' : 'อัปโหลดและบันทึก'}
                </button>
            </form>
        </div>
    );
}