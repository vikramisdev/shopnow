import React from "react";

interface ClothSizesInterface {
    className?: string;
}

function ClothSizes({ className }: ClothSizesInterface) {
  return (
    <div className={`flex gap-x-3 ${className}`}>
      <h1><b>Size:</b></h1>
      <input
        className="list-none before:content-['S'] checked:before:text-white checked:before:bg-black before:px-[10px] before:py-[4px] before:rounded-full appearance-none before:cursor-pointer before:transition-all"
        name="size"
        type="radio"
      ></input>
      <input
        className="list-none before:content-['M'] checked:before:text-white checked:before:bg-black before:px-[10px] before:py-[4px] before:rounded-full appearance-none before:cursor-pointer before:transition-all"
        name="size"
        type="radio"
      ></input>
      <input
        className="list-none before:content-['L'] checked:before:text-white checked:before:bg-black before:px-[10px] before:py-[4px] before:rounded-full appearance-none before:cursor-pointer before:transition-all"
        name="size"
        type="radio"
      ></input>
      <input
        className="list-none before:content-['XL'] checked:before:text-white checked:before:bg-black before:px-[10px] before:py-[4px] before:rounded-full appearance-none before:cursor-pointer before:transition-all"
        name="size"
        type="radio"
      ></input>
      <input
        className="list-none before:content-['XXL'] checked:before:text-white checked:before:bg-black before:px-[10px] before:py-[4px] before:rounded-full appearance-none before:cursor-pointer before:transition-all"
        name="size"
        type="radio"
      ></input>
    </div>
  );
}

export default ClothSizes;
