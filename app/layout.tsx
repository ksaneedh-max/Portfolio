import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kontham Siva Nagendra Prasad | AI & Machine Learning Engineer",
  description: "Portfolio of Kontham Siva Nagendra Prasad - B.Tech CSE (AI & ML) student at SRM IST. AI Engineer, Machine Learning Specialist, Computer Vision Developer.",
  keywords: [
    "Kontham Siva Nagendra Prasad",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "SRM IST",
    "Deepfake Detection",
    "YOLOv8",
    "TensorFlow",
    "Software Developer Portfolio"
  ],
  authors: [{ name: "Kontham Siva Nagendra Prasad" }],
  openGraph: {
    title: "Kontham Siva Nagendra Prasad | AI & Machine Learning Engineer",
    description: "I build AI-powered applications, intelligent computer vision systems, and scalable software solutions with a focus on solving real-world problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontham Siva Nagendra Prasad | AI Engineer",
    description: "AI & ML Engineer portfolio featuring Deepfake Detection, Computer Vision, and Full Stack applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-blue-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
