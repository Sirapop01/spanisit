// src/components/SlideCard.js

import Link from 'next/link'
import Image from 'next/image'

export default function SlideCard({ slide, index }) {
  return (
    // ✅ (แก้ไข) ทำให้ Card กินพื้นที่เต็ม และปรับสไตล์ให้เข้ากับ Coverflow
    <Link href={slide.path || '/'} passHref>
      <div className="relative w-full h-full group cursor-pointer">
        {/* รูปภาพ */}
        <Image
          src={slide.image}
          alt={`slide-${index}`}
          layout="fill"
          className="object-cover rounded-lg"
        />

        {/* Overlay ที่จะแสดงเมื่อ hover */}
        <div className="absolute inset-0 bg-black/50 flex items-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-semibold">
            {slide.caption}
          </p>
        </div>
      </div>
    </Link>
  )
}