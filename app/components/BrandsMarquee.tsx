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
		<div className="py-12">
			<Marquee
				// pauseOnHover
				className="flex items-center gap-8 w-full overflow-hidden"
			>
				{brands.map((brand) => (
					<Image
						key={brand.name}
						src={brand.logo}
						alt={brand.name}
						width={200}
						height={50}
						className={`object-fill h-28 ${
							brand.name === "Adidas" ? "invert" : ""
						}`}
					/>
				))}
			</Marquee>
		</div>
	);
}
