"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import Image from "next/image";
import opinion from "@/images/opinion.png";
import Vector from "@/images/Vector.png";
import useReviews from "@/app/customKooks/useReviews";
import useStatsUsers from "@/app/customKooks/useStats-users";
import { useTranslation } from "react-i18next";

export default function Opinion() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useReviews({ lang: "ar", limit: 5 });
  const { data: status = [] } = useStatsUsers({ lang: "ar" });

  // State for animated counters
  const [studentsCount, setStudentsCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counter animation function
  const animateCount = (target, setter, duration = 2000) => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += 1;
      setter(start);
      if (start === target) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          if (status?.data?.students_count) {
            animateCount(status.data.students_count, setStudentsCount);
          }
          if (status?.data?.instructors_count) {
            animateCount(status.data.instructors_count, setInstructorsCount);
          }
          setHasAnimated(true); // Prevent re-animation
          observer.disconnect(); // Stop observing after animation
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [status, hasAnimated]);

  if (isLoading) {
    return <div>{t("opinion.loading")}</div>;
  }

  if (isError) {
    return <div>{t("opinion.error")}</div>;
  }

  const reviews = data?.data?.reviews || [];

  return (
    <section ref={sectionRef} className="relative">
      <div className="w-full bg-[#faf9ff] py-24 px-5 flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
          {/* Text Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-right mt-10 md:mt-0">
            <span className="bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm">
              {t("opinion.learnAnywhere")}
            </span>
            <h2 className="text-2xl md:text-3xl font-medium mt-3">
              {t("opinion.achieveGoals")}
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              {t("opinion.description")}
            </p>
            <div
              className="flex justify-center md:justify-start gap-10 mt-6"
              data-aos="fade-up"
            >
              <div>
                <p className="text-2xl font-bold">{studentsCount}</p>
                <span className="text-gray-500">
                  {t("opinion.studentsCount")}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">{instructorsCount}</p>
                <span className="text-gray-500">
                  {t("opinion.instructorsCount")}
                </span>
              </div>
            </div>
          </div>

          {/* Swiper Slider Section */}
          <div className="w-full md:w-1/2 relative">
            <Swiper
              effect="cards"
              cardsEffect={{
                perSlideOffset: 8,
                perSlideRotate: 2,
                rotate: false,
                slideShadows: false,
              }}
              grabCursor={true}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: "#custom-pagination",
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              modules={[Autoplay, Pagination, EffectCards]}
              className="w-full"
            >
              {reviews.map((item) => (
                <SwiperSlide key={item.id} className="flex justify-center">
                  <div className="bg-white p-6 rounded-xl text-center w-72 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Image
                        width={100}
                        height={100}
                        src={item.user.avatar || opinion}
                        alt={item.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-right">
                        <h3 className="font-bold">{item.user.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.course.title}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-lg">{item.comment}</p>
                    <div className="text-[#FF8F3C] mt-2">
                      {"★".repeat(item.rating)}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              id="custom-pagination"
              className="mt-6 flex justify-center space-x-2"
            ></div>
          </div>
        </div>
      </div>

      {/* Vector Image at the bottom */}
      <div className="absolute bottom-[-40px] sm:bottom-[-104px] lg:bottom-[-206px] left-0 w-full">
        <Image
          src={Vector}
          alt="Vector Design"
          layout="responsive"
          className="w-full"
        />
      </div>
    </section>
  );
}
