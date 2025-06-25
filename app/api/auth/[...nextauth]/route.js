import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password required.");
				}

				await connectToDB();

				const user = await User.findOne({ email: credentials.email });
				if (!user) throw new Error("No account found with this email.");

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isPasswordCorrect) throw new Error("Incorrect password.");

				return {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
					image: typeof user.photo === "string" ? user.photo : null,
				};
			},
		}),
	],

	session: {
		strategy: "jwt",
	},

	pages: {
		signIn: "/login",
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.image = user.image;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.image;
			}
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
