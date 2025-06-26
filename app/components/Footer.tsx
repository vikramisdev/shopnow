import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Logo from "./Logo";

export default function Footer() {
	return (
		<footer className="bg-gray-950 text-white px-6 md:px-12 py-16 mt-10">
			<div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-6">
				{/* Logo */}
				<div>
					<Logo />
					<p className="text-sm text-gray-400 mt-4 max-w-xs">
						Shop smarter with ShopNow – your trusted marketplace for
						all things awesome.
					</p>
				</div>

				{/* Columns */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full">
					{/* Column Template */}
					<FooterColumn
						title="Company"
						links={["Projects", "Blog"]}
					/>
					<FooterColumn
						title="About"
						links={[
							"ShopNow, Inc.",
							"Policies",
							"Investors",
							"Careers",
						]}
					/>
					<FooterColumn
						title="Shop"
						links={["Gift Cards", "Blog", "Projects"]}
					/>
					<FooterColumn
						title="Sell"
						links={[
							"Sell on ShopNow",
							"Teams",
							"Forums",
							"Affiliates & Creators",
						]}
					/>
					<FooterColumn
						title="Help"
						links={["Help Center", "Privacy Settings"]}
					/>
				</div>
			</div>

			<hr className="opacity-20 my-8" />

			<div className="flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-sm text-gray-400">
					© 2023–2025 ShopNow. All rights reserved.
				</p>
				<div className="flex gap-4">
					<SocialIcon
						icon={<InstagramLogoIcon className="h-5 w-5" />}
					/>
					<SocialIcon
						icon={<TwitterLogoIcon className="h-5 w-5" />}
					/>
					<SocialIcon icon={<GitHubLogoIcon className="h-5 w-5" />} />
				</div>
			</div>
		</footer>
	);
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">{title}</h2>
			<ul className="flex flex-col gap-3 text-sm text-gray-300">
				{links.map((text, idx) => (
					<li key={idx}>
						<Link
							href="/"
							className="hover:underline hover:text-white transition-colors"
						>
							{text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
	return (
		<div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer">
			{icon}
		</div>
	);
}
