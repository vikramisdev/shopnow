import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useRouter } from "next/navigation";

interface ProductData {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  category: string;

}

const Featured: React.FC = ({}) => {
  const router = useRouter();
  const [result, setResult] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-shirts?limit=4")
      .then((res) => res.json())
      .then((data) => setResult(data.products))
      .catch(() => {});
  }, []);

  return result.length != 0 ? (
    <div className="px-10 py-24">
      <h1 className="font-semibold text-3xl py-5 px-2">Featured</h1>
      <div className="flex flex-wrap justify-between gap-y-12">
        {result.map((element) => (
          <Product
            onClick={() => {
              router.push(
                "/cart?category=" + element.category + "&" + "id=" + element.id
              );
            }}
            id={String(element.id)}
            key={element.id}
            title={element.title}
            thumbnail={element.thumbnail}
            price={element.price}
            description={element.description}
            category={element.category}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Featured;
