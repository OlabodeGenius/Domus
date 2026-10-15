import type { Metadata } from "next";
import { DashboardScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: { absolute: "Overview — Domus" } };

export default function AdminOverviewPage() {
  return <DashboardScreen />;
}
