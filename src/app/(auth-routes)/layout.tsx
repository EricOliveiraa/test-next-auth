import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  // getServer => precisa receber as configurações de Auth
  const session = await getServerSession(nextAuthOptions);

  if (!session) redirect("/");

  return <>{children}</>;
}

// feito isso para ter a rota admin protegida
