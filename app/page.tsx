"use client";

import Banner from "./components/Banner";
import CategoryTiles from "./components/CategoryTiles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Item from "./components/Item";
import HeroSection from "./components/HeroSection";
import { useEffect, useState } from "react";
import { ClerkLoading } from "@clerk/nextjs";

export interface DefaultProps {
  isSignedIn: unknown;
}

export default function Home() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((res) => setResult(res));
  }, []);

  return (
    <div>
      <Header searchBarFocus={false} />
      <HeroSection />
      <Banner />

      <div className="grid grid-cols-4">
        {result? result?.products?.map((element) => (
          <Item
            key={element.id}
            image={element.images[2]}
            title={element.title}
            price={element.price}
          />
        )) : <h1 className="text-center w-screen py-32 text-4xl font-bold">Loading Items </h1>}
      </div>

      <Footer />
    </div>
  );
}
