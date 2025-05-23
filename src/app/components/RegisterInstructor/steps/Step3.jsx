"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";

const Step3 = ({ previousStep, nextStep }) => (
    <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">خطوة 3</h2>
        <div className="space-y-4 sm:space-y-6">
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">الشهادة</label>
                <Field name="certificate">
                    {({ form }) => (
                        <Input
                            type="file"
                            accept="application/pdf,image/jpeg,image/png,image/jpg"
                            className="w-full bg-[#F4F4F4] rounded-[50px] border-none file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            onChange={(event) => form.setFieldValue("certificate", event.currentTarget.files[0])}
                        />
                    )}
                </Field>
                <ErrorMessage name="certificate" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">نبذة عنك</label>
                <Field
                    name="bio"
                    as="textarea"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[20px] border-none focus:ring-2 focus:ring-purple-500 h-24 sm:h-32"
                    placeholder="نبذة عنك"
                />
                <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
                <label className="block text-gray-700 text-sm sm:text-base">التخصص</label>
                <Field
                    name="specialization"
                    className="w-full p-2 sm:p-3 bg-[#F4F4F4] rounded-[50px] border-none focus:ring-2 focus:ring-purple-500"
                    placeholder="التخصص"
                />
                <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4 sm:mt-6">
                <button
                    type="button"
                    onClick={previousStep}
                    className="w-full sm:w-auto bg-gray-300 text-gray-700 p-2 sm:p-3 rounded-3xl hover:bg-gray-400 transition-colors"
                >
                    السابق
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-purple-600 text-white p-2 sm:p-3 rounded-3xl hover:bg-purple-700 transition-colors"
                >
                    التالي
                </button>
            </div>
        </div>
    </div>
);

export default Step3;