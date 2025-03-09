"use client";

import { useState } from "react";

export default function CourseCreationForm() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    prerequisites: "",
    maxStudents: 0,
    studentLevel: "",
    pricingType: "free",
    salePrice: 0,
    discountPrice: 0,
    durationHours: 0,
    durationMinutes: 0,
    duration: "",
    additionalInfo: "",
    topics: [
      {
        name: "",
        description: "",
        lessons: [{ name: "", description: "", video: "" }],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTopics = [...course.topics];
    updatedTopics[index][name] = value;
    setCourse((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const handleLessonChange = (topicIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const updatedTopics = [...course.topics];
    updatedTopics[topicIndex].lessons[lessonIndex][name] = value;
    setCourse((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const addTopic = () => {
    setCourse((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        {
          name: "",
          description: "",
          lessons: [{ name: "", description: "", video: "" }],
        },
      ],
    }));
  };

  const addLesson = (topicIndex) => {
    const updatedTopics = [...course.topics];
    updatedTopics[topicIndex].lessons.push({
      name: "",
      description: "",
      video: "",
    });
    setCourse((prev) => ({ ...prev, topics: updatedTopics }));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">إضافة دورة جديدة</h2>
        <div className="space-y-4">
          <label className="block">
            عنوان الدورة
            <textarea
              name="title"
              className="my-1 w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
              rows={2}
              onChange={handleChange}
            />
          </label>
          <label className="block">
            وصف الدورة
            <textarea
              name="description"
              className="w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
              rows={3}
              onChange={handleChange}
            />
          </label>
          <label className="block">
            المتطلبات الأساسية
            <textarea
              name="prerequisites"
              rows={4}
              className="w-full p-2 border rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">اعدادات الدورة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <label className="block">
            الحد الأقصى للطلاب
            <input
              type="number"
              name="maxStudents"
              placeholder="الحد الأقصى للطلاب"
              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
            />
          </label>
          <label className="block">
            مستوى الطلاب
            <input
              type="text"
              name="studentLevel"
              placeholder="مستوى الطلاب"
              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
            />
          </label>
          <label className="block">
            نوع الدورة
            <input
              type="text"
              name="pricingType"
              placeholder="نوع الدورة"
              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
            />
          </label>
          <label className="block">
            السعر العادي
            <input
              type="text"
              name="salePrice"
              placeholder="السعر العادي"
              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
            />
          </label>
          <label className="block">
            سعر البيع (سعر مخفض)
            <input
              type="text"
              name="discountedPrice"
              placeholder="سعر البيع (سعر مخفض)"
              className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
            />
          </label>

          <div className="flex flex-col col-span-1 w-full">
            <div>المدة الإجمالية للدورة</div>
            <div className="flex flex-col md:flex-row justify-between">
              <label className="block w-full md:w-[48%]">
                <input
                  type="text"
                  name="durationHours"
                  placeholder="ساعة"
                  className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                />
              </label>
              <label className="block w-full md:w-[48%]">
                <input
                  type="text"
                  name="durationMinutes"
                  placeholder="دقيقة"
                  className="w-full border p-2 rounded bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-primary-purble my-1"
                />
              </label>
            </div>
          </div>
        </div>
        <label className="block mt-4">
          نوع التسعير
          <select
            name="pricingType"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="free">مجانية</option>
            <option value="paid">مدفوعة</option>
          </select>
        </label>
        {course.pricingType === "paid" && (
          <label className="block mt-4">
            السعر
            <input
              name="price"
              placeholder="السعر"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </label>
        )}
        <label className="block mt-4">
          المدة
          <input
            name="duration"
            placeholder="المدة"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </label>
        <label className="block mt-4">
          معلومات إضافية
          <textarea
            name="additionalInfo"
            placeholder="معلومات إضافية"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mt-6">محتوى الدورة</h3>
        {course.topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="p-4 border rounded mt-4">
            <label className="block">
              اسم الموضوع
              <input
                name="name"
                placeholder="اسم الموضوع"
                className="w-full p-2 border rounded"
                onChange={(e) => handleTopicChange(topicIndex, e)}
              />
            </label>
            <label className="block mt-2">
              وصف الموضوع
              <textarea
                name="description"
                placeholder="وصف الموضوع"
                className="w-full p-2 border rounded"
                onChange={(e) => handleTopicChange(topicIndex, e)}
              />
            </label>
            <h4 className="mt-4">الدروس</h4>
            {topic.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="p-2 border rounded mt-2">
                <label className="block">
                  اسم الدرس
                  <input
                    name="name"
                    placeholder="اسم الدرس"
                    className="w-full p-2 border rounded"
                    onChange={(e) =>
                      handleLessonChange(topicIndex, lessonIndex, e)
                    }
                  />
                </label>
                <label className="block mt-2">
                  وصف الدرس
                  <textarea
                    name="description"
                    placeholder="وصف الدرس"
                    className="w-full p-2 border rounded"
                    onChange={(e) =>
                      handleLessonChange(topicIndex, lessonIndex, e)
                    }
                  />
                </label>
                <label className="block mt-2">
                  فيديو
                  <input
                    name="video"
                    type="file"
                    className="w-full p-2 border rounded"
                  />
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => addLesson(topicIndex)}
            >
              إضافة درس جديد
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={addTopic}
        >
          إضافة موضوع جديد
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded mt-6 block w-full">
          تقديم المراجعة
        </button>
      </div>
    </>
  );
}
