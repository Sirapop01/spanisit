// src/app/api/delete/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/config/cloudinary';

export async function POST(req) {
  try {
    const { public_ids } = await req.json();

    if (!public_ids || public_ids.length === 0) {
      return NextResponse.json({ error: 'No public_ids provided' }, { status: 400 });
    }

    // แยก resource_type ตาม path
    const image_ids = public_ids.filter(id => id.startsWith('images/')).map(id => id);
    const raw_ids = public_ids.filter(id => id.startsWith('documents/')).map(id => id);

    const deletionPromises = [];

    if (image_ids.length > 0) {
      deletionPromises.push(
        cloudinary.api.delete_resources(image_ids, { resource_type: 'image' })
      );
    }

    if (raw_ids.length > 0) {
      deletionPromises.push(
        cloudinary.api.delete_resources(raw_ids, { resource_type: 'raw' })
      );
    }

    await Promise.all(deletionPromises);

    return NextResponse.json({ message: 'Files deleted successfully' });

  } catch (error) {
    console.error('Deletion Error:', error);
    return NextResponse.json({ error: 'Deletion failed', details: error.message }, { status: 500 });
  }
}