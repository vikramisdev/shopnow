"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BrandsMarquee from "./components/BrandsMarquee";
import Featured from "./components/Featured";
import NewCollection from "./components/NewCollection";
import Footer from "./components/Footer";
import SeasonSale from "./components/SeasonSale";

export default function Home() {
	return (
		<div className="min-h-screen w-full">
			<Header />
			<HeroSection />
			<BrandsMarquee />
			<SeasonSale />
			<Featured />
			<NewCollection />
			<Footer />
		</div>
	);
}
