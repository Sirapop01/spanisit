'use client';

import Navbar from '@/components/nav';
import BannerSection from '@/components/BannerSection';
import Footer from '@/components/footer';
import { getDocuments } from '@/services/regulationsServices';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon } from '@iconify/react';

export default function RegulationPage() {
    const [documents, setDocuments] = useState({ rules: [], constitutions: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();

        const fetchDocuments = async () => {
            setIsLoading(true);
            const response = await getDocuments();
            if (response.success) {
                setDocuments({
                    rules: response.data.rules || [],
                    constitutions: response.data.constitutions || [],
                });
            } else {
                console.error("Failed to fetch documents:", response.error);
            }
            setIsLoading(false);
        };

        fetchDocuments();
    }, []);

    const renderDocumentList = (docs, title) => {
        if (isLoading) {
            return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
        }
        if (docs.length === 0) {
            return <p className="text-center text-gray-500">ยังไม่มีเอกสารในหมวดหมู่ {title}</p>;
        }

        const groupedByYear = docs.reduce((acc, doc) => {
            (acc[doc.year] = acc[doc.year] || []).push(doc);
            return acc;
        }, {});

        return Object.keys(groupedByYear)
            .sort((a, b) => b - a)
            .map(year => (
                <div key={year} className="mb-6">
                    <h3 className="font-semibold text-lg text-secondary mb-3">ปีการศึกษา {year}</h3>
                    <ul className="space-y-2">
                        {groupedByYear[year].map(doc => (
                            <li key={doc.id} className="border-b last:border-b-0">
                                <a
                                    // ✨ ไม่ต้องแก้ไข URL ที่นี่แล้ว
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-md hover:bg-sky-50 transition duration-200 text-secondary hover:text-primary"
                                >
                                    <span>{doc.title}</span>
                                    <Icon icon="mdi:open-in-new" className="text-2xl text-secondary hover:text-primary" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <BannerSection data-aos="fade-up" />

            <div className="w-full flex justify-center py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
                    {/* ฝั่งซ้าย - ระเบียบ */}
                    <div data-aos="fade-right" data-aos-delay="100" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="font-bold text-2xl text-primary text-center mb-6 border-b-4 border-secondary pb-2">
                            ระเบียบสภาผู้แทนนิสิตฯ
                        </h2>
                        {renderDocumentList(documents.rules, "ระเบียบ")}
                    </div>

                    {/* ฝั่งขวา - ธรรมนูญ */}
                    <div data-aos="fade-left" data-aos-delay="100" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="font-bold text-2xl text-primary text-center mb-6 border-b-4 border-secondary pb-2">
                            ธรรมนูญสภาผู้แทนนิสิตฯ
                        </h2>
                        {renderDocumentList(documents.constitutions, "ธรรมนูญ")}
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="500">
                <Footer />
            </div>
        </div>
    );
}