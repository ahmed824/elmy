"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Helper function to extract Vimeo video ID
const getVimeoVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Helper function to determine video type
const getVideoType = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return "youtube";
    } else if (url.includes("vimeo.com")) {
        return "vimeo";
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return "direct";
    }
    return null;
};

export default function CourseContent({ data }) {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

    const handlePreviewClick = (videoUrl) => {
        setSelectedVideoUrl(videoUrl);
        setIsDialogOpen(true);
    };

    // Render the appropriate video player based on the video type
    const renderVideoPlayer = (url) => {
        const videoType = getVideoType(url);

        switch (videoType) {
            case "youtube":
                const youtubeVideoId = getYouTubeVideoId(url);
                return (
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title="Lesson Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    />
                );
            case "vimeo":
                const vimeoVideoId = getVimeoVideoId(url);
                return (
                    <iframe
                        src={`https://player.vimeo.com/video/${vimeoVideoId}`}
                        title="Lesson Preview"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    />
                );
            case "direct":
                return (
                    <video controls className="w-full h-full rounded-lg">
                        <source src={url} type={`video/${url.split('.').pop()}`} />
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return <p className="text-center text-gray-500">Unsupported video URL</p>;
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">محتوى الدورة</h2>
            <p className="text-gray-500 text-sm mb-4">
                {data?.duration || 0}
            </p>

            <div className="border-t border-gray-200">
                {data?.modules?.map((module, index) => (
                    <div key={module.id} className="border-b border-gray-200">
                        <button
                            onClick={() => toggleSection(index)}
                            className="w-full flex justify-between items-center py-3 px-4 text-right text-gray-900 font-semibold"
                        >
                            {module.title}
                            {openSection === index ? (
                                <FaMinus className="text-mainColor" />
                            ) : (
                                <FaPlus className="text-mainColor" />
                            )}
                        </button>

                        {openSection === index && module.lessons.length > 0 && (
                            <div className="bg-gray-50 p-4 text-gray-700">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between py-2 gap-4">
                                        <span className="flex-1 text-right">{lesson.title}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 text-sm">{lesson.duration} دقيقة</span>
                                            {lesson.is_preview ? (
                                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <button
                                                            onClick={() => handlePreviewClick(lesson.video_url)}
                                                            className="flex items-center gap-1 text-mainColor bg-[#A436F030] rounded px-3 py-1 hover:bg-[#A436F040] transition-colors duration-300"
                                                        >
                                                            <FaEye className="text-mainColor" />
                                                            معاينة
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[800px]">
                                                        <DialogTitle className="sr-only">معاينة الدرس</DialogTitle>
                                                        <div className="aspect-video">
                                                            {renderVideoPlayer(selectedVideoUrl)}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                <span className="flex items-center gap-1 cursor-not-allowed text-gray-500 bg-gray-100 rounded px-3 py-1 hover:bg-gray-200 transition-colors duration-300 line-through">
                                                    <FaEye className="text-gray-500 line-through" />
                                                    معاينة
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}