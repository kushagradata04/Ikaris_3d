import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductViewer } from "@/components/ProductViewer";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { UIEditor } from "@/components/UIEditor";
import { Settings2, LayoutGrid } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [layout, setLayout] = useState<"default" | "alternate">("default");
  const [uiConfig, setUIConfig] = useState({});

  const handleConfigChange = (config: any) => {
    setUIConfig(config);
    console.log("UI Config updated:", config);
  };

  const toggleLayout = () => {
    const newLayout = layout === "default" ? "alternate" : "default";
    setLayout(newLayout);
    toast({
      title: "Layout Changed",
      description: `Switched to ${newLayout} layout`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Product Configurator</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLayout}
              className="rounded-lg"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Switch Layout
            </Button>
            <Button
              variant={showEditor ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEditor(!showEditor)}
              className="rounded-[8px]"
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
          <ProductViewer layout={layout} />

          {/* Customization Panel */}
          <CustomizationPanel />

          {/* UI Editor Panel */}
          {showEditor && (
            <div className="w-full lg:w-auto">
              <UIEditor onConfigChange={handleConfigChange} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
