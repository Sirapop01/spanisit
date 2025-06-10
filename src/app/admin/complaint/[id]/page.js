'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getComplaintById, updateComplaint } from '@/services/complaintServices';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import LoadingSpinner from '@/components/loading';

export default function EditComplaintPage() {
    const router = useRouter();
    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [status, setStatus] = useState('');
    const [adminNote, setAdminNote] = useState('');
    const [files, setFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]); // ✅ State นี้จะใช้จัดการไฟล์เดิม
    const [isLoading, setIsLoading] = useState(true);
    const [originalFiles, setOriginalFiles] = useState([]);

    const statusOptions = ['กำลังดำเนินการ', 'อนุมัติ', 'ไม่อนุมัติ'];

    useEffect(() => {
        if (!id) return;
        const fetchComplaint = async () => {
            setIsLoading(true);
            const res = await getComplaintById(id);
            if (res.success) {
                setComplaint(res.data);
                setStatus(res.data.status);
                setAdminNote(res.data.adminNote || '');
                setExistingFiles(res.data.evidenceURLs || []);
                setOriginalFiles(res.data.evidenceURLs || []);
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่พบข้อมูลการร้องเรียน', 'error')
                    .then(() => router.push('/admin/complaint'));
            }
            setIsLoading(false);
        };
        fetchComplaint();
    }, [id, router]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    // ✅ (ใหม่) ฟังก์ชันสำหรับลบไฟล์ออกจาก state
    const handleRemoveFile = (indexToRemove) => {
        const updatedFiles = existingFiles.filter((_, index) => index !== indexToRemove);
        setExistingFiles(updatedFiles);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'ไฟล์จะถูกลบออกเมื่อกดบันทึก',
            showConfirmButton: false,
            timer: 2000
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // ส่วนที่ 1: ตรวจสอบและลบไฟล์ที่ถูกเอาออกใน Cloudinary
            const filesToDelete = originalFiles.filter(url => !existingFiles.includes(url));
            if (filesToDelete.length > 0) {
                // --- ✅ ส่วนที่แก้ไขให้ดึง public_id ได้อย่างถูกต้อง ---
                const publicIdsToDelete = filesToDelete.map(url => {
                    const uploadIndex = url.indexOf('/upload/');
                    const publicIdWithVersion = url.substring(uploadIndex + 8);
                    const publicId = publicIdWithVersion.substring(publicIdWithVersion.indexOf('/') + 1).split('.')[0];
                    return publicId;
                });

                console.log("Attempting to delete complaint evidence:", publicIdsToDelete); // สำหรับ Debug

                await fetch('/admin/api/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        public_ids: publicIdsToDelete,
                        resource_type: 'raw' // ไฟล์หลักฐานเป็น 'raw'
                    })
                });
            }

            let uploadedFileUrls = [...existingFiles];

            // ... (ส่วนที่ 2 และ 3 เหมือนเดิม)
            if (files.length > 0) {
                const uploadData = new FormData();
                files.forEach(file => {
                    uploadData.append('file', file);
                    uploadData.append('imageName', file.name);
                });
                uploadData.append('type', 'complaint-evidence');
                uploadData.append('year', new Date().getFullYear().toString());

                const uploadResponse = await axios.post('/admin/api/uploadfile', uploadData);
                const newUrls = uploadResponse.data.results.map(res => res.url);
                uploadedFileUrls = [...uploadedFileUrls, ...newUrls];
            }

            const updateData = {
                status,
                adminNote,
                evidenceURLs: uploadedFileUrls,
            };

            const result = await updateComplaint(id, updateData);

            if (result.success) {
                Swal.fire('สำเร็จ!', 'อัปเดตสถานะเรียบร้อยแล้ว', 'success')
                    .then(() => router.push('/admin/complaint'));
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !complaint) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <button onClick={() => router.back()} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900">
                <Icon icon="mdi:arrow-left" /> กลับ
            </button>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">เรื่อง: {complaint.subject}</h1>
            <p className="text-sm text-gray-500 mb-6">
                โดย: {complaint.name} ({complaint.email}) | ยื่นเรื่องเมื่อ: {format(complaint.createdAt.toDate(), 'dd MMM yy, HH:mm', { locale: th })}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">รายละเอียดการร้องเรียน</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{complaint.message}</p>
                </div>

                <form onSubmit={handleSubmit} className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md space-y-6">
                    {/* ... ส่วนของ status และ adminNote เหมือนเดิม ... */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">ปรับสถานะ</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-md text-secondary">
                            <option value="รอรับเรื่อง" disabled>รอรับเรื่อง</option>
                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="adminNote" className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ (สำหรับผู้ใช้)</label>
                        <textarea id="adminNote" rows="4" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="w-full px-3 py-2 border rounded-md text-secondary" placeholder="เพิ่มคำอธิบายหรือผลการดำเนินการ..." />
                    </div>

                    {/* ✅ ส่วนของการแสดงผลและจัดการไฟล์ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">หลักฐาน</label>

                        {/* แสดงไฟล์ที่มีอยู่แล้วพร้อมปุ่มลบ */}
                        {existingFiles.length > 0 && (
                            <div className="mt-2 space-y-2">
                                <p className="text-xs font-semibold text-gray-600">ไฟล์ที่มีอยู่:</p>
                                <ul className="space-y-1">
                                    {existingFiles.map((url, index) => (
                                        <li key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                                                หลักฐาน {index + 1}
                                            </a>
                                            <button type="button" onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700 ml-2">
                                                <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Input สำหรับเพิ่มไฟล์ใหม่ */}
                        <div className="mt-4">
                            <label htmlFor="fileInput" className="block text-xs font-medium text-gray-500 mb-1">แนบไฟล์เพิ่มเติม:</label>
                            <input type="file" id="fileInput" multiple onChange={handleFileChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 hover:file:bg-indigo-100" />
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400">
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                </form>
            </div>
        </div>
    );
}