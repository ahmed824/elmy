"use client";
import HomeCourse from "../shared/HomeCourse/HomeCourse";
// import Course from "./Course";
import { useFavoriteCourses } from "@/app/customKooks/authGetFav";
// import Course from "../Course";

export default function Favorites() {
  const { data: courses } = useFavoriteCourses('ar');
  console.log(courses);

  return (
    <div className="mx-1 my-[55px] w-[560px] max-w-full md:w-full">
      <div className=" w-full mx-auto md:mx-5">
        {courses?.length > 0 && (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-1 mx-3 justify-center">
            {courses &&
              courses?.map((course) => (
                <div key={course.id + Math.random() + course.image}>
                  <HomeCourse {...course} />
                </div>
              ))}
          </div>
        )}
        {courses?.length ||
          (!courses  && (
            <h2 className="text-primary-purble text-2xl font-bold w-full mx-auto text-center flex justify-center items-center h-[50vh]">
              لم تقم بإضافة أي دورة للمفضلة
            </h2>
          ))}
      </div>
    </div>
  );
}
