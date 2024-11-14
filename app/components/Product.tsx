import { ArrowRight, CheckSquare, Heart, ShoppingBagIcon } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

interface ItemProps {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: string;
  category: string;
  onClick?: () => void;
}

export default function Product(props: ItemProps) {
  const router = useRouter();
  const [inCart, AddToCart] = useState(false);

  function redirectTo(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, url: string) {
    event.stopPropagation();
    router.push(url);
  }

  function addTocart(event: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) {
    event.stopPropagation();
    AddToCart(!inCart);
  }

  return (
    <div className="p-2 w-72 flex flex-col rounded-2xl gap-y-3 shadow-lg">
      <div
        onClick={props.onClick}
        className="cursor-pointer hover:-translate-y-2 overflow-hidden duration-300 flex flex-col justify-between h-96 bg-cover bg-center rounded-2xl p-4 bg-slate-100"
        style={{ backgroundImage: `url(${props.thumbnail})` }}
      >
        <div className="w-full flex justify-end mb-auto">
          <Button>
            <Heart className="" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-x-2 mt-auto w-full">
          <div onClick={(event) => redirectTo(event, `/bill?category=${props.category}&id=${props.id}`)} className="group flex items-center gap-2 h-10 bg-black bg-opacity-40 w-fit px-2 py-2 rounded-full cursor-pointer">
            <h1 className="text-white text-sm">Buy Now</h1>
            <ArrowRight className="rounded-full bg-white h-6 w-6 group-hover:rotate-90 duration-500 p-1" />
          </div>
          <Button onClick={() => {}}>
            <ShoppingBagIcon className={`${inCart? "hidden" : "visible"}`} onClick={(event) => addTocart(event)} />
            <CheckSquare className={`${!inCart? "hidden" : "visible"}`} onClick={(event) => addTocart(event)} />
          </Button>
          <h1 className="bg-black text-white px-3 py-2 w-fit rounded-full h-10">
            ${props.price}
          </h1>
        </div>
      </div>
      <div className="flex justify-between px-4 py-3 bg-gray-200 rounded-2xl h-20 text-nowrap">
        <div className="flex-1 overflow-hidden">
          <h1 className="font-semibold text-lg text-ellipsis overflow-hidden">
            {props.title}
          </h1>
          <p className="font-normal text-sm text-ellipsis overflow-hidden">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
