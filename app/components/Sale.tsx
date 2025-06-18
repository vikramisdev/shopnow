import React from "react";

export default function Sale() {
	return (
		<div
			id="sale-section"
			className="w-full flex justify-center items-center h-[calc(100vh-88px)] bg-[url('/images/christmas.png')]"
		>
			<div className="sw-full text-center">
				<h1 className="md:text-9xl text-6xl font-semibold text-orange-400">
					Christmas Sale<br></br>50% OFF
				</h1>
				<p className="text-lg pt-8 text-black px-8">
					Use coupon at checkout to get discount. sale ends soon,
					hurry up !
				</p>
				<h1 className="my-12 px-6 py-4 border-2 border-dashed border-black w-fit m-auto rounded-xl font-semibold">
					SHOPNOW2024
				</h1>
			</div>
		</div>
	);
}
