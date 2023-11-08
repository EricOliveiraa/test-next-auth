import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  // onde digo qual tipo de auth que eu quero... github.. google.. credentials...
  providers: [
    CredentialsProvider({
      name: "credentials",
      // quais credenciais irei receber
      credentials: {
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
        },
      },
      // metodo onde implementa chamada para api para fazer authenticação
      async authorize(credentials, req) {
        const responde = await fetch("", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          // o que eu tenho que mandar para api
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await responde.json();

        if (user && responde.ok) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

// config para auth
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
