// src/app/admin/announcements/edit/[id]/page.js

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase'; // ต้อง import db โดยตรงเพื่อใช้ getDoc
import { updateAnnouncement } from '@/services/announcementService';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';

export default function EditAnnouncementPage() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        details: '',
        link: '',
        imageUrl: ''
    });
    const [newImageFile, setNewImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchAnnouncement = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(db, 'announcements', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData({ id: docSnap.id, ...docSnap.data() });
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่พบข้อมูลประกาศ', 'error')
                        .then(() => router.push('/admin/announcements'));
                }
            } catch (error) {
                 Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
            }
            setIsLoading(false);
        };
        fetchAnnouncement();
    }, [id, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            // แสดง preview รูปใหม่ทันที
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    // ฟังก์ชันสำหรับลบรูปภาพปัจจุบัน
    const handleRemoveImage = () => {
        setNewImageFile(null); // เผื่อมีการเลือกไฟล์ใหม่ไว้
        setFormData(prev => ({ ...prev, imageUrl: '' })); // ลบ URL ออกจาก state
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalImageUrl = formData.imageUrl;
            
            // ถ้ามีการเลือกไฟล์รูปใหม่
            if (newImageFile) {
                const uploadData = new FormData();
                uploadData.append('file', newImageFile);
                uploadData.append('imageName', newImageFile.name.split('.').slice(0, -1).join('.'));
                uploadData.append('type', 'announcement');
                uploadData.append('year', new Date().getFullYear().toString());
                
                const response = await axios.post('/admin/api/upload', uploadData);
                finalImageUrl = response.data.results[0].url;
            }

            const dataToUpdate = {
                title: formData.title,
                details: formData.details,
                link: formData.link,
                imageUrl: finalImageUrl,
            };

            const result = await updateAnnouncement(id, dataToUpdate);
            if (result.success) {
                Swal.fire('สำเร็จ!', 'แก้ไขประกาศเรียบร้อยแล้ว', 'success')
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

    if (isLoading) return <LoadingSpinner />;
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex items-center mb-8">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-200">
                    <Icon icon="mdi:arrow-left" className="w-6 h-6 text-primary" />
                </button>
                <h1 className="text-3xl font-bold text-primary ml-4">แก้ไขประกาศ</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 text-secondary">
                <div>
                    <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">หัวข้อประกาศ <span className="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-md"/>
                </div>
                <div>
                    <label htmlFor="details" className="block mb-2 font-semibold text-gray-700">รายละเอียด <span className="text-red-500">*</span></label>
                    <textarea id="details" name="details" rows="6" value={formData.details} onChange={handleChange} className="w-full px-4 py-2 border rounded-md"></textarea>
                </div>
                <div>
                    <label htmlFor="link" className="block mb-2 font-semibold text-gray-700">ลิงก์เพิ่มเติม (ถ้ามี)</label>
                    <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} placeholder="https://example.com" className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                     <label className="block mb-2 font-semibold text-gray-700">รูปภาพประกอบ</label>
                     {formData.imageUrl && (
                        <div className="relative w-full h-48 mb-2">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain rounded-md bg-gray-100"/>
                            <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700">
                                <Icon icon="mdi:trash-can-outline" className="w-5 h-5"/>
                            </button>
                        </div>
                     )}
                     <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 hover:file:bg-indigo-100"/>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.push('/admin/announcements')} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer">
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