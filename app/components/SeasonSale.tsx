"use client";

import React, { useEffect, useState } from "react";

const seasons = [
	{
		name: "Summer",
		months: [3, 4, 5], // Removed June from here
		title: "🔥 Summer Sale",
		subtitle: "Flat 50% OFF on Everything",
		coupon: "SUMMER50",
		bgColor: "bg-yellow-200",
		textColor: "text-yellow-800",
		emoji: "🍉",
	},
	{
		name: "Monsoon",
		months: [6, 7, 8, 9, 10], // Includes June now
		title: "🌧️ Monsoon Madness",
		subtitle: "Up to 40% OFF on Selected Items",
		coupon: "RAINY40",
		bgColor: "bg-cyan-200",
		textColor: "text-cyan-800",
		emoji: "☔",
	},
	{
		name: "Winter",
		months: [11, 12, 1, 2],
		title: "❄️ Winter Blowout",
		subtitle: "Flat 30% OFF on Jackets & More",
		coupon: "COZY30",
		bgColor: "bg-orange-200",
		textColor: "text-orange-800",
		emoji: "🧣",
	},
];

export default function SeasonSale() {
	const month = new Date().getMonth() + 1;
	const season = seasons.find((s) => s.months.includes(month)) || seasons[0];

	const [time, setTime] = useState(86400); // 24h countdown
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
			id="sale-section"
			className={`${season.bgColor} w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between text-black`}
		>
			{/* Left */}
			<div className="w-full md:w-1/2 px-6 py-12 md:p-20 flex flex-col justify-center gap-4">
				<h1
					className={`text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight ${season.textColor}`}
				>
					{season.title}
				</h1>
				<p className="text-base sm:text-lg md:text-xl font-medium text-neutral-800">
					{season.subtitle}
				</p>

				<div className="mt-2 text-sm sm:text-base font-semibold tracking-wide">
					<span className="bg-white px-3 py-1 rounded-full shadow-sm text-black">
						{season.coupon}
					</span>
				</div>

				<div className="flex gap-4 mt-6 flex-wrap">
					<button className="bg-black text-white px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:opacity-90 transition">
						Start Shopping
					</button>
					<button className="bg-white text-black px-6 py-3 rounded-full text-sm uppercase tracking-wider border border-black hover:bg-black hover:text-white transition">
						View Offers
					</button>
				</div>

				<div className="text-xs font-mono mt-4 text-neutral-700">
					Sale ends in: {h}:{m}:{s}
				</div>
			</div>

			{/* Right */}
			<div className="w-full md:w-1/2 flex justify-center items-center px-6 py-10 md:py-0">
				<div className="text-[5rem] sm:text-[7rem] md:text-[9rem]">
					{season.emoji}
				</div>
			</div>
		</section>
	);
}
