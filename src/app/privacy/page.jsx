import React from 'react';
import BreadCramp from '../components/shared/breadCramp/BreadCramp'; 

export default function Page() {
    return (
        <div className="min-h-[50vh]">
            <BreadCramp title="  سياسة الخصوصية" />

            <div className="text-[#121D2F] text-[18px] font-medium leading-relaxed mt-4 w-[60%] m-auto pb-40">
                في علمي نضع خصوصية المستخدمين وأمانهم على أنها أولى أولوياتنا، ونتعهد  بالحفاظ على البيانات الشخصية لهم بطرق تشفيرٍ معقدة تضمن حمايتهم القصوى.
                فلا داعٍ للقلق عند إدخال البيانات الشخصية كالاسم والبريد الإلكتروني  ومعلومات الدفع وغيرها، حيث نستخدمها لتحسين تجربتك وتقديم أفضل دعمٍ فنيٍ  لك لا أكثر، ونعمل على اتخاذ تدابير صارمة لحماية الوصول غير المصرح به إلى أي معلوماتٍ شخصية ولا نشاركها مع أي طرفٍ ثالثٍ إطلاقاً، وفي حال طرأت أي تغييرات على سياسة الخصوصية هذه نبلغ مستخدمينا من خلال إشعارٍ بريدي  بكافة التفاصيل الهامة.            </div>
        </div>
    );
}
