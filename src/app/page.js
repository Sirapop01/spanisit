'use client';

import { useEffect } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ImageSlider from "../components/ImageSlider";
import Banner from '../assets/images/banner.png';
import Image from 'next/image';
import slides from "../data/SlidetData";
import AOS from 'aos';
import 'aos/dist/aos.css';  // อย่าลืมนำเข้า AOS CSS

export default function Timeline() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // กำหนดเวลาในการเคลื่อนไหว
    AOS.refresh(); // รีเฟรช AOS หลังจากที่ component render เสร็จ
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Image
        src={Banner}
        alt="Banner"
        className="w-full object-cover"
        data-aos="fade-up" // กำหนดให้เกิดการค่อยๆ ขึ้นมา
      />
      <ImageSlider slides={slides} aos="fade-up"/>
      <div data-aos="fade-up">
        <Footer />
      </div>
    </div>
  );
}
