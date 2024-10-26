import Image from "next/image";

export default function Banner() {
  return (
    <div className="my-5 overflow-hidden">
      <div className="flex animate-slide z-0">
        <Image
          className="w-screen"
          src={"/images/banner1.webp"}
          alt="banner1"
          width={1400}
          height={1000}
        />
        <Image
          className="w-screen"
          src={"/images/banner2.webp"}
          alt="banner2"
          width={1400}
          height={1000}
        />
        <Image
          className="w-screen"
          src={"/images/banner3.webp"}
          alt="banner3"
          width={1400}
          height={1000}
        />

        {/* duplicate images */}
        <Image
          className="w-screen"
          src={"/images/banner1.webp"}
          alt="banner1"
          width={1400}
          height={1000}
        />
        <Image
          className="w-screen"
          src={"/images/banner2.webp"}
          alt="banner2"
          width={1400}
          height={1000}
        />
        <Image
          className="w-screen"
          src={"/images/banner3.webp"}
          alt="banner3"
          width={1400}
          height={1000}
        />
      </div>
    </div>
  );
}
