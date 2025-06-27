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
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % heroImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const scrollDown = () => {
		document
			.getElementById("sale-section")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			id="hero-section"
			className="flex flex-col-reverse md:flex-row items-center justify-between w-full px-6 md:px-20 py-5 gap-10 bg-white dark:bg-black transition-colors"
		>
			{/* Left Side - Text */}
			<div className="flex-1 flex flex-col gap-6 text-center md:text-left z-10">
				<div className="space-y-2">
					<h2 className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
						Exclusive Offer
					</h2>
					<h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white">
						<span className="inline-block px-2 py-1 dark:text-black bg-yellow-200 rounded-md">
							Style
						</span>{" "}
						Meets <br />
						<span className="inline-block px-2 py-1 bg-zinc-900 text-white rounded-md dark:bg-white dark:text-black">
							Comfort
						</span>
					</h1>
				</div>

				<p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
					Handpicked fashion, curated collections, & massive
					discounts—
					<span className="font-semibold text-black dark:text-white">
						{" "}
						all in one place
					</span>
					.
				</p>

				<div className="mt-4 flex justify-center md:justify-start">
					<button
						onClick={scrollDown}
						className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-semibold rounded-full uppercase hover:bg-zinc-800 dark:hover:bg-zinc-700 transition"
					>
						Start Shopping
						<ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>

			{/* Right Side - Image Carousel */}
			<div className="flex-1 w-full h-[60vh] md:h-[70vh] relative rounded-3xl overflow-hidden shadow-lg">
				<div
					className="h-full flex flex-col transition-transform duration-1000 ease-in-out"
					style={
						!isMobile
							? {
									transform: `translateY(-${
										currentIndex * 100
									}%)`,
							  }
							: {}
					}
				>
					{heroImages.map((src, index) => (
						<div
							key={index}
							className="relative w-full h-[60vh] md:h-[70vh] flex-shrink-0"
						>
							<Image
								src={src}
								alt={`Hero image ${index + 1}`}
								fill
								className="object-cover object-center"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority={index === 0}
							/>
							<div className="absolute inset-0 bg-black/20" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
