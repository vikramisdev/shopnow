/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "sonner"; // Optional: fallback to setMessage if not using
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [photo, setPhoto] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null); // fallback

	const { status } = useSession();
	const router = useRouter();

	// Clean up preview URL to avoid memory leaks
	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	useEffect(() => {
		if (status === "authenticated") {
			router.replace("/"); // redirect to home
		}
	}, [status]);

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				setMessage("❌ Please upload a valid image file.");
				return;
			}
			setPhoto(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		setMessage(null);

		if (!email.includes("@") || password.length < 6) {
			setMessage("❌ Enter a valid email and minimum 6-char password.");
			setLoading(false);
			return;
		}

		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("password", password);
		if (photo) formData.append("photo", photo);

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				body: formData,
			});

			let resultMessage = "";
			const contentType = res.headers.get("Content-Type");

			if (contentType && contentType.includes("application/json")) {
				const json = await res.json();
				resultMessage = json.message || "No message from server";
			} else {
				resultMessage = await res.text(); // fallback for plain text
			}

			if (res.ok) {
				toast.success("✅ " + resultMessage);
				setTimeout(() => {
					window.location.href = "/login";
				}, 1500);
			} else {
				toast.error("❌ " + resultMessage);
			}
		} catch (err) {
			toast.error("❌ An error occurred during registration.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Header />
			<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 md:py-16 bg-white">
				{/* Left Image Section */}
				<div className="hidden md:flex items-center justify-center">
					<Image
						src="https://i.pinimg.com/736x/0e/96/f4/0e96f4737006a7ee5b3806e67cb9691d.jpg"
						alt="Register Illustration"
						width={400}
						height={400}
						className="md:w-[calc(100vw/2)] h-[70vh] object-cover m-6"
						priority
					/>
				</div>

				{/* Right Form Section */}
				<div className="flex items-center justify-center px-6 py-12">
					<div className="w-full max-w-md space-y-6 animate-fade-in">
						<h1 className="text-2xl font-semibold text-gray-800">
							Create your account
						</h1>
						<p className="text-sm text-gray-500">
							Join us today. It's quick and easy.
						</p>

						{/* Round Profile Image Uploader */}
						<div className="flex flex-col items-center space-y-2">
							<label
								htmlFor="photo-upload"
								className="cursor-pointer"
							>
								<div className="relative w-24 h-24 rounded-full border border-gray-300 overflow-hidden shadow-sm transition hover:shadow-md">
									{preview ? (
										<img
											src={preview}
											alt="Profile Preview"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
											Upload
										</div>
									)}
								</div>
							</label>
							<input
								id="photo-upload"
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								onChange={handlePhotoChange}
								className="hidden"
							/>
							<span className="text-xs text-gray-400 text-center px-2">
								Click the circle to upload your profile photo
							</span>
							{photo && (
								<span className="text-xs text-gray-500 italic truncate max-w-[240px]">
									{photo.name}
								</span>
							)}
						</div>

						<form onSubmit={handleRegister} className="space-y-5">
							{/* Full Name */}
							<div className="space-y-1">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<Input
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="John Doe"
									required
								/>
							</div>

							{/* Email */}
							<div className="space-y-1">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
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
							<div className="space-y-1">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
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
								/>
								<label className="text-xs text-gray-500 flex items-center gap-2 mt-1">
									<input
										type="checkbox"
										checked={showPassword}
										onChange={() =>
											setShowPassword((prev) => !prev)
										}
									/>
									Show password
								</label>
							</div>

							{/* Fallback message (if toast not used) */}
							{message && (
								<p
									className={`text-sm ${
										message.startsWith("✅")
											? "text-green-600"
											: "text-red-600"
									}`}
								>
									{message}
								</p>
							)}

							{/* Submit */}
							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
							>
								{loading ? "Registering..." : "Create Account"}
							</Button>
						</form>

						<p className="text-sm text-gray-500">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-blue-600 hover:underline font-medium"
							>
								Log in here
							</a>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
