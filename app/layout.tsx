import type { Metadata } from "next";
import "./globals.css";
import { SiteConfigProvider } from "./context/SiteConfigContext";

export const metadata: Metadata = {
  title: "Excellence Academy - Shaping Future Leaders",
  description: "Excellence Academy is a premier educational institution dedicated to nurturing young minds and building future leaders through quality education and holistic development.",
  keywords: "school, education, academy, learning, students, admissions, excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteConfigProvider>
          {children}
        </SiteConfigProvider>
      </body>
    </html>
  );
}
