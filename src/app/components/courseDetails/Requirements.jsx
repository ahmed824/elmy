import React from "react";

export default function Requirements() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            {/* Title */}
            <h2 className="text-xl font-bold text-[#121D2F] mb-4">تفاصيل</h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
                هل أنت مستعد لاكتشاف قوة برنامج <strong>Microsoft Excel</strong>؟ تم تصميم هذه الدورة الصديقة للمبتدئين لمساعدتك على بناء أساس قوي في Excel، سواء كنت طالبًا محترفًا أو ترغب ببساطة في استكشاف أداة الجداول الأكثر شعبية في العالم.
            </p>

            {/* Divider */}
            <hr className="my-6 border-gray-300" />

            {/* Requirements Section */}
            <h3 className="text-lg font-bold text-[#121D2F] mb-3">متطلبات</h3>
            <ul className="text-gray-600 space-y-2">
                <li><strong>القسم 1:</strong> مقدمة إلى Microsoft Excel</li>
                <li><strong>المدة:</strong> 5 دقائق</li>
                <div>
                    <h4 className="text-md font-semibold text-[#121D2F] mb-2">
                        مقدمة إلى Microsoft Excel
                    </h4>
                    <ul className="text-gray-600 space-y-2 list-disc pr-5">
                        <li>مصطلحات Excel الأساسية</li>
                        <li>قائمة Excel</li>
                        <li>دليل الصفحات وأوراق العمل</li>
                        <li>حفظ ملف Excel</li>
                    </ul>
                </div>
            </ul>
        </div>
    );
}
