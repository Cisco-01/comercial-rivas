"use client";

import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  Controller,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  code: string;
  name: string;
  category: string;
  price: string;
  productImg: string;
  heroImg: string;
}

const slides: Slide[] = [
  {
    code: "NK-AIR",
    name: "Sneakers Premium",
    category: "Calzado",
    price: "$189.99",
    productImg: "/images/white-premium-sneakers-shoes-product-photography.jpg",
    heroImg: "/images/lifestyle-urban-fashion-sneakers-street-style-phot.jpg",
  },
  {
    code: "PRO-15",
    name: "Laptop Ultra",
    category: "Electrónica",
    price: "$1,299.99",
    productImg: "/images/modern-silver-laptop-computer-product-photography-.jpg",
    heroImg: "/images/modern-workspace-desk-laptop-professional-office-l.jpg",
  },
  {
    code: "WCH-LX",
    name: "Smartwatch Elite",
    category: "Accesorios",
    price: "$349.99",
    productImg: "/images/luxury-smartwatch-wearable-technology-product-phot.jpg",
    heroImg: "/images/fitness-lifestyle-person-wearing-smartwatch-outdoo.jpg",
  },
  {
    code: "JKT-02",
    name: "Chaqueta Urban",
    category: "Ropa",
    price: "$129.99",
    productImg: "/images/stylish-black-jacket-fashion-clothing-product-phot.jpg",
    heroImg: "/images/urban-fashion-street-style-person-wearing-jacket-c.jpg",
  },
];

const StarIcon = ({
  filled,
  isHalf,
  id,
}: {
  filled: boolean;
  isHalf: boolean;
  id: number;
}) => {
  if (isHalf) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 md:w-6 md:h-6 drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${id}`}>
            <stop offset="50%" stopColor="#FBBF24" /> {/* Amber 400 */}
            <stop offset="50%" stopColor="#D1D5DB" /> {/* Gray 300 */}
          </linearGradient>
        </defs>
        <path
          fill={`url(#grad-${id})`}
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 md:w-6 md:h-6 drop-shadow-sm transition-colors duration-300 ${
        filled ? "text-amber-400" : "text-gray-300"
      }`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

const Slider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const heroSwiperRef = useRef<SwiperType | null>(null);

  const rating = 4.5;
  const totalStars = 5;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 px-4 md:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(236,72,153,0.06)_0%,_transparent_50%)]" />

      {/* Títulos y watermark */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section - improved layout and sizing */}
        <div className="relative mb-16 md:mb-20">
          {/* Large watermark text */}
          <h2 className="pointer-events-none absolute -top-4 left-0 select-none text-7xl font-black tracking-tight text-slate-900/[0.03] sm:text-8xl md:text-9xl lg:text-[11rem]">
            NUEVOS
          </h2>
          {/* Main title */}
          <div className="relative pt-10 md:pt-14">
            <span className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Colección 2025
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
              LANZAMIENTO DE
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                PRODUCTOS
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              Descubre nuestra nueva colección con los productos más innovadores
              del mercado.
            </p>
          </div>
        </div>
      </div>

      {/* Grid con sliders independientes */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Product Card Slider - improved card design */}
        <div className="relative lg:col-span-5">
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <div className="absolute -top-14 right-0 z-10 flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-slate-500 transition-colors group-hover:text-indigo-600" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5 text-slate-500 transition-colors group-hover:text-indigo-600" />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Controller]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Si el otro swiper ya existe, conéctalos usando Controller
                if (heroSwiperRef.current) {
                  try {
                    // usar any para evitar problemas de tipos en TS
                    (swiper.controller as any).control = heroSwiperRef.current;
                    (heroSwiperRef.current.controller as any).control = swiper;
                  } catch (e) {
                    // ignore
                  }
                }
              }}
              loop
              spaceBetween={24}
              slidesPerView={1}
              className="product-swiper"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group relative">
                    {/* Product Card - light theme card */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 md:p-8">
                      {/* Category & Code Badge */}
                      <div className="mb-6 flex items-center justify-between">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {slide.category}
                        </span>
                        <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-200">
                          {slide.code}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </span>
                        <span className="text-xs font-medium text-white/40">
                          Serie Premium
                        </span>
                      </div>

                      {/* Product Image - improved sizing */}
                      <div className="relative mx-auto mb-6 aspect-square w-full max-w-[260px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-100/50 to-transparent blur-2xl" />
                        <Image
                          src={slide.productImg || "/placeholder.svg"}
                          alt={slide.name}
                          fill
                          className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="mb-6 text-center">
                        <h3 className="mb-1 text-xl font-bold text-slate-900">
                          {slide.name}
                        </h3>
                        <p className="text-2xl font-bold text-indigo-600">
                          {slide.price}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="#store"
                        className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-base font-bold text-black shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30"
                      >
                        <span className="relative z-10">VER PRODUCTOS</span>
                        <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 transition-opacity group-hover/btn:opacity-100" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Hero Image Slider - adjusted size and styling */}
        <div className="relative lg:col-span-7">
          {/* Decorative stripe - updated color */}
          <div className="absolute -left-4 right-0 top-[12%] z-0 h-2 -rotate-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent md:h-3 lg:-left-8 lg:top-[15%]" />
          <div className="absolute -left-4 right-0 top-[12%] z-0 h-2 -rotate-3 bg-gradient-to-r from-indigo-500/40 via-purple-500/20 to-transparent blur-sm md:h-3 lg:-left-8 lg:top-[15%]" />

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade, Controller]}
            onSwiper={(swiper) => {
              heroSwiperRef.current = swiper;
              // Si el otro swiper ya existe, conéctalos usando Controller
              if (swiperRef.current) {
                try {
                  (swiper.controller as any).control = swiperRef.current;
                  (swiperRef.current.controller as any).control = swiper;
                } catch (e) {
                  // ignore
                }
              }
            }}
            loop
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-slate-300 !w-2 !h-2 !mx-1.5 transition-all",
              bulletActiveClass: "!bg-indigo-600 !w-8 !rounded-full",
            }}
            spaceBetween={30}
            slidesPerView={1}
            className="hero-swiper"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/50">
                  {/* Clip path container */}
                  <div className="relative overflow-hidden rounded-3xl [clip-path:polygon(5%_15%,100%_0%,100%_100%,0%_100%)]">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/30 via-transparent to-transparent" />

                    {/* Image - improved aspect ratio */}
                    <Image
                      src={slide.heroImg || "/placeholder.svg"}
                      alt={`${slide.name} lifestyle`}
                      width={1200}
                      height={800}
                      className="aspect-[4/3] w-full object-cover lg:aspect-[16/10]"
                    />

                    {/* Bottom info overlay */}
                    <div className="absolute bottom-0 left-0 z-20 p-6 md:p-8">
                      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-indigo-300">
                        {slide.category}
                      </p>
                      <p className="max-w-md text-xl font-bold text-white md:text-2xl">
                        {slide.name}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white/90">
                        {slide.price}
                      </p>
                    </div>
                  </div>

                  {/* Border accent */}
                  <div className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500/50 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination container */}
          <div className="mt-6 flex justify-center lg:justify-end" />
        </div>
      </div>

      {/* Bottom Stats - updated for light theme */}
      <div className="mt-20 grid grid-cols-2 gap-6 border-t border-slate-200 pt-12 md:grid-cols-4 md:gap-10 lg:mt-28">
        {[
          { value: "10K+", label: "Productos disponibles" },
          { value: "50K", label: "Clientes felices" },
          { value: "24h", label: "Envío express" },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="mb-2 text-3xl font-bold text-indigo-600 md:text-4xl">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}

        {/* Product Rating Stat */}
        <div className="justify-center text-center mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-indigo-600 md:text-4xl">
              {rating}
            </span>
            <span className="text-slate-400 text-lg">/ 5.0</span>
          </div>

          <div className="flex items-center gap-1" id="store">
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1;
              const isHalf = rating > index && rating < starValue;
              const isFilled = starValue <= Math.floor(rating);

              return (
                <StarIcon
                  key={index}
                  id={index}
                  filled={isFilled}
                  isHalf={isHalf}
                />
              );
            })}
          </div>
          <p className="text-sm font-medium text-slate-500 text-center">
            Valoración del Producto
          </p>
        </div>
      </div>
    </section>
  );
};

export default Slider;
