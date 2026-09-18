import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain';
    const oldBrain = path.join(brainDir, '812da530-70df-4cde-8179-a3f548cee6c4', '.user_uploaded');
    const newBrain = path.join(brainDir, '3070297f-0b19-43e0-8f85-200f11c7e1da', '.user_uploaded');
    const destDir = path.join(process.cwd(), 'public', 'gallery');

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const mapping = [
      { src: path.join(oldBrain, 'media_1788589257086.jpg'), dest: 'office_entrance_chambers.jpg' },
      { src: path.join(oldBrain, 'media_1788589242439.jpg'), dest: 'office_cabin_main.jpg' },
      { src: path.join(oldBrain, 'media_1788589249488.jpg'), dest: 'office_cabin_desk.jpg' },
      { src: path.join(oldBrain, 'media_1788589264392.jpg'), dest: 'office_legal_archives.jpg' },
      { src: path.join(oldBrain, 'media_1788589273009.jpg'), dest: 'office_consultation_lounge.jpg' },
      { src: path.join(newBrain, 'media_1788591935865.jpg'), dest: 'office_justice_chamber_door.jpg' },
      { src: path.join(newBrain, 'media_1788591944797.jpg'), dest: 'office_consultation_desk.jpg' },
    ];

    const results = [];
    for (const item of mapping) {
      const destPathGallery = path.join(destDir, item.dest);
      const destPathRoot = path.join(process.cwd(), 'public', item.dest);
      if (fs.existsSync(item.src)) {
        fs.copyFileSync(item.src, destPathGallery);
        fs.copyFileSync(item.src, destPathRoot);
        const stats = fs.statSync(destPathGallery);
        results.push({ name: item.dest, size: stats.size, status: 'copied' });
      } else {
        results.push({ name: item.dest, status: 'source_not_found', src: item.src });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
