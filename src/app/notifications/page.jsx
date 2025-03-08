"use client"; // Since we're using client-side features

import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import BreadCramp from '../components/shared/breadCramp/BreadCramp';
import Image from 'next/image';
import noNotification from "@/images/no-notification.svg";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "دورة جديدة متاحة!",
      message: "تم إضافة دورة 'أساسيات البرمجة' إلى قائمتك.",
      type: "success",
      date: "2025-03-05 10:30",
      read: false,
    },
    {
      id: 2,
      title: "انتهاء المهلة",
      message: "انتهت مهلة التسجيل في دورة 'تصميم UI/UX'.",
      type: "error",
      date: "2025-03-04 15:00",
      read: false,
    },
    {
      id: 3,
      title: "إشعار ترقية",
      message: "تهانينا! تمت ترقيتك إلى عضوية مميزة.",
      type: "success",
      date: "2025-03-03 09:15",
      read: true,
    },
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  return (
    <div className="min-h-screen">
      <BreadCramp title={"الإشعارات"} />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 m-auto mt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaBell className="text-mainColor text-3xl" />
            <h1 className="text-2xl md:text-3xl font-semibold text-[#121D2F]">
              الإشعارات - علمي
            </h1>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-sm text-mainColor hover:underline focus:outline-none"
          >
            تحديد الكل كمقروء
          </button>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <Image
              src={noNotification}
              alt="No Notifications"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <p className="text-[#121D2F] text-3xl font-medium ">
              لا توجد إشعارات
            </p>
            <Link href="/" className="text-mainColor hover:underline mt-4 inline-block">
              العودة إلى الرئيسية
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                  notif.read
                    ? 'bg-gray-50'
                    : 'bg-gradient-to-r from-[#F4F4F4] to-white shadow-md'
                } hover:shadow-lg`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {notif.type === 'success' ? (
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-2xl" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2
                    className={`text-lg font-medium ${
                      notif.read ? 'text-gray-600' : 'text-[#121D2F]'
                    }`}
                  >
                    {notif.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-mainColor hover:text-purple-700 text-sm focus:outline-none"
                    >
                      قراءة
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}