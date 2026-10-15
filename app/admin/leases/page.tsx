import type { Metadata } from "next";
import { LeasesScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: "Lease expirations" };

export default function LeasesPage() {
  return <LeasesScreen />;
}
