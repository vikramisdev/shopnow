"use client";

import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Item from "./components/Item";
import HeroSection from "./components/HeroSection";
import { createContext, useEffect, useState } from "react";

export interface DefaultProps {
  isSignedIn: unknown;
}

const MainContext = createContext("");

export default function Home() {
  const [result, setResult] = useState({});
  const AppContext = createContext({});

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((res) => setResult(res));

    // const productBanner = document.querySelector("#productBanner");
    // const left = document.querySelector("#leftBtn");
    // const right = document.querySelector("#rightBtn");

    // left?.addEventListener("click", () => {
    //   productBanner?.scrollIntoView(true);
    // })

  }, []);

  return (
    <AppContext.Provider value={result}>
      <div>
        <Header searchBarFocus={false} />
        <HeroSection />
        <Banner />

        <div className="flex justify-between gap-x-5 no-scrollbar items-center">
          {/* <div className="h-max flex items-center bg-black text-white text-xl p-3 m-2 rounded-full hover:invert border-2">
            <ArrowLeft id="leftBtn" />
          </div> */}
          <div id="productBanner" className="flex justify-between gap-x-5 overflow-scroll cursor-auto">
            {result ? (
              result?.products?.map((element) => (
                <Item
                  key={element.id}
                  image={element.images[2]}
                  title={element.title}
                  price={element.price}
                  description={element.description}
                />
              ))
            ) : (
              <h1 className="text-center w-screen py-32 text-4xl font-bold">
                Loading Items{" "}
              </h1>
            )}
          </div>
          {/* <div className="h-max flex items-center bg-black text-white text-xl p-3 m-2 rounded-full hover:invert border-2">
            <ArrowRight id="rightBtn" />
          </div> */}
        </div>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}
