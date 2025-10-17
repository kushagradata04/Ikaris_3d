import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings2, LayoutGrid, ChevronDown, Maximize2, ZoomIn, ZoomOut, Grid3x3, Type, Square, Image, Layout, Palette, Settings } from "lucide-react";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Material Selector Component
const MaterialSelector = ({ fontConfig }) => {
  const [selectedMaterial, setSelectedMaterial] = useState("LEATHER");
  const [selectedColor, setSelectedColor] = useState("#3d3230");

  const materials = [
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

  return (
    <div className="space-y-6">
      {materials.map((material) => (
        <div key={material.name} className="space-y-3">
          <h3 
            className="text-sm tracking-wide text-muted-foreground"
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
                    : "border-swatch-border hover:border-border"
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

// Customization Panel Component
const CustomizationPanel = ({ fontConfig }) => {
  return (
    <div className="w-full lg:w-96 bg-panel rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 
            className="text-2xl font-bold text-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: Math.max(600, parseInt(fontConfig.fontWeight)),
              fontSize: `${Math.min(fontConfig.fontSize * 1.5, 48)}px`
            }}
          >
            Cozy Lounge Chair
          </h1>
          <p 
            className="text-muted-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: fontConfig.fontWeight,
              fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
            }}
          >
            Premium comfortable seating
          </p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 
            className="text-lg font-semibold text-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
              fontSize: `${Math.min(fontConfig.fontSize * 1.15, 28)}px`
            }}
          >
            Customize your Chair
          </h2>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="arms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger 
              value="arms" 
              className="rounded-lg"
              style={{
                fontFamily: fontConfig.fontFamily,
                fontWeight: fontConfig.fontWeight,
                fontSize: `${fontConfig.fontSize}px`
              }}
            >
              Arms
            </TabsTrigger>
            <TabsTrigger 
              value="finish" 
              className="rounded-lg"
              style={{
                fontFamily: fontConfig.fontFamily,
                fontWeight: fontConfig.fontWeight,
                fontSize: `${fontConfig.fontSize}px`
              }}
            >
              Arm Finish
            </TabsTrigger>
          </TabsList>
          <TabsContent value="arms" className="mt-6">
            <MaterialSelector fontConfig={fontConfig} />
          </TabsContent>
          <TabsContent value="finish" className="mt-6">
            <MaterialSelector fontConfig={fontConfig} />
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span 
            className="text-sm text-muted-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: fontConfig.fontWeight,
              fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
            }}
          >
            Total Price
          </span>
          <span 
            className="text-3xl font-bold text-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: Math.max(700, parseInt(fontConfig.fontWeight)),
              fontSize: `${Math.min(fontConfig.fontSize * 2, 60)}px`
            }}
          >
            $1,299
          </span>
        </div>
        <Button 
          className="w-full rounded-xl py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          style={{
            fontFamily: fontConfig.fontFamily,
            fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
            fontSize: `${fontConfig.fontSize}px`
          }}
        >
          Add to Cart
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-xl py-6 text-base font-semibold border-border"
        style={{
          fontFamily: fontConfig.fontFamily,
          fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
          fontSize: `${fontConfig.fontSize}px`
        }}
      >
        <svg
          className="mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
        AR View
      </Button>
    </div>
  );
};

// Product Viewer Component
const ProductViewer = ({ layout, fontConfig }) => {
  return (
    <div className="relative flex-1 bg-viewer rounded-2xl overflow-hidden min-h-[500px]">
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button variant="secondary" size="icon" className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card">
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card">
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-full h-full flex items-center justify-center p-12">
        <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
          <span 
            className="text-gray-500"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: fontConfig.fontWeight,
              fontSize: `${fontConfig.fontSize}px`
            }}
          >
            Chair Preview
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6">
        <Button
          variant="outline"
          className="rounded-xl shadow-md hover:shadow-lg transition-all bg-card border-border"
          style={{
            fontFamily: fontConfig.fontFamily,
            fontWeight: fontConfig.fontWeight,
            fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
          }}
        >
          <Maximize2 className="mr-2 h-4 w-4" />
          View in your room
        </Button>
      </div>
    </div>
  );
};

// UI Editor Component
const UIEditor = ({ onConfigChange, fontConfig }) => {
  const [config, setConfig] = useState({
    typography: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: 16,
    },
    button: {
      borderRadius: 12,
      shadow: "medium",
      alignment: "center",
      backgroundColor: "#ef4444",
      textColor: "#ffffff",
    },
    gallery: {
      alignment: "center",
      spacing: 12,
      borderRadius: 8,
    },
    layout: {
      cardRadius: 16,
      containerPadding: 24,
      backgroundColor: "#ffffff",
    },
    stroke: {
      color: "#e5e5e5",
      weight: 1,
    },
  });

  const updateConfig = (section, key, value) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section],
        [key]: value,
      },
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="w-full lg:w-80 bg-panel rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-foreground" />
          <h2 
            className="font-semibold text-foreground"
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
              fontSize: `${fontConfig.fontSize}px`
            }}
          >
            UI Editor
          </h2>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4">
          <Tabs defaultValue="typography" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary h-auto p-1">
              <TabsTrigger value="typography" className="text-xs py-2">
                <Type className="h-3 w-3 mr-1" />
                Type
              </TabsTrigger>
              <TabsTrigger value="button" className="text-xs py-2">
                <Square className="h-3 w-3 mr-1" />
                Button
              </TabsTrigger>
              <TabsTrigger value="gallery" className="text-xs py-2">
                <Image className="h-3 w-3 mr-1" />
                Gallery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="typography" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label 
                  className="text-sm font-medium"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontWeight: fontConfig.fontWeight,
                    fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                  }}
                >
                  Font Family
                </Label>
                <Select
                  value={config.typography.fontFamily}
                  onValueChange={(value) => updateConfig("typography", "fontFamily", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label 
                  className="text-sm font-medium"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontWeight: fontConfig.fontWeight,
                    fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                  }}
                >
                  Font Weight
                </Label>
                <Select
                  value={config.typography.fontWeight}
                  onValueChange={(value) => updateConfig("typography", "fontWeight", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Regular (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semibold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label 
                  className="text-sm font-medium"
                  style={{
                    fontFamily: fontConfig.fontFamily,
                    fontWeight: fontConfig.fontWeight,
                    fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                  }}
                >
                  Font Size: {config.typography.fontSize}px
                </Label>
                <Slider
                  value={[config.typography.fontSize]}
                  onValueChange={(value) => updateConfig("typography", "fontSize", value[0])}
                  min={10}
                  max={60}
                  step={1}
                  className="py-4"
                />
              </div>
            </TabsContent>

            <TabsContent value="button" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Border Radius: {config.button.borderRadius}px
                </Label>
                <Slider
                  value={[config.button.borderRadius]}
                  onValueChange={(value) => updateConfig("button", "borderRadius", value[0])}
                  min={0}
                  max={32}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Shadow</Label>
                <Select
                  value={config.button.shadow}
                  onValueChange={(value) => updateConfig("button", "shadow", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Alignment</Label>
                <Select
                  value={config.button.alignment}
                  onValueChange={(value) => updateConfig("button", "alignment", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gallery Alignment</Label>
                <Select
                  value={config.gallery.alignment}
                  onValueChange={(value) => updateConfig("gallery", "alignment", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Grid Left</SelectItem>
                    <SelectItem value="center">Grid Center</SelectItem>
                    <SelectItem value="right">Grid Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Spacing: {config.gallery.spacing}px
                </Label>
                <Slider
                  value={[config.gallery.spacing]}
                  onValueChange={(value) => updateConfig("gallery", "spacing", value[0])}
                  min={0}
                  max={48}
                  step={4}
                  className="py-4"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

// Main App Component
const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [layout, setLayout] = useState("default");
  const [uiConfig, setUIConfig] = useState({
    typography: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: 16,
    }
  });

  const handleConfigChange = (config) => {
    setUIConfig(config);
  };

  const toggleLayout = () => {
    const newLayout = layout === "default" ? "alternate" : "default";
    setLayout(newLayout);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 
            className="text-xl font-bold text-foreground"
            style={{
              fontFamily: uiConfig.typography.fontFamily,
              fontWeight: Math.max(600, parseInt(uiConfig.typography.fontWeight)),
              fontSize: `${Math.min(uiConfig.typography.fontSize * 1.25, 32)}px`
            }}
          >
            Product Configurator
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLayout}
              className="rounded-lg"
              style={{
                fontFamily: uiConfig.typography.fontFamily,
                fontWeight: uiConfig.typography.fontWeight,
                fontSize: `${Math.max(12, uiConfig.typography.fontSize - 2)}px`
              }}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Switch Layout
            </Button>
            <Button
              variant={showEditor ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEditor(!showEditor)}
              className="rounded-lg"
              style={{
                fontFamily: uiConfig.typography.fontFamily,
                fontWeight: uiConfig.typography.fontWeight,
                fontSize: `${Math.max(12, uiConfig.typography.fontSize - 2)}px`
              }}
            >
              <Settings2 className="h-4 w-4 mr-2" />
              UI Editor
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProductViewer layout={layout} fontConfig={uiConfig.typography} />
          <CustomizationPanel fontConfig={uiConfig.typography} />
          {showEditor && (
            <div className="w-full lg:w-auto">
              <UIEditor onConfigChange={handleConfigChange} fontConfig={uiConfig.typography} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UIEditor;