import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers/Providers";
import SessionLoader from "./components/SessionLoader";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "ShopNow, E-commerce",
	description: "An E-Commerce website Built With NextAuth & Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
			>
				<Providers>
					<SessionLoader />
					{children}
					<Toaster position="bottom-right" />
				</Providers>
			</body>
		</html>
	);
}
