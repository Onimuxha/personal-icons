import { IconData } from "../types/icon";

export const mockIcons: IconData[] = [
  {
    name: "Home",
    category: "navigation",
    keywords: ["house", "home", "main", "start"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular"],
  },
  {
    name: "Folder",
    category: "files",
    keywords: ["directory", "file", "storage", "archive"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l3 3h8a2 2 0 0 1 2 2z"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular"],
  },
  {
    name: "User",
    category: "people",
    keywords: ["person", "profile", "account", "avatar"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular"],
  },
  {
    name: "Search",
    category: "interface",
    keywords: ["find", "magnify", "look", "discover"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular", "fill"],
  },
  {
    name: "Heart",
    category: "interface",
    keywords: ["love", "like", "favorite", "bookmark"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular"],
  },
  {
    name: "Mail",
    category: "communication",
    keywords: ["email", "message", "envelope", "contact"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular"],
  },
  {
    name: "Bell",
    category: "communication",
    keywords: ["notification", "alert", "ring", "sound"],
    svgContent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>`,
    weights: ["all", "thin", "light", "regular", "fill"],
  },
];
