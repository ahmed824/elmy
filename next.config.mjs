/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",

  images: {
    domains: ["app.sci.com.sa", "em.test"],
  },
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
    localeDetection: false,
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: "/backend/:path*",
  //       destination: "https://app.sci.com.sa/:path*",
  //     },
  //   ];
  // }
};

export default nextConfig;
