import React from 'react'
import { FaStar } from 'react-icons/fa';

export const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className="text-[#FF8F3C]" />
            ))}
            {/* Half Star */}
            {hasHalfStar && <FaStar key="half" className="text-[#FF8F3C] opacity-50" />}
            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <FaStar key={`empty-${i}`} className="text-gray-300" />
            ))}
        </div>
    );
};