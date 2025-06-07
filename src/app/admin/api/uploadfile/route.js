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
      const fileNameWithExtension = imageNames[index]?.toString();
      // ✨ **แก้ไขจุดนี้:** ใช้ชื่อไฟล์ที่ "ไม่มีนามสกุล" เป็น public_id
      // Cloudinary จะจัดการนามสกุลใน URL ให้เองเมื่อ resource_type ถูกต้อง
      const publicId = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf('.'));
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        // ✨ **แก้ไขจุดนี้:** กลับมาใช้ `upload_stream` ที่ถูกต้องสำหรับ Buffer
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
        ).end(buffer); // ส่ง buffer เข้าที่ .end()
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
    // ส่ง error ที่เป็น object กลับไปเพื่อดูรายละเอียดได้ง่ายขึ้น
    return NextResponse.json({ 
        error: 'Upload failed', 
        details: error.message,
        code: error.code 
    }, { status: 500 });
  }
}