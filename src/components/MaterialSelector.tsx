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
    ],
  },
];

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export const MaterialSelector = ({ fontConfig, layout = "vertical" }: MaterialSelectorProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState("LEATHER");
  const [selectedColor, setSelectedColor] = useState("#3d3230");

  if (layout === "horizontal") {
    return (
      <div className="flex gap-4">
        {/* Left side - Material tabs */}
        <div className="flex flex-col gap-2 min-w-[100px]">
          {materials.map((material) => (
            <button
              key={material.name}
              onClick={() => setSelectedMaterial(material.name)}
              className={cn(
                "px-3 py-2 text-left text-xs font-medium rounded-md transition-colors",
                selectedMaterial === material.name
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
              style={{
                fontFamily: fontConfig.fontFamily,
                fontWeight: fontConfig.fontWeight,
                fontSize: `${Math.max(10, fontConfig.fontSize - 4)}px`
              }}
            >
              {material.name.charAt(0) + material.name.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Right side - Color grid */}
        <div className="flex-1">
          {materials.map((material) => (
            selectedMaterial === material.name && (
              <div key={material.name}>
                <h3 
                  className="text-xs font-medium text-muted-foreground tracking-wide mb-3 uppercase"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontWeight: fontConfig.fontWeight,
                    fontSize: `${Math.max(10, fontConfig.fontSize - 4)}px`
                  }}
                >
                  {material.name}
                </h3>
                <div className="grid grid-cols-5 gap-3">
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
            )
          ))}
        </div>
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className="space-y-6">
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