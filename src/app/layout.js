import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";
import Providers from "./chakra-providers";
import StoreProvider from "./store-provider";
import fs from "fs";
import path from "path";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const metadata = {
  title: "Justica | Counselors at Law",
  description: "Providing legal representation and counsel to safeguard your rights. Navigate complex legal challenges with unwavering dedication.",
};

export default function RootLayout({ children }) {
  // Sync the images on every request to ensure they are up to date
  try {
    const images = [
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\.user_uploaded\\media_1787663306267.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\hero_lawyer.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\business_law_1787656628514.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\business_law.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\family_law_1787656652975.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\family_law.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\25c22425-4993-484a-93e7-b460c3f60980\\criminal_law_1787656672977.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\criminal_law.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\experience_attorney_1788254193996.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\experience_attorney.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\team_lawyer_1_1788254569650.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\team_lawyer_1.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\team_lawyer_3_1788254589110.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\team_lawyer_3.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\news_globe_1788254964096.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\news_1.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\news_courthouse_1788254987556.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\news_2.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\parallax_scales_1788255287115.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\parallax_scales.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\indian_advocate_library_1788267653539.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\indian_advocate_library.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\hero_lawyer_library_1788267875969.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\hero_lawyer_library.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\9f38119c-fd45-499b-9a95-c3bc47821d8f\\supreme_court_india_1788268629182.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\supreme_court_india.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589257086.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_entrance_chambers.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589242439.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_cabin_main.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589249488.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_cabin_desk.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589264392.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_legal_archives.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\812da530-70df-4cde-8179-a3f548cee6c4\\.user_uploaded\\media_1788589273009.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_consultation_lounge.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\3070297f-0b19-43e0-8f85-200f11c7e1da\\.user_uploaded\\media_1788591935865.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_justice_chamber_door.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\3070297f-0b19-43e0-8f85-200f11c7e1da\\.user_uploaded\\media_1788591944797.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\gallery\\office_consultation_desk.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\3070297f-0b19-43e0-8f85-200f11c7e1da\\footer_courthouse_columns_1788616214843.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\footer_courthouse_columns.jpg" },
      { src: "C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\ee5ff968-f30c-48e0-9bae-71024ec79afc\\careers_hero_bg_1789456448195.jpg", dest: "c:\\Users\\jaya jat\\Desktop\\next-js-my-project\\public\\careers_mentorship_bg.jpg" }
    ];

    images.forEach(({ src, dest }) => {
      if (fs.existsSync(src)) {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
      }
    });
  } catch (error) {
    console.error("Failed to copy images dynamically:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfair.variable} ${alexBrush.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <Providers>
            {children}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
