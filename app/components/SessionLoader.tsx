"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { login } from "@/store/slices/authSlice";

export default function SessionLoader() {
	const dispatch = useDispatch();

	useEffect(() => {
		const syncSession = async () => {
			const session = await getSession();
			if (session?.user) {
				dispatch(
					login({
						name: session.user.name ?? "Unknown",
						email: session.user.email ?? "unknown@example.com",
						photo: session.user.image ?? "",
					})
				);
			}
		};

		syncSession();
	}, [dispatch]);

	return null;
}
