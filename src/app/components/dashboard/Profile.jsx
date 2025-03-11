"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

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
  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4 text-right">بيانات الحساب</h2>
      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-3 gap-4">
          {["profilePhoto", "cv", "certificate"].map((field) => (
            <div key={field} className="text-center">
              <label className="block mb-1">{field}</label>
              <input
                type="file"
                name={field}
                onChange={(event) =>
                  formik.setFieldValue(field, event.target.files[0])
                }
                className="block w-full"
              />
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
            <>
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
            </>
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
