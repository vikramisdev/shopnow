"use client";

import Banner from "./components/Banner";
import CategoryTiles from "./components/CategoryTiles";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Item from "./components/Item";

export interface DefaultProps {
  isSignedIn: unknown
}

export default function Home() {

  return (
    <div>
      <Header searchBarFocus={false} />
      <CategoryTiles />
      <Banner />
      <div className="grid grid-cols-4">
        <Item
          image="/images/item1.webp"
          title="HONOR MagicBook X16 Pro 2024,"
          price="₹53,990 M.R.P: ₹84,999 (36% off)"
        />
        <Item
          image="/images/item2.webp"
          title="Lenovo IdeaPad Slim 5 12th Gen,"
          price="₹58,990 M.R.P: ₹78,999 (25% off)"
        />
        <Item
          image="/images/item3.webp"
          title="Acer Aspire 3 Laptop Intel Core,"
          price="₹21,719 M.R.P: ₹33,999 (36% off)"
        />
        <Item
          image="/images/item3.webp"
          title="Acer Aspire 3 Laptop Intel Core,"
          price="₹21,719 M.R.P: ₹33,999 (36% off)"
        />
      </div>
      <Footer />
    </div>
  );
}
