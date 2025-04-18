"use client";

import { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaUniversity, FaGavel, FaBook, FaFlag } from 'react-icons/fa';

import Banner from '../../assets/images/banner.png';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HistoryPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const timelineEvents = [
    { year: "2495", title: "ผู้แทนนิสิตคนแรก", icon: <FaFlag /> },
    {
      year: "2519",
      title: "เหตุการณ์ 6 ตุลา",
      description: "เหตุการณ์สังหารหมู่ที่ ม.ธรรมศาสตร์ ทำให้ตอนนั้นไม่มีวาระแสดงตนให้องค์กรนิสิตทั้งหมด",
      icon: <FaGavel />,
      highlight: true,
    },
    { year: "2520", title: "เรียกร้องให้องค์กรนิสิตกลับมา", icon: <FaBook /> },
    { year: "2522", title: "มีการเลือกตั้งองค์กรนิสิตครั้งแรก", icon: <FaBook /> },
    { year: "2523", title: "มีธรรมนูญนิสิตฉบับแรก", icon: <FaUniversity /> },
  ];

  const sections = [
    {
      title: "สิทธิและเสรีภาพของนิสิต",
      description:
        "นิสิตมีสิทธิและเสรีภาพเท่าเทียมกันในการเสนอเรื่องราวและความคิดเห็นต่อสมาชิกสภาผู้แทนนิสิตฯ องค์การบริหารฯ รวมไปถึงเรื่องราวร้องทุกข์ต่อสภาผู้แทนนิสิต",
      bg: "bg-green-50",
      text: "text-green-900",
      aos: "fade-right",
    },
    {
      title: "หน้าที่ของนิสิต",
      description:
        "รักษา สร้างชื่อเสียง และเกียรติคุณสู่มหาวิทยาลัยเกษตรศาสตร์\nศึกษาความรู้อย่างเต็มความสามารถ\nให้ความร่วมมือต่อการดำเนินงานขององค์การนิสิต การไปเลือกตั้งคณะกรรมการองค์การบริหารฯ และสมาชิกสภาฯ",
      bg: "bg-yellow-50",
      text: "text-yellow-900",
      aos: "fade-left",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Nav />

      {/* Banner */}
      <Image
        src={Banner}
        alt="Banner"
        className="w-full object-cover h-80 md:h-96"
        data-aos="fade-up"
      />

      {/* Title */}
      <div className="py-12">
        <h1
          className="text-center text-3xl md:text-4xl font-bold text-primary tracking-tight"
          data-aos="fade-up"
        >
          ประวัติองค์การนิสิต
        </h1>
      </div>

      {/* Timeline */}
      <VerticalTimeline>
        {timelineEvents.map((event, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={`พ.ศ. ${event.year}`}
            icon={event.icon}
            iconStyle={{ background: "#2563eb", color: "#fff" }}
            contentStyle={{
              background: event.highlight ? "#fff7ed" : "#f3f4f6",
              color: "#111827",
              borderRadius: "1rem",
              boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
            }}
            contentArrowStyle={{ borderRight: '7px solid #f3f4f6' }}
            dateClassName="text-xl font-semibold text-primary"
          >
            <h3 className="font-bold text-lg mb-1">{event.title}</h3>
            {event.description && (
              <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Subtitle */}
      <h2
        className="text-primary text-center text-2xl md:text-3xl font-bold my-10"
        data-aos="fade-up"
      >
        สิทธิ เสรีภาพ และหน้าที่ของนิสิต
      </h2>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 md:px-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${section.bg} p-6 rounded-3xl shadow-lg`}
            data-aos={section.aos}
          >
            <h3 className={`text-xl font-semibold mb-2 ${section.text}`}>{section.title}</h3>
            <p className="text-gray-700 whitespace-pre-line text-balance leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
