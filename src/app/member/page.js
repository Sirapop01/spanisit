'use client';

import { useEffect } from 'react';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import Banner from '../../assets/images/banner.png';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Timeline() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <Image
                src={Banner}
                alt="Banner"
                className="w-full object-cover"
                data-aos="fade-up"
            />
            <div className="px-4 py-12 max-w-6xl mx-auto space-y-12 text-center">
                {/* ปีการศึกษา + Dropdown */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-primary">
                        ทำเนียบสภาฯ ประจำปีการศึกษา 
                    </h2>
                    <select className="mt-2 md:mt-0 border border-gray-300 rounded px-4 py-2 text-primary">
                        <option>25xx</option>
                        <option>25xx</option>
                        <option>25xx</option>
                    </select>
                </div>

                {/* ประธาน */}
                <div>
                    <h3 className="text-lg font-semibold text-secondary mb-4">ประธานสภานิสิต</h3>
                    <div className="mx-auto w-60 h-60 bg-gray-200 rounded shadow" />
                </div>

                {/* ฝ่ายบริหาร และ รองประธาน (4 col) */}
                <div>
                    <h3 className="text-lg font-semibold text-secondary mb-6">ฝ่ายบริหาร และ รองประธาน</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {['นาย ก', 'นาย ข', 'นาย ค', 'นาย ง', 'นาย จ', 'นาย ฉ'].map((name, idx) => (
                            <div key={idx} className="bg-gray-200 aspect-square rounded shadow flex items-end justify-center p-2">
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ประธานคณะกรรมการ 6 ฝ่าย */}
                <div>
                    <h3 className="text-lg font-semibold text-orange-500 mb-6">คณะกรรมการบริการ 6 ฝ่าย</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['องค์การบริหาร', 'สาขาอนุ', 'กฎหมาย', 'กิจกรรม', 'PR', 'นักกีฬา'].map((name, idx) => (
                            <div key={idx} className="bg-gray-200 aspect-square rounded shadow flex items-end justify-center p-2">
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* คณะกรรมการ 6 ฝ่าย */}
                <div>
                    <h3 className="text-lg font-semibold text-orange-500 mb-6">คณะกรรมการบริการ 6 ฝ่าย</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['องค์การบริหาร', 'สาขาอนุ', 'กฎหมาย', 'กิจกรรม', 'PR', 'นักกีฬา'].map((name, idx) => (
                            <div key={idx} className="bg-gray-200 aspect-square rounded shadow flex items-end justify-center p-2">
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div data-aos="fade-up">
                <Footer />
            </div>
        </div>
    );
}
