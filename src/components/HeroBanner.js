'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Banner from '@/assets/images/banner.png';
import { getAllAnnouncements } from '@/services/announcementService';
import { Icon } from '@iconify/react';

export default function HeroBanner() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const res = await getAllAnnouncements();
            if (res.success) {
                setAnnouncements(res.data.slice(0, 5)); // แสดง 5 รายการล่าสุด
            }
            setLoading(false);
        };
        fetchAnnouncements();
    }, []);

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] text-white overflow-hidden">
            {/* Background Image */}
            <Image
                src={Banner}
                alt="Banner สภาผู้แทนนิสิต"
                layout="fill"
                objectFit="cover"
                className="z-0"
                priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto p-6 md:p-12 flex items-center">
                <div className="w-full bg-black/50 backdrop-blur-sm p-8 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Icon icon="mdi:bullhorn-variant-outline" className="w-8 h-8 text-secondary" />
                        <h2 className="text-xl font-bold">ประกาศล่าสุด</h2>
                    </div>

                    {!loading && announcements.length > 0 ? (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            navigation={true}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Navigation, Pagination]}
                            className="w-full h-full"
                        >
                            {announcements.map((item) => (
                                <SwiperSlide key={item.id}>
                                    {/* ✅  (แก้ไข) เพิ่มเงื่อนไขการแสดงผลที่นี่ */}
                                    {item.imageUrl ? (
                                        // 1. กรณีมีรูปภาพ: แสดงแบบ 2 คอลัมน์
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                            <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="object-center"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h3 className="text-xl md:text-3xl font-bold mb-3 text-white">{item.title}</h3>
                                                <p className="text-sm md:text-lg text-gray-300 line-clamp-3 md:line-clamp-5 mb-4">{item.details}</p>
                                                {item.link && (
                                                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                                        <span className="text-sm font-semibold text-primary hover:text-secondary-dark transition-colors">
                                                            อ่านเพิ่มเติม <Icon icon="mdi:arrow-right" className="inline-block w-5 h-5" />
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        // 2. กรณีไม่มีรูปภาพ: แสดงแบบข้อความล้วน
                                        <div className="flex flex-col justify-center items-center text-center h-full px-4 md:px-10">
                                            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">{item.title}</h3>
                                            <p className="text-md md:text-xl text-gray-200 line-clamp-4 md:line-clamp-5 max-w-3xl mb-6">{item.details}</p>
                                            {item.link && (
                                                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                                    <span className="text-md font-semibold text-primary hover:text-secondary-dark transition-colors px-4 py-2 bg-white/20 rounded-lg">
                                                        อ่านเพิ่มเติม <Icon icon="mdi:arrow-right" className="inline-block" />
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        !loading && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-lg text-center text-gray-300">ไม่มีประกาศใหม่ในขณะนี้</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}