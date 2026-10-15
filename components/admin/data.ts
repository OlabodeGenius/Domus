import { formatCurrency, type CurrencyCode } from "@/components/admin/preferences";

export const asOfDate = new Date("2026-11-12T12:00:00-05:00");

export type UnitStatus = "Occupied" | "Vacant" | "Notice";

export type Property = {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  units: number;
  occupied: number;
  monthlyRent: number;
  accent: string;
  image: string;
  type: "Multifamily" | "Brownstone" | "Condominium" | "Townhouse";
};

export const properties: Property[] = [
  {
    id: "beacon",
    name: "Beacon House",
    address: "84 Beacon Street",
    neighborhood: "Beacon Hill",
    units: 42,
    occupied: 41,
    monthlyRent: 68400,
    accent: "#e9e3d8",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    type: "Brownstone",
  },
  {
    id: "commonwealth",
    name: "Commonwealth",
    address: "163 Commonwealth Avenue",
    neighborhood: "Back Bay",
    units: 36,
    occupied: 35,
    monthlyRent: 59800,
    accent: "#e7e9e5",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    type: "Brownstone",
  },
  {
    id: "kendall",
    name: "The Kendall",
    address: "22 Third Street",
    neighborhood: "East Cambridge",
    units: 28,
    occupied: 27,
    monthlyRent: 42300,
    accent: "#e5e6e8",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    type: "Condominium",
  },
  {
    id: "elm",
    name: "Elm & Alder",
    address: "9 Elm Street",
    neighborhood: "Somerville",
    units: 24,
    occupied: 23,
    monthlyRent: 31550,
    accent: "#ebe6df",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    type: "Multifamily",
  },
  {
    id: "brookline",
    name: "Aspen Court",
    address: "310 Harvard Street",
    neighborhood: "Brookline",
    units: 18,
    occupied: 18,
    monthlyRent: 16400,
    accent: "#e3e9e3",
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=900&q=85",
    type: "Townhouse",
  },
];

export type Tenant = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  unit: string;
  propertyId: string;
  leaseEnd: string;
  rent: number;
  balance: number;
  status: "Current" | "Late" | "Notice";
  since: string;
  emergencyContact: string;
  emergencyPhone: string;
};

export const tenants: Tenant[] = [
  {
    id: "maya",
    name: "Maya Chen",
    initials: "MC",
    email: "maya.chen@email.com",
    phone: "(617) 555-0184",
    unit: "4B",
    propertyId: "beacon",
    leaseEnd: "2026-12-31",
    rent: 2850,
    balance: 0,
    status: "Current",
    since: "2023-07-01",
    emergencyContact: "Daniel Chen (brother)",
    emergencyPhone: "(617) 555-0166",
  },
  {
    id: "oliver",
    name: "Oliver James",
    initials: "OJ",
    email: "oliver.james@email.com",
    phone: "(617) 555-0122",
    unit: "2A",
    propertyId: "commonwealth",
    leaseEnd: "2026-11-30",
    rent: 3100,
    balance: 0,
    status: "Current",
    since: "2024-02-01",
    emergencyContact: "Catherine James (mother)",
    emergencyPhone: "(781) 555-0191",
  },
  {
    id: "fatima",
    name: "Fatima Rahman",
    initials: "FR",
    email: "fatima.rahman@email.com",
    phone: "(617) 555-0137",
    unit: "6C",
    propertyId: "kendall",
    leaseEnd: "2027-04-30",
    rent: 2675,
    balance: 0,
    status: "Current",
    since: "2022-05-01",
    emergencyContact: "Samir Rahman (father)",
    emergencyPhone: "(781) 555-0165",
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    initials: "ER",
    email: "elena.rodriguez@email.com",
    phone: "(617) 555-0149",
    unit: "1F",
    propertyId: "elm",
    leaseEnd: "2026-11-18",
    rent: 2450,
    balance: 2450,
    status: "Late",
    since: "2021-10-01",
    emergencyContact: "Luis Rodriguez (father)",
    emergencyPhone: "(617) 555-0193",
  },
  {
    id: "theo",
    name: "Theo Williams",
    initials: "TW",
    email: "theo.williams@email.com",
    phone: "(617) 555-0119",
    unit: "3D",
    propertyId: "beacon",
    leaseEnd: "2027-01-31",
    rent: 3200,
    balance: 0,
    status: "Current",
    since: "2025-02-01",
    emergencyContact: "Avery Williams (partner, off-site)",
    emergencyPhone: "(857) 555-0131",
  },
  {
    id: "priya",
    name: "Priya Nair",
    initials: "PN",
    email: "priya.nair@email.com",
    phone: "(617) 555-0168",
    unit: "8A",
    propertyId: "commonwealth",
    leaseEnd: "2027-06-30",
    rent: 2950,
    balance: 0,
    status: "Current",
    since: "2023-09-01",
    emergencyContact: "Arun Nair (father)",
    emergencyPhone: "(781) 555-0104",
  },
  {
    id: "noah",
    name: "Noah Patel",
    initials: "NP",
    email: "noah.patel@email.com",
    phone: "(617) 555-0173",
    unit: "2C",
    propertyId: "brookline",
    leaseEnd: "2027-02-28",
    rent: 2250,
    balance: 0,
    status: "Current",
    since: "2024-06-01",
    emergencyContact: "Meera Patel (sister)",
    emergencyPhone: "(617) 555-0174",
  },
  {
    id: "claire",
    name: "Claire Bennett",
    initials: "CB",
    email: "claire.bennett@email.com",
    phone: "(617) 555-0156",
    unit: "5A",
    propertyId: "kendall",
    leaseEnd: "2026-12-15",
    rent: 2850,
    balance: 125,
    status: "Late",
    since: "2023-01-01",
    emergencyContact: "Margaret Bennett (mother)",
    emergencyPhone: "(781) 555-0186",
  },
  {
    id: "jordan",
    name: "Jordan Ellis",
    initials: "JE",
    email: "jordan.ellis@email.com",
    phone: "(617) 555-0111",
    unit: "2B",
    propertyId: "elm",
    leaseEnd: "2027-03-31",
    rent: 2300,
    balance: 0,
    status: "Current",
    since: "2022-11-01",
    emergencyContact: "Morgan Ellis (sibling)",
    emergencyPhone: "(857) 555-0185",
  },
  {
    id: "lucas",
    name: "Lucas Martin",
    initials: "LM",
    email: "lucas.martin@email.com",
    phone: "(617) 555-0127",
    unit: "7C",
    propertyId: "beacon",
    leaseEnd: "2026-12-01",
    rent: 3100,
    balance: 0,
    status: "Notice",
    since: "2021-03-01",
    emergencyContact: "Sophie Martin (sister)",
    emergencyPhone: "(781) 555-0196",
  },
];

export type Lease = {
  id: string;
  tenantId: string;
  propertyId: string;
  unit: string;
  endDate: string;
  rent: number;
  proposedRent: number;
  notice: string;
};

export const leases: Lease[] = [
  { id: "l-1", tenantId: "oliver", propertyId: "commonwealth", unit: "2A", endDate: "2026-11-30", rent: 3100, proposedRent: 3195, notice: "Sent Oct 01" },
  { id: "l-2", tenantId: "lucas", propertyId: "beacon", unit: "7C", endDate: "2026-12-01", rent: 3100, proposedRent: 3190, notice: "Received Oct 18" },
  { id: "l-3", tenantId: "claire", propertyId: "kendall", unit: "5A", endDate: "2026-12-15", rent: 2850, proposedRent: 2935, notice: "Sent Oct 15" },
  { id: "l-4", tenantId: "maya", propertyId: "beacon", unit: "4B", endDate: "2026-12-31", rent: 2850, proposedRent: 2940, notice: "Not sent" },
  { id: "l-5", tenantId: "elena", propertyId: "elm", unit: "1F", endDate: "2026-11-18", rent: 2450, proposedRent: 0, notice: "Renewal declined" },
  { id: "l-6", tenantId: "theo", propertyId: "beacon", unit: "3D", endDate: "2027-01-31", rent: 3200, proposedRent: 3300, notice: "Not sent" },
  { id: "l-7", tenantId: "noah", propertyId: "brookline", unit: "2C", endDate: "2027-02-28", rent: 2250, proposedRent: 2315, notice: "Not sent" },
  { id: "l-8", tenantId: "jordan", propertyId: "elm", unit: "2B", endDate: "2027-03-31", rent: 2300, proposedRent: 2370, notice: "Not sent" },
];

export type Payment = {
  id: string;
  tenantId: string;
  propertyId: string;
  unit: string;
  date: string;
  method: string;
  amount: number;
  status: "Paid" | "Processing" | "Overdue";
};

export const payments: Payment[] = [
  { id: "DM-2611-0842", tenantId: "maya", propertyId: "beacon", unit: "4B", date: "2026-11-01", method: "ACH transfer", amount: 2850, status: "Paid" },
  { id: "DM-2611-0841", tenantId: "priya", propertyId: "commonwealth", unit: "8A", date: "2026-11-01", method: "ACH transfer", amount: 2950, status: "Paid" },
  { id: "DM-2611-0840", tenantId: "elena", propertyId: "elm", unit: "1F", date: "2026-11-02", method: "Bank transfer", amount: 2450, status: "Overdue" },
  { id: "DM-2611-0839", tenantId: "oliver", propertyId: "commonwealth", unit: "2A", date: "2026-11-01", method: "ACH transfer", amount: 3100, status: "Paid" },
  { id: "DM-2611-0838", tenantId: "theo", propertyId: "beacon", unit: "3D", date: "2026-11-01", method: "Card •• 4242", amount: 3200, status: "Paid" },
  { id: "DM-2611-0837", tenantId: "fatima", propertyId: "kendall", unit: "6C", date: "2026-11-03", method: "ACH transfer", amount: 2675, status: "Processing" },
  { id: "DM-2611-0836", tenantId: "claire", propertyId: "kendall", unit: "5A", date: "2026-11-04", method: "ACH transfer", amount: 2850, status: "Processing" },
  { id: "DM-2611-0835", tenantId: "noah", propertyId: "brookline", unit: "2C", date: "2026-11-01", method: "ACH transfer", amount: 2250, status: "Paid" },
  { id: "DM-2611-0834", tenantId: "jordan", propertyId: "elm", unit: "2B", date: "2026-11-01", method: "ACH transfer", amount: 2300, status: "Paid" },
  { id: "DM-2611-0833", tenantId: "lucas", propertyId: "beacon", unit: "7C", date: "2026-11-01", method: "ACH transfer", amount: 3100, status: "Paid" },
];

export const collectionHistory = [
  { month: "Jun", collected: 198400, billed: 211200, expenses: 72300 },
  { month: "Jul", collected: 205100, billed: 214000, expenses: 75600 },
  { month: "Aug", collected: 209800, billed: 216700, expenses: 69800 },
  { month: "Sep", collected: 212600, billed: 217300, expenses: 81400 },
  { month: "Oct", collected: 216950, billed: 218100, expenses: 76800 },
  { month: "Nov", collected: 186200, billed: 218450, expenses: 73250 },
];

export type MaintenanceTicket = {
  id: string;
  propertyId: string;
  unit: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Assigned" | "Resolved";
  assignee: string;
};

export const maintenanceTickets: MaintenanceTicket[] = [
  {
    id: "MT-1042",
    propertyId: "beacon",
    unit: "2C",
    title: "Water heater leaking in utility closet",
    description: "Resident noticed water collecting near the base of the tank.",
    reportedBy: "Maya Chen",
    reportedAt: "2026-11-11",
    priority: "High",
    status: "Assigned",
    assignee: "Beacon Plumbing Co.",
  },
  {
    id: "MT-1041",
    propertyId: "commonwealth",
    unit: "Lobby",
    title: "Front entry intercom needs attention",
    description: "Several residents report inconsistent audio at the street panel.",
    reportedBy: "Building team",
    reportedAt: "2026-11-10",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
  },
  {
    id: "MT-1040",
    propertyId: "kendall",
    unit: "5A",
    title: "Kitchen faucet handle is loose",
    description: "A small repair to the hot water handle.",
    reportedBy: "Claire Bennett",
    reportedAt: "2026-11-08",
    priority: "Low",
    status: "Resolved",
    assignee: "Cambridge Home Services",
  },
];

export type PropertyDocument = {
  id: string;
  name: string;
  category: "Lease" | "Insurance" | "Inspection" | "Legal" | "Maintenance";
  propertyId: string;
  date: string;
  size: string;
};

export const propertyDocuments: PropertyDocument[] = [
  { id: "DOC-2081", name: "Beacon House · Master lease", category: "Lease", propertyId: "beacon", date: "2026-10-01", size: "1.8 MB" },
  { id: "DOC-2080", name: "Portfolio insurance policy · 2026", category: "Insurance", propertyId: "commonwealth", date: "2026-09-18", size: "2.4 MB" },
  { id: "DOC-2079", name: "Annual safety inspection", category: "Inspection", propertyId: "kendall", date: "2026-09-03", size: "980 KB" },
  { id: "DOC-2078", name: "Elm & Alder · deed and title", category: "Legal", propertyId: "elm", date: "2026-07-21", size: "4.1 MB" },
  { id: "DOC-2077", name: "Boiler service record", category: "Maintenance", propertyId: "beacon", date: "2026-06-14", size: "620 KB" },
  { id: "DOC-2076", name: "Aspen Court · resident handbook", category: "Lease", propertyId: "brookline", date: "2026-05-08", size: "1.2 MB" },
];

export type FinancialTransaction = {
  id: string;
  date: string;
  description: string;
  propertyId: string;
  category: "Rental income" | "Maintenance" | "Insurance" | "Taxes & utilities";
  amount: number;
  status: "Cleared" | "Processing";
};

export const financialTransactions: FinancialTransaction[] = [
  { id: "TX-1101", date: "2026-11-01", description: "November rent · Maya Chen", propertyId: "beacon", category: "Rental income", amount: 2850, status: "Cleared" },
  { id: "TX-1102", date: "2026-11-02", description: "Common-area heating service", propertyId: "commonwealth", category: "Maintenance", amount: -1850, status: "Cleared" },
  { id: "TX-1103", date: "2026-11-03", description: "November rent · Priya Nair", propertyId: "commonwealth", category: "Rental income", amount: 2950, status: "Cleared" },
  { id: "TX-1104", date: "2026-11-05", description: "Quarterly property insurance", propertyId: "kendall", category: "Insurance", amount: -4200, status: "Cleared" },
  { id: "TX-1105", date: "2026-11-08", description: "November rent · Noah Patel", propertyId: "brookline", category: "Rental income", amount: 2250, status: "Processing" },
  { id: "TX-1106", date: "2026-11-10", description: "Water & sewer · October", propertyId: "elm", category: "Taxes & utilities", amount: -890, status: "Cleared" },
];

export const activity = [
  { id: 1, title: "Rent received", detail: "Maya Chen · Beacon House 4B", time: "10:42 am", amount: 2850, type: "payment" },
  { id: 2, title: "Lease renewal sent", detail: "Oliver James · Commonwealth 2A", time: "9:18 am", amount: null, type: "lease" },
  { id: 3, title: "Maintenance request closed", detail: "Commonwealth 3C · Kitchen faucet", time: "Yesterday", amount: null, type: "maintenance" },
  { id: 4, title: "New resident moved in", detail: "The Kendall 4D · Nov 01", time: "Nov 01", amount: null, type: "resident" },
];

export function propertyFor(id: string) {
  return properties.find((property) => property.id === id);
}

export function tenantFor(id: string) {
  return tenants.find((tenant) => tenant.id === id);
}

export function money(amount: number, currency: CurrencyCode = "USD") {
  return formatCurrency(amount, currency);
}

export function dateLabel(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
    ...options,
  }).format(new Date(`${date}T12:00:00Z`));
}

export function daysUntil(date: string) {
  const target = new Date(`${date}T12:00:00-05:00`);
  return Math.ceil((target.getTime() - asOfDate.getTime()) / 86_400_000);
}
