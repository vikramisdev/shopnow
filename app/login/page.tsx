"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, getSession, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { status } = useSession();

	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status]);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (res?.error) {
			toast.error(`${res.error}`);
		} else if (res?.ok) {
			toast.success("Login successful!");

			// Fetch session data
			const session = await getSession();

			if (session?.user) {
				setTimeout(async () => {
					const session = await getSession();
					if (session?.user) {
						dispatch(
							login({
								name: session.user.name || "",
								email: session.user.email || "",
								photo: session.user.image || "",
							})
						);
					}
				}, 500);
			}

			setEmail("");
			setPassword("");
			router.push("/");
		}

		setLoading(false);
	};

	return (
		<div className="min-h-screen flex flex-col lg:flex-row bg-neutral-50 text-neutral-900">
			{/* Left - Illustration */}
			<div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16">
				<img
					src="https://images.pexels.com/photos/3330159/pexels-photo-3330159.jpeg"
					alt="Login Illustration"
					className="object-cover h-full w-full rounded-xl shadow-lg"
				/>
			</div>

			{/* Right - Login Form */}
			<div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
				<div className="w-full max-w-md space-y-6">
					<h2 className="text-3xl font-semibold text-neutral-900 text-center">
						Welcome back
					</h2>
					<p className="text-center text-sm text-neutral-500">
						Log in to your account to continue.
					</p>

					<form onSubmit={handleLogin} className="space-y-5">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-neutral-600"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								required
								className="mt-1 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-neutral-600"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								className="mt-1 w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full py-2 rounded-lg text-white font-semibold transition-all ${
								loading
									? "bg-gray-300 cursor-not-allowed"
									: "bg-black hover:bg-zinc-700"
							}`}
						>
							{loading ? "Logging in..." : "Login"}
						</button>
					</form>

					<p className="text-center text-sm text-neutral-500">
						Don’t have an account?{" "}
						<a
							href="/register"
							className="text-blue-600 hover:underline font-medium"
						>
							Register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
