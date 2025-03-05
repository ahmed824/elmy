"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { useSlider } from "@/app/customKooks/useSlider";  
import KnowMoreButton from "../shared/btns/KnowMoreButton";
import PurpleButton from "../shared/btns/PurpleButton";
import HeaderSliderSkeleton from "../shared/HeaderSliderSkeleton";  

export default function HeaderSlider() {
  // Use the custom hook to fetch sliders with Arabic language ('ar')
  const { data: sliders, error, isLoading } = useSlider('ar');

  if (error) {
    return <div className="w-full bg-white py-10 text-center text-red-600">حدث خطأ: {error.message}</div>;
  }

  // Ensure sliders.data exists and is an array
  const sliderData = sliders?.data || [];

  // Display skeleton while loading
  if (isLoading) {
    return <HeaderSliderSkeleton />;
  }

  return (
    <div className="w-full bg-white py-10 relative overflow-hidden">
      {/* Colors */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#A239F066] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#F8F6CF]/50 blur-3xl pointer-events-none" />

      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        autoplay={{ delay: 5000 }}
        loop
        dir="ltr"
        className="w-full relative z-10"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
              <div className="w-full md:w-1/2">
                <Image
                  src={slide.image || HeaderImage} // Use API image or fallback to HeaderImage
                  alt={slide.title || "Slider Image"}
                  className="w-full"
                  width={500} // Add width for Next.js Image optimization
                  height={300} // Add height for Next.js Image optimization
                  loading="eager" // Load image eagerly for better performance in sliders
                />
              </div>

              <div className="w-full md:w-1/2 text-right" data-aos="fade-up">
                <h1 className="text-3xl md:text-4xl font-normal text-purple-600">
                  {slide.title || "أجعل حياتك أفضل بجعل نفسك أفضل"}
                </h1>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  {slide.description || "بيئتك المثالية لتطوير مهاراتك مع نخبة الخبراء وأقوى المحتويات التعليمية."}
                </p>
                <div className="mt-6 flex gap-4 justify-end">
                  <KnowMoreButton />
                  <PurpleButton label={"سجل الآن"} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}