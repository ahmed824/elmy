"use client";
import dynamic from "next/dynamic";
const HomeMain = dynamic(() => import("./components/Home/HomeMain"), {
  ssr: false,
  priority: true,
  suspense: true,
});

export default function Home() {

  return (
    <div className="min-h-screen">
      <HomeMain />
    </div>
  );
}
