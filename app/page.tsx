"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Sale from "./components/Sale";
import BrandsMarquee from "./components/BrandsMarquee";
import Featured from "./components/Featured";
import NewCollection from "./components/NewCollection";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen w-full">
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
