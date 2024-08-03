import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Dummy user for demonstration. Replace with actual user validation.
        const user = { id: 1, name: "admin", email: "admin@example.com" };
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", 
  },
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
