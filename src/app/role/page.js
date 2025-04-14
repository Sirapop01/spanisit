'use client';

import Navbar from '@/components/nav';
import Banner from '../../assets/images/banner.png';
import Image from 'next/image';
import Footer from '@/components/footer';
import data from '../../data/RoleData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RolePage() {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // กำหนดเวลาในการเคลื่อนไหว
        AOS.refresh(); // รีเฟรช AOS หลังจากที่ component render เสร็จ
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Image
                src={Banner}
                alt="Banner"
                className="w-full object-cover h-100"
                data-aos="fade-up" // กำหนดให้เกิดการค่อยๆ ขึ้นมา
            />
            <div className="w-full flex justify-center bg-white py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full text-black">
                    {/* ฝั่งซ้าย */}
                    <div data-aos="fade-right" 
                        data-aos-duration="1000"
                        data-aos-delay="100"
                        data-aos-easing="ease-in-out"
                        >
                        <h2 className="font-bold text-xl text-center text-primary mb-6 border-b-4 border-secondary pb-2">
                            {data[0].title}
                        </h2>
                        <ul className="list-decimal list-inside space-y-6 text-justify leading-relaxed px-4">
                            {data[0].discriptions.map((desc, index) => (
                                <li key={index} className="flex items-start gap-2 leading-relaxed">
                                    <span className="min-w-[2rem] font-bold">{index + 1}.</span>
                                    <span className="text-justify">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ฝั่งขวา */}
                    <div data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                        data-aos-easing="ease-in-out"
                        >
                        <h2 className="font-bold text-xl text-center text-primary mb-6 border-b-4 border-secondary pb-2">
                            {data[1].title}
                        </h2>
                        <ul className="list-decimal list-inside space-y-6 text-justify leading-relaxed px-4">
                            {data[1].discriptions.map((desc, index) => (
                                <li key={index} className="flex items-start gap-2 leading-relaxed">
                                    <span className="min-w-[2rem] font-bold">{index + 1}.</span>
                                    <span className="text-justify">{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up"
            data-aos-duration="500"
            >
                <Footer />
            </div>
        </div>
    );
}