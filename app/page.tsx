"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Featured from "./components/Featured";
import NewCollection from "./components/NewCollection";
import Footer from "./components/Footer";
import BrandsMarquee from "./components/BrandsMarquee";
import Sale from "./components/Sale";

export interface DefaultProps {
  isSignedIn: unknown;
}

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Sale />
      <BrandsMarquee />
      <Featured />
      <NewCollection />
      <Footer />
    </div>
  );
}
