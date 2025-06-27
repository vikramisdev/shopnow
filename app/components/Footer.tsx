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
				{/* Logo + About */}
				<div>
					<Logo />
					<p className="text-sm text-gray-400 mt-4 max-w-xs">
						Shop smarter with ShopNow – your trusted marketplace for
						all things awesome.
					</p>
				</div>

				{/* Footer Links Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full">
					<FooterColumn
						title="Company"
						links={[
							{ label: "Projects", href: "/projects" },
							{ label: "Blog", href: "/blog" },
						]}
					/>
					<FooterColumn
						title="About"
						links={[
							{
								label: "ShopNow, Inc.",
								href: "/about/shopnow-inc",
							},
							{ label: "Policies", href: "/about/policies" },
							{ label: "Investors", href: "/about/investors" },
							{ label: "Careers", href: "/about/careers" },
						]}
					/>
					<FooterColumn
						title="Shop"
						links={[
							{ label: "Gift Cards", href: "/shop/gift-cards" },
							{ label: "Blog", href: "/blog" },
							{ label: "Projects", href: "/projects" },
						]}
					/>
					<FooterColumn
						title="Sell"
						links={[
							{ label: "Sell on ShopNow", href: "/sell" },
							{ label: "Teams", href: "/sell/teams" },
							{ label: "Forums", href: "/sell/forums" },
							{
								label: "Affiliates & Creators",
								href: "/sell/affiliates-creators",
							},
						]}
					/>
					<FooterColumn
						title="Help"
						links={[
							{ label: "Help Center", href: "/help/help-center" },
							{
								label: "Privacy Settings",
								href: "/help/privacy-settings",
							},
						]}
					/>
				</div>
			</div>

			<hr className="opacity-20 my-8" />

			{/* Bottom Row */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-4">
				<p className="text-sm text-gray-400">
					© 2023–2025 ShopNow. All rights reserved.
				</p>
				<div className="flex gap-4">
					<SocialIcon
						href="https://instagram.com/vikramisdev"
						icon={<InstagramLogoIcon className="h-5 w-5" />}
						label="Instagram"
					/>
					<SocialIcon
						href="https://twitter.com/vikramisdev"
						icon={<TwitterLogoIcon className="h-5 w-5" />}
						label="Twitter"
					/>
					<SocialIcon
						href="https://github.com/vikramisdev"
						icon={<GitHubLogoIcon className="h-5 w-5" />}
						label="GitHub"
					/>
				</div>
			</div>
		</footer>
	);
}

function FooterColumn({
	title,
	links,
}: {
	title: string;
	links: { label: string; href: string }[];
}) {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">{title}</h2>
			<ul className="flex flex-col gap-3 text-sm text-gray-300">
				{links.map((link, idx) => (
					<li key={idx}>
						<Link
							href={link.href}
							className="hover:underline hover:text-white transition-colors"
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function SocialIcon({
	icon,
	href,
	label,
}: {
	icon: React.ReactNode;
	href: string;
	label: string;
}) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
		>
			{icon}
		</Link>
	);
}
