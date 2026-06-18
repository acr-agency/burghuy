import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/features/CookieConsent/CookieConsent";
import YandexMetrika from "@/components/shared/YandexMetrika";

const siteUrl = "https://xn--73-9kcup4buc.xn--p1ai";
const siteName = "Буржуй";
const siteDescription = "БУРЖУЙ — организация уникальных событий и мероприятий. Искусство создания незабываемых моментов.";

export const metadata: Metadata = {
  // Базовые метаданные
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Буржуй",
  },
  description: siteDescription,
  
  // Канонический URL
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
    },
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Буржуй",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image__Universal_OG_1200x630__1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Буржуй — организация уникальных событий и мероприятий",
        type: "image/jpeg",
        secureUrl: `${siteUrl}/og-image__Universal_OG_1200x630__1200x630.jpg`,
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image__Twitter_X_Large_1200x675__1200x675.jpg",
        alt: "Буржуй — организация уникальных событий и мероприятий",
        width: 1200,
        height: 675,
      },
    ],
    // Если есть Twitter аккаунт - раскомментировать:
    // site: "@burzhuy",
    // creator: "@burzhuy",
  },
  
  // Иконки
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  
  // Манифест
  manifest: "/manifest.json",
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    title: "Буржуй",
    statusBarStyle: "black-translucent",
  },
  
  // SEO
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
 
  
  // Категория
  category: "event planning",
  
  // Ключевые слова
  keywords: [
    "организация мероприятий",
    "событийный маркетинг",
    "праздники",
    "корпоративы",
    "искусство событий",
    "event agency",
    "Буржуй",
    "империя событий",
    "мероприятия под ключ",
  ],
  
  // Авторы
  authors: [
    { name: "Буржуй", url: siteUrl },
  ],
  
  // Publisher
  publisher: "Буржуй",
  
  // Форматы
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Абсолютные ссылки для старых ботов
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:locale": "ru_RU",
    "og:site_name": "Буржуй",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Preload критических ресурсов */}
        <link
          rel="preload"
          href="/og-image__Universal_OG_1200x630__1200x630.jpg"
          as="image"
        />
        
        {/* Yandex Metrika (только noscript для SEO) */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106349537"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body>
        <YandexMetrika metrikaId={106349537}/>
        {children}
        {/* Cookie Consent - динамический импорт */}
        <CookieConsent 
          policyUrl="/privacy" 
          siteName="Буржуй"
          ymId={106349537}
        />
      </body>
    </html>
  );
}