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
		}, 4000); // every 4s

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
			className="flex flex-col-reverse md:flex-row items-center px-5 py-16 gap-10 bg-white"
		>
			{/* Text Section */}
			<div className="flex-1 text-center md:text-left z-10">
				<h1 className="text-3xl md:text-5xl font-bold text-zinc-900">
					Style Meets Comfort.
				</h1>
				<p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
					Discover top-rated brands, curated collections, and tailored
					deals just for you.
				</p>
				<button
					onClick={scrollDown}
					className="group mt-8 inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 hover:bg-zinc-800 transition"
				>
					Start Shopping
					<ArrowRight className="h-6 w-6 bg-white text-black rounded-full transition-transform group-hover:translate-x-1" />
				</button>
			</div>

			{/* Scroll-Up Image Carousel */}
			<div className="flex-1 w-full h-[88vh] overflow-hidden rounded-b-xl shadow-md relative">
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
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
