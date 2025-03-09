"use client";
import React, { useState } from "react";
import { useRegisterInstructor } from "../customKooks/authInstructor";
import StepWizard from "react-step-wizard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useLogo } from "../customKooks/logo";
import logo from "@/images/logo.svg";
import loginImage from "@/images/login-visual.svg";

const RegisterInstructor = () => {
  const { data: logoData } = useLogo();
  const { mutate, isPending, isError, error } = useRegisterInstructor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_country_code: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    cv: null,
    certificate: null,
    bio: "",
    specialization: "",
    university: "",
    department: "",
    nationality: "",
    gender: "",
    address: "",
    agree_terms: false,
  });

  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        alert("Instructor registered successfully!");
      },
      onError: (error) => {
        console.error("Registration failed:", error.message);
      },
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (field === "cv" && file.type !== "application/pdf") {
        alert("CV must be a PDF file.");
        return;
      }
      if (
        field === "certificate" &&
        !["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(file.type)
      ) {
        alert("Certificate must be PDF, JPG, JPEG, or PNG.");
        return;
      }
      setFormData({ ...formData, [field]: file });
    }
  };

  const Step1 = ({ nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">سجل كمدرب الآن</h2>
      <p className="text-center text-gray-600 mb-6">
        يرجى ملء البيانات التالية لتسجيل حسابك كمدرب
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الاسم الكامل</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="الاسم الكامل"
          />
        </div>
        <div>
          <label className="block text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="البريد الإلكتروني"
          />
        </div>
        <div>
          <label className="block text-gray-700">رقم الهاتف</label>
          <PhoneInput
            country={"sa"}
            value={formData.phone_country_code + formData.phone_number}
            onChange={(phone, country) =>
              setFormData({
                ...formData,
                phone_country_code: `+${country.dialCode}`,
                phone_number: phone.replace(`+${country.dialCode}`, ""),
              })
            }
            inputClass="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
      <button
        onClick={nextStep}
        className="mt-6 w-full bg-purple-600 text-white p-2 rounded-lg"
      >
        التالي
      </button>
    </div>
  );

  const Step2 = ({ previousStep, nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 2</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">كلمة المرور</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="كلمة المرور"
          />
        </div>
        <div>
          <label className="block text-gray-700">تأكيد كلمة المرور</label>
          <input
            type="password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({ ...formData, password_confirmation: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="تأكيد كلمة المرور"
          />
        </div>
        <div>
          <label className="block text-gray-700">السيرة الذاتية (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "cv")}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={previousStep}
          className="bg-gray-300 text-gray-700 p-2 rounded-lg"
        >
          السابق
        </button>
        <button
          onClick={nextStep}
          className="bg-purple-600 text-white p-2 rounded-lg"
        >
          التالي
        </button>
      </div>
    </div>
  );

  const Step3 = ({ previousStep, nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 3</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الشهادة</label>
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/jpg"
            onChange={(e) => handleFileChange(e, "certificate")}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">نبذة عنك</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="نبذة عنك"
          />
        </div>
        <div>
          <label className="block text-gray-700">التخصص</label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="التخصص"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={previousStep}
          className="bg-gray-300 text-gray-700 p-2 rounded-lg"
        >
          السابق
        </button>
        <button
          onClick={nextStep}
          className="bg-purple-600 text-white p-2 rounded-lg"
        >
          التالي
        </button>
      </div>
    </div>
  );

  const Step4 = ({ previousStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 4</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الجامعة</label>
          <input
            type="text"
            value={formData.university}
            onChange={(e) =>
              setFormData({ ...formData, university: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="الجامعة"
          />
        </div>
        <div>
          <label className="block text-gray-700">القسم</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="القسم"
          />
        </div>
        <div>
          <label className="block text-gray-700">الجنسية</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="الجنسية"
          />
        </div>
        <div>
          <label className="block text-gray-700">الجنس</label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">العنوان</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
            placeholder="العنوان"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            <input
              type="checkbox"
              checked={formData.agree_terms}
              onChange={(e) =>
                setFormData({ ...formData, agree_terms: e.target.checked })
              }
            />{" "}
            أوافق على الشروط والأحكام
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isPending || !formData.agree_terms}
        className="mt-6 w-full bg-purple-600 text-white p-2 rounded-lg disabled:opacity-50"
      >
        {isPending ? "جاري التسجيل..." : "تسجيل"}
      </button>
      {isError && <p className="text-red-500 mt-2">{error.message}</p>}
      <button
        onClick={previousStep}
        className="mt-2 bg-gray-300 text-gray-700 p-2 rounded-lg"
      >
        السابق
      </button>
    </div>
  );

  // Step names with numbers
  const stepNames = [
    { number: 1, name: "المعلومات الشخصية" },
    { number: 2, name: "كلمة المرور" },
    { number: 3, name: "المستندات" },
    { number: 4, name: "التفاصيل النهائية" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg relative">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 flex p-6 flex-col justify-between bg-gray-100">
            {/* Logo Section at the Top */}
            <div className="flex">
              {/* Second Logo with Purple Text */}
              <div className="text-purple-600">
                <Image
                  src={logo}
                  alt="Secondary Logo"
                  width={100} // Set appropriate width
                  height={50} // Set appropriate height
                />
              </div>
              {/* First Logo */}
              {logoData?.data?.logo && (
                <Image
                  src={logoData.data.logo}
                  alt="Logo"
                  width={100} // Set appropriate width
                  height={50} // Set appropriate height
                />
              )}
            </div>

            {/* Step Names with Numbers */}
            <div className="mt-4 space-y-2">
              {stepNames.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${
                    currentStep === step.number
                      ? "text-purple-600 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {/* Circle with Number */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                      currentStep === step.number
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-500"
                    }`}
                  >
                    {step.number}
                  </div>
                  {/* Step Name */}
                  <div>{step.name}</div>
                </div>
              ))}
            </div>

            {/* Illustration Image at the Bottom */}
            <div className="mt-auto">
              <Image
                src={loginImage}
                alt="Illustration"
                className="w-full h-auto"
                width={400} // Set appropriate width
                height={300} // Set appropriate height
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-3/4">
            <StepWizard
              onStepChange={({ activeStep }) => setCurrentStep(activeStep)} // Track active step
            >
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
            </StepWizard>
            <div className="text-center text-gray-500 my-4">
              هل لديك حساب بالفعل؟{" "}
              <Link href="/login" className="text-purple-600">
                سجل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInstructor;