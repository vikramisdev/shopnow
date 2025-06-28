"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent, ReactNode } from "react";
import { signIn, getSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

interface LoginModalProps {
	trigger: ReactNode;
}

export default function LoginModal({ trigger }: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (res?.error) {
			if (res.error.includes("No account")) {
				toast.error("No account found. Please Sign Up.");
			} else if (res.error.includes("Incorrect password")) {
				toast.error("Incorrect password.");
			} else {
				toast.error(`Login failed: ${res.error}`);
			}
		} else {
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

			toast.success("Logged in successfully!");
			router.push("/");
		}

		setLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border dark:border-zinc-700 text-black dark:text-white">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">
						Login
					</DialogTitle>
					<DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
						Enter your email and password to log in.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					{/* Email */}
					<div className="space-y-2">
						<Label
							htmlFor="email"
							className="text-gray-700 dark:text-gray-300"
						>
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loading}
							className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
						/>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<Label
							htmlFor="password"
							className="text-gray-700 dark:text-gray-300"
						>
							Password
						</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={loading}
							className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
						/>
					</div>

					{/* Footer Buttons */}
					<DialogFooter className="pt-2 gap-2">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={loading}
								className="bg-gray-100 dark:bg-zinc-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</DialogFooter>
				</form>

				<div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
					No account?{" "}
					<Link
						href="/signup"
						className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
					>
						Sign Up
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
