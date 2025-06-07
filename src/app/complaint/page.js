'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import BannerSection from '@/components/BannerSection';
import { getAllComplaints } from '@/services/complaintServices';
import LoadingSpinner from '@/components/loading';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Component สำหรับแสดงแต่ละเรื่องร้องเรียน
const ComplaintItem = ({ complaint, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'รอรับเรื่อง':
                return { chip: 'bg-yellow-100 text-yellow-800', border: 'border-yellow-300' };
            case 'กำลังดำเนินการ':
                return { chip: 'bg-blue-100 text-blue-800', border: 'border-blue-300' };
            case 'อนุมัติ':
                return { chip: 'bg-green-100 text-green-800', border: 'border-green-300' };
            case 'ไม่อนุมัติ':
                return { chip: 'bg-red-100 text-red-800', border: 'border-red-300' };
            default:
                return { chip: 'bg-gray-100 text-gray-800', border: 'border-gray-300' };
        }
    };

    const { chip, border } = getStatusInfo(complaint.status);

    return (
        <div className={`bg-white rounded-lg shadow-sm border-l-4 ${border} mb-4`} data-aos="fade-up" data-aos-delay={index * 50}>
            {/* Header ของ Accordion */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            >
                <div className="flex-1">
                    <p className="font-semibold text-secondary">{complaint.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                         <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${chip}`}>
                            {complaint.status}
                        </span>
                        <span className="text-xs text-gray-500">
                            อัปเดตล่าสุด: {format(complaint.updatedAt.toDate(), 'dd MMM yy', { locale: th })}
                        </span>
                    </div>
                </div>
                <Icon
                    icon="mdi:chevron-down"
                    className={`text-2xl text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Content ที่ซ่อน/แสดง */}
            {isOpen && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                    <div>
                        <h3 className="font-semibold text-sm text-gray-600">รายละเอียดเรื่องร้องเรียน:</h3>
                        <p className="mt-1 text-gray-800 whitespace-pre-wrap">{complaint.message}</p>
                    </div>

                    {complaint.adminNote && (
                         <div>
                            <h3 className="font-semibold text-sm text-gray-600">หมายเหตุจากสภาฯ:</h3>
                            <p className="mt-1 text-gray-800 bg-gray-50 p-3 rounded-md">{complaint.adminNote}</p>
                        </div>
                    )}

                    {complaint.evidenceURLs?.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-sm text-gray-600">เอกสารแนบจากสภาฯ:</h3>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                {complaint.evidenceURLs.map((url, i) => (
                                    <li key={i}>
                                        <a href={url} target="_blank" rel="noopener noreferrer"
                                           className="text-blue-600 hover:underline">
                                            ดูเอกสารแนบ {i + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function IssuesPage() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800 });
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <BannerSection />

            <div className="max-w-3xl mx-auto px-4 py-12 w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-primary" data-aos="fade-down">
                    ติดตามเรื่องร้องเรียน (การผลักดันปัญหา)
                </h1>

                {loading ? (
                    <LoadingSpinner />
                ) : complaints.length > 0 ? (
                    <div>
                        {complaints.map((complaint, index) => (
                           <ComplaintItem key={complaint.id} complaint={complaint} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500" data-aos="fade-up">
                        <p>ยังไม่มีเรื่องร้องเรียนในระบบ</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}