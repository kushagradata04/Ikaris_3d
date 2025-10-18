import { useState } from "react";

interface ColorOption {
  name: string;
  value: string;
}

interface MaterialType {
  name: string;
  colors: ColorOption[];
}

interface MaterialSelectorProps {
  fontConfig: {
    fontFamily: string;
    fontWeight: string;
    fontSize: number;
  };
  layout?: "vertical" | "horizontal";
}

const materials: MaterialType[] = [
  {
    name: "LEATHER",
    colors: [
      { name: "Brown", value: "#5c4a45" },
      { name: "Dark Brown", value: "#3d3230" },
      { name: "Olive", value: "#5c6854" },
      { name: "Teal", value: "#507b74" },
      { name: "Forest", value: "#4a685e" },
      { name: "Navy", value: "#525968" },
      { name: "Purple", value: "#5d4d62" },
      { name: "Blue", value: "#3d5468" },
      { name: "Red", value: "#8d5854" },
      { name: "Burgundy", value: "#6b3e3e" },
      { name: "Green", value: "#3d7068" },
    ],
  },
  {
    name: "SILICON",
    colors: [
      { name: "Brown", value: "#5c4a45" },
      { name: "Olive", value: "#5c6854" },
      { name: "Teal", value: "#507b74" },
      { name: "Forest", value: "#4a685e" },
      { name: "Navy", value: "#525968" },
      { name: "Purple", value: "#5d4d62" },
      { name: "Blue", value: "#3d5468" },
      { name: "Red", value: "#8d5854" },
      { name: "Burgundy", value: "#6b3e3e" },
      { name: "Green", value: "#3d7068" },
    ],
  },
  {
    name: "ALUMINIUM",
    colors: [
      { name: "Brown", value: "#5c4a45" },
      { name: "Olive", value: "#5c6854" },
      { name: "Teal", value: "#507b74" },
      { name: "Navy", value: "#525968" },
      { name: "Dark Navy", value: "#454554" },
      { name: "Purple", value: "#5d4d62" },
      { name: "Blue", value: "#3d5468" },
      { name: "Red", value: "#8d5854" },
      { name: "Burgundy", value: "#6b3e3e" },
      { name: "Green", value: "#3d7068" },
    ],
  },
  {
    name: "STEEL",
    colors: [
      { name: "Silver", value: "#c0c0c0" },
      { name: "Dark Steel", value: "#4a5568" },
      { name: "Gunmetal", value: "#5a5a5a" },
      { name: "Chrome", value: "#b8b8b8" },
      { name: "Brushed Steel", value: "#8c8c8c" },
      { name: "Navy", value: "#525968" },
      { name: "Blue", value: "#3d5468" },
      { name: "Dark Gray", value: "#4a4a4a" },
      { name: "Slate", value: "#6a7280" },
      { name: "Charcoal", value: "#3a3a3a" },
    ],
  },
  {
    name: "POLYESTER",
    colors: [
      { name: "Light Gray", value: "#9ca3af" },
      { name: "Purple", value: "#5d4d62" },
      { name: "Navy", value: "#525968" },
      { name: "Blue", value: "#3d5468" },
      { name: "Red", value: "#8d5854" },
      { name: "Burgundy", value: "#6b3e3e" },
      { name: "Green", value: "#3d7068" },
      { name: "Teal", value: "#507b74" },
      { name: "Forest", value: "#4a685e" },
      { name: "Black", value: "#2d2d2d" },
    ],
  },
  {
    name: "PLAST",
    colors: [
      { name: "White", value: "#f3f4f6" },
      { name: "Light Gray", value: "#d1d5db" },
      { name: "Gray", value: "#9ca3af" },
      { name: "Dark Gray", value: "#6b7280" },
      { name: "Charcoal", value: "#4b5563" },
      { name: "Navy", value: "#525968" },
      { name: "Blue", value: "#3d5468" },
      { name: "Red", value: "#8d5854" },
      { name: "Green", value: "#3d7068" },
      { name: "Black", value: "#1f2937" },
    ],
  },
];

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export const MaterialSelector = ({ fontConfig, layout = "vertical" }: MaterialSelectorProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState("LEATHER");
  const [selectedColor, setSelectedColor] = useState("#3d3230");

  // FIXED: Horizontal layout (Grid View) - shows tabs across the top with all colors in grid below
  if (layout === "horizontal") {
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 bg-white p-4 rounded-lg">
        {/* Material tabs across the top */}
        <div className="grid grid-cols-3 gap-2 sticky top-0 bg-white z-10 pb-2">
          {materials.map((material) => (
            <button
              key={material.name}
              onClick={() => setSelectedMaterial(material.name)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors text-center",
                selectedMaterial === material.name
                  ? "bg-accent text-accent-foreground"
                  : "bg-white text-muted-foreground hover:bg-white/80 border border-border"
              )}
              style={{
                fontFamily: fontConfig.fontFamily,
                fontWeight: fontConfig.fontWeight,
                fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
              }}
            >
              {material.name.charAt(0) + material.name.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Color grid below - shows all colors for selected material */}
        <div>
          {materials.map((material) => (
            selectedMaterial === material.name && (
              <div key={material.name} className="grid grid-cols-5 gap-3">
                {material.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedMaterial(material.name);
                      setSelectedColor(color.value);
                    }}
                    className={cn(
                      "w-full aspect-square rounded-full border-2 transition-all hover:scale-110",
                      selectedMaterial === material.name && selectedColor === color.value
                        ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                        : "border-border/30 hover:border-border"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    );
  }

  // FIXED: Vertical layout (List View) - shows all materials stacked with their colors below each
  return (
    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
      {materials.map((material) => (
        <div key={material.name} className="space-y-3">
          <h3 
            className="text-sm font-medium text-muted-foreground tracking-wide"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: fontConfig.fontWeight,
              fontSize: `${Math.max(10, fontConfig.fontSize - 4)}px`
            }}
          >
            {material.name}
          </h3>
          <div className="grid grid-cols-6 gap-3">
            {material.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedMaterial(material.name);
                  setSelectedColor(color.value);
                }}
                className={cn(
                  "w-full aspect-square rounded-full border-2 transition-all hover:scale-110",
                  selectedMaterial === material.name && selectedColor === color.value
                    ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "border-border/30 hover:border-border"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};