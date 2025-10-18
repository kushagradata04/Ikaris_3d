import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductViewer } from "@/components/ProductViewer";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import UIEditor from "@/components/UIEditor";
import { Settings2, LayoutGrid } from "lucide-react";

// Load Google Fonts
const loadGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const getShadowClass = (shadow: string) => {
  switch (shadow) {
    case "none": return "";
    case "small": return "shadow-sm";
    case "medium": return "shadow-md";
    case "large": return "shadow-lg";
    default: return "shadow-md";
  }
};

const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [layout, setLayout] = useState<"default" | "alternate">("default");
  const [uiConfig, setUIConfig] = useState({
    typography: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: 16,
    },
    button: {
      borderRadius: 12,
      shadow: "medium",
      alignment: "center",
      backgroundColor: "#3b82f6",
      textColor: "#ffffff",
    }
  });

  // Load Google Fonts on component mount
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  const handleConfigChange = (config: any) => {
    setUIConfig(config);
    console.log("UI Config updated:", config);
  };

  const toggleLayout = () => {
    const newLayout = layout === "default" ? "alternate" : "default";
    setLayout(newLayout);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              className={`transition-shadow ${getShadowClass(uiConfig.button.shadow)}`}
              style={{
                fontFamily: uiConfig.typography.fontFamily,
                fontWeight: uiConfig.typography.fontWeight,
                fontSize: `${Math.max(12, uiConfig.typography.fontSize - 2)}px`,
                borderRadius: `${uiConfig.button.borderRadius}px`
              }}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Switch Layout
            </Button>
            <Button
              variant={showEditor ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEditor(!showEditor)}
              className={`transition-shadow ${getShadowClass(uiConfig.button.shadow)}`}
              style={{
                fontFamily: uiConfig.typography.fontFamily,
                fontWeight: uiConfig.typography.fontWeight,
                fontSize: `${Math.max(12, uiConfig.typography.fontSize - 2)}px`,
                borderRadius: `${uiConfig.button.borderRadius}px`,
                backgroundColor: showEditor ? uiConfig.button.backgroundColor : undefined,
                color: showEditor ? uiConfig.button.textColor : undefined
              }}
            >
              <Settings2 className="h-4 w-4 mr-2" />
              UI Editor
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Viewer */}
          <ProductViewer 
            layout={layout} 
            fontConfig={uiConfig.typography} 
            buttonConfig={uiConfig.button}
          />

          {/* Customization Panel */}
          <CustomizationPanel 
            fontConfig={uiConfig.typography}
            buttonConfig={uiConfig.button}
          />

          {/* UI Editor Panel */}
          {showEditor && (
            <div className="w-full lg:w-auto">
              <UIEditor 
                onConfigChange={handleConfigChange} 
                fontConfig={uiConfig.typography}
                buttonConfig={uiConfig.button}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;