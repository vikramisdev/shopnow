"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const seasons = [
	{
		name: "Summer",
		months: [3, 4, 5],
		title: "Summer Collection '25",
		subtitle: "Breathe light. Move bold. Up to 50% Off.",
		coupon: "SUMMER50",
		bgColor: "bg-white",
		textColor: "text-neutral-900",
		image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		name: "Monsoon",
		months: [6, 7, 8, 9, 10],
		title: "Monsoon '25 Drops",
		subtitle: "Waterproof gear. Effortless style. 40% Off.",
		coupon: "RAINY40",
		bgColor: "bg-white",
		textColor: "text-neutral-900",
		image: "https://images.unsplash.com/photo-1739372679830-401df26f1974?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		name: "Winter",
		months: [11, 12, 1, 2],
		title: "Winter Essentials '25",
		subtitle: "Warmth meets elegance. Flat 30% Off.",
		coupon: "COZY30",
		bgColor: "bg-white",
		textColor: "text-neutral-900",
		image: "https://plus.unsplash.com/premium_photo-1673286712645-9600beaa4a92?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export default function SeasonSale() {
	const month = new Date().getMonth() + 1;
	const season = seasons.find((s) => s.months.includes(month)) || seasons[0];

	const [time, setTime] = useState(86400); // 24hr countdown

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((t) => (t > 0 ? t - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const h = String(Math.floor(time / 3600)).padStart(2, "0");
	const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
	const s = String(time % 60).padStart(2, "0");

	return (
		<section
			className={`${season.bgColor} text-black w-full grid grid-cols-1 md:grid-cols-2 min-h-[70vh] dark:bg-black`}
		>
			{/* Text Block */}
			<div className="flex flex-col justify-center px-6 py-14 md:px-16 gap-4">
				<h1
					className={`text-3xl md:text-4xl font-bold ${season.textColor} dark:text-white`}
				>
					{season.title}
				</h1>
				<p className="text-base md:text-lg text-neutral-700 dark:text-gray-400">
					{season.subtitle}
				</p>

				<span className="inline-block bg-black text-white w-max px-4 py-1 rounded-full tracking-widest text-sm font-semibold">
					{season.coupon}
				</span>

				<p className="text-xs text-neutral-500 font-mono mt-4">
					Sale ends in: {h}:{m}:{s}
				</p>
			</div>

			{/* Image Block */}
			<div className="relative w-full h-[300px] md:h-auto">
				<Image
					src={season.image}
					alt={season.name}
					fill
					className="object-cover"
					priority
				/>
			</div>
		</section>
	);
}
