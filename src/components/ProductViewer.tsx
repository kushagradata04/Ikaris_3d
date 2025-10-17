import { Maximize2, Minimize2, ZoomIn, ZoomOut, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import chairProduct from "@/assets/chair-product.png";

interface ProductViewerProps {
  layout: "default" | "alternate";
}

export const ProductViewer = ({ layout }: ProductViewerProps) => {
  return (
    <div className="relative flex-1 bg-viewer rounded-2xl overflow-hidden">
      {/* Control buttons */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-card"
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
          className="rounded-xl shadow-md hover:shadow-lg transition-all bg-card border-border"
        >
          <Maximize2 className="mr-2 h-4 w-4" />
          View in your room
        </Button>
      </div>
    </div>
  );
};
