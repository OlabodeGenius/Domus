"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  CreditCard,
  Download,
  FileArchive,
  FileBadge,
  FileText,
  Filter,
  HardHat,
  Home,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Printer,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
  UsersRound,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  activity,
  collectionHistory,
  dateLabel,
  daysUntil,
  financialTransactions,
  leases,
  maintenanceTickets,
  money,
  payments,
  properties,
  propertyDocuments,
  propertyFor,
  tenantFor,
  tenants,
  type Lease,
  type MaintenanceTicket,
  type Payment,
  type PropertyDocument,
  type Property,
  type Tenant,
} from "@/components/admin/data";
import { useAdminPreferences } from "@/components/admin/preferences";

const panel =
  "border border-[var(--admin-line)] bg-[var(--admin-panel)]";
const subtleButton =
  "inline-flex h-9 items-center justify-center gap-2 border border-[var(--admin-line)] px-3 text-xs text-[var(--admin-ink)] transition hover:bg-[var(--admin-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--admin-blue)]";
const primaryButton =
  "inline-flex h-9 items-center justify-center gap-2 bg-[var(--admin-blue)] px-3.5 text-xs font-medium text-white transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--admin-blue)] disabled:cursor-not-allowed disabled:opacity-50";
const inputStyle =
  "h-9 min-w-0 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-3 text-xs text-[var(--admin-ink)] placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-blue)] focus:outline-none";

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

type BadgeKind = "success" | "warning" | "danger" | "info" | "neutral";

const badgeStyle: Record<BadgeKind, { color: string; Icon: LucideIcon }> = {
  success: { color: "var(--admin-green)", Icon: CheckCircle2 },
  warning: { color: "var(--admin-amber)", Icon: Clock3 },
  danger: { color: "var(--admin-red)", Icon: X },
  info: { color: "var(--admin-blue)", Icon: CalendarDays },
  neutral: { color: "var(--admin-muted)", Icon: Circle },
};

function StatusBadge({
  label,
  kind,
}: {
  label: string;
  kind: BadgeKind;
}) {
  const { color, Icon } = badgeStyle[kind];
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-1 text-[10px] font-medium"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      <Icon size={12} strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}

function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--admin-muted)]">
          {eyebrow}
        </p>
        <h1 className="admin-display text-4xl leading-none sm:text-[42px]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[var(--admin-muted)]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function PanelHeading({
  title,
  detail,
  action,
}: {
  title: string;
  detail?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--admin-line)] px-5 py-4">
      <div>
        <h2 className="text-xs font-medium">{title}</h2>
        {detail && (
          <p className="mt-1 text-[10px] text-[var(--admin-muted)]">{detail}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  note: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <article className={`${panel} p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-muted)]">
          {label}
        </span>
        <Icon size={16} strokeWidth={1.6} className="text-[var(--admin-muted)]" />
      </div>
      <p className="admin-num mt-5 text-[26px] tracking-[-0.06em]">{value}</p>
      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-[var(--admin-muted)]">
        {trend === "up" ? (
          <ArrowUpRight size={13} className="text-[var(--admin-green)]" />
        ) : trend === "down" ? (
          <ArrowDownRight size={13} className="text-[var(--admin-red)]" />
        ) : null}
        {note}
      </p>
    </article>
  );
}

function ProgressBar({
  value,
  color = "var(--admin-blue)",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden bg-[var(--admin-soft)]"
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full transition-[width]"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Modal({
  title,
  description,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className={`${panel} w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto shadow-2xl`}
      >
        <header className="flex items-start justify-between gap-6 border-b border-[var(--admin-line)] p-5 sm:p-6">
          <div>
            <h2 id="admin-modal-title" className="admin-display text-2xl">
              {title}
            </h2>
            {description && (
              <p className="mt-1.5 text-[11px] leading-5 text-[var(--admin-muted)]">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-8 shrink-0 place-items-center text-[var(--admin-muted)] hover:bg-[var(--admin-hover)] hover:text-[var(--admin-ink)]"
          >
            <X size={17} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export function DashboardScreen() {
  const { currency } = useAdminPreferences();
  const occupied = properties.reduce((sum, property) => sum + property.occupied, 0);
  const units = properties.reduce((sum, property) => sum + property.units, 0);
  const occupancy = Math.round((occupied / units) * 100);
  const [period, setPeriod] = useState("6 months");

  return (
    <>
      <PageTitle
        eyebrow="Thursday, November 12, 2026"
        title="Good morning, Sarah."
        description="Here is the latest across your portfolio. A clear view of what needs your attention today."
        action={
          <Link href="/admin/properties" className={subtleButton}>
            <Building2 size={14} />
            View portfolio
          </Link>
        }
      />

      <section
        aria-label="Portfolio summary"
        className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard
          label="Monthly rent"
          value={money(218450, currency)}
          note="Across 5 properties"
          trend="up"
          icon={Banknote}
        />
        <MetricCard
          label="Units managed"
          value="148"
          note="Across Greater Boston"
          icon={Building2}
        />
        <MetricCard
          label="Residents"
          value="382"
          note="In 144 occupied homes"
          trend="up"
          icon={UsersRound}
        />
        <MetricCard
          label="Occupancy"
          value={`${occupancy}%`}
          note="4 homes currently available"
          trend="up"
          icon={Home}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
        <article className={panel}>
          <PanelHeading
            title="Income & operating expenses"
            detail="Portfolio collections, scheduled rent, and operating costs"
            action={
              <select
                aria-label="Chart time period"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className={`${inputStyle} h-8`}
              >
                <option>6 months</option>
                <option>12 months</option>
              </select>
            }
          />
          <div className="p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="admin-num text-3xl tracking-[-0.06em]">{money(186200, currency)}</p>
                <p className="mt-1 text-[10px] text-[var(--admin-muted)]">
                  Collected this month <span className="px-1">·</span> 85.2% of scheduled
                </p>
              </div>
              <div className="flex gap-4 text-[10px] text-[var(--admin-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 bg-[var(--admin-blue)]" /> Collected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 bg-[var(--admin-soft)]" /> Scheduled
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 bg-[var(--admin-green)]" /> Expenses
                </span>
              </div>
            </div>
            <div className="mt-6 h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectionHistory} barGap={5}>
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--admin-line)"
                    strokeDasharray="2 3"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--admin-muted)", fontSize: 10 }}
                    dy={8}
                  />
                  <YAxis
                    domain={[0, 240000]}
                    ticks={[0, 80000, 160000, 240000]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value: number) =>
                      value === 0 ? money(0, currency) : `${money(value / 1000, currency)}k`
                    }
                    tick={{ fill: "var(--admin-muted)", fontSize: 9 }}
                    width={42}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--admin-hover)" }}
                    contentStyle={{
                      border: "1px solid var(--admin-line)",
                      borderRadius: 0,
                      background: "var(--admin-panel)",
                      color: "var(--admin-ink)",
                      fontSize: 10,
                    }}
                    formatter={(value) => money(Number(value), currency)}
                  />
                  <Bar
                    dataKey="collected"
                    name="Collected"
                    fill="var(--admin-blue)"
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="billed"
                    name="Scheduled"
                    fill="var(--admin-soft)"
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="expenses"
                    name="Operating expenses"
                    fill="var(--admin-green)"
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>

        <article className={panel}>
          <PanelHeading
            title="Needs your attention"
            detail="A few things to take care of"
            action={
              <span className="grid size-6 place-items-center bg-[color-mix(in_srgb,var(--admin-red)_12%,transparent)] text-[var(--admin-red)]">
                <Bell size={13} />
              </span>
            }
          />
          <div className="divide-y divide-[var(--admin-line)]">
            <Link
              href="/admin/leases"
              className="flex gap-3 px-5 py-4 transition hover:bg-[var(--admin-hover)]"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-[color-mix(in_srgb,var(--admin-amber)_12%,transparent)] text-[var(--admin-amber)]">
                <CalendarDays size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium">
                  3 leases expiring in 30 days
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-[var(--admin-muted)]">
                  Oliver James, Lucas Martin + 1
                </span>
              </span>
              <ArrowRight size={14} className="mt-1 text-[var(--admin-muted)]" />
            </Link>
            <Link
              href="/admin/payments"
              className="flex gap-3 px-5 py-4 transition hover:bg-[var(--admin-hover)]"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-[color-mix(in_srgb,var(--admin-red)_12%,transparent)] text-[var(--admin-red)]">
                <Wallet size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium">
                  4 payments need follow-up
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-[var(--admin-muted)]">
                  {money(8175, currency)} in outstanding rent
                </span>
              </span>
              <ArrowRight size={14} className="mt-1 text-[var(--admin-muted)]" />
            </Link>
            <Link
              href="/admin/properties"
              className="flex gap-3 px-5 py-4 transition hover:bg-[var(--admin-hover)]"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-[color-mix(in_srgb,var(--admin-blue)_12%,transparent)] text-[var(--admin-blue)]">
                <Building2 size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium">
                  4 homes are currently vacant
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-[var(--admin-muted)]">
                  Two applications in review
                </span>
              </span>
              <ArrowRight size={14} className="mt-1 text-[var(--admin-muted)]" />
            </Link>
          </div>
          <div className="border-t border-[var(--admin-line)] px-5 py-3 text-right">
            <Link
              href="/admin/leases"
              className="text-[10px] font-medium text-[var(--admin-blue)] hover:underline"
            >
              View all reminders
            </Link>
          </div>
        </article>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <article className={panel}>
          <PanelHeading
            title="Collection health"
            detail="November 2026 rent collection"
            action={
              <Link
                href="/admin/payments"
                className="flex items-center gap-1 text-[10px] font-medium text-[var(--admin-blue)]"
              >
                Open ledger <ArrowRight size={13} />
              </Link>
            }
          />
          <div className="p-5">
            <div className="mb-2 flex items-end justify-between">
              <span className="admin-num text-2xl tracking-[-0.06em]">85.2%</span>
              <span className="admin-num text-[10px] text-[var(--admin-muted)]">
                {money(186200, currency)} / {money(218450, currency)}
              </span>
            </div>
            <ProgressBar value={85.2} />
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="border-l-2 border-[var(--admin-green)] pl-3">
                <p className="admin-num text-base">132</p>
                <p className="mt-1 text-[10px] text-[var(--admin-muted)]">Paid in full</p>
              </div>
              <div className="border-l-2 border-[var(--admin-amber)] pl-3">
                <p className="admin-num text-base">12</p>
                <p className="mt-1 text-[10px] text-[var(--admin-muted)]">Processing</p>
              </div>
              <div className="border-l-2 border-[var(--admin-red)] pl-3">
                <p className="admin-num text-base">4</p>
                <p className="mt-1 text-[10px] text-[var(--admin-muted)]">Past due</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--admin-line)] px-5 py-3">
            <p className="text-[10px] text-[var(--admin-muted)]">
              Next deposit <span className="px-1">·</span>
              <span className="admin-num text-[var(--admin-ink)]">{money(24180, currency)}</span>
              <span className="px-1">·</span>Friday, Nov 13
            </p>
          </div>
        </article>

        <article className={panel}>
          <PanelHeading
            title="Recent activity"
            detail="The latest from your properties"
            action={
              <button type="button" className="text-[var(--admin-muted)] hover:text-[var(--admin-ink)]" aria-label="More activity options">
                <MoreHorizontal size={17} />
              </button>
            }
          />
          <ol className="divide-y divide-[var(--admin-line)]">
            {activity.map((item) => {
              const Icon =
                item.type === "payment"
                  ? Wallet
                  : item.type === "lease"
                    ? FileText
                    : item.type === "maintenance"
                      ? CheckCircle2
                      : UserRound;
              return (
                <li key={item.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="grid size-7 shrink-0 place-items-center bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                    <Icon size={13} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium">
                      {item.title}
                    </span>
                    <span className="mt-1 block truncate text-[10px] text-[var(--admin-muted)]">
                      {item.detail}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    {item.amount !== null && (
                      <span className="admin-num block text-[10px] text-[var(--admin-green)]">
                        +{money(item.amount, currency)}
                      </span>
                    )}
                    <span className="mt-1 block text-[9px] text-[var(--admin-muted)]">
                      {item.time}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </article>
      </section>

      <section className={`${panel} mt-5`}>
        <PanelHeading
          title="Property snapshot"
          detail="Occupancy and monthly scheduled rent"
          action={
            <Link
              href="/admin/properties"
              className="flex items-center gap-1 text-[10px] font-medium text-[var(--admin-blue)]"
            >
              All properties <ArrowRight size={13} />
            </Link>
          }
        />
        <div className="grid divide-y divide-[var(--admin-line)] sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-5 xl:divide-x">
          {properties.map((property) => (
            <div key={property.id} className="p-4 sm:p-5">
              <p className="truncate text-[11px] font-medium">{property.name}</p>
              <p className="mt-1 truncate text-[10px] text-[var(--admin-muted)]">
                {property.neighborhood}
              </p>
              <div className="mt-4 flex items-center justify-between text-[10px]">
                <span className="admin-num">
                  {property.occupied}/{property.units} units
                </span>
                <span className="admin-num text-[var(--admin-muted)]">
                  {Math.round((property.occupied / property.units) * 100)}%
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar
                  value={(property.occupied / property.units) * 100}
                  color="var(--admin-green)"
                />
              </div>
              <p className="admin-num mt-3 text-[11px]">
                {money(property.monthlyRent, currency)}
                <span className="ml-1 font-sans text-[9px] font-normal text-[var(--admin-muted)]">
                  /mo
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${panel} mt-5`}>
        <PanelHeading
          title="Portfolio asset class"
          detail="Residential homes by building type"
          action={<span className="text-[9px] text-[var(--admin-muted)]">148 total homes</span>}
        />
        <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Brownstone", units: 78, color: "var(--admin-blue)" },
            { label: "Condominium", units: 28, color: "var(--admin-green)" },
            { label: "Multifamily", units: 24, color: "var(--admin-amber)" },
            { label: "Townhouse", units: 18, color: "var(--admin-red)" },
          ].map((asset) => (
            <div key={asset.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px]">{asset.label}</span>
                <span className="admin-num text-[9px] text-[var(--admin-muted)]">
                  {asset.units} · {Math.round((asset.units / 148) * 100)}%
                </span>
              </div>
              <ProgressBar value={(asset.units / 148) * 100} color={asset.color} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const unitLabels = ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C"];

function unitStatus(index: number, propertyIndex: number) {
  if ((index + propertyIndex * 3) % 37 === 0) return "Notice" as const;
  if ((index + propertyIndex) % 21 === 0) return "Vacant" as const;
  return "Occupied" as const;
}

export function PropertiesScreen() {
  const { currency } = useAdminPreferences();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All neighborhoods");
  const [occupancyFilter, setOccupancyFilter] = useState("Any occupancy");
  const [selected, setSelected] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");
  const [propertyList, setPropertyList] = useState(properties);
  const filtered = propertyList.filter((property) => {
    const matchesQuery =
      `${property.name} ${property.address} ${property.neighborhood}`
        .toLowerCase()
        .includes(query.toLowerCase());
    const matchesArea =
      area === "All neighborhoods" || property.neighborhood === area;
    const ratio = property.occupied / property.units;
    const matchesOccupancy =
      occupancyFilter === "Any occupancy" ||
      (occupancyFilter === "Fully occupied" && ratio === 1) ||
      (occupancyFilter === "Has vacancies" && ratio < 1);
    return matchesQuery && matchesArea && matchesOccupancy;
  });

  function addProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const neighborhood = String(formData.get("neighborhood") ?? "").trim();
    if (!name || !address || !neighborhood) return;
    const property: Property = {
      id: `new-${Date.now()}`,
      name,
      address,
      neighborhood,
      units: 1,
      occupied: 0,
      monthlyRent: 0,
      accent: "#e9e7e1",
      type: "Multifamily",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    };
    setPropertyList((current) => [...current, property]);
    setShowAdd(false);
    setToast(`${name} was added to your properties.`);
    window.setTimeout(() => setToast(""), 3500);
  }

  return (
    <>
      <PageTitle
        eyebrow={`Your portfolio · ${propertyList.length} properties`}
        title="Properties & units"
        description="A considered view of every building, every door, and who calls it home."
        action={
          <button type="button" onClick={() => setShowAdd(true)} className={primaryButton}>
            <Plus size={14} />
            Add property
          </button>
        }
      />

      <div className={`${panel} mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center`}>
        <label className="relative min-w-0 flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search properties or addresses"
            aria-label="Search properties"
            className={`${inputStyle} w-full pl-9`}
          />
        </label>
        <select
          aria-label="Filter by neighborhood"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          className={inputStyle}
        >
          <option>All neighborhoods</option>
          {[...new Set(propertyList.map((property) => property.neighborhood))].map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          aria-label="Filter by occupancy"
          value={occupancyFilter}
          onChange={(event) => setOccupancyFilter(event.target.value)}
          className={inputStyle}
        >
          <option>Any occupancy</option>
          <option>Fully occupied</option>
          <option>Has vacancies</option>
        </select>
        <span className="px-2 text-[10px] text-[var(--admin-muted)]">
          {filtered.length} properties
        </span>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property) => {
            const originalIndex = propertyList.findIndex((item) => item.id === property.id);
            const occupancy = Math.round((property.occupied / property.units) * 100);
            const open = selected === property.id;
            return (
              <article key={property.id} className={`${panel} overflow-hidden`}>
                <div
                  className="relative h-36 bg-cover bg-center"
                  style={{
                    backgroundColor: property.accent,
                    backgroundImage: `linear-gradient(180deg, transparent 48%, rgba(0,0,0,.28)), url("${property.image}")`,
                  }}
                >
                  <span className="absolute bottom-3 left-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {property.neighborhood}
                  </span>
                  <button
                    type="button"
                    aria-label={`More options for ${property.name}`}
                    className="absolute right-3 top-3 grid size-8 place-items-center bg-white/90 text-[#1a1a1a] hover:bg-white"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-medium">{property.name}</h2>
                      <p className="mt-1 truncate text-[10px] text-[var(--admin-muted)]">
                        {property.address} <span className="px-1">·</span> {property.type}
                      </p>
                    </div>
                    <StatusBadge
                      kind={occupancy === 100 ? "success" : "info"}
                      label={occupancy === 100 ? "Fully occupied" : `${property.units - property.occupied} vacant`}
                    />
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="admin-num text-lg tracking-[-0.05em]">
                        {property.occupied}
                        <span className="px-1 text-[var(--admin-muted)]">/</span>
                        {property.units}
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-[var(--admin-muted)]">
                        Occupied units
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="admin-num text-sm">{money(property.monthlyRent, currency)}</p>
                      <p className="mt-1 text-[9px] text-[var(--admin-muted)]">Monthly rent</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar
                      value={occupancy}
                      color={occupancy === 100 ? "var(--admin-green)" : "var(--admin-blue)"}
                    />
                    <span className="admin-num text-[9px] text-[var(--admin-muted)]">
                      {occupancy}%
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(open ? null : property.id)}
                    aria-expanded={open}
                    className="mt-5 flex w-full items-center justify-between border-t border-[var(--admin-line)] pt-4 text-[10px] font-medium text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"
                  >
                    View unit list
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="mt-3 border-t border-[var(--admin-line)] pt-3">
                      <div className="mb-2 grid grid-cols-[1fr_1fr_auto] gap-2 text-[9px] uppercase tracking-[0.1em] text-[var(--admin-muted)]">
                        <span>Unit</span>
                        <span>Resident</span>
                        <span>Status</span>
                      </div>
                      {Array.from(
                        { length: Math.min(property.units, 6) },
                        (_, index) => {
                          const status = unitStatus(index, originalIndex);
                          const resident =
                            status === "Vacant"
                              ? "—"
                              : tenants[(index + originalIndex) % tenants.length];
                          return (
                            <div
                              key={`${property.id}-${index}`}
                              className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 border-t border-[var(--admin-line)] py-2 text-[10px]"
                            >
                              <span className="admin-num">
                                {unitLabels[index % unitLabels.length]}
                              </span>
                              <span className="truncate text-[var(--admin-muted)]">
                                {resident === "—" ? resident : resident.name}
                              </span>
                              <StatusBadge
                                label={status}
                                kind={
                                  status === "Occupied"
                                    ? "success"
                                    : status === "Notice"
                                      ? "warning"
                                      : "neutral"
                                }
                              />
                            </div>
                          );
                        },
                      )}
                      <p className="mt-2 text-right text-[9px] text-[var(--admin-muted)]">
                        Showing 6 of {property.units} homes
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={`${panel} px-5 py-16 text-center`}>
          <Building2 size={24} className="mx-auto text-[var(--admin-muted)]" />
          <p className="mt-3 text-xs font-medium">No properties match those filters</p>
          <button
            type="button"
            className="mt-3 text-[10px] text-[var(--admin-blue)] hover:underline"
            onClick={() => {
              setQuery("");
              setArea("All neighborhoods");
              setOccupancyFilter("Any occupancy");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--admin-line)] pt-4 text-[10px] text-[var(--admin-muted)]">
        <p>
          Portfolio occupancy is{" "}
          <span className="admin-num text-[var(--admin-ink)]">
            {Math.round(
              (propertyList.reduce((sum, property) => sum + property.occupied, 0) /
                propertyList.reduce((sum, property) => sum + property.units, 0)) *
                100,
            )}
            %
          </span>{" "}
          across{" "}
          <span className="admin-num text-[var(--admin-ink)]">
            {propertyList.reduce((sum, property) => sum + property.units, 0)}
          </span>{" "}
          units.
        </p>
        <button
          type="button"
          onClick={() =>
            downloadCsv("domus-properties.csv", [
              ["Property", "Address", "Neighborhood", "Units", "Occupied", "Monthly rent"],
              ...propertyList.map((property) => [
                property.name,
                property.address,
                property.neighborhood,
                property.units,
                property.occupied,
                property.monthlyRent,
              ]),
            ])
          }
          className="flex items-center gap-2 hover:text-[var(--admin-ink)]"
        >
          <Download size={13} />
          Export portfolio
        </button>
      </div>

      {showAdd && (
        <Modal
          title="Add a property"
          description="Start with the essentials. You can add units and residents after saving."
          onClose={() => setShowAdd(false)}
        >
          <form onSubmit={addProperty} className="space-y-4 p-5 sm:p-6">
            <label className="block space-y-1.5 text-[10px] font-medium">
              Property name
              <input name="name" required placeholder="e.g. Garden Court" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Street address
              <input name="address" required placeholder="Street address" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Neighborhood
              <input name="neighborhood" required placeholder="Neighborhood, city" className={`${inputStyle} w-full`} />
            </label>
            <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4">
              <button type="button" onClick={() => setShowAdd(false)} className={subtleButton}>
                Cancel
              </button>
              <button type="submit" className={primaryButton}>
                <Plus size={13} />
                Add property
              </button>
            </div>
          </form>
        </Modal>
      )}
      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-40 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-xs shadow-xl">
          <span className="mr-2 inline-block text-[var(--admin-green)]">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}

function Avatar({ tenant, size = "md" }: { tenant: Tenant; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "size-8 text-[9px]", md: "size-10 text-[10px]", lg: "size-14 text-sm" };
  const colors = ["#e9e0d5", "#dfe8e3", "#e5e2ec", "#e9e4d4"];
  const colorIndex = Math.max(0, tenants.findIndex((item) => item.id === tenant.id));
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full font-medium text-[#665f54] ${sizes[size]}`}
      style={{ backgroundColor: colors[colorIndex % colors.length] }}
    >
      {tenant.initials}
    </span>
  );
}

export function TenantsScreen() {
  const { currency } = useAdminPreferences();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Everyone");
  const [selectedId, setSelectedId] = useState(tenants[0].id);
  const [tenantList, setTenantList] = useState(tenants);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [toast, setToast] = useState("");
  const filtered = useMemo(() => {
    return tenantList.filter((tenant) => {
      const matches =
        `${tenant.name} ${tenant.email} ${tenant.unit} ${propertyFor(tenant.propertyId)?.name ?? ""}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return matches && (status === "Everyone" || tenant.status === status);
    });
  }, [query, status, tenantList]);
  const selected = tenantList.find((tenant) => tenant.id === selectedId) ?? tenantList[0];
  const selectedProperty = propertyFor(selected.propertyId);

  function addResident(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const propertyId = String(values.get("propertyId") ?? "");
    const unit = String(values.get("unit") ?? "").trim();
    const emergencyContact = String(values.get("emergencyContact") ?? "").trim();
    const emergencyPhone = String(values.get("emergencyPhone") ?? "").trim();
    const rent = Number(values.get("rent") ?? 0);
    if (!name || !email || !phone || !propertyFor(propertyId) || !unit || !emergencyContact || !emergencyPhone) return;
    const resident: Tenant = {
      id: `resident-${Date.now()}`,
      name,
      initials: name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join(""),
      email,
      phone,
      unit,
      propertyId,
      leaseEnd: "2027-11-11",
      rent,
      balance: 0,
      status: "Current",
      since: "2026-11-12",
      emergencyContact,
      emergencyPhone,
    };
    setTenantList((current) => [resident, ...current]);
    setSelectedId(resident.id);
    setInviteOpen(false);
    setToast(`${resident.name} was added to the resident directory.`);
    window.setTimeout(() => setToast(""), 3500);
  }

  return (
    <>
      <PageTitle
        eyebrow={`Your community · ${382 + Math.max(0, tenantList.length - tenants.length)} residents`}
        title="Residents"
        description="Know the people behind every front door. Search your directory or open a resident record."
        action={
          <button type="button" onClick={() => setInviteOpen(true)} className={primaryButton}>
            <Plus size={14} />
            Add resident
          </button>
        }
      />

      <div className={`${panel} flex min-h-[640px] flex-col lg:flex-row`}>
        <aside className="flex w-full shrink-0 flex-col border-b border-[var(--admin-line)] lg:w-[330px] lg:border-b-0 lg:border-r">
          <div className="border-b border-[var(--admin-line)] p-4">
            <label className="relative block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search residents"
                aria-label="Search residents"
                className={`${inputStyle} w-full pl-9`}
              />
            </label>
            <div className="mt-3 flex items-center justify-between">
              <select
                aria-label="Filter residents by status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-7 border-0 bg-transparent pr-5 text-[10px] text-[var(--admin-muted)] focus:outline-none"
              >
                <option>Everyone</option>
                <option>Current</option>
                <option>Late</option>
                <option>Notice</option>
              </select>
              <span className="admin-num text-[9px] text-[var(--admin-muted)]">
                {filtered.length} shown
              </span>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto lg:max-h-none lg:flex-1">
            {filtered.map((tenant) => {
              const active = selectedId === tenant.id;
              const property = propertyFor(tenant.propertyId);
              return (
                <button
                  type="button"
                  key={tenant.id}
                  onClick={() => setSelectedId(tenant.id)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-center gap-3 border-b border-[var(--admin-line)] px-4 py-3.5 text-left transition ${
                    active ? "bg-[var(--admin-soft)]" : "hover:bg-[var(--admin-hover)]"
                  }`}
                >
                  <Avatar tenant={tenant} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-medium">{tenant.name}</span>
                      <span className="admin-num shrink-0 text-[10px]">{money(tenant.rent, currency)}</span>
                    </span>
                    <span className="mt-1 block truncate text-[9px] text-[var(--admin-muted)]">
                      {property?.name} · Unit {tenant.unit}
                    </span>
                    <span className="mt-1.5 block">
                      <StatusBadge
                        label={tenant.status}
                        kind={tenant.status === "Current" ? "success" : tenant.status === "Late" ? "danger" : "warning"}
                      />
                    </span>
                  </span>
                </button>
              );
            })}
            {!filtered.length && (
              <p className="px-4 py-10 text-center text-[10px] text-[var(--admin-muted)]">
                No residents match your search.
              </p>
            )}
          </div>
          <div className="mt-auto border-t border-[var(--admin-line)] px-4 py-3 text-[9px] text-[var(--admin-muted)]">
            Showing {tenantList.length} resident records · portfolio total 382
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--admin-line)] p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <Avatar tenant={selected} size="lg" />
              <div>
                <h2 className="admin-display text-3xl">{selected.name}</h2>
                <p className="mt-1.5 text-[10px] text-[var(--admin-muted)]">
                  Resident since {dateLabel(selected.since, { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`} className={subtleButton}>
                <Mail size={13} />
                Email
              </a>
              <button type="button" aria-label="More resident actions" className={`${subtleButton} w-9 px-0`}>
                <MoreHorizontal size={15} />
              </button>
            </div>
          </div>

          <div className="grid gap-7 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)]">
            <div className="space-y-7">
              <section>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                  Home
                </p>
                <div className="border border-[var(--admin-line)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="grid size-9 place-items-center bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                        <Building2 size={16} />
                      </span>
                      <div>
                        <p className="text-[11px] font-medium">{selectedProperty?.name}</p>
                        <p className="mt-1 text-[10px] text-[var(--admin-muted)]">
                          {selectedProperty?.address}, {selectedProperty?.neighborhood}
                        </p>
                        <p className="mt-2 text-[10px]">
                          Apartment <span className="admin-num">{selected.unit}</span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge
                      label={selected.status}
                      kind={selected.status === "Current" ? "success" : selected.status === "Late" ? "danger" : "warning"}
                    />
                  </div>
                </div>
              </section>

              <section>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                  Lease & rent
                </p>
                <div className="grid gap-px border border-[var(--admin-line)] bg-[var(--admin-line)] sm:grid-cols-3">
                  <div className="bg-[var(--admin-panel)] p-4">
                    <p className="text-[9px] text-[var(--admin-muted)]">Monthly rent</p>
                    <p className="admin-num mt-2 text-base">{money(selected.rent, currency)}</p>
                  </div>
                  <div className="bg-[var(--admin-panel)] p-4">
                    <p className="text-[9px] text-[var(--admin-muted)]">Lease ends</p>
                    <p className="admin-num mt-2 text-[11px]">{dateLabel(selected.leaseEnd)}</p>
                  </div>
                  <div className="bg-[var(--admin-panel)] p-4">
                    <p className="text-[9px] text-[var(--admin-muted)]">Account balance</p>
                    <p className={`admin-num mt-2 text-base ${selected.balance ? "text-[var(--admin-red)]" : ""}`}>
                      {money(selected.balance, currency)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--admin-muted)]">
                  <ShieldCheck size={14} className="text-[var(--admin-green)]" />
                  Lease documentation on file
                </div>
              </section>

              <section>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                  Contact details
                </p>
                <div className="space-y-3 border border-[var(--admin-line)] p-4">
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-3 text-[10px] hover:text-[var(--admin-blue)]">
                    <Mail size={14} className="text-[var(--admin-muted)]" />
                    {selected.email}
                  </a>
                  <a href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-3 text-[10px] hover:text-[var(--admin-blue)]">
                    <Phone size={14} className="text-[var(--admin-muted)]" />
                    {selected.phone}
                  </a>
                </div>
              </section>
            </div>

            <div className="space-y-7">
              <section>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                  Emergency contact · off-site
                </p>
                <div className="border border-[var(--admin-line)] p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                      <UserRound size={14} />
                    </span>
                    <div>
                      <p className="text-[10px] font-medium">{selected.emergencyContact}</p>
                      <p className="mt-1 text-[9px] text-[var(--admin-muted)]">Not a household member</p>
                    </div>
                  </div>
                  <a href={`tel:${selected.emergencyPhone.replace(/[^0-9+]/g, "")}`} className="mt-4 flex items-center gap-2 border-t border-[var(--admin-line)] pt-3 text-[10px] hover:text-[var(--admin-blue)]">
                    <Phone size={13} />
                    {selected.emergencyPhone}
                  </a>
                </div>
              </section>

              <section>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
                  Recent payments
                </p>
                <div className="border border-[var(--admin-line)]">
                  {payments
                    .filter((payment) => payment.tenantId === selected.id)
                    .slice(0, 2)
                    .map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between gap-3 border-b border-[var(--admin-line)] px-3 py-3 last:border-0">
                        <span>
                          <span className="admin-num block text-[10px]">{dateLabel(payment.date, { month: "short", day: "numeric" })}</span>
                          <span className="mt-1 block text-[9px] text-[var(--admin-muted)]">{payment.method}</span>
                        </span>
                        <span className="text-right">
                          <span className="admin-num block text-[10px]">{money(payment.amount, currency)}</span>
                          <span className="mt-1 block">
                            <StatusBadge
                              label={payment.status}
                              kind={payment.status === "Paid" ? "success" : payment.status === "Overdue" ? "danger" : "warning"}
                            />
                          </span>
                        </span>
                      </div>
                    ))}
                  {!payments.some((payment) => payment.tenantId === selected.id) && (
                    <p className="p-3 text-[10px] text-[var(--admin-muted)]">No recent payments recorded.</p>
                  )}
                </div>
                <Link
                  href="/admin/payments"
                  className="mt-3 flex items-center gap-1 text-[10px] text-[var(--admin-blue)] hover:underline"
                >
                  View all payments <ArrowRight size={12} />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
      {inviteOpen && (
        <Modal
          title="Add a resident"
          description="Add a resident record to the portfolio. An off-site emergency contact is required."
          onClose={() => setInviteOpen(false)}
          wide
        >
          <form onSubmit={addResident} className="grid gap-x-4 gap-y-4 p-5 sm:grid-cols-2 sm:p-6">
            <label className="block space-y-1.5 text-[10px] font-medium">
              Full name
              <input name="name" required placeholder="Resident name" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Email
              <input name="email" required type="email" placeholder="name@email.com" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Phone
              <input name="phone" required type="tel" placeholder="(617) 555-0100" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Property
              <select name="propertyId" required className={`${inputStyle} w-full`}>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>{property.name}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Unit
              <input name="unit" required placeholder="e.g. 3A" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Monthly rent
              <input name="rent" required type="number" min="0" placeholder="2500" className={`${inputStyle} admin-num w-full`} />
            </label>
            <div className="border-t border-[var(--admin-line)] pt-4 sm:col-span-2">
              <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--admin-muted)]">
                Emergency contact · off-site, not a household member
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5 text-[10px] font-medium">
                  Name and relationship
                  <input name="emergencyContact" required placeholder="Name (relationship)" className={`${inputStyle} w-full`} />
                </label>
                <label className="block space-y-1.5 text-[10px] font-medium">
                  Phone
                  <input name="emergencyPhone" required type="tel" placeholder="(617) 555-0100" className={`${inputStyle} w-full`} />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4 sm:col-span-2">
              <button type="button" onClick={() => setInviteOpen(false)} className={subtleButton}>Cancel</button>
              <button type="submit" className={primaryButton}><Plus size={13} />Add resident</button>
            </div>
          </form>
        </Modal>
      )}
      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-40 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-xs shadow-xl">
          <span className="mr-2 text-[var(--admin-green)]">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}

function RenewalModal({
  lease,
  tenant,
  onClose,
  onSend,
}: {
  lease: Lease;
  tenant: Tenant;
  onClose: () => void;
  onSend: (leaseId: string, rent: number) => void;
}) {
  const { currency } = useAdminPreferences();
  const property = propertyFor(lease.propertyId);
  const [rent, setRent] = useState(String(lease.proposedRent || lease.rent));
  return (
    <Modal
      title="Prepare a renewal offer"
      description={`${tenant.name} · ${property?.name} · Unit ${lease.unit}`}
      onClose={onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend(lease.id, Number(rent));
        }}
        className="space-y-5 p-5 sm:p-6"
      >
        <div className="grid grid-cols-2 gap-px border border-[var(--admin-line)] bg-[var(--admin-line)]">
          <div className="bg-[var(--admin-panel)] p-3">
            <p className="text-[9px] text-[var(--admin-muted)]">Current monthly rent</p>
            <p className="admin-num mt-1.5 text-sm">{money(lease.rent, currency)}</p>
          </div>
          <div className="bg-[var(--admin-panel)] p-3">
            <p className="text-[9px] text-[var(--admin-muted)]">Lease end date</p>
            <p className="admin-num mt-1.5 text-sm">{dateLabel(lease.endDate)}</p>
          </div>
        </div>
        <label className="block space-y-1.5 text-[10px] font-medium">
          Proposed monthly rent
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--admin-muted)]">
              $
            </span>
            <input
              type="number"
              min="0"
              required
              value={rent}
              onChange={(event) => setRent(event.target.value)}
              className={`${inputStyle} admin-num w-full pl-7`}
            />
          </div>
          <span className="block text-[9px] font-normal text-[var(--admin-muted)]">
            Increase of{" "}
            {money(Math.max(0, Number(rent || 0) - lease.rent), currency)} per month
            {lease.rent
              ? ` · ${Math.max(0, ((Number(rent || 0) - lease.rent) / lease.rent) * 100).toFixed(1)}%`
              : ""}
          </span>
        </label>
        <label className="block space-y-1.5 text-[10px] font-medium">
          Message to resident
          <textarea
            rows={3}
            defaultValue={`We'd be delighted to welcome you for another year at ${property?.name}. Please let us know if you'd like to discuss your renewal.`}
            className="w-full resize-y border border-[var(--admin-line)] bg-[var(--admin-panel)] p-3 text-[10px] leading-5 focus:border-[var(--admin-blue)] focus:outline-none"
          />
        </label>
        <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4">
          <button type="button" onClick={onClose} className={subtleButton}>
            Cancel
          </button>
          <button type="submit" className={primaryButton}>
            <FileText size={13} />
            Save renewal draft
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function LeasesScreen() {
  const { currency } = useAdminPreferences();
  const [selected, setSelected] = useState<Lease | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All leases");
  const [leaseList, setLeaseList] = useState(leases);
  const [toast, setToast] = useState("");
  const allExpiringSoon = leaseList.filter((lease) => daysUntil(lease.endDate) <= 90).length;
  const filtered = leaseList
    .filter((lease) => {
      const tenant = tenantFor(lease.tenantId);
      const property = propertyFor(lease.propertyId);
      const matchesSearch =
        `${tenant?.name ?? ""} ${property?.name ?? ""} ${lease.unit}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const days = daysUntil(lease.endDate);
      const matchesFilter =
        filter === "All leases" ||
        (filter === "Next 30 days" && days <= 30) ||
        (filter === "31–60 days" && days > 30 && days <= 60) ||
        (filter === "61–90 days" && days > 60 && days <= 90) ||
        (filter === "Renewal declined" && lease.notice === "Renewal declined");
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.endDate.localeCompare(b.endDate));

  function sendRenewal(leaseId: string, rent: number) {
    setLeaseList((current) =>
      current.map((lease) =>
        lease.id === leaseId
          ? { ...lease, proposedRent: rent, notice: "Draft saved Nov 12" }
          : lease,
      ),
    );
    setSelected(null);
    setToast("Renewal draft saved in this demo.");
    window.setTimeout(() => setToast(""), 3500);
  }

  const groups = [
    { name: "In the next 30 days", range: "Next 30 days", note: "Nov 12 – Dec 12" },
    { name: "31–60 days", range: "31–60 days", note: "Dec 13 – Jan 11" },
    { name: "61–90 days", range: "61–90 days", note: "Jan 12 – Feb 10" },
  ];

  return (
    <>
      <PageTitle
        eyebrow="Lease calendar · As of November 12, 2026"
        title="Lease expirations"
        description="A clear runway to every renewal, with enough time to make each resident feel at home."
        action={
          <button type="button" className={subtleButton}>
            <CalendarDays size={14} />
            Calendar view
          </button>
        }
      />

      <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Expiring in 30 days", value: "3", note: "2 offers not yet sent", kind: "warning" as const },
          { label: "Expiring in 60 days", value: "5", note: "Across 4 properties", kind: "info" as const },
          { label: "Expiring in 90 days", value: String(allExpiringSoon), note: "1 renewal declined", kind: "danger" as const },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setFilter(item.label.includes("30") ? "Next 30 days" : item.label.includes("60") ? "31–60 days" : "61–90 days")}
            className={`${panel} p-4 text-left transition hover:bg-[var(--admin-hover)]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-[var(--admin-muted)]">{item.label}</span>
              <StatusBadge label="Review" kind={item.kind} />
            </div>
            <p className="admin-num mt-3 text-2xl">{item.value}</p>
            <p className="mt-1 text-[9px] text-[var(--admin-muted)]">{item.note}</p>
          </button>
        ))}
      </section>

      <div className={`${panel} mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center`}>
        <label className="relative min-w-0 flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a resident, property, or unit"
            aria-label="Search leases"
            className={`${inputStyle} w-full pl-9`}
          />
        </label>
        <select
          aria-label="Filter leases by expiry"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className={inputStyle}
        >
          <option>All leases</option>
          <option>Next 30 days</option>
          <option>31–60 days</option>
          <option>61–90 days</option>
          <option>Renewal declined</option>
        </select>
        <button type="button" onClick={() => setFilter("All leases")} className={subtleButton}>
          Reset
        </button>
      </div>

      <div className="space-y-5">
        {(filter === "All leases" ? groups : groups.filter((group) => group.range === filter)).map((group) => {
          const groupLeases = filtered.filter((lease) => {
            const days = daysUntil(lease.endDate);
            return group.range === "Next 30 days"
              ? days <= 30
              : group.range === "31–60 days"
                ? days > 30 && days <= 60
                : days > 60 && days <= 90;
          });
          if (!groupLeases.length) return null;
          return (
            <section key={group.range}>
              <div className="mb-2 flex items-end justify-between">
                <h2 className="text-[11px] font-medium">{group.name}</h2>
                <span className="admin-num text-[9px] text-[var(--admin-muted)]">{group.note}</span>
              </div>
              <div className={panel}>
                <div className="hidden grid-cols-[minmax(150px,1.3fr)_minmax(150px,1.3fr)_90px_115px_120px_132px] gap-3 border-b border-[var(--admin-line)] px-4 py-3 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--admin-muted)] md:grid">
                  <span>Resident</span>
                  <span>Property & unit</span>
                  <span>Lease ends</span>
                  <span>Current rent</span>
                  <span>Renewal status</span>
                  <span className="text-right">Action</span>
                </div>
                {groupLeases.map((lease) => {
                  const tenant = tenantFor(lease.tenantId);
                  const property = propertyFor(lease.propertyId);
                  if (!tenant) return null;
                  const remaining = daysUntil(lease.endDate);
                  return (
                    <div
                      key={lease.id}
                      className="flex flex-col gap-3 border-b border-[var(--admin-line)] px-4 py-4 last:border-b-0 md:grid md:grid-cols-[minmax(150px,1.3fr)_minmax(150px,1.3fr)_90px_115px_120px_132px] md:items-center md:gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar tenant={tenant} size="sm" />
                        <div>
                          <p className="text-[10px] font-medium">{tenant.name}</p>
                          <p className="mt-1 text-[9px] text-[var(--admin-muted)]">
                            <span className="md:hidden">{property?.name} · </span>
                            Lease expires in <span className="admin-num">{remaining}</span> days
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] md:text-[10px]">
                        <span className="md:hidden text-[9px] text-[var(--admin-muted)]">Property · </span>
                        {property?.name}, Unit {lease.unit}
                      </p>
                      <p className="admin-num text-[10px]">{dateLabel(lease.endDate, { month: "short", day: "numeric" })}</p>
                      <p className="admin-num text-[10px]">{money(lease.rent, currency)}<span className="ml-1 font-sans text-[9px] text-[var(--admin-muted)]">/mo</span></p>
                      <div>
                        <StatusBadge
                          label={lease.notice}
                          kind={
                            lease.notice.startsWith("Draft saved")
                              ? "info"
                              : lease.notice.startsWith("Sent")
                                ? "success"
                              : lease.notice === "Renewal declined"
                                ? "danger"
                                : lease.notice.startsWith("Received")
                                  ? "info"
                                  : "warning"
                          }
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setSelected(lease)}
                          className={subtleButton}
                        >
                          {lease.notice.startsWith("Draft saved") ? "Edit draft" : "Prepare renewal"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {filter === "All leases" && (
        <section className={`${panel} mt-5`}>
          <PanelHeading
            title="Further ahead"
            detail="Renewals beyond the 90-day window"
          />
          {filtered
            .filter((lease) => daysUntil(lease.endDate) > 90)
            .map((lease) => {
              const tenant = tenantFor(lease.tenantId);
              const property = propertyFor(lease.propertyId);
              if (!tenant) return null;
              return (
                <div key={lease.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--admin-line)] px-5 py-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <Avatar tenant={tenant} size="sm" />
                    <div>
                      <p className="text-[10px] font-medium">{tenant.name}</p>
                      <p className="mt-1 text-[9px] text-[var(--admin-muted)]">{property?.name} · Unit {lease.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="admin-num text-[10px]">{dateLabel(lease.endDate)}</span>
                    <button type="button" onClick={() => setSelected(lease)} className="text-[10px] text-[var(--admin-blue)] hover:underline">
                      Prepare renewal
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
      )}

      {selected && (
        <RenewalModal
          lease={selected}
          tenant={tenantFor(selected.tenantId) ?? tenants[0]}
          onClose={() => setSelected(null)}
          onSend={sendRenewal}
        />
      )}
      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-40 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-xs shadow-xl">
          <span className="mr-2 text-[var(--admin-green)]">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}

function ReceiptModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const { currency } = useAdminPreferences();
  const tenant = tenantFor(payment.tenantId);
  const property = propertyFor(payment.propertyId);
  const paid = payment.status === "Paid";
  return (
    <Modal
      title="Payment receipt"
      description="A printable record for your books."
      onClose={onClose}
      wide
    >
      <article className="admin-receipt-print mx-auto max-w-md px-6 py-7 sm:px-10">
        <div className="flex items-start justify-between border-b border-[var(--admin-line)] pb-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center bg-[var(--admin-ink)] text-xs font-medium text-[var(--admin-panel)]">
              D
            </span>
            <div>
              <p className="font-serif text-lg leading-none">Domus</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[var(--admin-muted)]">Resident payment receipt</p>
            </div>
          </div>
          <StatusBadge label={payment.status} kind={paid ? "success" : payment.status === "Overdue" ? "danger" : "warning"} />
        </div>
        <div className="py-7 text-center">
          <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--admin-muted)]">Amount received</p>
          <p className="admin-num mt-3 text-4xl tracking-[-0.08em]">{money(payment.amount, currency)}</p>
          <p className="mt-2 text-[10px] text-[var(--admin-muted)]">
            {paid ? "Payment recorded" : payment.status === "Processing" ? "Payment processing" : "Payment overdue"}
          </p>
        </div>
        <dl className="divide-y divide-[var(--admin-line)] border-y border-[var(--admin-line)] text-[10px]">
          {[
            ["Receipt number", payment.id],
            ["Resident", tenant?.name ?? "—"],
            ["Property", property?.name ?? "—"],
            ["Unit", payment.unit],
            ["Payment date", dateLabel(payment.date)],
            ["Payment method", payment.method],
            ["Description", "November 2026 monthly rent"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-3">
              <dt className="text-[var(--admin-muted)]">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="pt-5 text-center text-[9px] leading-4 text-[var(--admin-muted)]">
          Domus Property Management · Boston, Massachusetts
          <br />
          Thank you for making a house a home.
        </div>
        <div className="mt-5 flex justify-end gap-2 print:hidden">
          <button type="button" onClick={onClose} className={subtleButton}>Close</button>
          <button type="button" onClick={() => window.print()} className={primaryButton}>
            <Printer size={13} />
            Print receipt
          </button>
        </div>
      </article>
    </Modal>
  );
}

export function PaymentsScreen() {
  const { currency } = useAdminPreferences();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All payments");
  const [selected, setSelected] = useState<Payment | null>(null);
  const filtered = payments.filter((payment) => {
    const tenant = tenantFor(payment.tenantId);
    const property = propertyFor(payment.propertyId);
    const matchesQuery =
      `${payment.id} ${tenant?.name ?? ""} ${property?.name ?? ""} ${payment.unit}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return matchesQuery && (status === "All payments" || payment.status === status);
  });
  const totalCollected = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <>
      <PageTitle
        eyebrow="Money, accounted for · November 2026"
        title="Payments"
        description="Every rent payment, in one considered ledger. Select a line for its printable receipt."
        action={
          <button
            type="button"
            onClick={() =>
              downloadCsv("domus-payments-november-2026.csv", [
                ["Receipt", "Resident", "Property", "Unit", "Date", "Method", "Amount", "Status"],
                ...filtered.map((payment) => [
                  payment.id,
                  tenantFor(payment.tenantId)?.name ?? "",
                  propertyFor(payment.propertyId)?.name ?? "",
                  payment.unit,
                  payment.date,
                  payment.method,
                  payment.amount,
                  payment.status,
                ]),
              ])
            }
            className={subtleButton}
          >
            <Download size={14} />
            Export ledger
          </button>
        }
      />

      <section className="mb-6 grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Scheduled this month"
          value={money(218450, currency)}
          note="148 units · November rent"
          icon={CalendarDays}
        />
        <MetricCard
          label="Received to date"
          value={money(186200, currency)}
          note="85.2% collected"
          trend="up"
          icon={Banknote}
        />
        <MetricCard
          label="Outstanding"
          value={money(8175, currency)}
          note="4 accounts need follow-up"
          trend="down"
          icon={Wallet}
        />
      </section>

      <div className={`${panel} mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center`}>
        <label className="relative min-w-0 flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by resident, property, or receipt"
            aria-label="Search payments"
            className={`${inputStyle} w-full pl-9`}
          />
        </label>
        <select
          aria-label="Filter payment status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className={inputStyle}
        >
          <option>All payments</option>
          <option>Paid</option>
          <option>Processing</option>
          <option>Overdue</option>
        </select>
        <button type="button" className={subtleButton}>
          <CalendarDays size={13} />
          November 2026
          <ChevronDown size={13} />
        </button>
      </div>

      <section className="mb-5 grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="November gross income"
          value={money(186200, currency)}
          note="Collected rent to date"
          icon={ArrowUpRight}
        />
        <MetricCard
          label="Operating expenses"
          value={money(73250, currency)}
          note="Maintenance, insurance, utilities"
          icon={ArrowDownRight}
        />
        <MetricCard
          label="Net operating income"
          value={money(112950, currency)}
          note="Income less operating expenses"
          trend="up"
          icon={Banknote}
        />
      </section>

      <section className={`${panel} mb-5`}>
        <PanelHeading
          title="Recent financial activity"
          detail="Rental income and operating costs across your residential portfolio"
          action={<span className="text-[9px] text-[var(--admin-muted)]">November 2026</span>}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--admin-line)] text-left text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--admin-muted)]">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Description</th>
                <th className="px-3 py-3 font-medium">Property</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-5 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {financialTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[var(--admin-line)] last:border-0">
                  <td className="admin-num px-5 py-3 text-[9px]">{dateLabel(transaction.date, { month: "short", day: "numeric" })}</td>
                  <td className="px-3 py-3 text-[10px]">{transaction.description}</td>
                  <td className="px-3 py-3 text-[10px] text-[var(--admin-muted)]">{propertyFor(transaction.propertyId)?.name}</td>
                  <td className="px-3 py-3 text-[9px] text-[var(--admin-muted)]">{transaction.category}</td>
                  <td className={`admin-num px-5 py-3 text-right text-[10px] ${transaction.amount < 0 ? "text-[var(--admin-red)]" : "text-[var(--admin-green)]"}`}>
                    {transaction.amount < 0 ? "−" : "+"}{money(Math.abs(transaction.amount), currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={panel}>
        <PanelHeading
          title="November ledger"
          detail={`${filtered.length} entries · showing a sample of 148 units`}
          action={
            <div className="hidden items-center gap-2 text-[9px] text-[var(--admin-muted)] sm:flex">
              <span className="grid size-5 place-items-center border border-[var(--admin-line)]">
                <ChevronLeft size={12} />
              </span>
              <span className="grid size-5 place-items-center border border-[var(--admin-line)]">
                <ChevronRight size={12} />
              </span>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--admin-line)] text-left text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--admin-muted)]">
                <th className="px-5 py-3 font-medium">Resident</th>
                <th className="px-3 py-3 font-medium">Property & unit</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Method</th>
                <th className="px-3 py-3 text-right font-medium">Amount</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => {
                const tenant = tenantFor(payment.tenantId);
                const property = propertyFor(payment.propertyId);
                if (!tenant) return null;
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-[var(--admin-line)] transition last:border-0 hover:bg-[var(--admin-hover)]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar tenant={tenant} size="sm" />
                        <span>
                          <span className="block text-[10px] font-medium">{tenant.name}</span>
                          <span className="admin-num mt-1 block text-[9px] text-[var(--admin-muted)]">{payment.id}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="block text-[10px]">{property?.name}</span>
                      <span className="mt-1 block text-[9px] text-[var(--admin-muted)]">Unit {payment.unit}</span>
                    </td>
                    <td className="admin-num px-3 py-3.5 text-[10px]">{dateLabel(payment.date, { month: "short", day: "numeric" })}</td>
                    <td className="px-3 py-3.5">
                      <span className="flex items-center gap-1.5 text-[10px] text-[var(--admin-muted)]">
                        {payment.method.startsWith("Card") ? <CreditCard size={12} /> : <Banknote size={12} />}
                        {payment.method}
                      </span>
                    </td>
                    <td className="admin-num px-3 py-3.5 text-right text-[10px]">{money(payment.amount, currency)}</td>
                    <td className="px-3 py-3.5">
                      <StatusBadge
                        label={payment.status}
                        kind={payment.status === "Paid" ? "success" : payment.status === "Overdue" ? "danger" : "warning"}
                      />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(payment)}
                        className="inline-flex items-center gap-1 text-[10px] text-[var(--admin-blue)] hover:underline"
                      >
                        <FileText size={12} />
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[10px] text-[var(--admin-muted)]">
                    No payments match those filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--admin-line)] px-5 py-3 text-[9px] text-[var(--admin-muted)]">
          <span>
            Showing 1–{filtered.length} of 148 transactions
          </span>
          <div className="flex items-center gap-4">
            <span>
              Visible paid total <span className="admin-num ml-1 text-[var(--admin-ink)]">{money(totalCollected, currency)}</span>
            </span>
            <button type="button" className="flex items-center gap-1 text-[var(--admin-blue)] hover:underline">
              Next page <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </section>

      <p className="mt-4 flex items-center gap-2 text-[9px] text-[var(--admin-muted)]">
        <ShieldCheck size={13} />
        Resident payment details are visible only to portfolio administrators.
      </p>

      {selected && (
        <ReceiptModal payment={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export function MaintenanceScreen() {
  const [tickets, setTickets] = useState(maintenanceTickets);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All tickets");
  const [priorityFilter, setPriorityFilter] = useState("Any priority");
  const [createOpen, setCreateOpen] = useState(false);
  const [toast, setToast] = useState("");
  const openTickets = tickets.filter((ticket) => ticket.status !== "Resolved");
  const filtered = tickets.filter((ticket) => {
    const property = propertyFor(ticket.propertyId);
    const matchesQuery =
      `${ticket.title} ${ticket.description} ${ticket.unit} ${property?.name ?? ""} ${ticket.reportedBy}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return (
      matchesQuery &&
      (statusFilter === "All tickets" || ticket.status === statusFilter) &&
      (priorityFilter === "Any priority" || ticket.priority === priorityFilter)
    );
  });

  function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const propertyId = String(values.get("propertyId") ?? "");
    const title = String(values.get("title") ?? "").trim();
    const unit = String(values.get("unit") ?? "").trim();
    const reportedBy = String(values.get("reportedBy") ?? "").trim();
    const description = String(values.get("description") ?? "").trim();
    const priority = values.get("priority");
    if (
      !propertyFor(propertyId) ||
      !title ||
      !unit ||
      !reportedBy ||
      !description ||
      (priority !== "High" && priority !== "Medium" && priority !== "Low")
    ) {
      return;
    }
    const ticket: MaintenanceTicket = {
      id: `MT-${1100 + tickets.length + 1}`,
      propertyId,
      unit,
      title,
      description,
      reportedBy,
      reportedAt: "2026-11-12",
      priority,
      status: "Open",
      assignee: "Unassigned",
    };
    setTickets((current) => [ticket, ...current]);
    setCreateOpen(false);
    setToast("Maintenance request added to your demo portfolio.");
    window.setTimeout(() => setToast(""), 3500);
  }

  function updateTicket(id: string, status: MaintenanceTicket["status"]) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status,
              assignee:
                status === "Assigned" ? "Property care team" : ticket.assignee,
            }
          : ticket,
      ),
    );
    setToast(status === "Resolved" ? "Ticket marked resolved." : "Ticket assigned to the property care team.");
    window.setTimeout(() => setToast(""), 3500);
  }

  return (
    <>
      <PageTitle
        eyebrow="Property care · November 12, 2026"
        title="Maintenance"
        description="A clear record of the small repairs and important work that keep every home in good order."
        action={
          <button type="button" onClick={() => setCreateOpen(true)} className={primaryButton}>
            <Plus size={14} />
            New request
          </button>
        }
      />

      <section className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Open tickets", value: String(openTickets.length), detail: "Across all properties", kind: "info" as const },
          { label: "High priority", value: String(openTickets.filter((ticket) => ticket.priority === "High").length), detail: "Needs timely attention", kind: "danger" as const },
          { label: "Resolved this month", value: String(tickets.filter((ticket) => ticket.status === "Resolved").length), detail: "Recorded in November", kind: "success" as const },
        ].map((item) => (
          <article key={item.label} className={`${panel} p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-[var(--admin-muted)]">{item.label}</span>
              <StatusBadge label={item.kind === "danger" ? "Priority" : item.kind === "success" ? "Complete" : "Active"} kind={item.kind} />
            </div>
            <p className="admin-num mt-3 text-2xl">{item.value}</p>
            <p className="mt-1 text-[9px] text-[var(--admin-muted)]">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className={`${panel} mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center`}>
        <label className="relative min-w-0 flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search requests, property, or resident"
            aria-label="Search maintenance requests"
            className={`${inputStyle} w-full pl-9`}
          />
        </label>
        <label className="flex items-center gap-2">
          <Filter size={13} className="text-[var(--admin-muted)]" />
          <select
            aria-label="Filter maintenance status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className={inputStyle}
          >
            <option>All tickets</option>
            <option>Open</option>
            <option>Assigned</option>
            <option>Resolved</option>
          </select>
        </label>
        <select
          aria-label="Filter maintenance priority"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          className={inputStyle}
        >
          <option>Any priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </section>

      <section className={`${panel} divide-y divide-[var(--admin-line)]`}>
        <PanelHeading
          title="Maintenance requests"
          detail={`${filtered.length} requests · sorted by priority and date`}
        />
        {filtered
          .slice()
          .sort((a, b) => {
            const priorityRank = { High: 0, Medium: 1, Low: 2 };
            return priorityRank[a.priority] - priorityRank[b.priority] || b.reportedAt.localeCompare(a.reportedAt);
          })
          .map((ticket) => {
            const property = propertyFor(ticket.propertyId);
            const priorityKind: BadgeKind =
              ticket.priority === "High" ? "danger" : ticket.priority === "Medium" ? "warning" : "neutral";
            const statusKind: BadgeKind =
              ticket.status === "Resolved" ? "success" : ticket.status === "Assigned" ? "warning" : "info";
            return (
              <article key={ticket.id} className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="flex gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                    <HardHat size={16} strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[11px] font-medium">{ticket.title}</h2>
                      <StatusBadge label={`${ticket.priority} priority`} kind={priorityKind} />
                      <StatusBadge label={ticket.status} kind={statusKind} />
                    </div>
                    <p className="mt-1.5 text-[10px] leading-5 text-[var(--admin-muted)]">{ticket.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-[var(--admin-muted)]">
                      <span>{property?.name} · Unit {ticket.unit}</span>
                      <span>Reported by {ticket.reportedBy}</span>
                      <span>{dateLabel(ticket.reportedAt)}</span>
                      <span>Assigned to {ticket.assignee}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  {ticket.status === "Open" && (
                    <button type="button" onClick={() => updateTicket(ticket.id, "Assigned")} className={subtleButton}>
                      Assign
                    </button>
                  )}
                  {ticket.status !== "Resolved" && (
                    <button type="button" onClick={() => updateTicket(ticket.id, "Resolved")} className={subtleButton}>
                      <CheckCircle2 size={13} />
                      Resolve
                    </button>
                  )}
                  {ticket.status === "Resolved" && (
                    <span className="inline-flex items-center gap-1.5 px-2 text-[9px] text-[var(--admin-muted)]">
                      <CheckCircle2 size={13} className="text-[var(--admin-green)]" />
                      Closed
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        {!filtered.length && (
          <p className="px-5 py-14 text-center text-[10px] text-[var(--admin-muted)]">
            No maintenance requests match those filters.
          </p>
        )}
      </section>

      {createOpen && (
        <Modal
          title="New maintenance request"
          description="Add the home, a brief description, and who raised the request."
          onClose={() => setCreateOpen(false)}
          wide
        >
          <form onSubmit={createTicket} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <label className="block space-y-1.5 text-[10px] font-medium">
              Property
              <select name="propertyId" required className={`${inputStyle} w-full`}>
                {properties.map((property) => <option key={property.id} value={property.id}>{property.name}</option>)}
              </select>
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Unit
              <input name="unit" required placeholder="Unit or common area" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium sm:col-span-2">
              Request title
              <input name="title" required placeholder="What needs attention?" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Reported by
              <input name="reportedBy" required placeholder="Resident or property team" className={`${inputStyle} w-full`} />
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Priority
              <select name="priority" className={`${inputStyle} w-full`}>
                <option>Medium</option>
                <option>High</option>
                <option>Low</option>
              </select>
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium sm:col-span-2">
              Description
              <textarea name="description" required rows={3} placeholder="Add useful context for the person handling this repair." className="w-full border border-[var(--admin-line)] bg-[var(--admin-panel)] p-3 text-[10px] leading-5 focus:border-[var(--admin-blue)] focus:outline-none" />
            </label>
            <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4 sm:col-span-2">
              <button type="button" onClick={() => setCreateOpen(false)} className={subtleButton}>Cancel</button>
              <button type="submit" className={primaryButton}><Plus size={13} />Add request</button>
            </div>
          </form>
        </Modal>
      )}
      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-40 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-xs shadow-xl">
          <span className="mr-2 text-[var(--admin-green)]">✓</span>{toast}
        </div>
      )}
    </>
  );
}

type VaultRecord = PropertyDocument & { file?: File };

export function DocumentsScreen() {
  const [documents, setDocuments] = useState<VaultRecord[]>(propertyDocuments);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All documents");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selected, setSelected] = useState<VaultRecord | null>(null);
  const [toast, setToast] = useState("");
  const filtered = documents.filter((document) => {
    const property = propertyFor(document.propertyId);
    const matchesQuery =
      `${document.name} ${document.category} ${property?.name ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return matchesQuery && (category === "All documents" || document.category === category);
  });

  function uploadDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const file = values.get("file");
    const propertyId = String(values.get("propertyId") ?? "");
    const selectedCategory = values.get("category");
    if (
      !(file instanceof File) ||
      file.size === 0 ||
      !propertyFor(propertyId) ||
      (selectedCategory !== "Lease" &&
        selectedCategory !== "Insurance" &&
        selectedCategory !== "Inspection" &&
        selectedCategory !== "Legal" &&
        selectedCategory !== "Maintenance")
    ) {
      setToast("Choose a file, property, and document category before uploading.");
      window.setTimeout(() => setToast(""), 3500);
      return;
    }
    const size =
      file.size >= 1_000_000
        ? `${(file.size / 1_000_000).toFixed(1)} MB`
        : `${Math.max(1, Math.round(file.size / 1000))} KB`;
    const document: VaultRecord = {
      id: `DOC-${2100 + documents.length + 1}`,
      name: file.name,
      category: selectedCategory,
      propertyId,
      date: "2026-11-12",
      size,
      file,
    };
    setDocuments((current) => [document, ...current]);
    setUploadOpen(false);
    setToast("Document added to this browser session's demo vault.");
    window.setTimeout(() => setToast(""), 3500);
  }

  const categoryIcon = (value: PropertyDocument["category"]) =>
    value === "Lease" ? FileText : value === "Inspection" ? ShieldCheck : value === "Maintenance" ? HardHat : FileBadge;

  return (
    <>
      <PageTitle
        eyebrow={`Property records · ${documents.length} documents`}
        title="Documents & vault"
        description="A tidy home for the agreements, inspections, and records that keep a property portfolio in good order."
        action={
          <button type="button" onClick={() => setUploadOpen(true)} className={primaryButton}>
            <Upload size={14} />
            Add document
          </button>
        }
      />

      <section className={`${panel} mb-5 flex flex-col gap-3 p-3 sm:flex-row sm:items-center`}>
        <label className="relative min-w-0 flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, property, or category"
            aria-label="Search documents"
            className={`${inputStyle} w-full pl-9`}
          />
        </label>
        <label className="flex items-center gap-2">
          <Filter size={13} className="text-[var(--admin-muted)]" />
          <select
            aria-label="Filter document category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputStyle}
          >
            <option>All documents</option>
            <option>Lease</option>
            <option>Insurance</option>
            <option>Inspection</option>
            <option>Legal</option>
            <option>Maintenance</option>
          </select>
        </label>
        <span className="px-2 text-[9px] text-[var(--admin-muted)]">{filtered.length} files</span>
      </section>

      <section className={panel}>
        <PanelHeading
          title="Portfolio document vault"
          detail={`${filtered.length} records · most recently added first`}
          action={<span className="inline-flex items-center gap-1.5 text-[9px] text-[var(--admin-muted)]"><ShieldCheck size={13} />Private to your portfolio</span>}
        />
        <div className="grid gap-px bg-[var(--admin-line)] sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((document) => {
            const Icon = categoryIcon(document.category);
            const property = propertyFor(document.propertyId);
            return (
              <article key={document.id} className="bg-[var(--admin-panel)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <StatusBadge label={document.category} kind="neutral" />
                </div>
                <h2 className="mt-4 line-clamp-2 min-h-9 text-[11px] font-medium leading-5">{document.name}</h2>
                <p className="mt-1 text-[9px] text-[var(--admin-muted)]">{property?.name}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--admin-line)] pt-3 text-[9px] text-[var(--admin-muted)]">
                  <span>{dateLabel(document.date)} · {document.size}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(document)}
                    aria-label={`View ${document.name}`}
                    className="grid size-7 place-items-center text-[var(--admin-blue)] hover:bg-[var(--admin-hover)]"
                  >
                    {document.file ? <Download size={14} /> : <ArrowRight size={14} />}
                  </button>
                </div>
              </article>
            );
          })}
          {!filtered.length && (
            <p className="col-span-full bg-[var(--admin-panel)] px-5 py-14 text-center text-[10px] text-[var(--admin-muted)]">
              No documents match your search.
            </p>
          )}
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { category: "Lease", detail: "Agreements, renewals, addenda" },
          { category: "Property", detail: "Insurance, inspection, title" },
          { category: "Service", detail: "Maintenance and compliance records" },
        ].map((item) => (
          <div key={item.category} className={`${panel} flex items-center gap-3 p-4`}>
            <FileArchive size={15} className="text-[var(--admin-muted)]" />
            <div>
              <p className="text-[10px] font-medium">{item.category} records</p>
              <p className="mt-1 text-[9px] text-[var(--admin-muted)]">{item.detail}</p>
            </div>
          </div>
        ))}
      </section>

      {uploadOpen && (
        <Modal
          title="Add a document"
          description="Select a file and connect it to the right home and record type."
          onClose={() => setUploadOpen(false)}
        >
          <form onSubmit={uploadDocument} className="space-y-4 p-5 sm:p-6">
            <label className="block space-y-1.5 text-[10px] font-medium">
              File
              <input
                name="file"
                type="file"
                required
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="block w-full border border-[var(--admin-line)] bg-[var(--admin-panel)] p-2 text-[10px] file:mr-3 file:border-0 file:bg-[var(--admin-soft)] file:px-3 file:py-2 file:text-[9px]"
              />
              <span className="block text-[9px] font-normal text-[var(--admin-muted)]">
                PDF, Word, and image files. Stored in this browser session only.
              </span>
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Property
              <select name="propertyId" required className={`${inputStyle} w-full`}>
                {properties.map((property) => <option key={property.id} value={property.id}>{property.name}</option>)}
              </select>
            </label>
            <label className="block space-y-1.5 text-[10px] font-medium">
              Document type
              <select name="category" className={`${inputStyle} w-full`}>
                <option>Lease</option>
                <option>Insurance</option>
                <option>Inspection</option>
                <option>Legal</option>
                <option>Maintenance</option>
              </select>
            </label>
            <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4">
              <button type="button" onClick={() => setUploadOpen(false)} className={subtleButton}>Cancel</button>
              <button type="submit" className={primaryButton}><Upload size={13} />Add to vault</button>
            </div>
          </form>
        </Modal>
      )}

      {selected && (
        <Modal
          title={selected.name}
          description={`${propertyFor(selected.propertyId)?.name ?? "Property"} · ${selected.category} · Added ${dateLabel(selected.date)}`}
          onClose={() => setSelected(null)}
        >
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between border border-[var(--admin-line)] p-4 text-[10px]">
              <span className="text-[var(--admin-muted)]">Document reference</span>
              <span className="admin-num">{selected.id}</span>
            </div>
            <div className="flex items-center justify-between border border-[var(--admin-line)] p-4 text-[10px]">
              <span className="text-[var(--admin-muted)]">File size</span>
              <span>{selected.size}</span>
            </div>
            {selected.file ? (
              <button
                type="button"
                onClick={() => {
                  if (!selected.file) return;
                  const url = URL.createObjectURL(selected.file);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = selected.file.name;
                  link.click();
                  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
                className={primaryButton}
              >
                <Download size={13} />
                Download document
              </button>
            ) : (
              <p className="text-[9px] leading-5 text-[var(--admin-muted)]">
                This sample record demonstrates the portfolio index; its source file is not included in the demo.
              </p>
            )}
          </div>
        </Modal>
      )}

      {toast && (
        <div role="status" className="fixed bottom-5 right-5 z-40 border border-[var(--admin-line)] bg-[var(--admin-panel)] px-4 py-3 text-xs shadow-xl">
          <span className="mr-2 text-[var(--admin-green)]">✓</span>{toast}
        </div>
      )}
    </>
  );
}
