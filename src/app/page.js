'use client';
import { useState } from 'react';

export default function Timeline() {
  const timelineData = [
    { date: "2023-01-01", title: "เหตุการณ์ 1", description: "รายละเอียดของเหตุการณ์ที่เกิดขึ้นในวันนั้น" },
    { date: "2023-02-15", title: "เหตุการณ์ 2", description: "รายละเอียดเพิ่มเติมเกี่ยวกับเหตุการณ์ที่สอง" },
    { date: "2023-03-25", title: "เหตุการณ์ 3", description: "ข้อมูลที่เกี่ยวข้องกับเหตุการณ์ที่สาม" },
    { date: "2023-05-30", title: "เหตุการณ์ 4", description: "ข้อความที่อธิบายเหตุการณ์ที่เกิดขึ้นในช่วงเวลานี้" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Timeline ของเหตุการณ์สำคัญ</h2>
      <div className="relative border-l-4 border-blue-500 pl-6">
        {timelineData.map((item, index) => (
          <div key={index} className="mb-8">
            <div className="absolute -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{index + 1}</span>
            </div>
            <div className="ml-12">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

