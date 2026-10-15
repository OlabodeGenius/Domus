"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const countries = [
  { code: "US", name: "United States", currency: "USD", symbol: "$" },
  { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "$" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "$" },
  { code: "GH", name: "Ghana", currency: "GHS", symbol: "GH₵" },
  { code: "IN", name: "India", currency: "INR", symbol: "₹" },
  { code: "KE", name: "Kenya", currency: "KES", symbol: "KSh" },
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "$" },
  { code: "SG", name: "Singapore", currency: "SGD", symbol: "$" },
  { code: "ZA", name: "South Africa", currency: "ZAR", symbol: "R" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€" },
  { code: "FR", name: "France", currency: "EUR", symbol: "€" },
  { code: "IE", name: "Ireland", currency: "EUR", symbol: "€" },
  { code: "ES", name: "Spain", currency: "EUR", symbol: "€" },
] as const;

export type CountryCode = (typeof countries)[number]["code"];
export type CurrencyCode = (typeof countries)[number]["currency"];

export type AdminPreferences = {
  country: CountryCode;
  currency: CurrencyCode;
};

const defaultPreferences: AdminPreferences = {
  country: "US",
  currency: "USD",
};
const storageKey = "domus-admin-preferences";
const preferenceEvent = "domus-admin-preferences-change";
let cachedRaw: string | null | undefined;
let cachedPreferences = defaultPreferences;

function isCountryCode(value: string): value is CountryCode {
  return countries.some((country) => country.code === value);
}

function isCurrencyCode(value: string): value is CurrencyCode {
  return countries.some((country) => country.currency === value);
}

function locationDefaults(): AdminPreferences {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zoneCountry: Record<string, CountryCode> = {
    "Africa/Accra": "GH",
    "Africa/Johannesburg": "ZA",
    "Africa/Lagos": "NG",
    "Africa/Nairobi": "KE",
    "America/Chicago": "US",
    "America/Denver": "US",
    "America/Los_Angeles": "US",
    "America/New_York": "US",
    "America/Phoenix": "US",
    "America/Toronto": "CA",
    "America/Vancouver": "CA",
    "Asia/Dubai": "AE",
    "Asia/Kolkata": "IN",
    "Asia/Singapore": "SG",
    "Australia/Adelaide": "AU",
    "Australia/Brisbane": "AU",
    "Australia/Melbourne": "AU",
    "Australia/Perth": "AU",
    "Australia/Sydney": "AU",
    "Europe/Berlin": "DE",
    "Europe/Dublin": "IE",
    "Europe/London": "GB",
    "Europe/Madrid": "ES",
    "Europe/Paris": "FR",
    "Pacific/Auckland": "NZ",
  };
  const localeCountry = new Intl.Locale(navigator.language).maximize().region;
  const countryCode =
    zoneCountry[timeZone] ??
    (localeCountry && isCountryCode(localeCountry) ? localeCountry : "US");
  const country = countries.find((item) => item.code === countryCode)!;
  return { country: country.code, currency: country.currency };
}

export function detectLocationPreferences() {
  const detected = locationDefaults();
  saveAdminPreferences(detected);
}

function getPreferences(): AdminPreferences {
  const raw = window.localStorage.getItem(storageKey);
  if (raw === cachedRaw) return cachedPreferences;
  cachedRaw = raw;
  if (!raw) {
    cachedPreferences = locationDefaults();
    return cachedPreferences;
  }
  try {
    const saved = JSON.parse(raw) as Record<string, unknown>;
    if (
      typeof saved.country === "string" &&
      isCountryCode(saved.country) &&
      typeof saved.currency === "string" &&
      isCurrencyCode(saved.currency)
    ) {
      cachedPreferences = {
        country: saved.country,
        currency: saved.currency,
      };
      return cachedPreferences;
    }
  } catch {
    // An invalid local preference should fall back to this device's locale.
  }
  cachedPreferences = locationDefaults();
  return cachedPreferences;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(preferenceEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(preferenceEvent, onChange);
  };
}

const PreferencesContext = createContext<AdminPreferences>(defaultPreferences);

export function AdminPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const preferences = useSyncExternalStore(
    subscribe,
    getPreferences,
    () => defaultPreferences,
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function useAdminPreferences() {
  return useContext(PreferencesContext);
}

export function saveAdminPreferences(preferences: AdminPreferences) {
  window.localStorage.setItem(storageKey, JSON.stringify(preferences));
  cachedRaw = JSON.stringify(preferences);
  cachedPreferences = preferences;
  window.dispatchEvent(new Event(preferenceEvent));
}

export function countryName(code: CountryCode) {
  return countries.find((country) => country.code === code)?.name ?? code;
}

const localeByCurrency: Record<CurrencyCode, string> = {
  USD: "en-US",
  NGN: "en-NG",
  GBP: "en-GB",
  CAD: "en-CA",
  AUD: "en-AU",
  GHS: "en-GH",
  INR: "en-IN",
  KES: "en-KE",
  NZD: "en-NZ",
  SGD: "en-SG",
  ZAR: "en-ZA",
  AED: "en-AE",
  EUR: "en-IE",
};

export function formatCurrency(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat(localeByCurrency[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
