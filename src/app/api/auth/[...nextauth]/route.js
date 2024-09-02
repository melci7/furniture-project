import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/lib/userService"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials) // Add this line

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await getUserByEmail(credentials.email)
        console.log("User found:", user) // Add this line

        if (user && credentials.password === user.password) {
          return { id: user.id, name: user.name, email: user.email }
        }
        throw new Error("Invalid email or password")
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
