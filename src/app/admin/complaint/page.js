
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllComplaints } from '@/services/complaintServices';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import LoadingSpinner from '@/components/loading';

export default function AdminComplaintPage() {
    const router = useRouter();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            setLoading(true);
            const res = await getAllComplaints();
            if (res.success) {
                setComplaints(res.data);
            } else {
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
            }
            setLoading(false);
        };
        fetchComplaints();
    }, []);

    const getStatusChip = (status) => {
        switch (status) {
            case 'รอรับเรื่อง': return 'bg-yellow-200 text-yellow-800';
            case 'กำลังดำเนินการ': return 'bg-blue-200 text-blue-800';
            case 'อนุมัติ': return 'bg-green-200 text-green-800';
            case 'ไม่อนุมัติ': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">จัดการเรื่องร้องเรียน</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">หัวข้อ</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">ผู้ร้องเรียน</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase">สถานะ</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">วันที่ส่ง</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.length > 0 ? complaints.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{c.subject}</p></td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{c.name}</p></td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getStatusChip(c.status)}`}>
                                            <span className="relative">{c.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{format(c.createdAt.toDate(), 'dd MMM yyyy', { locale: th })}</p></td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-right">
                                        <button onClick={() => router.push(`/admin/complaint/${c.id}`)} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                            จัดการ
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-500">ยังไม่มีเรื่องร้องเรียน</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}