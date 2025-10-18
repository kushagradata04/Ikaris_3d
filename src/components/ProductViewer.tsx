import { Maximize2, ZoomIn, ZoomOut, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import chairProduct from "@/assets/chair-product.png";

interface ProductViewerProps {
  layout: "default" | "alternate";
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

export const ProductViewer = ({ layout, fontConfig, buttonConfig }: ProductViewerProps) => {
  return (
    <div className="relative flex-1 bg-viewer rounded-2xl overflow-hidden">
      {/* Control buttons */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button
          variant="secondary"
          size="icon"
          className={`transition-shadow bg-card ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`transition-shadow bg-card ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`transition-shadow bg-card ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`transition-shadow bg-card ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="w-full h-full flex items-center justify-center p-12">
        <img
          src={chairProduct}
          alt="Cozy Lounge Chair"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* View in your room button */}
      <div className="absolute bottom-6 left-6">
        <Button
          variant="outline"
          className={`transition-all bg-card border-border hover:bg-secondary ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            fontFamily: fontConfig.fontFamily,
            fontWeight: fontConfig.fontWeight,
            fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`,
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <Maximize2 className="mr-2 h-4 w-4" />
          View in your room
        </Button>
      </div>
    </div>
  );
};