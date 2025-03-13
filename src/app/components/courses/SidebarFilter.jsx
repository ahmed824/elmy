"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";

export default function SidebarFilter({ filters, onFilterChange }) {
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedLevels, setSelectedLevels] = useState({
        "beginner": false,
        "intermediate": false,
        "advanced": false
    });
    const [isFilterBodyOpen, setIsFilterBodyOpen] = useState(true); // State to control filter body visibility

    // Update parent component filters when any filter changes
    useEffect(() => {
        // Debounce search term
        const delaySearch = setTimeout(() => {
            onFilterChange({
                min_price: priceRange[0].toString(),
                max_price: priceRange[1].toString(),
                search: searchTerm,
                min_rating: selectedRating,
                level: getSelectedLevelsString()
            });
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [priceRange, searchTerm, selectedRating, selectedLevels]);

    // Convert selected levels object to API-compatible string
    const getSelectedLevelsString = () => {
        const selected = [];
        if (selectedLevels.beginner) selected.push("beginner");
        if (selectedLevels.intermediate) selected.push("intermediate");
        if (selectedLevels.advanced) selected.push("advanced");
        return selected.join(",");
    };

    // Handle rating selection
    const handleRatingChange = (rating) => {
        setSelectedRating(rating === selectedRating ? "" : rating);
    };

    // Handle level checkbox changes
    const handleLevelChange = (level) => {
        setSelectedLevels(prev => ({
            ...prev,
            [level]: !prev[level]
        }));
    };

    // Convert API levels to Arabic
    const levelLabels = {
        "beginner": "مستوى مبتدئ",
        "intermediate": "مستوى متوسط",
        "advanced": "مستوى خبير",
        "all": "كل المستويات"
    };

    // Counts for UI display (in a real app, these would come from the API)
    const levelCounts = {
        "all": 10,
        "beginner": 4,
        "intermediate": 3,
        "advanced": 3
    };

    const ratingCounts = {
        5: 12,
        4: 8,
        3: 5,
        2: 3,
        1: 2
    };

    return (
        <aside className="bg-white shadow-lg rounded-xl p-4 w-full md:w-64 sticky top-24">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="اكتب اسم الدورة..."
                    className="w-full p-2 pr-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute top-3 right-3 text-gray-500" />
            </div>

            {/* Toggle Filter Body Button */}
            <button
                className="w-full flex items-center justify-between mt-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setIsFilterBodyOpen(!isFilterBodyOpen)}
            >
                <span className="text-gray-700">الفلاتر</span>
                {isFilterBodyOpen ? (
                    <FaChevronUp className="text-gray-500" />
                ) : (
                    <FaChevronDown className="text-gray-500" />
                )}
            </button>

            {/* Filter Body (Collapsible) */}
            {isFilterBodyOpen && (
                <div>
                    {/* Categories Section */}
                    <div className="mt-4 border-t pt-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">الفئات</h3>
                            <a href="#" className="text-purple-600 text-sm hover:underline">
                                أظهر المزيد
                            </a>
                        </div>
                        <div className="mt-2 space-y-1">
                            {/* This would be populated from the API in a real app */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">مايكروسوفت أوفيس</span>
                                <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">إكسل</span>
                                <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">وورد</span>
                                <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">2</span>
                            </div>
                        </div>
                    </div>

                    {/* Ratings Section */}
                    <div className="mt-4 border-t pt-3">
                        <h3 className="text-lg font-bold text-gray-900">التقييمات</h3>
                        <ul className="space-y-1 mt-2">
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <li key={stars} className="flex justify-between text-gray-700 items-center">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="mr-0"
                                            checked={selectedRating === stars.toString()}
                                            onChange={() => handleRatingChange(stars.toString())}
                                        />
                                        <div className="flex">
                                            {Array.from({ length: stars }).map((_, index) => (
                                                <FaStar key={index} className="text-yellow-400" />
                                            ))}
                                            {Array.from({ length: 5 - stars }).map((_, index) => (
                                                <FaRegStar key={index} className="text-gray-300" />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">
                                        {ratingCounts[stars]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Slider with Two Handles */}
                    <div className="mt-4 border-t pt-3">
                        <h3 className="text-lg font-bold text-gray-900">السعر</h3>
                        <div className="mt-4">
                            <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                min={0}
                                max={1000}
                                step={10}
                                className="w-full"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>{priceRange[0]} ريال</span>
                            <span>{priceRange[1]} ريال</span>
                        </div>
                    </div>

                    {/* Levels Section */}
                    <div className="mt-4 border-t pt-3">
                        <h3 className="text-lg font-bold text-gray-900">المستويات</h3>
                        <ul className="space-y-1 mt-2">
                            <li className="flex items-center justify-between text-gray-700">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="all-levels"
                                        checked={Object.values(selectedLevels).every(v => v === true) ||
                                            Object.values(selectedLevels).every(v => v === false)}
                                        onChange={() => {
                                            const allSelected = Object.values(selectedLevels).every(v => v === true);
                                            setSelectedLevels({
                                                beginner: !allSelected,
                                                intermediate: !allSelected,
                                                advanced: !allSelected
                                            });
                                        }}
                                    />
                                    <label htmlFor="all-levels" className="flex-1">{levelLabels.all}</label>
                                </div>
                                <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">
                                    {levelCounts.all}
                                </span>
                            </li>

                            {Object.entries(levelLabels).filter(([key]) => key !== 'all').map(([level, label]) => (
                                <li key={level} className="flex items-center justify-between text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`level-${level}`}
                                            checked={selectedLevels[level]}
                                            onChange={() => handleLevelChange(level)}
                                        />
                                        <label htmlFor={`level-${level}`} className="flex-1">{label}</label>
                                    </div>
                                    <span className="w-6 h-6 bg-[#F6F6F6] rounded flex justify-center items-center text-sm">
                                        {levelCounts[level]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Reset Filters Button */}
            <div className="mt-6">
                <button
                    className="w-full py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    onClick={() => {
                        setPriceRange([0, 1000]);
                        setSearchTerm("");
                        setSelectedRating("");
                        setSelectedLevels({
                            "beginner": false,
                            "intermediate": false,
                            "advanced": false
                        });
                        onFilterChange({
                            min_price: "",
                            max_price: "",
                            search: "",
                            min_rating: "",
                            level: ""
                        });
                    }}
                >
                    إعادة ضبط الفلاتر
                </button>
            </div>
        </aside>
    );
}