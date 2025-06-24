import React, { useState } from "react";

interface ClothSizesInterface {
	className?: string;
	onChange?: (value: string) => void;
	defaultSize: string;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

function ClothSizes({
	className = "",
	onChange,
	defaultSize = "S",
}: ClothSizesInterface) {
	const [selected, setSelected] = useState(defaultSize);

	const handleSelect = (size: string) => {
		setSelected(size);
		onChange?.(size);
	};

	return (
		<div className={`flex gap-x-3 items-center ${className}`}>
			<h1 className="font-semibold">Size:</h1>
			{sizes.map((size) => (
				<label key={size}>
					<input
						type="radio"
						name="size"
						value={size}
						checked={selected === size}
						onChange={() => handleSelect(size)}
						className="list-none before:content-[''] checked:before:text-white checked:before:bg-black
							before:px-[10px] before:py-[4px] before:rounded-full
							appearance-none before:cursor-pointer before:transition-all
							before:content-[attr(value)]"
					/>
				</label>
			))}
		</div>
	);
}

export default ClothSizes;
