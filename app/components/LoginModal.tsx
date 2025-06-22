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
				toast.error("❌ No account found. Please register.");
			} else if (res.error.includes("Incorrect password")) {
				toast.error("❌ Incorrect password.");
			} else {
				toast.error(`❌ Login failed: ${res.error}`);
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

			toast.success("✅ Logged in successfully!");
			router.push("/"); // or just reload with: window.location.reload()
		}

		setLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">
						Login
					</DialogTitle>
					<DialogDescription>
						Enter your email and password to log in.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={loading}
						/>
					</div>

					<DialogFooter className="pt-2 gap-2">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={loading}
							>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</DialogFooter>
				</form>

				<div className="text-center text-sm text-muted-foreground mt-4">
					No account?{" "}
					<Link
						href="/register"
						className="text-primary hover:underline font-medium"
					>
						Register
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
