import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function HeroSection() {
  const scrollDown = () => {
    const heroSection = document.getElementById("hero-section");
    window.scroll({
      top: heroSection?.clientHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="hero-section" className="flex flex-col-reverse md:flex-row w-full gap-20">
      <div className="flex-1 justify-center text-center flex flex-col mt-auto md:px-10 md:py-20 px-5 py-10">
        <h1 className="md:text-3xl text-xl mb-4 font-semibold">Shop Now</h1>
        <h1 className="md:text-6xl text-2xl">
          Shine yourself with our best trusted brand collections
        </h1>
        <div
          onClick={() => scrollDown()}
          className="group flex items-center gap-4 bg-black w-fit px-6 py-4 mt-10 m-auto rounded-full cursor-pointer"
        >
          <h1 className="text-white">Start Shopping</h1>
          <ArrowRight className="rounded-full bg-white h-8 w-8 group-hover:rotate-90 duration-500 p-1" />
        </div>
      </div>
      <Image width={2000} height={500} alt="hero image" src={"/images/hero.jpg"} className='flex-1 w-full h-full md:w-1/2 md:h-screen bg-no-repeat object-cover' />
    </div>
  );
}

export default HeroSection;
