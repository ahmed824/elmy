"use client";
import dynamic from "next/dynamic";

// Dynamic imports with ssr: false for all components
const Filter = dynamic(() => import("@/app/components/Home/Filter"), {
  ssr: false,
});

const Header = dynamic(() => import("@/app/components/Home/header"), {
  ssr: false,
});

const MoreSearch = dynamic(() => import("@/app/components/Home/MoreSearch"), {
  ssr: false,
});

const MoreWatch = dynamic(() => import("@/app/components/Home/MoreWatch"), {
  ssr: false,
});

const Notify = dynamic(() => import("@/app/components/Home/notify"), {
  ssr: false,
});

const Opinion = dynamic(() => import("@/app/components/Home/Opinion"), {
  ssr: false,
});

const ShowOff = dynamic(() => import("@/app/components/Home/ShowOff"), {
  ssr: false,
});

const WhySection = dynamic(() => import("@/app/components/Home/WhySection"), {
  ssr: false,
});

const Trainer = dynamic(() => import("@/app/components/Home/Trainer"), {
  ssr: false,
});

export default function HomeMain() {
  return (
    <div className="min-h-screen">
      <Notify />
      <Header />
      <Filter />
      <MoreSearch />
      <ShowOff />
      <MoreWatch />
      <WhySection />
      <Opinion />
      <Trainer />
    </div>
  );
}