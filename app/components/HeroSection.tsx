"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const heroImages = [
	"https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
	"https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
	"https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg",
	"https://images.pexels.com/photos/6311393/pexels-photo-6311393.jpeg",
	"https://images.pexels.com/photos/6311613/pexels-photo-6311613.jpeg",
];

export default function HeroSection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % heroImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, []);

	const scrollDown = () => {
		document
			.getElementById("sale-section")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			id="hero-section"
			className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-16 md:py-24 gap-10 bg-white relative overflow-hidden"
		>
			{/* Text Section */}
			<div className="flex-1 z-10 text-center md:text-left space-y-6">
				<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
					Style Meets Comfort
				</h1>
				<p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
					Discover top-rated brands, curated collections, and
					exclusive deals— all tailored for your lifestyle.
				</p>
				<button
					onClick={scrollDown}
					className="group mt-4 inline-flex items-center gap-2 bg-zinc-900 text-white font-medium rounded-full px-6 py-3 hover:bg-zinc-800 transition-all"
				>
					Start Shopping
					<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 bg-white text-black rounded-full p-1" />
				</button>
			</div>

			{/* Carousel Section */}
			<div className="flex-1 w-full h-[88vh] rounded-3xl overflow-hidden relative shadow-xl">
				<div
					className="h-full transition-transform duration-1000 ease-in-out"
					style={{
						transform: `translateY(-${currentIndex * 100}%)`,
					}}
				>
					{heroImages.map((src, index) => (
						<div
							key={index}
							className="relative w-full h-[88vh] flex-shrink-0"
						>
							<Image
								src={src}
								alt={`Hero image ${index + 1}`}
								fill
								className="object-cover object-center"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority={index === 0}
							/>
							{/* Overlay for contrast */}
							<div className="absolute inset-0 bg-black/20" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
