import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

const baseUrl = process.env.API_BASE_URL;

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {;

                if (!credentials.username || !credentials.password) return null;

                const { username, password } = credentials;
                const res = await fetch(`${baseUrl}/api/[public]/v1/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                if (!res.ok) {
                    throw new Error(user.message);
                }

                if (res.ok && user) {
                    return user;
                }

                return null;

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            //ToDo: Review this configuration
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: 'code',
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    jwt: {
        // JWT encoding and decoding configurations
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
    },
});