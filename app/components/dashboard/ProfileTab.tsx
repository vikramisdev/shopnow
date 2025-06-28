"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "next-themes";
import { Moon, Sun, CheckCircle2 } from "lucide-react";
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "@/store/services/userApi";
import { toast } from "sonner";
import ProfileTabSkeleton from "../skeletons/ProfileTabSkeleton";

interface ProfileUpdatePayload {
	name: string;
	email: string;
	password?: string;
}

export default function ProfileTab() {
	const { data: profile, isLoading } = useGetProfileQuery(undefined);
	const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
	const { resolvedTheme, setTheme } = useTheme();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		if (profile) {
			setName(profile.name || "");
			setEmail(profile.email || "");
			setPassword("");
		}
	}, [profile]);

	const handleProfileUpdate = async () => {
		try {
			const updatePayload: ProfileUpdatePayload = { name, email };
			if (password.trim() !== "") updatePayload.password = password;

			await updateProfile(updatePayload).unwrap();
			toast.success("Profile updated successfully");
			setPassword("");
			setUpdated(true);
			setTimeout(() => setUpdated(false), 3000);
		} catch (err) {
			console.error("Update failed:", err);
			toast.error("Failed to update profile");
		}
	};

	const noChanges =
		profile &&
		name === profile.name &&
		email === profile.email &&
		password.trim() === "";

	if (isLoading) return <ProfileTabSkeleton />;

	return (
		<div className="space-y-6 max-w-xl">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">Your Profile</h2>
					<p className="text-sm text-muted-foreground">
						Manage your personal information.
					</p>
				</div>

				{/* Theme toggle */}
				<Button
					variant="outline"
					size="icon"
					onClick={() =>
						setTheme(resolvedTheme === "dark" ? "light" : "dark")
					}
				>
					{resolvedTheme === "dark" ? (
						<Sun className="h-5 w-5" />
					) : (
						<Moon className="h-5 w-5" />
					)}
				</Button>
			</div>

			{/* Form */}
			<div className="space-y-4">
				<div>
					<Label className="text-sm font-medium mb-1">Name</Label>
					<Input
						autoFocus
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="John Doe"
					/>
				</div>

				<div>
					<Label className="text-sm font-medium mb-1">Email</Label>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="john@example.com"
					/>
				</div>

				<div>
					<Label className="text-sm font-medium mb-1">
						New Password
					</Label>
					<Input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
					/>
					<div className="flex items-center space-x-2 mt-2">
						<Checkbox
							id="show-password"
							checked={showPassword}
							onCheckedChange={(checked) =>
								setShowPassword(!!checked)
							}
						/>
						<Label
							htmlFor="show-password"
							className="text-sm cursor-pointer"
						>
							Show Password
						</Label>
					</div>
				</div>

				<Button
					onClick={handleProfileUpdate}
					disabled={updating || noChanges}
					className="bg-black text-white hover:bg-gray-900 w-full flex items-center justify-center gap-x-2"
				>
					{updating ? "Updating..." : "Update Profile"}
					{updated && <CheckCircle2 className="text-green-500" />}
				</Button>
			</div>
		</div>
	);
}
