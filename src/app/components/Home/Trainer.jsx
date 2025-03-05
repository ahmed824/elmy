'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BG from "@/images/trainer/bg-instructor.svg";

const texts = [
    { id: 1, content: "حقق شهرة اكبر" },
    { id: 2, content: "طور مهاراتك" },
    { id: 3, content: "شارك خبراتك" },
    { id: 4, content: "ابدأ رحلتك التعليمية" }
];

export default function Trainer() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const text = texts[currentTextIndex].content;
        let currentChar = 0;

        if (isTyping) {
            const typingInterval = setInterval(() => {
                if (currentChar <= text.length) {
                    setDisplayText(text.slice(0, currentChar));
                    currentChar++;
                } else {
                    setIsTyping(false);
                    setTimeout(() => {
                        setIsTyping(true);
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    }, 2000);
                    clearInterval(typingInterval);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }
    }, [currentTextIndex, isTyping]);

    return (
        <section className="min-h-[90vh] sm:min-h-screen flex items-center justify-center my-4 sm:mt-64 relative overflow-hidden px-4">
            {/* Background Image */}
            <div className="absolute  inset-0 top-[-119px] sm:-top-[70px] w-full h-full">
                <Image
                    src={BG}
                    alt="Background"
                    fill
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    className="animate-float"
                    priority
                />
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
                <div className="mb-8 sm:mb-12">
                    <h3 className="text-[#121D2F] text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                        سجل كمدرب الآن و{' '}
                        <span className="bg-gradient-to-r from-[#A436F0] to-[#637FEA] bg-clip-text text-transparent inline-block min-h-[30px] sm:min-h-[40px]">
                            {displayText}
                            <span className="animate-blink inline-block h-8 sm:h-11 -mb-1 sm:-mb-2 w-[2px] bg-gray-400 mx-1"></span>
                        </span>
                    </h3>
                    <p className="font-medium text-base sm:text-lg md:text-[20px] text-[#6B7385] leading-relaxed px-4 sm:px-0">
                        يقوم المدربون من جميع أنحاء العالم بتعليم ملايين المتعلمين على علمي. نحن نقدم الأدوات والمهارات
                        اللازمة لتعليم ما تحب.
                    </p>
                </div>

                <button className="bg-gradient-to-r from-[#A436F0] via-[#637FEA] to-[#A436F0] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-[18px] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto" data-aos="fade-up">
                    سجل كمدرب الآن
                </button>
            </div>
        </section>
    );
}