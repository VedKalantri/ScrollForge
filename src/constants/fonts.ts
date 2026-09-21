export interface FontItem {
  name: string;
  family: string;
  category: "Sans-Serif" | "Display" | "Monospace" | "Serif";
  weights: number[];
  googleFont?: string;
}

export const FONTS_CATALOG: FontItem[] = [
  {
    name: "Inter",
    family: "'Inter', sans-serif",
    category: "Sans-Serif",
    weights: [300, 400, 500, 600, 700, 800, 900],
    googleFont: "Inter:wght@300;400;500;600;700;800;900",
  },
  {
    name: "Anton",
    family: "'Anton', sans-serif",
    category: "Display",
    weights: [400],
    googleFont: "Anton",
  },
  {
    name: "Bebas Neue",
    family: "'Bebas Neue', sans-serif",
    category: "Display",
    weights: [400],
    googleFont: "Bebas+Neue",
  },
  {
    name: "Oswald",
    family: "'Oswald', sans-serif",
    category: "Display",
    weights: [300, 400, 500, 600, 700],
    googleFont: "Oswald:wght@300;400;500;600;700",
  },
  {
    name: "Space Grotesk",
    family: "'Space Grotesk', sans-serif",
    category: "Sans-Serif",
    weights: [300, 400, 500, 600, 700],
    googleFont: "Space+Grotesk:wght@300;400;500;600;700",
  },
  {
    name: "Poppins",
    family: "'Poppins', sans-serif",
    category: "Sans-Serif",
    weights: [300, 400, 500, 600, 700, 800, 900],
    googleFont: "Poppins:wght@300;400;500;600;700;800;900",
  },
  {
    name: "Montserrat",
    family: "'Montserrat', sans-serif",
    category: "Sans-Serif",
    weights: [300, 400, 500, 600, 700, 800, 900],
    googleFont: "Montserrat:wght@300;400;500;600;700;800;900",
  },
  {
    name: "Roboto",
    family: "'Roboto', sans-serif",
    category: "Sans-Serif",
    weights: [300, 400, 500, 700, 900],
    googleFont: "Roboto:wght@300;400;500;700;900",
  },
  {
    name: "JetBrains Mono",
    family: "'JetBrains Mono', monospace",
    category: "Monospace",
    weights: [400, 500, 600, 700, 800],
    googleFont: "JetBrains+Mono:wght@400;500;600;700;800",
  },
  {
    name: "Fira Code",
    family: "'Fira Code', monospace",
    category: "Monospace",
    weights: [300, 400, 500, 600, 700],
    googleFont: "Fira+Code:wght@300;400;500;600;700",
  },
  {
    name: "Courier New",
    family: "'Courier New', Courier, monospace",
    category: "Monospace",
    weights: [400, 700],
  },
  {
    name: "Arial",
    family: "Arial, Helvetica, sans-serif",
    category: "Sans-Serif",
    weights: [400, 700],
  },
  {
    name: "Georgia",
    family: "Georgia, serif",
    category: "Serif",
    weights: [400, 700],
  },
  {
    name: "Times New Roman",
    family: "'Times New Roman', Times, serif",
    category: "Serif",
    weights: [400, 700],
  },
];
