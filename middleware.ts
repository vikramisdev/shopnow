// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { placeholderRoutes } from "./lib/placeholderRoutes";

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	const pathname = url.pathname;

	if (placeholderRoutes.includes(pathname)) {
		url.pathname = `/not-implemented${pathname}`;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|api|favicon.ico).*)"], // exclude system routes
};
