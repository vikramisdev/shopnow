import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface QuantityProps {
  itemCount?: number;
  title?: string;
}

function Quantity({ itemCount = 1, title = "Qty" }: QuantityProps) {
  const [itemCount2, setItemCount2] = useState(itemCount);

  const decrement = (count: number) => {
    setItemCount2(count > 1 ? count - 1 : count);
  }

  return (
    <div className="flex gap-x-3 border-[0px] border-gray-500 w-fit px-2 py-1 my-4">
      <Minus
        onDoubleClick={() => {}}
        onClick={() => decrement(itemCount2)}
        className="cursor-pointer"
      />
      <h1 className="select-none">
        {title} {itemCount2 > 0 ? itemCount2 : 1}
      </h1>
      <Plus
        onDoubleClick={() => {}}
        onClick={() => setItemCount2(itemCount2 + 1)}
        className="cursor-pointer"
      />
    </div>
  );
}

export default Quantity;
