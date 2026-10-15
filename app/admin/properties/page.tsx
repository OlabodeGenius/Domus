import type { Metadata } from "next";
import { PropertiesScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: "Properties & units" };

export default function PropertiesPage() {
  return <PropertiesScreen />;
}
