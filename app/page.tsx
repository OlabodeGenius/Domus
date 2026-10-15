import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing/home";

export const metadata: Metadata = {
  title: "Domus — Property management, kept in good order",
  description:
    "A calmer way to manage homes, residents, renewals, and rent. Built for independent landlords and small property teams.",
};

export default function Home() {
  return <MarketingHome />;
}
