import type { DFAPolicy } from "./dfa";

export const DEFAULT_DFA_POLICY: DFAPolicy = {
  requireAlpha: true,
  requireNumeric: true,
  requireSymbol: true,
  minLength: 8,
};

export const PORTAL_COPY = {
  title: "Secure Portal",
  subtitle: "DFA Authorization System",
};

export const FOOTER_CONTENT = {
  copyright: "SECURE PORTAL - DETERMINISTIC FINITE AUTOMATA SYSTEM",
  brand: {
    primary: "Kelompok 3",
    separator: "x",
    secondary: "L1 TI24",
  },
  profiles: [
    { name: "Yuda Pratama", nim: "09021182429025", imageUrl: "yuda.jpeg" },
    { name: "Ahmad Kurnia Prisma", nim: "09021182429009", imageUrl: "prisma.png" },
    { name: "Rio Agustiawan", nim: "09021182429001", imageUrl: "rio.png" },
    { name: "Ismi Brilianita", nim: "09021182429016", imageUrl: "ismi.png" },
  ],
  socials: [
    { icon: "instagram", url: "https://www.instagram.com/p/DXE6o0LGdMi/?utm_source=ig_web_copy_link/" },
    { icon: "github", url: "https://github.com/ak7prisma/password-validating-tbo" },
  ],
} as const;
