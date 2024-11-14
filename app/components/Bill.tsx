import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Quantity from "./Quantity";
import RadioAccordian from "./RadioAccordian";
import PaymentMethods from "./other";
import CreditCard from "./CreditCard";

interface ProductData {
  id?: number;
  title: string;
  description?: string;
  price: string;
  category?: string;
  thumbnail?: string;
  images: Array<string>;
}

function Bill({ title, images, description, price }: ProductData) {
  const [openIndex, setOpenIndex] = useState<PaymentMethods | null>(null);

  const handleSelect = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const date = new Date();
  const futureDate1 = new Date(date);
  futureDate1.setDate(date.getDate() + 5); // Add 5 days

  const futureDate2 = new Date(date);
  futureDate2.setDate(date.getDate() + 10); // Add 10 days

  // Format the new date for display
  const weekday1 = futureDate1.toLocaleString("default", { weekday: "long" });
  const month1 = futureDate1.toLocaleString("default", { month: "short" });
  const day1 = futureDate1.getDate();

  // Format the new date for display
  const weekday2 = futureDate2.toLocaleString("default", { weekday: "long" });
  const month2 = futureDate2.toLocaleString("default", { month: "short" });
  const day2 = futureDate2.getDate();

  return (
    <div className="flex flex-col items-center py-10 px-6">
      <div className="w-fit">
        <h1 className="py-10 text-left text-2xl font-semibold">
          Order Summary
        </h1>
        <div className="flex md:flex-row flex-col gap-x-10">
          <Image
            className="border-2 rounded-lg size-80"
            src={images[0]}
            height={500}
            width={500}
            alt="product"
          />
          <div>
            <h1 className="text-3xl font-semibold py-1">{title}</h1>
            <p className="md:w-96 py-2">{description}</p>
            <hr className="py-4"></hr>

            <Quantity />
            <p className="my-2 text-lg font-normal bg-pink-50 px-2 select-none">
              Arrives {weekday1}, {month1} {day1} - {weekday2}, {day2} {month2}
            </p>
            <hr className="py-4"></hr>
            <div className="flex justify-between py-1">
              <h1 className="font-normal opacity-70 text-lg">Subtotal</h1>
              <h1>${price}</h1>
            </div>
            <div className="flex justify-between py-1">
              <h1 className="font-normal text-lg opacity-70">
                Delivery/Shipping
              </h1>
              <h1>$5</h1>
            </div>
            <hr className="py-4"></hr>
            <div className="flex justify-between pb-10">
              <h1 className="font-semibold text-lg">Total</h1>
              <h1>${Number(price + 5).toFixed(2)}</h1>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="py-10">
          <Button variant={"outline"}>Current Address</Button>
          <p className="py-5 px-4 text-lg">
            Santaji Chowk, Abhona 423502, Tal. Kalwan, Dist. Nashik, Maharashtra
          </p>
        </div>

        <hr></hr>

        <div className="py-10">
          <h1 className="text-lg font-semibold pb-6">Payment Methods</h1>
          <div className="px-3">
            <RadioAccordian
              name="credit"
              title="Credit Cards"
              className="py-4"
              isOpen={openIndex === PaymentMethods.creditCard}
              onSelect={() => handleSelect(PaymentMethods.creditCard)}
            >
              <div className="flex gap-x-3">
                <CreditCard />
              </div>
            </RadioAccordian>

            <RadioAccordian
              name="upi"
              title="UPI Payment"
              className="py-4"
              isOpen={openIndex === PaymentMethods.upi}
              onSelect={() => handleSelect(PaymentMethods.upi)}
            >
              <div className="flex gap-x-3 md:px-6 py-2 w-72">
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="upi_id@ybl"
                  className="w-full px-3 py-2 border rounded-md mb-4"
                />
              </div>
            </RadioAccordian>

            <RadioAccordian
              name="cod"
              title="Cash On Delivery"
              className="py-4"
              isOpen={openIndex === PaymentMethods.cashOnDelivery}
              onSelect={() => handleSelect(PaymentMethods.cashOnDelivery)}
            >
              <div className="flex gap-x-3 md:px-6 py-2">
                <h1>This payment makes your delivery a little bit slower !</h1>
              </div>
            </RadioAccordian>
          </div>

          <div className="py-6 flex justify-end">
            <Button
              onClick={() =>
                openIndex == null
                  ? alert("Please Select a Payment Method !")
                  : null
              }
              className="rounded-none"
              variant={"default"}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
