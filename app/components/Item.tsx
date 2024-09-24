import Image from "next/image";

interface ItemProps {
  image: string;
  title: string;
  price: string;
}

export default function Item({ image, title, price }: ItemProps) {
  return (
    <div className="w-fit overflow-clip flex flex-col bg-slate-100 m-5 rounded-md">
      <div className="p-14 h-72 flex items-center">
      <Image className="hover:scale-105 mix-blend-multiply cursor-pointer" alt="product image" width={400} height={600} src={image} />
      </div>
      <div className="py-8 px-5">
        <h2 className="text-lg font-bold mt-2 line-clamp-1 overflow-ellipsis">{title}</h2>
        <h3 className="text-md text-gray-500">{price}</h3>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
