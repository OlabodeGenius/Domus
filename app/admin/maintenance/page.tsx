import type { Metadata } from "next";
import { MaintenanceScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: "Maintenance" };

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
