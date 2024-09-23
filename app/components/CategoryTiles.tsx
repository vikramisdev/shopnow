import Image from "next/image";

export default function CategoryTiles() {
    return (
        <div className="py-3 px-5 flex justify-between bg-slate-200 m-5 rounded-md">
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Grocery" width={100} height={100} src={"/images/grocery.png"} />
                <h2 className="py-2">Grocery</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Mobiles" width={100} height={100} src={"/images/smartphone.png"} />
                <h2 className="py-2">Mobiles</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Fashion" width={100} height={100} src={"/images/wardrobe.png"} />
                <h2 className="py-2">Fashion</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Electronics" width={100} height={100} src={"/images/gadgets.png"} />
                <h2 className="py-2">Electronics</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Home and Furniture" width={100} height={100} src={"/images/room.png"} />
                <h2 className="py-2">Home & Furniture</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Appliances" width={100} height={100} src={"/images/home-appliance.png"} />
                <h2 className="py-2">Appliances</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Flight Bookings" width={100} height={100} src={"/images/ticket-flight.png"} />
                <h2 className="py-2">Flight Bookings</h2>
            </div>
            <div className="h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="Toys" width={100} height={100} src={"/images/toys.png"} />
                <h2 className="py-2">Toys</h2>
            </div>
            <div className="cursor-pointer h-40 w-40 hover:scale-105 m-5 text-center p-4 flex flex-col items-center justify-center">
                <Image className="h-3/4 w-full" alt="two wheeler" width={100} height={100} src={"/images/two-wheeler.png"} />
                <h2 className="py-2">Two Wheeler</h2>
            </div>
        </div>
    );
}
