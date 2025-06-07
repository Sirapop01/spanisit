// src/app/admin/announcements/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAnnouncements, deleteAnnouncement } from '@/services/announcementService';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';

export default function AdminAnnouncementsPage() {
    const router = useRouter();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnnouncements = async () => {
        setLoading(true);
        const res = await getAllAnnouncements();
        if (res.success) {
            setAnnouncements(res.data);
        } else {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลประกาศได้', 'error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: `คุณต้องการลบประกาศ "${title}" ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await deleteAnnouncement(id);
                if (res.success) {
                    Swal.fire('สำเร็จ!', 'ประกาศถูกลบเรียบร้อยแล้ว', 'success');
                    fetchAnnouncements(); // โหลดข้อมูลใหม่
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบประกาศได้', 'error');
                }
                setLoading(false);
            }
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">จัดการประกาศ</h1>
                <button
                    onClick={() => router.push('/admin/announcements/add')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    <Icon icon="mdi:plus" />
                    เพิ่มประกาศใหม่
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto text-secondary">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">หัวข้อประกาศ</th>
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">วันที่สร้าง</th>
                                <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length > 0 ? announcements.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-5 py-4 border-b">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-600 truncate">{item.details}</p>
                                    </td>
                                    <td className="px-5 py-4 border-b text-sm">
                                        {format(item.createdAt.toDate(), 'dd MMM yyyy, HH:mm', { locale: th })}
                                    </td>
                                    <td className="px-5 py-4 border-b text-center">
                                        <button onClick={() => router.push(`/admin/announcements/edit/${item.id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold cursor-pointer">
                                            แก้ไข
                                        </button>
                                        <button onClick={() => handleDelete(item.id, item.title)} className="text-red-600 hover:text-red-900 font-semibold cursor-pointer">
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-10 text-gray-500">
                                        ยังไม่มีประกาศในระบบ
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}