"use client";

import Image from "next/image";
import React from "react";

const brands = [
	{ name: "Bata", logo: "https://static.cdnlogo.com/logos/b/58/bata.svg" },
	{
		name: "Jordan",
		logo: "https://static.cdnlogo.com/logos/j/61/jordan.svg",
	},
	{ name: "Nike", logo: "https://static.cdnlogo.com/logos/n/67/nike.svg" },
	{ name: "Puma", logo: "https://static.cdnlogo.com/logos/p/91/puma.svg" },
	{
		name: "Reebok",
		logo: "https://static.cdnlogo.com/logos/r/62/reebok.svg",
	},
	{
		name: "Converse",
		logo: "https://static.cdnlogo.com/logos/c/1/converse.svg",
	},
	{ name: "Vans", logo: "https://static.cdnlogo.com/logos/v/16/vans.svg" },
	{
		name: "New Balance",
		logo: "https://static.cdnlogo.com/logos/n/45/new-balance.svg",
	},
	{
		name: "Under Armour",
		logo: "https://static.cdnlogo.com/logos/u/33/under-armour.svg",
	},
	{ name: "ASICS", logo: "https://static.cdnlogo.com/logos/a/18/asics.svg" },
	{ name: "Fila", logo: "https://static.cdnlogo.com/logos/f/9/fila.svg" },
	{
		name: "Skechers",
		logo: "https://static.cdnlogo.com/logos/s/35/skechers.svg",
	},
	{
		name: "Timberland",
		logo: "https://static.cdnlogo.com/logos/t/30/timberland.svg",
	},
];

export default function BrandsMarquee() {
	const fullBrands = [...brands, ...brands]; // for seamless loop

	return (
		<section className="relative py-16 overflow-hidden border-b dark:border-b-black bg-white dark:bg-black">
			<div className="max-w-screen-xl mx-auto px-4">
				<h2
					className="text-center text-[0.75rem] md:text-[20px] font-light text-gray-800 dark:text-white mb-8 tracking-wide"
					style={{ fontFamily: `"Poppins", sans-serif` }}
				>
					Trusted by the <span className="text-blue-600">brands</span>{" "}
					you love
				</h2>

				{/* Marquee Container */}
				<div className="overflow-hidden relative">
					{/* Side gradients - only in light mode */}
					<div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none dark:hidden" />
					<div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none dark:hidden" />

					<div className="flex w-max gap-12 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
						{fullBrands.map((brand, i) => (
							<div
								key={`${brand.name}-${i}`}
								className="w-28 md:w-32 h-20 px-2 md:px-4 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
								style={{ flexShrink: 0 }}
								title={brand.name}
								aria-label={brand.name}
								role="img"
							>
								<Image
									src={brand.logo}
									alt={brand.name}
									width={140}
									height={60}
									className="object-contain h-full w-full dark:invert grayscale hover:grayscale-0"
									onError={(e) => {
										e.currentTarget.src =
											"https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?q=80&w=1170";
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes marquee {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-marquee {
					animation: marquee 25s linear infinite;
				}
			`}</style>
		</section>
	);
}
