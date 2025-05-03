import { NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file');
    const imageNames = formData.getAll('imageName');
    const type = formData.get('type') || 'others'; 
    const year = formData.get('year');
    const categoryName = formData.get('categoryName');

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const folderParts = ['images'];
    if (type) folderParts.push(type);
    if (year) folderParts.push(year);
    if (categoryName) folderParts.push(categoryName);
    const folder = folderParts.join('/');

    const uploadPromises = files.map(async (file, index) => {
      const imageName = (imageNames[index]?.toString() || `image-${index + 1}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: imageName,
            resource_type: 'image',
          },
          (err, res) => {
            if (err) return reject(err);
            resolve(res);
          }
        ).end(buffer);
      })
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
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
