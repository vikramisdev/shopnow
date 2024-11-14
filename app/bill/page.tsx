"use client";

import { useSearchParams } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Bill from "../components/Bill";

interface ProductData {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: Array<string>;
  price: string;
  category: string;
  rating: number;
  brand: string;
}

export default function Cart() {
  const { isSignedIn } = useUser();
  const params = useSearchParams();
  const [result, setResult] = useState<ProductData[]>([]);
  const productId = params.get("id");

  useEffect(() => {
    try {
      fetch(`https://dummyjson.com/products/category/${params.get("category")}`)
        .then((res) => res.json())
        .then((data) => setResult(data.products));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return isSignedIn ? (
    <div>
      <Header />
      <div className="md:px-12 pt-24">
        {result.map((element) =>
          String(element.id) == productId ? (
            <Bill
              key={element.id}
              title={element.title}
              images={element.images}
              price={element.price}
              description={element.description}
            />
          ) : (
            <span key={element.id}></span>
          )
        )}
      </div>

      {params.get("id") ? null : (
        <div className="flex justify-center items-center h-screen bg-[url('/images/cart.svg')] bg-no-repeat bg-top bg-cover"></div>
      )}
      <Footer />
    </div>
  ) : (
    <SignIn routing="hash" />
  );
}
