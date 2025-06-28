"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BrandsMarquee from "./components/BrandsMarquee";
import Featured from "./components/Featured";
import NewCollection from "./components/NewDrop";
import Footer from "./components/Footer";
import SeasonSale from "./components/SeasonSale";
import ImageCarousal from "./components/ImageCarousal";

export default function Home() {
	return (
		<div className="min-h-screen w-full">
			<Header />
			<HeroSection />
			<BrandsMarquee />
			<SeasonSale />
			<ImageCarousal />
			<Featured />
			<NewCollection />
			<Footer />
		</div>
	);
}
