// src/app/admin/api/uploadfile/route.js (ฉบับแก้ไข)

import { NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file');
    const imageNames = formData.getAll('imageName'); // ชื่่อไฟล์ที่รวมนามสกุลแล้ว
    const type = formData.get('type') || 'documents';
    const year = formData.get('year');

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const folderParts = ['documents', type, year];
    const folder = folderParts.filter(part => part).join('/');

    const uploadPromises = files.map(async (file, index) => {
      // ✨ **แก้ไขจุดนี้:** ใช้ชื่อไฟล์พร้อมนามสกุลเป็น public_id โดยตรง
      const publicId = imageNames[index]?.toString();
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: folder,
            public_id: publicId,
            resource_type: 'raw',
          },
          (err, res) => {
            if (err) return reject(err);
            resolve(res);
          }
        ).end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    // URL ที่ได้จากตรงนี้จะมีนามสกุลไฟล์ที่ถูกต้องแล้ว
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