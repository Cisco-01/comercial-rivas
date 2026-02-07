import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Monda } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/DisableDraftMode";
import Footer from "@/components/Footer";

const monda = Monda({
  subsets: ["latin"],
  weight: ["400"], // Added weights for medium, semibold, and bold
});

export const metadata: Metadata = {
  title: "Comercial Rivas",
  description:
    "Comercial Rivas es tu tienda de confianza para productos de calidad. Descubre nuestra amplia gama de artículos, desde tecnología hasta moda, con ofertas exclusivas y un servicio excepcional. ¡Compra con nosotros y experimenta la diferencia!",
  keywords: [
    "Comercial Rivas",
    "tienda en línea",
    "productos de calidad",
    "ofertas exclusivas",
    "servicio excepcional",
    "compra segura",
    "tecnología",
    "moda",
    "hogar",
    "deportes",
    "juguetes",
    "electrónica",
    "ropa",
    "accesorios",
    "descuentos",
  ],
  authors: [{ name: "Comercial Rivas", url: "https://comercialrivas.com" }],
  creator: "Comercial Rivas",
  publisher: "Comercial Rivas",
  //SEO improvments
  openGraph: {
    title: "Comercial Rivas - Tu tienda de confianza",
    description:
      "Comercial Rivas es tu tienda de confianza para productos de calidad. Descubre nuestra amplia gama de artículos, desde tecnología hasta moda, con ofertas exclusivas y un servicio excepcional. ¡Compra con nosotros y experimenta la diferencia!",
    url: "https://comercialrivas.vercel.app",
    siteName: "Comercial Rivas",
    images: [
      {
        url: "/images/logo2.png",
        width: 1200,
        height: 630,
        alt: "Comercial Rivas - Tu tienda de confianza",
      },
    ],

    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comercial Rivas - Tu tienda de confianza",
    description:
      "Comercial Rivas es tu tienda de confianza para productos de calidad. Descubre nuestra amplia gama de artículos, desde tecnología hasta moda, con ofertas exclusivas y un servicio excepcional. ¡Compra con nosotros y experimenta la diferencia!",
    images: [
      {
        url: "/images/logo2.png",
        alt: "Comercial Rivas - Tu tienda de confianza",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${monda.className} antialiased`}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </main>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
