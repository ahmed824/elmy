import React from 'react';
import Image from 'next/image';
import backGround from "@/images/backGround2.jpg";
import man from "@/images/man-2.png";
import { useTranslation } from 'react-i18next';

export default function WhySection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={backGround}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="absolute inset-0 z-0"
      />

      {/* Man Image in the Middle */}
      <div className="relative z-10">
        <Image
          src={man}
          alt="Man"
          width={400}
          height={600}
          quality={100}
          priority
          className="mx-auto"
        />
      </div>

      {/* Text Containers */}
      <div className="absolute z-20 w-full max-w-6xl mx-auto px-4">
        {/* Left Text Container */}
        <div className="max-w-full lg:max-w-[35%] mb-2 lg:ml-auto lg:mr-16" data-aos="fade-left">
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">{t('whySection.whyElmy')}</h3>
            <p className="text-white text-sm sm:text-base">
              {t('whySection.whyElmyDescription')}
            </p>
          </div>
        </div>

        {/* Right Text Container */}
        <div className="max-w-full lg:max-w-[40%] mb-2 lg:mr-auto lg:ml-16" data-aos="fade-right">
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">{t('whySection.flexibleTraining')}</h3>
            <p className="text-white text-sm sm:text-base">
              {t('whySection.flexibleTrainingDescription')}
            </p>
          </div>
        </div>

        {/* Left Text Container */}
        <div className="max-w-full lg:max-w-[35%] mb-2 lg:ml-auto lg:mr-16" data-aos="fade-left">
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">{t('whySection.learnAnywhere')}</h3>
            <p className="text-white text-sm sm:text-base">
              {t('whySection.learnAnywhereDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}