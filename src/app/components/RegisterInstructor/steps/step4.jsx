"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";

const Step4 = ({ previousStep, isPending }) => (
    <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">خطوة 4</h2>
        <div className="space-y-4 sm:space-y-6">
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">الجامعة</label>
                <Field
                    name="university"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="الجامعة"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">القسم</label>
                <Field
                    name="department"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="القسم"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">الجنسية</label>
                <Field
                    name="nationality"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="الجنسية"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">الجنس</label>
                <Field
                    as="select"
                    name="gender"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">اختر الجنس</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </Field>
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">العنوان</label>
                <Field
                    name="address"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="العنوان"
                />
            </div>
            <div>
                <label className="flex items-center text-gray-700 text-sm sm:text-base">
                    <Field type="checkbox" name="agree_terms" className="mr-2" />
                    أوافق على الشروط والأحكام
                </label>
                <ErrorMessage name="agree_terms" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="mt-4 sm:mt-6 w-full bg-purple-600 text-white p-2 sm:p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
                {isPending ? "جاري التسجيل..." : "تسجيل"}
            </button>
            <button
                type="button"
                onClick={previousStep}
                className="mt-2 w-full sm:w-auto bg-gray-300 text-gray-700 p-2 sm:p-3 rounded-3xl hover:bg-gray-400 transition-colors"
            >
                السابق
            </button>
        </div>
    </div>
);

export default Step4;