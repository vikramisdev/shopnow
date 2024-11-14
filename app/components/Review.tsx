import { AvatarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import React from "react";

interface ReviewProps {
  userName?: string;
  comment?: string;
  rating?: number;
}

function Review({
  userName = "Helena D.",
  comment = "It was a good product",
  rating = 4
}: ReviewProps) {
  return (
    <div className="py-6 shadow-sm">
      <div className="flex gap-x-2 items-center py-2">
        <AvatarIcon className="size-10" />
        <div>
          <h1>{userName}</h1>
          <div className="flex gap-x-1">
            <StarFilledIcon
              className={`${rating > 1 ? "text-yellow-500" : "text-gray-200"}`}
            />
            <StarFilledIcon
              className={`${rating > 2 ? "text-yellow-500" : "text-gray-200"}`}
            />
            <StarFilledIcon
              className={`${rating > 3 ? "text-yellow-500" : "text-gray-200"}`}
            />
            <StarFilledIcon
              className={`${rating > 4 ? "text-yellow-500" : "text-gray-200"}`}
            />
            <StarFilledIcon
              className={`${rating > 5 ? "text-yellow-500" : "text-gray-200"}`}
            />
          </div>
        </div>
      </div>
      <p className="pl-12">{comment}</p>
    </div>
  );
}

export default Review;
