"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter, useSearchParams } from "next/navigation";
import Product from "../components/Product";

interface ProductData {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
}

export default function SearchBar() {
  const [result, setResult] = useState<ProductData[]>([]);
  const params = useSearchParams();
  const query = params.get("q");
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResult([]);
      return; // If no query, skip fetching
    }

    // Fetch products matching the search query
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.products) {
          setResult(data.products); // Update result with fetched products
        } else {
          setResult([]); // Set empty result if no products
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setResult([]); // Handle errors gracefully
      });
  }, [query]); // Refetch when the query changes

  return (
    <div>
      <Header expandSearchBar={true} />
      <div className="flex flex-wrap text-center min-h-screen gap-20 py-36 px-14">
        {result.length > 0 ? (
          result.map((item) => (
            <Product
              key={item.id}
              id={String(item.id)}
              title={item.title}
              price={String(item.price)}
              thumbnail={item.thumbnail}
              description={item.description}
              category={item.category}
              onClick={() => {
                router.push(
                  "/cart?category=" + item.category + "&" + "id=" + item.id
                );
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 flex justify-center items-center w-full min-h-screen">No products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
