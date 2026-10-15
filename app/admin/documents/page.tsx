import type { Metadata } from "next";
import { DocumentsScreen } from "@/components/admin/screens";

export const metadata: Metadata = { title: "Documents & vault" };

export default function DocumentsPage() {
  return <DocumentsScreen />;
}
