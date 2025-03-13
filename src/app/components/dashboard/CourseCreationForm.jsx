"use client";

import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import BreadCramp from "../shared/breadCramp/BreadCramp";
import InstructionCourse from "./InstructionCourse";
import Sortable from "sortablejs";
import { FaVideo, FaTrash } from "react-icons/fa"; // Import icons from react-icons

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
    topics: [],
    introVideo: {
      source: "", // "youtube" or "upload"
      youtubeLink: "", // YouTube video link
      uploadedVideo: "", // Base64 encoded video
    },
  };

  const [topicStates, setTopicStates] = useState([]); // Track visibility and edit mode for each topic

  const handleSubmit = (values) => {
    const formattedData = {
      title: values.title,
      description: values.description,
      price: values.pricingType === "paid" ? values.salePrice : 0,
      duration_minutes:
        parseInt(values.durationHours) * 60 + parseInt(values.durationMinutes),
      level: values.studentLevel,
      categories: [], // Add categories as needed
      modules: values.topics.map((topic, index) => ({
        title: topic.name,
        lessons: topic.lessons.map((lesson, lessonIndex) => ({
          title: lesson.name,
          duration_minutes: 10, // Adjust as needed
          video_source: lesson.video, // Base64 encoded video
          video_path: lesson.video, // Adjust as needed
        })),
      })),
      introVideo: values.introVideo, // Include intro video data
    };
    console.log(formattedData);
    // Send formattedData to your API
  };

  const toggleTopicEditMode = (index) => {
    setTopicStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle edit mode
      return newStates;
    });
  };

  const handleVideoUpload = (event, setFieldValue, topicIndex, lessonIndex) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Video = reader.result; // Base64 encoded video
        setFieldValue(
          `topics[${topicIndex}].lessons[${lessonIndex}].video`,
          base64Video
        );
      };
      reader.readAsDataURL(file); // Read the file as Base64
    }
  };
  const handleIntroVideoUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Video = reader.result; // Base64 encoded video
        setFieldValue("introVideo.uploadedVideo", base64Video);
      };
      reader.readAsDataURL(file); // Read the file as Base64
    }
  };
  const validateTopic = (topic) => {
    const errors = {};
    if (!topic.name) errors.name = "اسم الموضوع مطلوب";
    if (!topic.description) errors.description = "وصف الموضوع مطلوب";
    return errors;
  };

  const validateLesson = (lesson) => {
    const errors = {};
    if (!lesson.name) errors.name = "اسم الدرس مطلوب";
    if (!lesson.description) errors.description = "وصف الدرس مطلوب";
    return errors;
  };

  const validateIntroVideo = (introVideo) => {
    const errors = {};
    if (!introVideo.source) errors.source = "حدد مصدر الفيديو";
    if (introVideo.source === "youtube" && !introVideo.youtubeLink) {
      errors.youtubeLink = "رابط اليوتيوب مطلوب";
    }
    if (introVideo.source === "upload" && !introVideo.uploadedVideo) {
      errors.uploadedVideo = "رفع الفيديو مطلوب";
    }
    return errors;
  };
  return (
    <>
      <BreadCramp title={"إضافة دورة جديدة"} />
      <div className="flex flex-col lg:flex-row container mx-auto">
        <div className="w-full lg:w-2/3 p-6">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, handleChange, setFieldValue }) => {
              const sortableRef = useRef(null);

              useEffect(() => {
                if (sortableRef.current) {
                  const sortableInstance = Sortable.create(
                    sortableRef.current,
                    {
                      animation: 150,
                      onEnd: (evt) => {
                        const { oldIndex, newIndex } = evt;
                        if (oldIndex !== newIndex) {
                          const updatedTopics = [...values.topics];
                          const [movedItem] = updatedTopics.splice(oldIndex, 1);
                          updatedTopics.splice(newIndex, 0, movedItem);
                          setFieldValue("topics", updatedTopics);
                        }
                      },
                    }
                  );

                  return () => {
                    sortableInstance.destroy();
                  };
                }
              }, [values.topics, setFieldValue]);

              return (
                <Form>
                  {/* Course Information Section */}
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
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm"
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
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
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
                      <ErrorMessage
                        name="prerequisites"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>

                  {/* Course Settings Section */}
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
                        <ErrorMessage
                          name="maxStudents"
                          component="div"
                          className="text-red-500 text-sm"
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
                        <ErrorMessage
                          name="studentLevel"
                          component="div"
                          className="text-red-500 text-sm"
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
                        <ErrorMessage
                          name="salePrice"
                          component="div"
                          className="text-red-500 text-sm"
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
                        <ErrorMessage
                          name="discountedPrice"
                          component="div"
                          className="text-red-500 text-sm"
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
                            <ErrorMessage
                              name="durationHours"
                              component="div"
                              className="text-red-500 text-sm"
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
                            <ErrorMessage
                              name="durationMinutes"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Section */}
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
                      <ErrorMessage
                        name="whatToLearn"
                        component="div"
                        className="text-red-500 text-sm"
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
                      <ErrorMessage
                        name="requirementsInstructions"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                  </div>

                  {/* Course Content Section */}
                  <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold mt-6 border-b border-b-gray-200 p-2">
                      محتوى الدورة
                    </h3>
                    <FieldArray name="topics">
                      {({ push, remove }) => (
                        <>
                          <div ref={sortableRef}>
                            {Array.isArray(values.topics) &&
                              values.topics.map((topic, topicIndex) => (
                                <div
                                  key={topicIndex}
                                  className="p-4 border rounded mt-4 bg-gray-100"
                                >
                                  {topicStates[topicIndex] ? (
                                    // Edit Mode: Show the form
                                    <>
                                      <label className="block">
                                        اسم الموضوع
                                        <Field
                                          name={`topics[${topicIndex}].name`}
                                          placeholder="اسم الموضوع"
                                          className="my-2 w-full p-2 border rounded bg-white outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                                          value={topic.name || ""}
                                        />
                                        <ErrorMessage
                                          name={`topics[${topicIndex}].name`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </label>
                                      <label className="block mt-2">
                                        وصف الموضوع
                                        <Field
                                          as="textarea"
                                          name={`topics[${topicIndex}].description`}
                                          placeholder="وصف الموضوع"
                                          className="my-2 w-full p-2 border rounded bg-white outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                                          value={topic.description || ""}
                                        />
                                        <ErrorMessage
                                          name={`topics[${topicIndex}].description`}
                                          component="div"
                                          className="text-red-500 text-sm"
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
                                                    className="p-4 border rounded mt-2 bg-white"
                                                  >
                                                    <label className="block">
                                                      <div className="flex items-center justify-between">
                                                        <span>اسم الدرس</span>
                                                        <button
                                                          type="button"
                                                          className="text-red-500 px-4 py-2 rounded mt-2 flex items-center justify-center"
                                                          onClick={() =>
                                                            removeLesson(
                                                              lessonIndex
                                                            )
                                                          }
                                                        >
                                                          <FaTrash className="mr-2" />
                                                        </button>
                                                      </div>
                                                      <Field
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].name`}
                                                        placeholder="اسم الدرس"
                                                        className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                                                        value={
                                                          lesson.name || ""
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].name`}
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                      />
                                                    </label>
                                                    <label className="block mt-2">
                                                      وصف الدرس
                                                      <Field
                                                        as="textarea"
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].description`}
                                                        placeholder="وصف الدرس"
                                                        className="w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-2"
                                                        value={
                                                          lesson.description ||
                                                          ""
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name={`topics[${topicIndex}].lessons[${lessonIndex}].description`}
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                      />
                                                    </label>
                                                    <label className="block mt-2">
                                                      فيديو الدرس
                                                      <div className="relative border-2 border-blue-500 rounded-lg p-4 flex flex-col items-center justify-center my-2">
                                                        {lesson.video ? (
                                                          <video
                                                            controls
                                                            className="w-full h-48 object-cover rounded-lg"
                                                            src={lesson.video}
                                                          />
                                                        ) : (
                                                          <>
                                                            <FaVideo className="text-blue-500 text-3xl mb-2" />
                                                            <span className="text-blue-500">
                                                              رفع فيديو الدرس
                                                            </span>
                                                          </>
                                                        )}
                                                        <input
                                                          type="file"
                                                          accept="video/*"
                                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                          onChange={(e) =>
                                                            handleVideoUpload(
                                                              e,
                                                              setFieldValue,
                                                              topicIndex,
                                                              lessonIndex
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    </label>
                                                  </div>
                                                )
                                              )}
                                            <button
                                              type="button"
                                              className="bg-primary-purble text-white px-4 py-2 rounded mt-2 mx-2"
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
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                        onClick={() =>
                                          toggleTopicEditMode(topicIndex)
                                        }
                                      >
                                        حفظ
                                      </button>
                                    </>
                                  ) : (
                                    // Summary Mode: Show the topic details
                                    <>
                                      <h4 className="text-lg font-semibold">
                                        {topic.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {topic.description}
                                      </p>
                                      <div className="mt-2">
                                        <button
                                          type="button"
                                          className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
                                          onClick={() =>
                                            toggleTopicEditMode(topicIndex)
                                          }
                                        >
                                          تعديل
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-red-500 text-white px-4 py-2 rounded"
                                          onClick={() => remove(topicIndex)}
                                        >
                                          حذف
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                          </div>
                          <button
                            type="button"
                            className="border border-primary-purble rounded-md text-primary-purble px-4 py-2 mt-4"
                            onClick={() => {
                              push({
                                name: "",
                                description: "",
                                lessons: [
                                  { name: "", description: "", video: "" },
                                ],
                              });
                              setTopicStates((prevStates) => [
                                ...prevStates,
                                true,
                              ]); // Set new topic to edit mode
                            }}
                          >
                            إضافة موضوع جديد
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold mb-4 border-b border-b-gray-200 p-2">
                      فيديو تعريفي
                    </h3>
                    <label className="block">
                      حدد مصدر الفيديو
                      <Field
                        as="select"
                        name="introVideo.source"
                        className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                      >
                        <option value="">اختر مصدر الفيديو</option>
                        <option value="youtube">يوتيوب</option>
                        <option value="upload">رفع فيديو</option>
                      </Field>
                      <ErrorMessage
                        name="introVideo.source"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </label>
                    {values.introVideo.source === "youtube" && (
                      <label className="block mt-4">
                        رابط اليوتيوب
                        <Field
                          type="text"
                          name="introVideo.youtubeLink"
                          placeholder="أدخل رابط اليوتيوب"
                          className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
                        />
                        <ErrorMessage
                          name="introVideo.youtubeLink"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </label>
                    )}
                    {values.introVideo.source === "upload" && (
                      <label className="block mt-4">
                        رفع فيديو
                        <div className="relative border-2 border-blue-500 rounded-lg p-4 flex flex-col items-center justify-center my-2">
                          {values.introVideo.uploadedVideo ? (
                            <video
                              controls
                              className="w-full h-48 object-cover rounded-lg"
                              src={values.introVideo.uploadedVideo}
                            />
                          ) : (
                            <>
                              <FaVideo className="text-blue-500 text-3xl mb-2" />
                              <span className="text-blue-500">
                                رفع فيديو تعريفي
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="video/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) =>
                              handleIntroVideoUpload(e, setFieldValue)
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="introVideo.uploadedVideo"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <label htmlFor="isPreveiw" className="flex justify-center items-center gap-2">
                      <span>
                        معاينة
                      </span>
                      <input
                      type='checkbox'
                      name='isPreveiw'
                      id='isPreveiw'
                      className=" w-3"
                    />
                    </label>
                    
                    <button
                      type="submit"
                      className="bg-[#2ACF7B] text-white px-4 py-2 rounded"
                    >
                      تقديم للمراجعة
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
