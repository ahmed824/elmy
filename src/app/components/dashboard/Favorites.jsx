"use client";
import { useContext } from "react";
import { LayoutContext } from "@/app/providers/LayoutContext";
import Course from "./Course";
// import Course from "../Course";

export default function Favorites() {
  const { courses } = useContext(LayoutContext);

  const favorites = courses.filter((course) => course.isBookmarked);

  return (
    <div className="mx-1 my-[55px] w-[560px] max-w-full md:w-full">
      <div className=" w-full mx-auto md:mx-5">
        {favorites.length > 0 && (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-1 mx-3 justify-center">
            {favorites &&
              favorites.map((course) => (
                <div key={course.id + Math.random() + course.image}>
                  <Course {...course} />
                </div>
              ))}
          </div>
        )}
        {favorites.length === 0 && (
          <h2 className="text-primary-purble text-2xl font-bold w-full mx-auto text-center flex justify-center items-center h-[50vh]">
            لم تقم بإضافة أي دورة للمفضلة
          </h2>
        )}
      </div>
    </div>
  );
}
