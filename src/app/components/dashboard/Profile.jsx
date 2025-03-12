"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import imgIcon from "@/images/dashboard/feather_image.svg";
import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Profile() {
  const { t } = useTranslation();

  const [previewImages, setPreviewImages] = useState({
    profilePhoto: null,
    cv: null,
    certificate: null,
  });

  const formik = useFormik({
    initialValues: {
      profilePhoto: "",
      cv: "",
      certificate: "",
      name: "",
      mobile: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
      nationality: "",
      address: "",
      university: "",
      department: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      gender: Yup.string().required("Required"),
      password: Yup.string().min(6, "Too short").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      nationality: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      university: Yup.string().required("Required"),
      department: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const profilePhoto = useRef();
  const cv = useRef();
  const certificate = useRef();

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [field.name]: reader.result,
        }));
        formik.setFieldValue(field.name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (field) => {
    setPreviewImages((prev) => ({
      ...prev,
      [field]: null,
    }));
    formik.setFieldValue(field, "");
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4 text-right">بيانات الحساب</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="grid gap-4"
        encType="multipart/form-data"
      >
        {[
          { ref: profilePhoto, name: "profilePhoto" },
          { ref: cv, name: "cv" },
          { ref: certificate, name: "certificate" },
        ].map((field) => (
          <div key={field.name} className="text-center">
            <input
              ref={field.ref}
              type="file"
              name={field.name}
              onChange={(event) => handleFileChange(field, event)}
              className="hidden"
            />
          </div>
        ))}
        <div className="flex justify-center gap-4">
          {[
            { ref: profilePhoto, name: "profilePhoto" },
            { ref: cv, name: "cv" },
            { ref: certificate, name: "certificate" },
          ].map((field) => (
            <div className="relative grid grid-cols-3 gap-4" key={field.name}>
              <div
                onClick={() => field.ref.current.click()}
                className="cursor-pointer w-[177px] h-[48px] border rounded border-[#637FEA] flex items-center justify-center"
              >
                <Image
                  src={imgIcon}
                  alt="photo"
                  className=" object-cover"
                  width={20}
                />
                <div className="text-[#637FEA] p-2">اختيار صورة</div>
              </div>
              {previewImages[field.name] && (
                <div className="absolute top-0 right-0 h-[200px]">
                  <img
                    src={previewImages[field.name]}
                    alt="Preview"
                    className="w-[177px] h-[48px] object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(field.name)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["name", "mobile"],
            ["email", "gender"],
            ["password", "confirmPassword"],
            ["nationality", "address"],
            ["university", "department"],
          ].map(([field1, field2]) => (
            <div key={field1 + field2}>
              <input
                type="text"
                name={field1}
                placeholder={field1}
                className="p-2 border rounded w-full"
                {...formik.getFieldProps(field1)}
              />
              <input
                type="text"
                name={field2}
                placeholder={field2}
                className="p-2 border rounded w-full"
                {...formik.getFieldProps(field2)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded">
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
}