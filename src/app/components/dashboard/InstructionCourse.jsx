"use client";
import checkCircle from "@/images/dashboard/feather_check-circle.svg";
import Image from "next/image";

const courseInfo = [
  "قم بتعيين خيار سعر الدورة أو اجعله مجانيًا.",
  "الحجم القياسي لصورة الدورة هو 700 × 430.",
  "يتحكم قسم الفيديو في فيديو نظرة عامة على الدورة التدريبية.",
  "منشئ الدورة هو المكان الذي يمكنك من خلاله إنشاء دورة وتنظيمها.",
  "أضف مواضيع في قسم 'منشئ الدورة' لإنشاء الدروس والاختبارات والمهام.",
  "تشير المتطلبات المسبقة إلى الدورات الأساسية التي يجب إكمالها قبل أخذ هذه الدورة التدريبية المعينة.",
  "تظهر المعلومات من قسم البيانات الإضافية على الصفحة الفردية للدورة.",
];

export default function InstructionCourse() {
  return (

    <div className="bg-gray-100 p-4 rounded-lg text-gray-500 font-semibold text-sm w-full lg:w-1/3 h-fit mr-3">

      {courseInfo.map((info, index) => (
        <div key={index} className="flex items-center mb-4">
          <Image src={checkCircle} alt="check icon" className="w-6 h-6 mx-2" />
          <p className="ml-4">{info}</p>
        </div>
      ))}
    </div>
  );
}
