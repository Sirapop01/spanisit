'use client';

import Navbar from '@/components/nav';
import BannerSection from '@/components/BannerSection';
import Footer from '@/components/footer';
import { rulesData } from '../../data/rulesData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Icon } from '@iconify/react';

export default function RegulationPage() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <BannerSection data-aos="fade-up" />

            <div className="w-full flex justify-center py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
                    {rulesData.map((data, index) => (
                        <div key={index} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay="100" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="font-bold text-2xl text-primary text-center mb-6 border-b-4 border-secondary pb-2">
                                {data.title}
                            </h2>
                            <ul className="space-y-2">
                                {data.files.map((file, fileIndex) => (
                                    <li key={fileIndex} className="border-b last:border-b-0">
                                        <a
                                            href={file.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 rounded-md hover:bg-sky-50 transition duration-200 text-secondary hover:text-primary"
                                        >
                                            <span>{file.name}</span>
                                            {/* เปลี่ยนไอคอนเป็น "เปิดในแท็บใหม่" */}
                                            <Icon icon="mdi:open-in-new" className="text-2xl text-secondary hover:text-primary" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="500">
                <Footer />
            </div>
        </div>
    );
}