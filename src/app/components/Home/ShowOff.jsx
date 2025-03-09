import React from 'react';
import Image from 'next/image';
import background from '@/images/background.jpg';
import whyImage from '@/images/why-img-man.png';
import { useTranslation } from 'react-i18next';

export default function ShowOff() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full max-h-[620px] flex items-center justify-between bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${background.src})` }}>
      <div className="relative m-auto z-10 flex flex-col lg:flex-row items-center justify-between max-w-6xl p-4 sm:p-6 text-white w-full">
        {/* Text and Grid Section */}
        <div className="lg:w-1/2 text-center lg:text-right mb-8 lg:mb-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-6" data-aos="fade-up">{t('showOff.whyChooseElmy')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
            <div className="bg-gradient-to-r from-[#B96FEB] to-[#D9ADF3] text-[#121D2F] p-4 rounded-xl shadow-md text-center font-semibold transition duration-300 hover:scale-105" data-aos="fade-left">
              {t('showOff.trainerExperience')}
            </div>
            <div className="bg-gradient-to-r from-[#B96FEB] to-[#D9ADF3] text-[#121D2F] p-4 rounded-xl shadow-md text-center font-semibold transition duration-300 hover:scale-105" data-aos="fade-right">
              {t('showOff.competitivePrices')}
            </div>
            <div className="bg-gradient-to-r from-[#B96FEB] to-[#D9ADF3] text-[#121D2F] p-4 rounded-xl shadow-md text-center font-semibold transition duration-300 hover:scale-105" data-aos="fade-left">
              {t('showOff.wideRangeCourses')}
            </div>
            <div className="bg-gradient-to-r from-[#B96FEB] to-[#D9ADF3] text-[#121D2F] p-4 rounded-xl shadow-md text-center font-semibold transition duration-300 hover:scale-105" data-aos="fade-right">
              {t('showOff.flexibleTimePlace')}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:mt-0">
          <Image
            src={whyImage}
            alt={t('showOff.whyChooseElmy')}
            className="w-64 sm:w-80 lg:w-96 -mb-4 sm:-mb-6"
            priority
          />
        </div>
      </div>
    </section>
  );
}