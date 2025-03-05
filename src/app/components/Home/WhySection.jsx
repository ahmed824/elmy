import React from 'react';
import Image from 'next/image';
import backGround from "@/images/backGround2.jpg";
import man from "@/images/man-2.png";

export default function WhySection() {
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
        <div className="max-w-full lg:max-w-[35%] mb-8 lg:ml-auto lg:mr-16" data-aos="fade-left" >
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">لماذا منصة علمي ؟</h3>
            <p className="text-white text-sm sm:text-base">
              منصة علمي هي منصة تعليمية إلكترونية تقدم مساقات ودورات متكاملة في مختلف المجالات
              العلمية، مع نخبة من الخبراء الأكاديميين العرب لتطوير المهارات وتحقيق الأهداف الشخصية.
            </p>
          </div>
        </div>

        {/* Right Text Container */}
        <div className="max-w-full lg:max-w-[35%] mb-8 lg:mr-auto lg:ml-16" data-aos="fade-right">
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">مواد تدريبية مرنة</h3>
            <p className="text-white text-sm sm:text-base">
              منصة علمي تقدم دورات مرنة في مجالات متعددة مثل البرمجة والتسويق، مع شروحات شاملة
              وتمارين عملية، بإعداد خبراء متخصصين وتقنيات حديثة، إضافة إلى مجموعات نقاش لدعم التعلم.
            </p>
          </div>
        </div>

        {/* Left Text Container */}
        <div className="max-w-full lg:max-w-[35%] mb-8 lg:ml-auto lg:mr-16" data-aos="fade-left">
          <div className="backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg border border-white/50">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">تعلم من أي مكان</h3>
            <p className="text-white text-sm sm:text-base">
              مع منصة علمي، تعلم أينما كنت وبمرونة تامة عبر الحاسوب أو الهاتف بطرق تعليم متنوعة
              تناسب جدولك وأسلوب حياتك. انضم اليوم ووسع معارفك بلا حدود.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}