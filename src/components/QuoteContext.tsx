"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { InsuranceId } from "@/config/insurance";

type Ctx = {
  selected: InsuranceId | "";
  /** Preselecciona un seguro y baja al formulario. */
  startQuote: (id?: InsuranceId) => void;
  setSelected: (id: InsuranceId | "") => void;
};

const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<InsuranceId | "">("");

  const startQuote = useCallback((id?: InsuranceId) => {
    if (id) setSelected(id);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("nombre")?.focus({ preventScroll: true }), 600);
  }, []);

  return <QuoteCtx.Provider value={{ selected, startQuote, setSelected }}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote debe usarse dentro de QuoteProvider");
  return ctx;
}
