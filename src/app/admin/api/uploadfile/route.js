// src/app/admin/api/uploadfile/route.js

import { NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file');
    const imageNames = formData.getAll('imageName'); 
    const type = formData.get('type') || 'documents';
    const year = formData.get('year');

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const folderParts = ['documents', type, year];
    const folder = folderParts.filter(part => part).join('/');

    const uploadPromises = files.map(async (file, index) => {
      const publicId = imageNames[index]?.toString().split('.').slice(0, -1).join('.');
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            public_id: publicId,
            resource_type: 'raw', // ใช้ 'raw' สำหรับไฟล์ที่ไม่ใช่รูปภาพ เช่น PDF
            // ตั้งค่าให้ไฟล์เปิดแบบ inline
            transformation: [{ flags: "attachment:inline" }]
          },
          (err, res) => {
            if (err) return reject(err);
            resolve(res);
          }
        );
        uploadStream.end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: 'Upload successful',
      results: results.map(res => ({
        url: res.secure_url,
        public_id: res.public_id,
      })),
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ 
        error: 'Upload failed', 
        details: error.message,
        code: error.code 
    }, { status: 500 });
  }
}