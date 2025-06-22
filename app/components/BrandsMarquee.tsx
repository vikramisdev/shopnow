import { Marquee } from "@/components/magicui/marquee";
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
	return (
		<section className="py-12 bg-white dark:bg-neutral-900 border-t border-b border-gray-200 dark:border-neutral-800">
			<div className="max-w-screen-xl mx-auto px-4">
				<h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white mb-6">
					Trusted by the best
				</h2>
				<Marquee className="flex items-center gap-10 w-full overflow-hidden">
					{brands.map((brand) => (
						<div
							key={brand.name}
							className="flex items-center justify-center min-w-[150px] h-20 hover:scale-105 transition-transform duration-300"
						>
							<Image
								src={brand.logo}
								alt={brand.name}
								width={160}
								height={60}
								className="max-h-16 object-contain dark:invert"
								onError={(e) =>
									(e.currentTarget.src =
										"https://via.placeholder.com/160x60?text=Brand")
								}
							/>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	);
}
