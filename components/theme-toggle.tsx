"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

const themeKey = "domus-admin-theme";
const themeEvent = "domus-admin-theme-change";

function readTheme(): Theme {
  return window.localStorage.getItem(themeKey) === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(themeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(themeEvent, onChange);
  };
}

function useThemeValue() {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

export function ThemeFrame({ children }: { children: ReactNode }) {
  const theme = useThemeValue();
  return (
    <div
      className={`admin-theme min-h-screen ${theme === "dark" ? "dark" : ""}`}
      data-theme={theme}
    >
      {children}
    </div>
  );
}

export function ThemeToggle() {
  const theme = useThemeValue();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.setItem(themeKey, nextTheme);
        window.dispatchEvent(new Event(themeEvent));
      }}
      className="grid size-8 place-items-center text-[var(--admin-muted)] transition-colors hover:bg-[var(--admin-hover)] hover:text-[var(--admin-ink)]"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
