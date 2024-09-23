import Image from "next/image";

interface ItemProps {
  image: string;
  title: string;
  price: string;
}

export default function Item({ image, title, price }: ItemProps) {
  return (
    <div className="w-fit overflow-clip flex flex-col bg-slate-200 m-10 rounded-md">
      <Image className="hover:scale-105 border-2 rounded-md" alt="product image" width={400} height={600} src={image} />
      <div className="py-8 px-5">
        <h2 className="text-lg font-bold mt-2">{title}</h2>
        <h3 className="text-md text-gray-500">{price}</h3>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
