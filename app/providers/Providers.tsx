// app/providers.tsx
"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<SessionProvider>
				<ReduxProvider store={store}>{children}</ReduxProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}
