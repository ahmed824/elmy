"use client";
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function SocialShare() {
  const { t } = useTranslation();

  const handleShare = (platform) => {
    const url = window.location.href; // Current page URL
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, // Instagram doesn't have a direct share API
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[platform], '_blank');
  };

  return (
    <>
      <h5 className="text-[#6B7385] text-[18px] text-center">{t('socialShare.shareCourse')}</h5>
      <div className="flex justify-center gap-4 mt-4">
        {/* Facebook Icon */}
        <div
          onClick={() => handleShare('facebook')}
          className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-100 hover:bg-mainColor transition-all duration-500 ease-in-out cursor-pointer overflow-hidden group"
        >
          <FiFacebook className="text-gray-500 text-xl group-hover:text-white transition-all duration-500 ease-in-out z-10" />
          <div className="absolute inset-0 bg-mainColor rounded-full scale-0 group-hover:scale-100 origin-center transition-all duration-500 ease-in-out"></div>
        </div>

        {/* Instagram Icon */}
        <div
          onClick={() => handleShare('instagram')}
          className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-100 hover:bg-mainColor transition-all duration-500 ease-in-out cursor-pointer overflow-hidden group"
        >
          <FiInstagram className="text-gray-500 text-xl group-hover:text-white transition-all duration-500 ease-in-out z-10" />
          <div className="absolute inset-0 bg-mainColor rounded-full scale-0 group-hover:scale-100 origin-center transition-all duration-500 ease-in-out"></div>
        </div>

        {/* LinkedIn Icon */}
        <div
          onClick={() => handleShare('linkedin')}
          className="relative w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-100 hover:bg-mainColor transition-all duration-500 ease-in-out cursor-pointer overflow-hidden group"
        >
          <FiLinkedin className="text-gray-500 text-xl group-hover:text-white transition-all duration-500 ease-in-out z-10" />
          <div className="absolute inset-0 bg-mainColor rounded-full scale-0 group-hover:scale-100 origin-center transition-all duration-500 ease-in-out"></div>
        </div>
      </div>
    </>
  );
}