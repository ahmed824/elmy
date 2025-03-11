/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  
  images: {
    domains: ["app.sci.com.sa"],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
};

export default nextConfig;