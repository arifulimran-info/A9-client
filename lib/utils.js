import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs) => twMerge(clsx(inputs));
export const money = (n) => `৳${Number(n).toLocaleString("en-US")}`;
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
