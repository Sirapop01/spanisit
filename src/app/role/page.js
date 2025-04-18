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
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
            <Navbar />

            {/* Banner */}
            <Image
                src={Banner}
                alt="Banner"
                className="w-full object-cover h-[300px]"
                data-aos="fade-up"
            />

            {/* Main Section */}
            <div className="w-full flex justify-center py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">

                    {/* ฝั่งซ้าย */}
                    <div
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    >
                        <h2 className="font-bold text-2xl text-primary text-center mb-6 border-b-4 border-secondary pb-2">
                            {data[0].title}
                        </h2>
                        <ul className="list-decimal list-inside space-y-5 text-gray-700 leading-relaxed px-2">
                            {data[0].discriptions.map((desc, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <span className="font-bold min-w-[2rem] text-primary">
                                        {index + 1}.
                                    </span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ฝั่งขวา */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="100"
                        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                    >
                        <h2 className="font-bold text-2xl text-primary text-center mb-6 border-b-4 border-secondary pb-2">
                            {data[1].title}
                        </h2>
                        <ul className="list-decimal list-inside space-y-5 text-gray-700 leading-relaxed px-2">
                            {data[1].discriptions.map((desc, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <span className="font-bold min-w-[2rem] text-primary">
                                        {index + 1}.
                                    </span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div data-aos="fade-up" data-aos-duration="500">
                <Footer />
            </div>
        </div>
    );
}
