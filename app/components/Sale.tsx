import Image from "next/image";
import React from "react";

export default function Sale() {
  return (
    <div className="w-full md:h-1/5 py-20 relative">
      <Image
        className="md:h-[45rem] md:w-full h-[40rem] object-cover"
        src={"/images/christmas.png"}
        height={800}
        width={4000}
        alt="sale"
      />
      <div className="absolute w-full text-center md:top-1/3 top-1/4 backdrop-blur-sm">
        <h1 className="md:text-9xl text-6xl font-semibold text-orange-400">Christmas Sale<br></br>50% OFF</h1>
        <p className="text-lg pt-8 text-black px-8">Use coupon at checkout to get discount. sale ends soon, hurry up !</p>
        <h1 className="my-12 px-6 py-4 border-2 border-dashed border-black w-fit m-auto rounded-xl font-semibold">SHOPNOW2024</h1>
      </div>
    </div>
  );
}
