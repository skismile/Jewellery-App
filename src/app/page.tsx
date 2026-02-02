import Image from "next/image";
import { env } from "@/lib/env";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard/products");
}
