// ❌ ไม่ต้องมี 'use client'

import slides from '../../../data/SlidetData'; // ปรับ path ให้ถูก
import Image from 'next/image';
import Nav from '../../../components/nav'; // ปรับ path ให้ถูก

export default function HistoryPage({ params }) {
  const { id } = params;
  const currentSlide = slides.find((slide) => slide.id === parseInt(id));

  if (!currentSlide) {
    return <div className="text-center mt-10">ไม่พบข้อมูล</div>;
  }

  return (
    <div>
      <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{currentSlide.caption}</h1>
        <Image
          src={currentSlide.image}
          alt={currentSlide.caption}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <p className="mt-4 text-black">{currentSlide.caption}</p>
      </div>
    </div>
  );
}
