import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import NewsletterSection from './NewsletterSection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  return (
    <footer className="relative bg-[#141F30] text-white py-10 rounded-t-2xl text-right pt-28 mt-56 mb-16 sm:mb-0">
      {/* Toast Container at the top */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50" // Positioned at top center
      />
      <NewsletterSection />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
        {/* وصف الموقع */}
        <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <div className="flex justify-center">
            <Image src="/logo-w.svg" alt="شعار علمي" width={96} height={96} className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <p className="text-gray-400 mt-4 bg-background p-3 rounded-lg max-w-xs md:max-w-md text-sm md:text-base">
            حرصاً على محاكاة البيئة التدريبية المثالية التي يبحث عنها
            الجميع، يتكامل فريق الدعم الفني في علمي مع بقية أقسامه
            لتمثيل التعاون المتكامل والخدمة الأفضل، حيث نتواجد على
            مدار الساعة لسماع استفساراتكم واقتراحاتكم وإيجاد الحلول
            الفعالة لأي مشكلةٍ قد تواجهكم برحابةٍ وسعادة، لأننا مؤمنون
            أن التواصل الفعال مع شركاء نجاحنا ومتدربينا هو السبيل
            الأفضل لنصبح المنصة التدريبية الأولى في الوطن العربي، لا
            تتردد في مراسلتنا عبر جميع وسائل الاتصال المتاحة على مدار
            الساعة:
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              href="#"
              className="flex items-center justify-center text-[#6B7385] bg-[#1B283C] rounded-full w-12 h-12 md:w-12 md:h-12 hover:text-mainColor text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center text-[#6B7385] bg-[#1B283C] rounded-full w-12 h-12 md:w-12 md:h-12 hover:text-mainColor text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <FaTiktok />
            </Link>
          </div>
        </div>

        {/* روابط هامة */}
        <div className="w-full md:w-1/4 flex flex-col mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-3 text-[#6C74EB]">روابط هامة</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li><Link href="#" className="hover:text-mainColor">الرئيسية</Link></li>
            <li><Link href="#" className="hover:text-mainColor">من نحن</Link></li>
            <li><Link href="#" className="hover:text-mainColor">كيف نعمل</Link></li>
            <li><Link href="#" className="hover:text-mainColor">التسجيل كمحترف</Link></li>
            <li><Link href="/address" className="hover:text-mainColor">العنوان الوطني</Link></li>
          </ul>
        </div>

        {/* الدعم والسياسات */}
        <div className="w-full md:w-1/4 flex flex-col mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-3 text-[#6C74EB]">الدعم والسياسات</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li><Link href="/contact" className="hover:text-mainColor">تواصل معنا</Link></li>
            <li><Link href="/terms" className="hover:text-mainColor">الشروط والأحكام</Link></li>
            <li><Link href="/policies" className="hover:text-mainColor">سياسة الاستخدام والاسترجاع</Link></li>
            <li><Link href="/privacy" className="hover:text-mainColor">سياسة الخصوصية</Link></li>
            <li><Link href="/support" className="hover:text-mainColor">الدعم والمساعدة</Link></li>
          </ul>
        </div>

        {/* تواصل مباشر */}
        <div className="w-full md:w-1/4 flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-[#6C74EB]">تواصل مباشر</h3>
          <p className="text-sm md:text-base">واتساب: <span className="text-gray-400">966597431779+</span></p>
          <p className="text-sm md:text-base">البريد الإلكتروني: <a href="mailto:support@elmyacademy.com" className="text-mainColor hover:text-mainColor">support@elmyacademy.com</a></p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4 text-sm md:text-base">
        جميع الحقوق محفوظة علمي
      </div>
    </footer>
  );
}