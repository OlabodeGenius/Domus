"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  ChevronDown,
  CircleHelp,
  Command,
  Globe2,
  LayoutDashboard,
  Moon,
  Search,
  Sun,
  UsersRound,
  WalletCards,
  Wrench,
  FolderClosed,
  X,
} from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import {
  AdminPreferencesProvider,
  countries,
  countryName,
  detectLocationPreferences,
  saveAdminPreferences,
  useAdminPreferences,
  type AdminPreferences,
  type CurrencyCode,
  type CountryCode,
} from "@/components/admin/preferences";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Properties & units", href: "/admin/properties", icon: Building2 },
  { label: "Residents", href: "/admin/tenants", icon: UsersRound },
  { label: "Leases", href: "/admin/leases", icon: CalendarClock, count: "8" },
  { label: "Payments", href: "/admin/payments", icon: WalletCards },
  { label: "Maintenance", href: "/admin/maintenance", icon: Wrench, count: "2" },
  { label: "Documents", href: "/admin/documents", icon: FolderClosed },
];

type Theme = "light" | "dark";

const themeKey = "domus-admin-theme";

function readTheme(): Theme {
  return window.localStorage.getItem(themeKey) === "dark" ? "dark" : "light";
}

function subscribeTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("domus-admin-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("domus-admin-theme-change", onChange);
  };
}

function writeTheme(theme: Theme) {
  window.localStorage.setItem(themeKey, theme);
  window.dispatchEvent(new Event("domus-admin-theme-change"));
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AdminPreferencesProvider>
      <AdminShellContent>{children}</AdminShellContent>
    </AdminPreferencesProvider>
  );
}

function PreferencesModal({
  preferences,
  onClose,
  onSave,
}: {
  preferences: AdminPreferences;
  onClose: () => void;
  onSave: (preferences: AdminPreferences) => void;
}) {
  const [country, setCountry] = useState<CountryCode>(preferences.country);
  const [currency, setCurrency] = useState<CurrencyCode>(preferences.currency);
  const selectClass =
    "mt-1.5 h-10 w-full border border-[var(--admin-line)] bg-[var(--admin-panel)] px-3 text-xs text-[var(--admin-ink)] focus:border-[var(--admin-blue)] focus:outline-none";

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
        aria-labelledby="location-preferences-title"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto border border-[var(--admin-line)] bg-[var(--admin-panel)] shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-[var(--admin-line)] p-5">
          <div>
            <h2 id="location-preferences-title" className="font-serif text-2xl">
              Regional preferences
            </h2>
            <p className="mt-1.5 text-[10px] leading-5 text-[var(--admin-muted)]">
              Choose the region and currency used for your portfolio display.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close regional preferences"
            onClick={onClose}
            className="grid size-8 place-items-center text-[var(--admin-muted)] hover:bg-[var(--admin-hover)]"
          >
            <X size={16} />
          </button>
        </header>
        <div className="space-y-4 p-5">
          <label className="block text-[10px] font-medium">
            Country or region
            <select
              value={country}
              onChange={(event) => {
                const selectedCountry = countries.find(
                  (option) => option.code === event.target.value,
                );
                if (!selectedCountry) return;
                setCountry(selectedCountry.code);
                setCurrency(selectedCountry.currency);
              }}
              className={selectClass}
            >
              {countries.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[10px] font-medium">
            Display currency
            <select
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value as CurrencyCode)
              }
              className={selectClass}
            >
              {[...new Set(countries.map((option) => option.currency))].map(
                (code) => (
                  <option key={code} value={code}>
                    {code} ·{" "}
                    {countries.find((option) => option.currency === code)?.symbol}
                  </option>
                ),
              )}
            </select>
          </label>
          <p className="text-[9px] leading-4 text-[var(--admin-muted)]">
            We suggest a region using your browser locale and time zone. This
            changes display formatting only; it does not convert demo amounts
            or represent live exchange rates.
          </p>
          <button
            type="button"
            onClick={() => {
              detectLocationPreferences();
              onClose();
            }}
            className="text-[10px] text-[var(--admin-blue)] hover:underline"
          >
            Use my detected location
          </button>
          <div className="flex justify-end gap-2 border-t border-[var(--admin-line)] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-9 border border-[var(--admin-line)] px-3 text-[10px] hover:bg-[var(--admin-hover)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave({ country, currency })}
              className="h-9 bg-[var(--admin-blue)] px-3 text-[10px] font-medium text-white hover:bg-blue-600"
            >
              Save preferences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const preferences = useAdminPreferences();

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    writeTheme(nextTheme);
  }

  return (
    <div className="admin-theme min-h-screen" data-theme={theme}>
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[var(--admin-line)] bg-[var(--admin-panel)] px-5 py-6 lg:flex">
          <Link href="/admin" className="flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center bg-[var(--admin-ink)] text-sm font-medium text-[var(--admin-panel)]">
              D
            </span>
            <span>
              <span className="block font-serif text-xl leading-none tracking-tight">
                Domus
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                Property management
              </span>
            </span>
          </Link>

          <button className="mt-10 flex w-full items-center justify-between border border-[var(--admin-line)] px-3 py-2.5 text-left transition hover:bg-[var(--admin-hover)]">
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center bg-[var(--admin-soft)] text-[var(--admin-muted)]">
                <Building2 size={15} strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium">
                  Sarah&apos;s portfolio
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-[var(--admin-muted)]">
                  {countryName(preferences.country)}
                </span>
              </span>
            </span>
            <ChevronDown
              size={15}
              className="shrink-0 text-[var(--admin-muted)]"
            />
          </button>

          <p className="mb-3 mt-9 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--admin-muted)]">
            Portfolio
          </p>
          <nav aria-label="Main navigation" className="space-y-1">
            {navigation.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-l-2 px-3 py-2.5 text-[13px] transition ${
                    active
                      ? "border-[var(--admin-blue)] bg-[var(--admin-soft)] font-medium text-[var(--admin-ink)]"
                      : "border-transparent text-[var(--admin-muted)] hover:bg-[var(--admin-hover)] hover:text-[var(--admin-ink)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.7} aria-hidden />
                    {item.label}
                  </span>
                  {item.count && (
                    <span className="font-mono text-[10px] tabular-nums text-[var(--admin-muted)]">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="mb-5 border-t border-[var(--admin-line)] pt-4">
              <div className="flex items-center gap-3 px-2 py-2">
                <span className="grid size-8 place-items-center rounded-full bg-[#e8ddd1] text-[11px] font-medium text-[#735b47]">
                  SJ
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium">Sarah Jenkins</span>
                  <span className="mt-0.5 block text-[11px] text-[var(--admin-muted)]">
                    Portfolio owner
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className="text-[var(--admin-muted)]"
                />
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-2 text-[11px] text-[var(--admin-muted)] transition hover:text-[var(--admin-ink)]"
            >
              <ArrowUpRight size={14} />
              Back to Domus
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--admin-line)] bg-[var(--admin-panel)] px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="font-serif text-lg tracking-tight lg:hidden">
                Domus
              </Link>
              <button
                type="button"
                className="flex size-9 items-center justify-center border border-[var(--admin-line)] text-[var(--admin-muted)] hover:bg-[var(--admin-hover)] lg:hidden"
                aria-label="Toggle navigation"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((open) => !open)}
              >
                <Command size={16} />
              </button>
              <div className="hidden items-center gap-2 text-[11px] text-[var(--admin-muted)] md:flex">
                <span>Portfolio</span>
                <span>/</span>
                <span className="text-[var(--admin-ink)]">
                  {navigation.find((item) =>
                    item.href === "/admin"
                      ? pathname === item.href
                      : pathname.startsWith(item.href),
                  )?.label ?? "Overview"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="inline-flex items-center gap-1.5 text-[9px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)] sm:text-[10px]"
                aria-label="Change country and currency preferences"
              >
                <Globe2 size={13} />
                {preferences.country} · {preferences.currency}
              </button>
              <span className="hidden text-[11px] text-[var(--admin-muted)] xl:inline">
                Thursday, November 12, 2026
              </span>
              <button
                type="button"
                aria-label={
                  theme === "light" ? "Switch to dark mode" : "Switch to light mode"
                }
                onClick={toggleTheme}
                className="grid size-9 place-items-center border border-[var(--admin-line)] text-[var(--admin-muted)] transition hover:bg-[var(--admin-hover)] hover:text-[var(--admin-ink)]"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button
                type="button"
                aria-label="Search"
                className="hidden size-9 place-items-center border border-[var(--admin-line)] text-[var(--admin-muted)] transition hover:bg-[var(--admin-hover)] sm:grid"
              >
                <Search size={16} />
              </button>
              <button
                type="button"
                aria-label="Help and support"
                className="hidden size-9 place-items-center text-[var(--admin-muted)] transition hover:text-[var(--admin-ink)] sm:grid"
              >
                <CircleHelp size={17} />
              </button>
            </div>
          </header>

          {mobileNavOpen && (
            <nav
              aria-label="Mobile navigation"
              className="grid grid-cols-2 gap-px border-b border-[var(--admin-line)] bg-[var(--admin-line)] lg:hidden"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center gap-2 bg-[var(--admin-panel)] px-5 py-3 text-xs text-[var(--admin-muted)]"
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
            {children}
          </main>
          <footer className="flex items-center justify-between border-t border-[var(--admin-line)] px-5 py-4 text-[10px] text-[var(--admin-muted)] sm:px-8 lg:px-12">
            <span>© 2026 Domus. Made for the work of home.</span>
            <span className="hidden sm:inline">Boston, Massachusetts</span>
          </footer>
        </div>
      </div>
      {preferencesOpen && (
        <PreferencesModal
          preferences={preferences}
          onClose={() => setPreferencesOpen(false)}
          onSave={(next) => {
            saveAdminPreferences(next);
            setPreferencesOpen(false);
          }}
        />
      )}
    </div>
  );
}
