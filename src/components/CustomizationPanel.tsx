import { ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaterialSelector } from "./MaterialSelector";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Import images for customization options
// Replace these paths with your actual image paths
import armsImage from "@/assets/chair_arm.png";
import armsFinishImage from "@/assets/arm_finsh.png";
import legsFinishImage from "@/assets/legs_finsh.png";

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
  layoutConfig: {
    cardRadius: number;
    containerPadding: number;
    backgroundColor: string;
  };
  materialLayout: "vertical" | "horizontal";
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

export const CustomizationPanel = ({ fontConfig, buttonConfig, layoutConfig, materialLayout }: CustomizationPanelProps) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(2);
  const [selectedArms, setSelectedArms] = useState("Fixed Arms");
  const [selectedLegsFinish, setSelectedLegsFinish] = useState("Steel");

  const toggleSection = (section: number) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div 
      className="w-full lg:w-96 shadow-lg space-y-6"
      style={{
        backgroundColor: layoutConfig.backgroundColor,
        borderRadius: `${layoutConfig.cardRadius}px`,
        padding: `${layoutConfig.containerPadding}px`,
      }}
    >
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
        <Button 
          variant="ghost" 
          size="icon" 
          style={{
            borderRadius: `${layoutConfig.cardRadius}px`
          }}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>

      <Separator />

      {/* Customization Section */}
      <div className="space-y-4">
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

        {/* Accordion Style Options */}
        <div className="space-y-3">
          {/* 1. Arms */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(1)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-md overflow-hidden">
                  <img 
                    src={armsImage} 
                    alt="Arms preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p 
                    className="font-medium text-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${fontConfig.fontSize}px`
                    }}
                  >
                    1. Arms
                  </p>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                    }}
                  >
                    {selectedArms}
                  </p>
                </div>
              </div>
              {expandedSection === 1 ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 1 && (
              <div className="p-4 pt-0 border-t border-border">
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedArms("Fixed Arms")}
                    className={`w-full p-3 border rounded-md transition-colors text-left ${
                      selectedArms === "Fixed Arms" ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                    }`}
                  >
                    <p className="font-medium text-sm">Fixed Arms</p>
                  </button>
                  <button 
                    onClick={() => setSelectedArms("No Arms")}
                    className={`w-full p-3 border rounded-md transition-colors text-left ${
                      selectedArms === "No Arms" ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                    }`}
                  >
                    <p className="font-medium text-sm">No Arms</p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Arms Finish */}
          <div className="border border-border rounded-lg overflow-hidden bg-accent/10">
            <button
              onClick={() => toggleSection(2)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-md overflow-hidden"
                >
                  <img 
                    src={armsFinishImage} 
                    alt="Arms finish preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p 
                    className="font-medium text-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${fontConfig.fontSize}px`
                    }}
                  >
                    2. Arms Finish
                  </p>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                    }}
                  >
                    Leather Brown
                  </p>
                </div>
              </div>
              {expandedSection === 2 ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 2 && (
              <div className="p-4 pt-0">
                <MaterialSelector fontConfig={fontConfig} layout={materialLayout} />
              </div>
            )}
          </div>

          {/* 3. Legs Finish */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(3)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img 
                    src={legsFinishImage} 
                    alt="Legs finish preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p 
                    className="font-medium text-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${fontConfig.fontSize}px`
                    }}
                  >
                    3. Legs Finish
                  </p>
                  <p 
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: fontConfig.fontFamily,
                      fontWeight: fontConfig.fontWeight,
                      fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                    }}
                  >
                    {selectedLegsFinish}
                  </p>
                </div>
              </div>
              {expandedSection === 3 ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {expandedSection === 3 && (
              <div className="p-4 pt-0 border-t border-border">
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedLegsFinish("Steel")}
                    className={`w-full p-3 border rounded-md transition-colors text-left ${
                      selectedLegsFinish === "Steel" ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                    }`}
                  >
                    <p className="font-medium text-sm">Steel</p>
                  </button>
                  <button 
                    onClick={() => setSelectedLegsFinish("Wood")}
                    className={`w-full p-3 border rounded-md transition-colors text-left ${
                      selectedLegsFinish === "Wood" ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                    }`}
                  >
                    <p className="font-medium text-sm">Wood</p>
                  </button>
                  <button 
                    onClick={() => setSelectedLegsFinish("Chrome")}
                    className={`w-full p-3 border rounded-md transition-colors text-left ${
                      selectedLegsFinish === "Chrome" ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                    }`}
                  >
                    <p className="font-medium text-sm">Chrome</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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