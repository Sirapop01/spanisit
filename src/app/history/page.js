"use client";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaUniversity, FaGavel, FaBook, FaFlag } from 'react-icons/fa';

import Banner from '../../assets/images/banner.png';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function HistoryPage() {

  useEffect(() => {
    AOS.init({ duration: 1000 }); // กำหนดเวลาในการเคลื่อนไหว
    AOS.refresh(); // รีเฟรช AOS หลังจากที่ component render เสร็จ
  }, []);

  const timelineEvents = [
    {
      year: "2495",
      title: "ผู้แทนนิสิตคนแรก",
      icon: <FaFlag />,
    },
    {
      year: "2519",
      title: "เหตุการณ์ 6 ตุลา",
      description: "เหตุการณ์สังหารหมู่ที่ ม.ธรรมศาสตร์ ทำให้ตอนนั้นไม่มีวาระแสดงตนให้องค์กรนิสิตทั้งหมด",
      icon: <FaGavel />,
      highlight: true,
    },
    {
      year: "2520",
      title: "เรียกร้องให้องค์กรนิสิตกลับมา",
      icon: <FaBook />,
    },
    {
      year: "2522",
      title: "มีการเลือกตั้งองค์กรนิสิตครั้งแรก",
      icon: <FaBook />,
    },
    {
      year: "2523",
      title: "มีธรรมนูญนิสิตฉบับแรก",
      icon: <FaUniversity />,
    },
  ];

  return (
    <div>
      <Nav />
      <Image
        src={Banner}
        alt="Banner"
        className="w-full object-cover h-120"
        data-aos="fade-up" // กำหนดให้เกิดการค่อยๆ ขึ้นมา
      />
      <div className="py-10">
        <h1 className="text-center text-3xl font-bold mb-10 text-primary" data-aos="fade-up">ประวัติองค์กรนิสิต</h1>
        <VerticalTimeline >
          {timelineEvents.map((event, idx) => (
            <VerticalTimelineElement 
              key={idx}
              date={`พ.ศ. ${event.year}`}
              dateClassName="text-2xl font-bold text-primary"
              icon={event.icon}
              iconStyle={{ background: "#2563eb", color: "#fff" }}
              contentStyle={{
                background: event.highlight ? "#fff7ed" : "#f3f4f6",
                color: "#111827",
              }}
              contentArrowStyle={{ borderRight: '7px solid #f3f4f6' }}
            >
              <h3 className="font-bold">{event.title}</h3>
              {event.description && <p>{event.description}</p>}
            </VerticalTimelineElement>

          ))}
        </VerticalTimeline>
      </div>
      
      <h1 className="text-primary text-center text-3xl md:text-4xl font-bold my-8" data-aos="fade-up">
        ธรรมนูญนิสิต
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 md:p-10 bg-white shadow-md rounded-2xl" data-aos="fade-up">
        {/* Box 1 */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm" data-aos="fade-right">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">ชื่อเต็มของธรรมนูญนิสิต</h2>
          <p className="text-gray-700 leading-relaxed">
            ข้อบังคับมหาวิทยาลัยเกษตรศาสตร์ว่าด้วยธรรมนูญนิสิตมหาวิทยาลัยเกษตรศาสตร์ พ.ศ. 2560
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-orange-50 p-6 rounded-xl shadow-sm" data-aos="fade-left">
          <h2 className="text-xl font-semibold mb-2 text-orange-900">ธรรมนูญนิสิตคืออะไร?</h2>
          <p className="text-gray-700 leading-relaxed">
            ธรรมนูญนิสิต คือข้อบังคับหนึ่งของมหาวิทยาลัย ที่ให้สิทธิและเสรีภาพนิสิตได้อยู่ในรูปแบบการปกครองตนเอง
            เนื่องจากธรรมนูญถูกร่างโดยนิสิตและเพื่อนิสิตในมหาวิทยาลัย
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 md:p-10 bg-white shadow-md rounded-2xl mt-10 mb-10" data-aos="fade-up">
        {/* สิทธิและเสรีภาพของนิสิต */}
        <div className="bg-green-50 p-6 rounded-xl shadow-sm" data-aos="fade-right" >
          <h2 className="text-xl font-semibold mb-2 text-green-900">สิทธิและเสรีภาพของนิสิต</h2>
          <p className="text-gray-700 leading-relaxed">
            นิสิตมีสิทธิและเสรีภาพเท่าเทียมกันในการเสนอเรื่องราวและความคิดเห็นต่อสมาชิกสภาผู้แทนนิสิตฯ,
            องค์การบริหารฯ รวมไปถึงเรื่องราวร้องทุกข์ต่อสภาผู้แทนนิสิต
          </p>
        </div>

        {/* หน้าที่ของนิสิต */}
        <div className="bg-yellow-50 p-6 rounded-xl shadow-sm" data-aos="fade-left" >
          <h2 className="text-xl font-semibold mb-2 text-yellow-900">หน้าที่ของนิสิต</h2>
          <p className="text-gray-700 leading-relaxed">
            รักษา สร้างชื่อเสียง และเกียรติคุณสู่มหาวิทยาลัยเกษตรศาสตร์<br />
            ศึกษาความรู้อย่างเต็มความสามารถ<br />
            ให้ความร่วมมือต่อการดำเนินงานขององค์การนิสิต การไปเลือกตั้งคณะกรรมการองค์การบริหารฯ และสมาชิกสภาฯ
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
