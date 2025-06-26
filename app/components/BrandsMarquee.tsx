"use client";

import Image from "next/image";

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
	const fullBrands = [...brands, ...brands]; // loop effect

	return (
		<section className="relative py-14 bg-white dark:bg-neutral-900 border-y border-gray-200 dark:border-neutral-800 overflow-hidden">
			<div className="max-w-screen-xl mx-auto px-4">
				<h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white mb-10">
					Trusted by the Best Brands
				</h2>

				{/* Marquee container */}
				<div className="overflow-hidden relative">
					<div className="flex w-max gap-12 animate-marquee hover:[animation-play-state:paused]">
						{fullBrands.map((brand, i) => (
							<div
								key={`${brand.name}-${i}`}
								className="w-32 h-20 px-4 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-125"
								style={{ flexShrink: 0 }}
							>
								<Image
									src={brand.logo}
									alt={brand.name}
									width={160}
									height={60}
									className="object-contain h-full w-full dark:invert"
									onError={(e) => {
										e.currentTarget.src =
											"https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0";
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Marquee keyframes */}
			<style jsx>{`
				.animate-marquee {
					animation: marquee 25s linear infinite;
				}

				@keyframes marquee {
					0% {
						transform: translateX(0%);
					}
					100% {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</section>
	);
}
