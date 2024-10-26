import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ItemProps {
  key: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

export default function Item(props: ItemProps) {
  const router = useRouter();

  return (
    <div className="m-5 rounded-2xl border-4 border-zinc-100">
      <div className="p-14 h-72 w-[20rem] flex items-start overflow-hidden">
        <Image
          className="hover:scale-105 transition-all duration-300 mix-blend-multiply cursor-pointer overflow-hidden"
          alt="product image"
          width={400}
          height={600}
          src={props.image}
        />
        <HeartIcon className="absolute top-4 right-4 cursor-pointer text-slate-600 group-hover:hidden" />
      </div>
      <div className="py-8 px-5 bg-white">
        <h2 className="text-xl font-bold mt-2 line-clamp-1 overflow-ellipsis">
          {props.title}
        </h2>
        <h2 className="text-lg mt-2 line-clamp-1 overflow-ellipsis">
          {props.description}
        </h2>
        <h3 className="text-md text-gray-500">$ {props.price}</h3>
        <button
          onClick={() => router.push("/cart?id=" + props.key)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
