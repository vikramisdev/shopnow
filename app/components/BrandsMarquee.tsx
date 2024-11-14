import Image from "next/image";
import React from "react";

function BrandsMarquee() {
  return (
    <div className="py-12 px-12">
      {/* <h1 className="text-3xl pt-20 font-semibold md:text-left text-center md:py-4">Large Collection Of Top Brands</h1> */}
      <div className="flex flex-wrap justify-center md:justify-between w-full overflow-hidden">
        <Image src={"/images/Bata.png"} alt="brands" width={200} height={100} />
        <Image
          src={"/images/Jordan.png"}
          alt="brands"
          width={200}
          height={100}
        />
        <Image src={"/images/Nike.png"} alt="brands" width={200} height={100} />
        <Image src={"/images/Puma.png"} alt="brands" width={200} height={100} />
        <Image
          className="invert"
          src={"/images/Adidas.png"}
          alt="brands"
          width={200}
          height={100}
        />
      </div>
    </div>
  );
}

export default BrandsMarquee;
