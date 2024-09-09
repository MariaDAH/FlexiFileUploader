import { auth } from "@/services/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Flexi-Uploader",
  description:
    "NextJS Single Page Application, test and continuous integration development.",
};

export default async function App() {
  const session = await auth();

  return <>{session?.user ? redirect("/home") : redirect("/signin")}</>;
}
