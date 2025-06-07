// src/app/admin/activities/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getActivityByYrs, getYearsWithActivities, deleteActivity } from '@/services/activityServices';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/loading';

export default function AdminActivitiesPage() {
    const router = useRouter();
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchYears = async () => {
            setLoading(true);
            const res = await getYearsWithActivities();
            if (res.success && res.data.length > 0) {
                setYears(res.data);
                setSelectedYear(res.data[0].year); // เลือกปีล่าสุดเป็น default
            }
            setLoading(false);
        };
        fetchYears();
    }, []);

    useEffect(() => {
        if (!selectedYear) return;
        const fetchActivities = async () => {
            setLoading(true);
            const res = await getActivityByYrs(Number(selectedYear));
            if (res.success) {
                setActivities(res.data);
            }
            setLoading(false);
        };
        fetchActivities();
    }, [selectedYear]);

    const handleAddActivity = () => {
        router.push('/admin/activities/add'); // แก้ไข path ไปยังหน้าเพิ่มกิจกรรม
    };
    
    const handleDelete = async (id, title) => {
        Swal.fire({
            title: `คุณแน่ใจหรือไม่?`,
            text: `คุณต้องการลบกิจกรรม "${title}" ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await deleteActivity(id);
                if (res.success) {
                    Swal.fire('สำเร็จ!', 'กิจกรรมถูกลบแล้ว', 'success');
                    // โหลดข้อมูลใหม่
                    const updatedActivities = activities.filter(act => act.id !== id);
                    setActivities(updatedActivities);
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบกิจกรรมได้', 'error');
                }
                setLoading(false);
            }
        });
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            {loading && <LoadingSpinner />}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">จัดการโครงการ/กิจกรรม</h1>
                <button onClick={handleAddActivity} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    + เพิ่มกิจกรรม
                </button>
            </div>

            <div className="mb-6">
                <label htmlFor="year-select" className="mr-2 font-medium text-secondary">เลือกปีการศึกษา:</label>
                <select id="year-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded px-3 py-2 text-secondary">
                    {years.map(y => <option key={y.year} value={y.year}>{y.year}</option>)}
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100 text-secondary">
                            <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">ชื่อกิจกรรม</th>
                            <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">วันที่จัด</th>
                            <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.length > 0 ? activities.map(act => (
                            <tr key={act.id} className='text-secondary'>
                                <td className="px-5 py-4 border-b">{act.title}</td>
                                <td className="px-5 py-4 border-b">{new Date(act.startDate.toDate()).toLocaleDateString('th-TH')}</td>
                                <td className="px-5 py-4 border-b text-center ">
                                    <button onClick={() => router.push(`/admin/activities/edit/${act.id}`)} className="cursor-pointer text-indigo-600 hover:text-indigo-900 mr-4">แก้ไข</button>
                                    <button onClick={() => handleDelete(act.id, act.title)} className="cursor-pointer text-red-600 hover:text-red-900">ลบ</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="3" className="text-center py-10 text-gray-500">ไม่พบกิจกรรมในปีที่เลือก</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}