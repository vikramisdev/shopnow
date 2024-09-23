"use client";

import CategoryTiles from "./components/CategoryTiles";
import Header from "./components/Header";
import Item from "./components/Item";

export default function Home() {
  return (
    <div>
      <Header />
      <CategoryTiles />
      <div className="flex justify-between">
        <Item
          image="/images/item1.webp"
          title="HONOR MagicBook X16 Pro 2024,"
          price="₹53,990 M.R.P: ₹84,999 (36% off)"
        />
        <Item
          image="/images/item2.webp"
          title="HONOR MagicBook X16 Pro 2024,"
          price="₹53,990 M.R.P: ₹84,999 (36% off)"
        />
        <Item
          image="/images/item3.webp"
          title="HONOR MagicBook X16 Pro 2024,"
          price="₹53,990 M.R.P: ₹84,999 (36% off)"
        />
        <Item
          image="/images/item3.webp"
          title="HONOR MagicBook X16 Pro 2024,"
          price="₹53,990 M.R.P: ₹84,999 (36% off)"
        />
      </div>
    </div>
  );
}
