"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignUpPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "authenticated") {
			router.replace("/");
		}
	}, [status]);

	useEffect(() => {
		return () => {
			if (photoPreview) URL.revokeObjectURL(photoPreview);
		};
	}, [photoPreview]);

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Please upload a valid image file.");
			return;
		}

		setPhotoFile(file);
		setPhotoPreview(URL.createObjectURL(file));
	};

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();
		if (loading) return;

		setLoading(true);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		if (photoFile) formData.append("photo", photoFile); // original image

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				body: formData, // ⬅️ no headers needed! fetch automatically sets correct Content-Type
			});

			const result = await res.text();

			if (res.ok) {
				toast.success(result || "Signup successful!");
				router.push("/login");
			} else {
				toast.error(result || "Signup failed!");
			}
		} catch (err) {
			toast.error("Signup failed. Try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-black">
				{/* Left Illustration */}
				<div className="hidden md:flex items-center justify-center">
					<Image
						src="https://i.pinimg.com/736x/0e/96/f4/0e96f4737006a7ee5b3806e67cb9691d.jpg"
						alt="Signup"
						width={500}
						height={500}
						className="w-full h-[70vh] object-cover"
					/>
				</div>

				{/* Right Form */}
				<div className="flex items-center justify-center px-6 py-12">
					<div className="w-full max-w-md space-y-6">
						<h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
							Create your account
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Join us today. Its quick and easy.
						</p>

						{/* Photo Uploader */}
						<div className="flex flex-col items-center space-y-2">
							<label
								htmlFor="photo-upload"
								className="cursor-pointer"
							>
								<div className="relative w-24 h-24 rounded-full border overflow-hidden bg-gray-100 dark:bg-zinc-700 shadow-sm hover:shadow-md transition">
									{photoPreview ? (
										<img
											src={photoPreview}
											alt="Preview"
											className="object-cover w-full h-full"
										/>
									) : (
										<div className="flex items-center justify-center h-full text-gray-400 text-sm">
											Upload
										</div>
									)}
								</div>
							</label>
							<input
								id="photo-upload"
								type="file"
								accept="image/*"
								onChange={handlePhotoChange}
								className="hidden"
							/>
							{photoFile && (
								<span className="text-xs text-gray-500 italic truncate max-w-[240px]">
									{photoFile.name}
								</span>
							)}
						</div>

						<form onSubmit={handleSignUp} className="space-y-5">
							{/* Name */}
							<div>
								<label
									htmlFor="name"
									className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
								>
									Full Name
								</label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="John Doe"
									required
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
								>
									Email
								</label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="john@example.com"
									required
								/>
							</div>

							{/* Password */}
							<div>
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
								>
									Password
								</label>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="••••••••"
									required
									className="text-black dark:text-white bg-white dark:bg-zinc-900 placeholder:text-gray-400"
								/>

								<label className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
									<input
										type="checkbox"
										checked={showPassword}
										onChange={() =>
											setShowPassword(!showPassword)
										}
									/>
									Show password
								</label>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
							>
								{loading ? "Signing Up..." : "Sign Up"}
							</Button>
						</form>

						<p className="text-sm text-gray-500 dark:text-gray-400 text-center">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-blue-600 hover:underline font-medium"
							>
								Log in
							</a>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
