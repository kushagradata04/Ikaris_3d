import { ChevronDown, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialSelector } from "./MaterialSelector";
import { Separator } from "@/components/ui/separator";

interface CustomizationPanelProps {
  fontConfig: {
    fontFamily: string;
    fontWeight: string;
    fontSize: number;
  };
  buttonConfig: {
    borderRadius: number;
    shadow: string;
    alignment: string;
    backgroundColor: string;
    textColor: string;
  };
}

const getShadowClass = (shadow: string) => {
  switch (shadow) {
    case "none": return "";
    case "small": return "shadow-sm";
    case "medium": return "shadow-md";
    case "large": return "shadow-lg";
    default: return "shadow-md";
  }
};

const getAlignmentClass = (alignment: string) => {
  switch (alignment) {
    case "left": return "justify-start";
    case "center": return "justify-center";
    case "right": return "justify-end";
    default: return "justify-center";
  }
};

export const CustomizationPanel = ({ fontConfig, buttonConfig }: CustomizationPanelProps) => {
  return (
    <div className="w-full lg:w-96 bg-panel rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
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

      {/* Customization Section */}
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

      {/* Price and Add to Cart */}
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
        
        {/* Add to Cart Button with dynamic styling */}
        <div className={`flex ${getAlignmentClass(buttonConfig.alignment)}`}>
          <Button 
            className={`py-6 text-base font-semibold transition-all hover:opacity-90 ${getShadowClass(buttonConfig.shadow)}`}
            style={{
              fontFamily: fontConfig.fontFamily,
              fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
              fontSize: `${fontConfig.fontSize}px`,
              borderRadius: `${buttonConfig.borderRadius}px`,
              backgroundColor: buttonConfig.backgroundColor,
              color: buttonConfig.textColor,
              width: buttonConfig.alignment === "center" ? "100%" : "auto",
              minWidth: buttonConfig.alignment !== "center" ? "200px" : "100%"
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* AR View Button */}
      <div className={`flex ${getAlignmentClass(buttonConfig.alignment)}`}>
        <Button
          variant="outline"
          className={`py-6 text-base font-semibold border-border transition-all hover:bg-secondary ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            fontFamily: fontConfig.fontFamily,
            fontWeight: Math.max(500, parseInt(fontConfig.fontWeight)),
            fontSize: `${fontConfig.fontSize}px`,
            borderRadius: `${buttonConfig.borderRadius}px`,
            width: buttonConfig.alignment === "center" ? "100%" : "auto",
            minWidth: buttonConfig.alignment !== "center" ? "200px" : "100%"
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
    </div>
  );
};