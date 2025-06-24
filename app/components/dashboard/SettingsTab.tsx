"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function SettingsTab() {
	const router = useRouter();

	const handleDeactivate = () => {
		toast.success(
			"Your account has been deactivated. You can log in anytime to reactivate."
		);
	};

	const handleDelete = () => {
		toast.success("Your account has been permanently deleted.");
	};

	return (
		<div className="space-y-6">
			{/* Combined Account + Notifications + Address + Payment */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg font-semibold">
						Account Preferences
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Online Status */}
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium text-sm">
								Show online status
							</p>
							<p className="text-xs text-muted-foreground">
								Let others know youre active.
							</p>
						</div>
						<Switch />
					</div>

					{/* 2FA */}
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium text-sm">
								Two-Factor Authentication
							</p>
							<p className="text-xs text-muted-foreground">
								Extra security on login.
							</p>
						</div>
						<Switch />
					</div>

					{/* Email Alerts */}
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium text-sm">Email Alerts</p>
							<p className="text-xs text-muted-foreground">
								Get emails for order updates and promotions.
							</p>
						</div>
						<Switch defaultChecked />
					</div>

					{/* Push Notifications */}
					<div className="flex justify-between items-center">
						<div>
							<p className="font-medium text-sm">
								Push Notifications
							</p>
							<p className="text-xs text-muted-foreground">
								Get instant app alerts.
							</p>
						</div>
						<Switch />
					</div>

					<Separator />

					{/* Addresses */}
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							Manage your delivery addresses.
						</p>
						<Button
							variant="outline"
							onClick={() => router.push("/dashboard/addresses")}
						>
							Manage Addresses
						</Button>
					</div>

					{/* Payment Methods */}
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							View or remove saved cards.
						</p>
						<Button
							variant="outline"
							onClick={() => router.push("/dashboard/payments")}
						>
							Manage Payments
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Danger Zone */}
			<Card className="border border-red-500">
				<CardHeader>
					<CardTitle className="text-red-600 text-lg font-semibold">
						Danger Zone
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							Temporarily disable your account. You can reactivate
							at any time.
						</p>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">
									Deactivate Account
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogTitle>
									Deactivate Account
								</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to deactivate your
									account? You can log in to reactivate it
									anytime.
								</AlertDialogDescription>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleDeactivate}
									>
										Confirm
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>

					<Separator />

					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							Deleting your account is irreversible.
						</p>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">
									Delete Account
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogTitle>
									Delete Account
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete your account and all
									associated data.
								</AlertDialogDescription>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction onClick={handleDelete}>
										Yes, delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
