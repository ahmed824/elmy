"use client";

import React from 'react';
import Image from 'next/image';
import KnowMoreButton from '../shared/btns/KnowMoreButton';
import img from "@/images/siber.svg";
import useMostSearchedCategories from '@/app/customKooks/most-searchedCat';
import { useRouter } from 'next/navigation';

export default function MoreSearch() {
    const router = useRouter();

    const { data, isLoading, isError } = useMostSearchedCategories({ lang: 'ar', limit: 4 });

    if (isLoading) {
        return <div className="text-center py-10">Loading most searched categories...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Error fetching most searched categories</div>;
    }

    const categories = data?.data || [];

    const handleClick = (id) => {
        router.push(`/categories/${id}`);
    };

    return (
        <section className="py-10 px-5 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
                أكثر الفئات بحثاً في علمي
            </h2>
            <div className="border-b-2 border-purple-600 w-32 mx-auto mb-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="p-6 rounded-lg transition-shadow duration-300"
                    >
                        {/* Image Container */}
                        <div className="w-full mb-4 flex justify-center">
                            <Image
                                src={category.image || img}
                                alt={category.name || "صورة كورس"}
                                className="rounded-lg object-contain"
                                style={{ width: 'auto', height: 'auto' }}
                                width={100} // Default width (can be adjusted)
                                height={100} // Default height (can be adjusted)
                            />
                        </div>

                        {/* Content Below Image */}
                        <div className="text-center" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {category.name}
                            </h3>
                            <div className="flex justify-center">
                                {/* Pass the handleClick function and category id to the KnowMoreButton */}
                                <KnowMoreButton onClick={() => handleClick(category.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}