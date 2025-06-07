// src/app/admin/activities/edit/[id]/page.js

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getActivityById, updateActivity } from '@/services/activityServices';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import LoadingSpinner from '@/components/loading';

export default function EditActivityPage() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        year: '',
        startDate: null,
        endDate: null,
        title: '',
        details: '',
        location: '',
        photoURL: []
    });
    const [newImages, setNewImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchActivity = async () => {
            setIsLoading(true);
            const res = await getActivityById(id);
            if (res.success) {
                setFormData(res.data);
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่พบข้อมูลกิจกรรม', 'error')
                    .then(() => router.push('/admin/activities'));
            }
            setIsLoading(false);
        };
        fetchActivity();
    }, [id, router]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        setFormData(prev => ({ ...prev, [name]: date }));
    };

    const handleNewImageUpload = (e) => {
        setNewImages([...e.target.files]);
    };

    const handleRemoveExistingImage = (indexToRemove) => {
        const updatedPhotos = formData.photoURL.filter((_, index) => index !== indexToRemove);
        setFormData(prev => ({ ...prev, photoURL: updatedPhotos }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalPhotoURLs = [...formData.photoURL];

            if (newImages.length > 0) {
                const uploadData = new FormData();
                uploadData.append('type', 'activity');
                uploadData.append('year', formData.year);
                uploadData.append('categoryName', formData.title);
                
                newImages.forEach(file => {
                    uploadData.append('file', file);
                    uploadData.append('imageName', file.name.split('.').slice(0, -1).join('.'));
                });
                
                const response = await axios.post('/admin/api/upload', uploadData);
                const newUrls = response.data.results.map(res => res.url);
                finalPhotoURLs = [...finalPhotoURLs, ...newUrls];
            }

            const dataToUpdate = {
                ...formData,
                photoURL: finalPhotoURLs,
                startDate: formData.startDate.toISOString().split('T')[0],
                endDate: formData.endDate.toISOString().split('T')[0],
            };
            
            const result = await updateActivity(id, dataToUpdate);
            
            if (result.success) {
                Swal.fire('สำเร็จ!', 'อัปเดตกิจกรรมเรียบร้อยแล้ว', 'success')
                    .then(() => router.push('/admin/activities'));
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">แก้ไขโครงการ/กิจกรรม</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6 text-secondary">
                <div>
                    <label className="block mb-1 font-medium">ชื่อโครงการ/กิจกรรม</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium">วันเริ่มกิจกรรม</label>
                        <DatePicker selected={formData.startDate ? new Date(formData.startDate) : null} onChange={(date) => handleDateChange('startDate', date)} className="w-full border rounded px-3 py-2" dateFormat="dd/MM/yyyy"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">วันสิ้นสุดกิจกรรม</label>
                        <DatePicker selected={formData.endDate ? new Date(formData.endDate) : null} onChange={(date) => handleDateChange('endDate', date)} className="w-full border rounded px-3 py-2" dateFormat="dd/MM/yyyy"/>
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">สถานที่</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border rounded px-3 py-2"/>
                </div>

                <div>
                    <label className="block mb-1 font-medium">รายละเอียด</label>
                    <textarea name="details" rows="5" value={formData.details} onChange={handleChange} className="w-full border rounded px-3 py-2"/>
                </div>

                <div>
                    <label className="block mb-1 font-medium">รูปภาพกิจกรรม</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {formData.photoURL.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} alt={`activity-${index}`} className="w-full h-32 object-cover rounded-md"/>
                                <button type="button" onClick={() => handleRemoveExistingImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icon icon="mdi:close" className="w-4 h-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block mb-1 font-medium">เพิ่มรูปภาพใหม่</label>
                    <input type="file" multiple onChange={handleNewImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 hover:file:bg-indigo-100"/>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        ยกเลิก
                    </button>
                    <button type="submit" disabled={isLoading} className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-primary disabled:bg-gray-400">
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                </div>
            </form>
        </div>
    );
}