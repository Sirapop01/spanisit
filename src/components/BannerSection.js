'use client'

import Image from 'next/image'
import Banner from '@/assets/images/banner.png'

export default function BannerSection({ className = '' }) {
  return (
    <div data-aos="fade-up" className={`w-full overflow-hidden ${className}`}>
      <Image
        src={Banner}
        alt="Banner"
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  )
}
