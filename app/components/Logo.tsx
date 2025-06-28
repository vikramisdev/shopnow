import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
		<Link href={"/"} className="flex items-center gap-x-2 ">
			<Image
				className="invert rounded-full size-10"
				src={"/images/snlogo.png"}
				height={200}
				width={200}
				alt="logo"
			/>
			<h1 className="md:text-xl font-bold text-black dark:text-white">
				Shop Now
			</h1>
		</Link>
  );
}
