"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterInstructor } from "../customKooks/authInstructor";
import StepWizard from "react-step-wizard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useLogo } from "../customKooks/logo";
import logo from "@/images/logo.svg";
import loginImage from "@/images/login-visual.svg";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const RegisterInstructor = () => {
  const { data: logoData } = useLogo();
  const { mutate, isPending } = useRegisterInstructor();
  const [currentStep, setCurrentStep] = React.useState(1);

  const initialValues = {
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
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    phone_number: Yup.string().required("رقم الجوال مطلوب"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمات المرور يجب أن تتطابق")
      .required("تأكيد كلمة المرور مطلوب"),
    cv: Yup.mixed().required("السيرة الذاتية مطلوبة"),
    certificate: Yup.mixed().required("الشهادة مطلوبة"),
    bio: Yup.string().required("النبذة مطلوبة"),
    specialization: Yup.string().required("التخصص مطلوب"),
    agree_terms: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
  });

  const router = useRouter(); 

  const handleSubmit = (values) => {
    // Create FormData object to handle file uploads
    const formData = new FormData();
    for (const key in values) {
      if (key === "cv" || key === "certificate") {
        // Append files if they exist
        if (values[key]) {
          formData.append(key, values[key]);
        }
      } else {
        // Append other fields as strings
        formData.append(key, values[key]);
      }
    }

    mutate(formData, {
      onSuccess: (data) => {
        // Store token in cookies
        Cookies.set("elmy_token", data.data.token, { expires: 7 });
    
        // Show success toast
        toast.success("تم تسجيل المدرب بنجاح!", {
          position: "top-right",
          autoClose: 3000,
        });
    
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push("/"); // Navigate to home page
        }, 1000); // Matches toast autoClose duration
      },
      onError: (error) => {
        toast.error(error.message || "فشل التسجيل", {
          position: "top-right",
          autoClose: 3000,
        });
      },
    });
  };

  const PhoneNumberInput = ({ field, form }) => {
    const { name, value } = field;
    const { touched, errors, setFieldValue } = form;
    const error = touched[name] && errors[name];

    const handleChange = (phone, country) => {
      setFieldValue(name, phone || "");
      setFieldValue("phone_country_code", country ? `+${country.dialCode}` : "");
    };

    return (
      <div className="flex flex-col">
        <PhoneInput
          country="sa"
          value={value}
          onChange={handleChange}
          inputClass="w-full px-3 py-3 bg-[#F4F4F4] text-[#121D2F] rounded-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          buttonClass="!bg-[#F4F4F4] !border-none"
          dropdownClass="!text-left !rounded-lg shadow-lg"
          containerClass={`relative mt-1 border rounded-[50px] flex focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="رقم الجوال"
          enableSearch
          countryCodeEditable={false}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  };

  const Step1 = ({ nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">سجل كمدرب الآن</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الاسم الكامل</label>
          <Field
            name="name"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="الاسم الكامل"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">البريد الإلكتروني</label>
          <Field
            name="email"
            type="email"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="البريد الإلكتروني"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">رقم الجوال</label>
          <Field name="phone_number" component={PhoneNumberInput} />
          <Field type="hidden" name="phone_country_code" />
        </div>
        <button
          type="button"
          onClick={nextStep}
          className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg"
        >
          التالي
        </button>
      </div>
    </div>
  );

  const Step2 = ({ previousStep, nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 2</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">كلمة المرور</label>
          <Field
            name="password"
            type="password"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="كلمة المرور"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">تأكيد كلمة المرور</label>
          <Field
            name="password_confirmation"
            type="password"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="تأكيد كلمة المرور"
          />
          <ErrorMessage
            name="password_confirmation"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">السيرة الذاتية (PDF)</label>
          <Field name="cv">
            {({ form }) => (
              <Input
                type="file"
                accept="application/pdf"
                className="w-full bg-[#F4F4F4] rounded-[50px] border-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={(event) => {
                  form.setFieldValue("cv", event.currentTarget.files[0]);
                }}
              />
            )}
          </Field>
          <ErrorMessage name="cv" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={previousStep}
            className="bg-gray-300 text-gray-700 p-3 rounded-lg"
          >
            السابق
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-purple-600 text-white p-3 rounded-lg"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );

  const Step3 = ({ previousStep, nextStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 3</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الشهادة</label>
          <Field name="certificate">
            {({ form }) => (
              <Input
                type="file"
                accept="application/pdf,image/jpeg,image/png,image/jpg"
                className="w-full bg-[#F4F4F4] rounded-[50px] border-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={(event) => {
                  form.setFieldValue("certificate", event.currentTarget.files[0]);
                }}
              />
            )}
          </Field>
          <ErrorMessage name="certificate" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">نبذة عنك</label>
          <Field
            name="bio"
            as="textarea"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="نبذة عنك"
          />
          <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">التخصص</label>
          <Field
            name="specialization"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="التخصص"
          />
          <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={previousStep}
            className="bg-gray-300 text-gray-700 p-3 rounded-lg"
          >
            السابق
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-purple-600 text-white p-3 rounded-lg"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );

  const Step4 = ({ previousStep }) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">خطوة 4</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">الجامعة</label>
          <Field
            name="university"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="الجامعة"
          />
        </div>
        <div>
          <label className="block text-gray-700">القسم</label>
          <Field
            name="department"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="القسم"
          />
        </div>
        <div>
          <label className="block text-gray-700">الجنسية</label>
          <Field
            name="nationality"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="الجنسية"
          />
        </div>
        <div>
          <label className="block text-gray-700">الجنس</label>
          <Field
            as="select"
            name="gender"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </Field>
        </div>
        <div>
          <label className="block text-gray-700">العنوان</label>
          <Field
            name="address"
            className="w-full p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
            placeholder="العنوان"
          />
        </div>
        <div>
          <label className="flex items-center text-gray-700">
            <Field type="checkbox" name="agree_terms" className="mr-2" />
            أوافق على الشروط والأحكام
          </label>
          <ErrorMessage name="agree_terms" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50"
        >
          {isPending ? "جاري التسجيل..." : "تسجيل"}
        </button>
        <button
          type="button"
          onClick={previousStep}
          className="mt-2 bg-gray-300 text-gray-700 p-3 rounded-lg"
        >
          السابق
        </button>
      </div>
    </div>
  );

  const stepNames = [
    { number: 1, name: "المعلومات الشخصية" },
    { number: 2, name: "كلمة المرور" },
    { number: 3, name: "المستندات" },
    { number: 4, name: "التفاصيل النهائية" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="w-full max-w-4xl bg-white rounded-lg shadow-lg relative">
            <ToastContainer />
            <div className="flex">
              <div className="w-1/4 flex p-6 flex-col justify-between bg-gray-100">
                <div className="flex">
                  <div className="text-purple-600">
                    <Image src={logo} alt="Secondary Logo" width={100} height={50} />
                  </div>
                  {logoData?.data?.logo && (
                    <Image
                      src={logoData.data.logo}
                      alt="Logo"
                      width={100}
                      height={50}
                    />
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  {stepNames.map((step) => (
                    <div
                      key={step.number}
                      className={`flex items-center space-x-2 whitespace-nowrap ${
                        currentStep === step.number
                          ? "text-purple-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                          currentStep === step.number
                            ? "border-[#ECE0F4] bg-[#ECE0F4] text-mainColor ml-1"
                            : "bg-[#EBEBEB] text-[#3F4254] ml-1"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div>{step.name}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Image
                    src={loginImage}
                    alt="Illustration"
                    className="w-full h-auto"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
              <div className="w-3/4">
                <StepWizard
                  onStepChange={({ activeStep }) => setCurrentStep(activeStep)}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterInstructor;