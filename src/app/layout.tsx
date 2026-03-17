import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://israelis.nl"),
  title: {
    default: "israelis.nl — חדשות הולנד בעברית",
    template: "%s | israelis.nl",
  },
  description: "פורטל החדשות בעברית לקהילה הישראלית בהולנד. חדשות מקומיות, עדכונים קהילתיים ומידע שימושי.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "israelis.nl",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[var(--color-bg)] min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:right-0 focus:bg-[var(--color-primary)] focus:text-white focus:p-3 focus:z-[100]">
          דלג לתוכן הראשי
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
