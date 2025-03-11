"use client";

import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import BreadCramp from "../shared/breadCramp/BreadCramp";
import InstructionCourse from "./InstructionCourse";
import Sortable from "sortablejs";

export default function CourseCreationForm() {
  const initialValues = {
    title: "",
    description: "",
    prerequisites: "",
    maxStudents: "",
    studentLevel: "",
    pricingType: "free",
    salePrice: "",
    discountPrice: "",
    durationHours: "",
    durationMinutes: "",
    duration: "",
    additionalInfo: "",
    topics: [
      {
        name: "",
        description: "",
        lessons: [{ name: "", description: "", video: "" }],
      },
    ],
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <BreadCramp title={"إضافة دورة جديدة"} />
      <div className="flex flex-col lg:flex-row container mx-auto">
        <div className="w-full lg:w-2/3 p-6">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue }) => {
              const sortableRef = useRef(null);

              useEffect(() => {
                if (sortableRef.current) {
                  // Destroy previous Sortable instance if it exists
                  if (sortableRef.current.sortableInstance) {
                    sortableRef.current.sortableInstance.destroy();
                  }

                  // Create a new Sortable instance
                  sortableRef.current.sortableInstance = Sortable.create(
                    sortableRef.current,
                    {
                      animation: 150,
                      onEnd: (evt) => {
                        const { oldIndex, newIndex } = evt;
                        if (oldIndex !== newIndex) {
                          // Ensure a stable reference
                          setFieldValue("topics", (prevTopics) => {
                            const updatedTopics = [...prevTopics];
                            const movedItem = { ...updatedTopics[oldIndex] };

                            updatedTopics.splice(oldIndex, 1); // Remove old position
                            updatedTopics.splice(newIndex, 0, movedItem); // Insert at new position

                            return updatedTopics;
                          });
                        }
                      },
                    }
                  );
                }

                // Cleanup function to destroy instance on unmount
                return () => {
                  if (sortableRef.current?.sortableInstance) {
                    sortableRef.current.sortableInstance.destroy();
                    sortableRef.current.sortableInstance = null;
                  }
                };
              }, [setFieldValue]); // ✅ Only setFieldValue in dependency array

              return (
                <Form>
                  <div className="space-y-4 rounded shadow-md p-6 bg-white">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-b-gray-200 p-2">
                      معلومات عن الدورة
                    </h2>
                    <label className="block">
                      عنوان الدورة
                      <Field
                        as="textarea"
                        name="title"
                        className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        rows={2}
                        value={values.title || ""}
                      />
                    </label>
                    <label className="block">
                      وصف الدورة
                      <Field
                        as="textarea"
                        name="description"
                        className="w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        rows={3}
                        value={values.description || ""}
                      />
                    </label>
                    <label className="block">
                      المتطلبات الأساسية
                      <Field
                        as="textarea"
                        name="prerequisites"
                        rows={4}
                        className="w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        value={values.prerequisites || ""}
                      />
                    </label>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-b-gray-200 p-2">
                      اعدادات الدورة
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <label className="block">
                        الحد الأقصى للطلاب
                        <Field
                          type="number"
                          name="maxStudents"
                          placeholder="الحد الأقصى للطلاب"
                          className="text-gray-500 w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                          value={values.maxStudents || ""}
                        />
                      </label>
                      <label className="block">
                        مستوى الطلاب
                        <Field
                          type="text"
                          name="studentLevel"
                          placeholder="مستوى الطلاب"
                          className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                          value={values.studentLevel || ""}
                        />
                      </label>
                      <label className="block">
                        نوع الدورة
                        <Field
                          as="select"
                          name="pricingType"
                          className="text-gray-500 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                          value={values.pricingType || ""}
                        >
                          <option value="free">مجانية</option>
                          <option value="paid">مدفوعة</option>
                        </Field>
                      </label>
                      <label className="block">
                        السعر العادي
                        <Field
                          type="text"
                          name="salePrice"
                          placeholder="السعر العادي"
                          className="text-gray-500 w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                          value={values.salePrice || ""}
                        />
                      </label>
                      <label className="block">
                        سعر البيع (سعر مخفض)
                        <Field
                          type="number"
                          name="discountedPrice"
                          placeholder="سعر البيع (سعر مخفض)"
                          className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                          value={values.discountedPrice || ""}
                        />
                      </label>
                      <div className="flex flex-col col-span-1 w-full">
                        <div>المدة الإجمالية للدورة</div>
                        <div className="flex flex-col md:flex-row justify-between">
                          <label className="block w-full md:w-[48%]">
                            <Field
                              type="text"
                              name="durationHours"
                              placeholder="ساعة"
                              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                              value={values.durationHours || ""}
                            />
                          </label>
                          <label className="block w-full md:w-[48%]">
                            <Field
                              type="text"
                              name="durationMinutes"
                              placeholder="دقيقة"
                              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                              value={values.durationMinutes || ""}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-b-gray-200 p-2">
                      بيانات إضافية
                    </h2>
                    <label className="block mt-4">
                      ماذا سأتعلم؟
                      <Field
                        as="textarea"
                        name="whatToLearn"
                        className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        value={values.whatToLearn || ""}
                      />
                    </label>
                    <label className="block mt-4">
                      المتطلبات/التعليمات
                      <Field
                        as="textarea"
                        name="requirementsInstructions"
                        className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        value={values.requirementsInstructions || ""}
                      />
                    </label>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold mt-6 border-b border-b-gray-200 p-2">
                      محتوى الدورة
                    </h3>
                    <FieldArray name="topics">
                      {({ push, remove }) => (
                        <>
                          <div ref={sortableRef}>
                            {Array.isArray(values.topics) &&
                              values.topics.map(
                                (topic, topicIndex) =>
                                  topic && (
                                    <div
                                      key={topicIndex}
                                      className="p-4 border rounded mt-4"
                                    >
                                      <label className="block">
                                        اسم الموضوع
                                        <Field
                                          name={`topics[${topicIndex}].name`}
                                          placeholder="اسم الموضوع"
                                          className="w-full p-2 border rounded"
                                          value={topic.name || ""}
                                        />
                                      </label>
                                      <label className="block mt-2">
                                        وصف الموضوع
                                        <Field
                                          as="textarea"
                                          name={`topics[${topicIndex}].description`}
                                          placeholder="وصف الموضوع"
                                          className="w-full p-2 border rounded"
                                          value={topic.description || ""}
                                        />
                                      </label>
                                      <h4 className="mt-4">الدروس</h4>
                                      <FieldArray
                                        name={`topics[${topicIndex}].lessons`}
                                      >
                                        {({
                                          push: pushLesson,
                                          remove: removeLesson,
                                        }) => (
                                          <>
                                            {Array.isArray(topic.lessons) &&
                                              topic.lessons.map(
                                                (lesson, lessonIndex) => (
                                                  <div
                                                    key={lessonIndex}
                                                    className="p-2 border rounded mt-2"
                                                  >
                                                    <label className="block">
                                                      اسم الدرس
                                                      <Field
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].name`}
                                                        placeholder="اسم الدرس"
                                                        className="w-full p-2 border rounded"
                                                        value={
                                                          lesson.name || ""
                                                        }
                                                      />
                                                    </label>
                                                    <label className="block mt-2">
                                                      وصف الدرس
                                                      <Field
                                                        as="textarea"
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].description`}
                                                        placeholder="وصف الدرس"
                                                        className="w-full p-2 border rounded"
                                                        value={
                                                          lesson.description ||
                                                          ""
                                                        }
                                                      />
                                                    </label>
                                                    <label className="block mt-2">
                                                      فيديو
                                                      <Field
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].video`}
                                                        type="file"
                                                        className="w-full p-2 border rounded block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4file:rounded-lg file:border-0file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                                      />
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                            <button
                                              type="button"
                                              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                              onClick={() =>
                                                pushLesson({
                                                  name: "",
                                                  description: "",
                                                  video: "",
                                                })
                                              }
                                            >
                                              إضافة درس جديد
                                            </button>
                                          </>
                                        )}
                                      </FieldArray>
                                      <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                        onClick={() => remove(topicIndex)}
                                      >
                                        إزالة الموضوع
                                      </button>
                                    </div>
                                  )
                              )}
                          </div>
                          <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                            onClick={() =>
                              push({
                                name: "",
                                description: "",
                                lessons: [
                                  { name: "", description: "", video: "" },
                                ],
                              })
                            }
                          >
                            إضافة موضوع جديد
                          </button>
                        </>
                      )}
                    </FieldArray>
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded mt-6 block w-full"
                    >
                      تقديم المراجعة
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <InstructionCourse />
      </div>
    </>
  );
}
