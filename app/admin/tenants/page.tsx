import type { Metadata } from "next";
import { TenantsScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: "Residents" };

export default function ResidentsPage() {
  return <TenantsScreen />;
}
