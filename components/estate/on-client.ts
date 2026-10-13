"use client";

import { useSyncExternalStore } from "react";

// Nothing to subscribe to: the store is "which side of hydration are we on",
// and it only ever changes once, at the moment React swaps the server's answer
// for the browser's. This is what useSyncExternalStore is for — a setState in
// an effect arrives one render later and trips the lint rule that says so.
//
// Every date on this page runs through it. The listing routes are generated
// once at build time and served for months, so a date baked into that HTML is
// both stale and a hydration mismatch against a browser that knows what day it
// is. The components render a placeholder until this returns true.
const noStore = () => () => {};

export const useOnClient = () =>
  useSyncExternalStore(
    noStore,
    () => true,
    () => false,
  );
