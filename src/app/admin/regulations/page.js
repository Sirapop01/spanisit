'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDocuments, deleteRegulation } from '@/services/regulationsServices';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import LoadingSpinner from '@/components/loading';

export default function AdminRegulationsPage() {
    const router = useRouter();
    // แก้ไข state 'documents' ให้เก็บข้อมูลเป็น Object เพื่อจัดกลุ่มตามปี
    const [documentsByYear, setDocumentsByYear] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        setLoading(true);
        const res = await getDocuments();
        if (res.success) {
            // แปลงข้อมูลจาก groupedData เป็น Array ปกติ
            const allDocs = Object.values(res.data).flat();

            // จัดกลุ่มเอกสารทั้งหมดตามปี
            const groupedByYear = allDocs.reduce((acc, doc) => {
                const year = doc.year;
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(doc);
                return acc;
            }, {});

            setDocumentsByYear(groupedByYear);
        } else {
            Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: `คุณต้องการลบไฟล์ "${title}" ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteRegulation(id);
                if (res.success) {
                    Swal.fire('สำเร็จ!', 'ไฟล์ถูกลบเรียบร้อยแล้ว', 'success');
                    fetchDocuments(); // โหลดข้อมูลใหม่
                } else {
                    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบไฟล์ได้', 'error');
                }
            }
        });
    };
    
    const getCategoryText = (category) => {
        if (category === 'rules') return 'ระเบียบ';
        if (category === 'constitutions') return 'ธรรมนูญ';
        return 'อื่นๆ';
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    // ดึงปีทั้งหมดมาเรียงลำดับจากมากไปน้อย (ปีล่าสุดก่อน)
    const sortedYears = Object.keys(documentsByYear).sort((a, b) => b - a);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">จัดการระเบียบและธรรมนูญ</h1>
                <button
                    onClick={() => router.push('/admin/regulations/add')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    <Icon icon="mdi:plus" />
                    เพิ่มไฟล์ใหม่
                </button>
            </div>

            {/* วนลูปตามปีที่จัดกลุ่มไว้ */}
            {sortedYears.length > 0 ? sortedYears.map(year => (
                <div key={year} className="mb-8">
                    <h2 className="text-2xl font-semibold text-secondary mb-4">ปีการศึกษา {year}</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-x-auto text-secondary">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">ชื่อไฟล์</th>
                                        <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">หมวดหมู่</th>
                                        <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase">จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documentsByYear[year].map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-5 py-4 border-b">
                                                <p className="font-semibold">{doc.title}</p>
                                            </td>
                                            <td className="px-5 py-4 border-b text-sm">
                                                {getCategoryText(doc.category)}
                                            </td>
                                            <td className="px-5 py-4 border-b text-center">
                                                <button onClick={() => router.push(`/admin/regulations/edit/${doc.id}`)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold cursor-pointer">
                                                    แก้ไข
                                                </button>
                                                <button onClick={() => handleDelete(doc.id, doc.title)} className="text-red-600 hover:text-red-900 font-semibold cursor-pointer">
                                                    ลบ
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-md">
                    <p>ยังไม่มีไฟล์ในระบบ</p>
                </div>
            )}
        </div>
    );
}