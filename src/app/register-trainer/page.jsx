import React from 'react'
import trainerSign from "@/images/trainerSign.svg";
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import BreadCramp from '../components/shared/breadCramp/BreadCramp';
import Link from 'next/link';
export default function page() {
    return (
        <div className="min-h-screen">
            <BreadCramp title="التسجيل كمدرب" />

            <div className='container mx-auto px-4 md:px-10 lg:px-20 py-10 flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/2 mt-6 md:mt-0 text-right' data-aos="fade-left">
                    <span className="text-sm text-mainColor bg-purple-200 px-3 py-1 rounded-full">
                        اهلا بكم في علمي
                    </span>
                    <h2 className="text-2xl text-[#A436F0] md:text-3xl font-bold mt-3">سجل كمدرب الآن و انشر محتواك</h2>
                    <p className='font-medium text-[26px] text-[#121D2F]'>
                        كمدربٍ معتمدٍ في منصة علمي يمكنك الحصول على حساب
                        مدربٍ والوصول إلى لوحة تحكمٍ خاصة بك لإنشاء المحتوى
                        التدريبي وتحميل كافة الموارد التعليمية على المنصة
                        بالإضافة إلى تنظيم المحتوى ليسهل الوصول إليه، كما
                        يمكنك مراقبة تقدم الطلاب والرد على استفساراتهم من
                        خلال باقة الأدوات المتكاملة، بناءً على ذلك تتيح لك هذه
                        المنصة التدريبية الإلكترونية الانضمام إليها لتصبح فرداً من
                        الفريق التعليمي المؤهل والاحترافي لنشر المعرفة إلى
                        ملايين المتعلمين في جميع بقاع الأرض بواسطة جميع
                        الأدوات والوسائل اللازمة لتعليم الطلبة ما تحبّ وتحترف
                        بالشكل الأفضل.
                    </p>
                    {/* Button */}
                    <div className="mt-8">
                        <Link href='/register-instructor' className="w-fit bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-4 md:px-6 py-2 rounded-full flex items-center gap-2 mr-1">
                            <span>التسجيل كمدرب</span>
                            <FaArrowLeft className="text-sm text-white" />
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-right">
                    <Image src={trainerSign} alt="التسجيل كمدرب" width={500} height={500} />
                </div>
            </div>
        </div>
    )
}
