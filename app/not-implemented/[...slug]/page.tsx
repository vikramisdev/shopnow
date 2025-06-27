import Link from "next/link";

export default function NotImplementedPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-8">
			<h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
				🚧 Page Not Ready
			</h1>
			<p className="text-lg text-gray-400 mb-6 max-w-md">
				This section is still under construction. Check back later for
				updates.
			</p>
			<Link
				href="/"
				className="text-blue-500 underline hover:text-blue-400 transition-colors"
			>
				← Return to Home
			</Link>
		</div>
	);
}
