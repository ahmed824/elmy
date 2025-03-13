"use client";
import React, { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { useCat } from "@/app/customKooks/useCat";
import DotsLoader from "../shared/DotsLoader";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Import shadcn/ui dropdown components
import { useTranslation } from "react-i18next";

const CategoriesMenu = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data, error, isLoading } = useCat();
  const { t } = useTranslation();

  if (isLoading) {
    return <DotsLoader />;
  }
  if (error) return <p>{t("errorLoadingCategories")}</p>;

  const categories = data?.data || [];

  return (
    <div className="relative">
      {/* Categories Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="flex group bg-mainColor text-white p-1 sm:px-4 rounded-lg items-center gap-2 
                       transition-all duration-300 ease-in-out cursor-pointer hover:bg-purple-100"
          >
            <p className="hidden sm:block font-medium transition-colors duration-300 ease-in-out group-hover:text-mainColor">
              {t("navbar.categories")}
            </p>
            <span className="grid place-items-center w-6 h-6 rounded transition-all duration-300 ease-in-out">
              <AiFillAppstore className="text-white text-xl transition-colors duration-300 ease-in-out group-hover:text-mainColor" />
            </span>
          </div>
        </DropdownMenuTrigger>

        {/* Dropdown Menu */}
        <DropdownMenuContent
          className="w-[600px] bg-white shadow-lg rounded-lg z-50 p-0"
          align="end" // Align dropdown to the right
        >
          <div className="flex w-full flex-row-reverse">
            {/* Categories Section */}
            <div className="w-1/2 border-l">
              <ul className="py-2">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    className={`px-4 py-2 flex justify-end text-right hover:bg-purple-50 cursor-pointer ${hoveredCategory === category.id ? "bg-purple-50" : ""}`}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                  >
                    <Link href={`/courses/${category.id}/${category.name.replace(/\s+/g, "-")}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </ul>
            </div>
            {/* SubCategories Section */}
            <div className="w-1/2">
              <ul className="py-2">
                {hoveredCategory &&
                  categories
                    .find((cat) => cat.id === hoveredCategory)
                    ?.courses.map((course) => (
                      <DropdownMenuItem
                        key={course.id}
                        className="px-4 py-2 text-right hover:bg-purple-50 cursor-pointer flex justify-end"
                      >
                        <Link href={`/courseDetails/${course.id}/${course.title.replace(/\s+/g, "-")}`}>
                          {course.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
              </ul>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoriesMenu;
