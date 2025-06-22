import { Minus, Plus } from "lucide-react";
import React from "react";

interface QuantityProps {
	itemCount: number;
	setItemCount: (count: number) => void;
	title?: string;
}

function Quantity({ itemCount, setItemCount, title = "Qty" }: QuantityProps) {
	const decrement = () => {
		if (itemCount > 1) {
			setItemCount(itemCount - 1);
		}
	};

	const increment = () => {
		setItemCount(itemCount + 1);
	};

	return (
		<div className="flex items-center gap-x-3 border border-gray-300 rounded px-3 py-1 my-4 w-fit bg-white">
			<Minus onClick={decrement} className="cursor-pointer" />
			<h1 className="select-none text-base font-medium">
				{title} {itemCount}
			</h1>
			<Plus onClick={increment} className="cursor-pointer" />
		</div>
	);
}

export default Quantity;
