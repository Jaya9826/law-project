import fs from 'fs';
import path from 'path';

// Sync the images on Next.js startup / config reload
try {
  const images = [
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\.user_uploaded\\media_1787663306267.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\hero_lawyer.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\business_law_1787656628514.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\business_law.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\family_law_1787656652975.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\family_law.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\criminal_law_1787656672977.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\criminal_law.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589257086.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_entrance_chambers.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589242439.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_cabin_main.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589249488.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_cabin_desk.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589264392.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_legal_archives.jpg" },
    { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589273009.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_consultation_lounge.jpg" }
  ];

  images.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      console.log(`[Config Sync] Successfully copied ${path.basename(dest)} to public folder!`);
    }
  });
} catch (error) {
  console.error("Failed to copy images in next.config.mjs:", error);
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
