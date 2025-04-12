'use client';

import Nav from '../component/nav';
import Footer from '../component/footer';

export default function Timeline() {

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* เนื้อหาหลัก */}
      <div className="flex-grow text-7xl flex justify-center mt-10 text-white font-bold">
        Hello Timeline
      </div>

      <Footer />
    </div>

  );
}

