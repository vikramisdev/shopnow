// app/providers.tsx
"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ReduxProvider store={store}>{children}</ReduxProvider>
		</SessionProvider>
	);
}
