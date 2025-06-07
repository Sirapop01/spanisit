'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// ✅ แก้ไข Service ที่นำเข้า
import { getYearsWithActivities, getActivityByYrs, deleteActivity } from '@/services/activityServices';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import LoadingSpinner from '@/components/loading';
import { Icon } from '@iconify/react';

export default function AdminActivitiesPage() {
    const router = useRouter();
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingActivities, setLoadingActivities] = useState(false);

    // ✅ Effect สำหรับดึง "ปี" ทั้งหมดที่มีกิจกรรมมาใส่ใน dropdown
    useEffect(() => {
        const fetchYears = async () => {
            setLoading(true);
            const res = await getYearsWithActivities();
            if (res.success && res.data.length > 0) {
                const yearOptions = res.data.map(y => y.year);
                setYears(yearOptions);
                // ตั้งค่าปีแรก (ปีล่าสุด) เป็น default
                setSelectedYear(yearOptions[0]);
            }
            setLoading(false);
        };
        fetchYears();
    }, []);

    // ✅ Effect สำหรับดึง "กิจกรรม" ตาม "ปีที่เลือก"
    useEffect(() => {
        // ทำงานเมื่อ selectedYear มีค่าแล้วเท่านั้น
        if (!selectedYear) return;

        const fetchActivities = async () => {
            setLoadingActivities(true);
            const res = await getActivityByYrs(Number(selectedYear));
            if (res.success) {
                setActivities(res.data);
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลกิจกรรมได้', 'error');
                setActivities([]); // เคลียร์ข้อมูลเก่าหากโหลดไม่สำเร็จ
            }
            setLoadingActivities(false);
        };

        fetchActivities();
    }, [selectedYear]); // ให้ re-run effect นี้ทุกครั้งที่ selectedYear เปลี่ยน

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: `ต้องการลบกิจกรรม "${title}" ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteActivity(id);
                if (res.success) {
                    Swal.fire('สำเร็จ!', 'กิจกรรมถูกลบแล้ว', 'success');
                    // อัปเดต state โดยการกรองอันที่ถูกลบออกไป
                    setActivities(prev => prev.filter(act => act.id !== id));
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบกิจกรรมได้', 'error');
                }
            }
        });
    };
    
    // แสดง UI หลัก
    return (
        <div className="container mx-auto p-4 md:p-8">
            {(loading || loadingActivities) && <LoadingSpinner />}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">จัดการโครงการ/กิจกรรม</h1>
                <button
                    onClick={() => router.push('/admin/activities/add')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                >
                    <Icon icon="mdi:plus" />
                    เพิ่มกิจกรรม
                </button>
            </div>

            <div className="mb-6 text-secondary">
                <label htmlFor="year-select" className="mr-2 font-medium">เลือกปีการศึกษา:</label>
                <select 
                    id="year-select" 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border rounded px-3 py-2 cursor-pointer"
                    disabled={loading}
                >
                    <option value="" disabled>กำลังโหลด...</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto text-secondary">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">ชื่อกิจกรรม</th>
                            <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">วันที่จัด</th>
                            <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && activities.length > 0 ? activities.map(act => (
                            <tr key={act.id}>
                                <td className="px-5 py-4 border-b">{act.title}</td>
                                <td className="px-5 py-4 border-b text-sm">
                                    {act.startDate ? format(act.startDate.toDate(), 'dd MMM yy', { locale: th }) : 'N/A'}
                                </td>
                                <td className="px-5 py-4 border-b text-center">
                                    <button onClick={() => router.push(`/admin/activities/edit/${act.id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold cursor-pointer">แก้ไข</button>
                                    <button onClick={() => handleDelete(act.id, act.title)} className="text-red-600 hover:text-red-900 font-semibold cursor-pointer">ลบ</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="text-center py-10 text-gray-500">
                                    {!loading && 'ไม่พบกิจกรรมในปีการศึกษาที่เลือก'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}