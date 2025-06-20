import Image from "next/image";
import React, { useState } from "react";
import Accordian from "./Accordian";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ClothSizes from "./ClothSizes";
import { Button } from "@/components/ui/button";
import Review from "./Review";
import { Check, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductPreviewProps {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	price: string;
	category?: string;
	returnPolicy?: string;
	rating: number;
	brand?: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
	id,
	thumbnail,
	title,
	description,
	price,
	rating,
	brand,
	category,
}) => {
	const router = useRouter();
	const [itemInCart, addItemToCart] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const checkInCart = () => {
		addItemToCart(!itemInCart);
	};

	return (
		<div className="flex flex-wrap-reverse md:py-12">
			<div className="flex-1 md:py-8 md:px-6">
				<h1 className="md:text-8xl text-3xl font-semibold mt-6 md:mt-0">
					{title}
				</h1>
				<h1 className="text-2xl pt-8 font-semibold">${price}</h1>
				<ClothSizes className="mt-8" />
				<p className="pt-4 md:pr-36">{description}</p>
				<p className="py-1 px-2 w-fit font-semibold bg-green-50 mt-6 text-green-950">
					Exchange & Return Available
				</p>
				<Accordian className="my-4">
					<h1>
						<b>Brand:</b> {brand}
					</h1>
					<h1 className="flex items-center gap-x-2">
						<b>Ratings:</b>
						<StarFilledIcon
							className={`${
								rating > 1 ? "text-yellow-500" : "text-gray-200"
							}`}
						/>
						<StarFilledIcon
							className={`${
								rating > 2 ? "text-yellow-500" : "text-gray-200"
							}`}
						/>
						<StarFilledIcon
							className={`${
								rating > 3 ? "text-yellow-500" : "text-gray-200"
							}`}
						/>
						<StarFilledIcon
							className={`${
								rating > 4 ? "text-yellow-500" : "text-gray-200"
							}`}
						/>
						<StarFilledIcon
							className={`${
								rating > 5 ? "text-yellow-500" : "text-gray-200"
							}`}
						/>
						{rating}
					</h1>
				</Accordian>
				<Accordian title="Payment Methods" className="my-4">
					<h1>Cash On Delivery</h1>
				</Accordian>
				<div className="flex gap-x-4 pt-6">
					<Button
						className="hover:text-red-600"
						variant={"secondary"}
					>
						<Heart />
					</Button>
					<Button
						onClick={() => checkInCart()}
						variant={"outline"}
						className="rounded-none flex items-center gap-x-1"
					>
						{itemInCart ? "ADDED TO CART" : "ADD TO CART"}
						{itemInCart ? <Check /> : null}
					</Button>
					<Button
						onClick={() =>
							router.push(`/bill?category=${category}&id=${id}`)
						}
						className="rounded-none"
					>
						BUY NOW
					</Button>
				</div>

				<div className="pt-10">
					<h1 className="text-xl font-semibold">Reviews</h1>
					<Review />
					<Review />
				</div>
			</div>

			<div className="relative">
				{/* Skeleton is visible only when image is loading */}
				{imageLoading && (
					<Skeleton className="size-[500px] absolute top-0 left-0" />
				)}

				{/* Image is always present but hidden until loaded */}
				<Image
					className={`bg-cover bg-gray-50 h-fit ${
						imageLoading ? "opacity-0" : "opacity-100"
					} transition-opacity duration-500`}
					height={500}
					width={500}
					alt="product"
					src={thumbnail}
					onLoadingComplete={() => {
						setImageLoading(false);
					}}
				/>
			</div>
		</div>
	);
};

export default ProductPreview;
