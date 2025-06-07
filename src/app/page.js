'use client';
import ImageSlider from "@/components/ImageSlider";
import Nav from "@/components/nav"
import Footer from "@/components/footer";
import HeroBanner from "@/components/HeroBanner";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ เพิ่มการ import ข้อมูล slides กลับเข้ามา
import slides from "@/data/SlidetData";

export default function Home() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div>
            <Nav />
            <HeroBanner />
            
            {/* ✅ แก้ไขโดยการเพิ่ม prop 'slides' กลับเข้าไป */}
            <ImageSlider slides={slides} />
            
            <Footer />
        </div>
    )
}