import Link from 'next/link'
import Image from 'next/image'

export default function SlideCard({ slide, index }) {
  return (
    <div
      className="
        relative aspect-square w-full 
        max-w-[200px] md:max-w-none 
        group mx-auto 
        transition-all duration-300 
        md:hover:w-[110%]
      "
    >
      <Link href={`/history/${slide.id}`} passHref>
        <div className="relative w-full h-full cursor-pointer group">
          <Image
            src={slide.image}
            alt={`slide-${index}`}
            fill
            className="object-cover rounded-lg"
          />

          {/* Overlay */}
          <div
            className="
              absolute inset-0 bg-black/40 
              flex items-end rounded-lg 
              opacity-100 
              lg:opacity-0 lg:group-hover:opacity-100 
              transition-opacity duration-300 
              z-10
            "
          >
            <p className="text-white/70 lg:text-white text-sm pl-4 pb-3">
              {slide.caption}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
