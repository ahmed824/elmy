'use client'
import course1Img from "../images/dashboard/course1.png";
import course2Img from "../images/dashboard/course2.png";
import course3Img from "../images/dashboard/course3.png";
import course4Img from "../images/dashboard/course4.png";
import course5Img from "../images/dashboard/course5.png";
import course6Img from "../images/dashboard/course6.png";
import course7Img from "../images/dashboard/course7.png";

const courses = [
  {
    id: 1,
    name: "تطوير تطبيقات الويب باستخدام React",
    image: course1Img,
    price: 200,
    lessons: 100,
    videos: 20,
    rating: 4.5,
    enrollments: 200,
    completed: false,
    isBookmarked: false,
  },
  {
    id: 2,
    name: "تطوير تطبيقات الويب باستخدام Angular",
    image: course2Img,
    price: 250,
    lessons: 150,
    videos: 25,
    rating: 4.7,
    enrollments: 300,
    completed: true,
    isBookmarked: false,
  },
  {
    id: 3,
    name: "تطوير تطبيقات الويب باستخدام Vue",
    image: course3Img,
    price: 150,
    lessons: 80,
    videos: 15,
    rating: 4.6,
    enrollments: 250,
    completed: false,
    isBookmarked: false,
  },
];

const secondSecCourses = [
  {
    id: 4,
    name: "تطوير تطبيقات الويب باستخدام React",
    image: course4Img,
    price: 200,
    lessons: 100,
    videos: 20,
    rating: 4.5,
    enrollments: 200,
    completed: true,
    isBookmarked: false,
  },
  {
    id: 5,
    name: "تطوير تطبيقات الويب باستخدام Angular",
    image: course5Img,
    price: 250,
    lessons: 150,
    videos: 25,
    rating: 4.7,
    enrollments: 300,
    completed: false,
    isBookmarked: false,
  },
  {
    id: 6,
    name: "تطوير تطبيقات الويب باستخدام Vue",
    image: course6Img,
    price: 150,
    lessons: 80,
    videos: 15,
    rating: 4.6,
    enrollments: 250,
    completed: true,
    isBookmarked: false,
  },
  {
    id: 7,
    name: "تطوير تطبيقات الويب باستخدام Vue",
    image: course7Img,
    price: 150,
    lessons: 80,
    videos: 15,
    rating: 4.6,
    enrollments: 250,
    completed: false,
    isBookmarked: false,
  },
];

const moreCourses = [
  {
    id: 8,
    name: "تطوير تطبيقات الويب باستخدام React",
    image: course1Img,
    price: 200,
    lessons: 100,
    videos: 20,
    rating: 4.5,
    enrollments: 200,
    completed: true,
    isBookmarked: false,
  },
  {
    id: 9,
    name: "تطوير تطبيقات الويب باستخدام Angular",
    image: course2Img,
    price: 250,
    lessons: 150,
    videos: 25,
    rating: 4.7,
    enrollments: 300,
    completed: false,
    isBookmarked: false,
  },
  {
    id: 10,
    name: "تطوير تطبيقات الويب باستخدام Vue",
    image: course3Img,
    price: 150,
    lessons: 80,
    videos: 15,
    rating: 4.6,
    enrollments: 250,
    completed: true,
    isBookmarked: false,
  },
  {
    id: 11,
    name: "تطوير تطبيقات الويب باستخدام Vue",
    image: course1Img,
    price: 150,
    lessons: 80,
    videos: 15,
    rating: 4.6,
    enrollments: 250,
    completed: false,
    isBookmarked: false,
  },
];

export default courses;
export { secondSecCourses, moreCourses };
