import { Maximize2, ZoomIn, ZoomOut, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Main product image (the one that shows in the center)
import mainProductImage from "@/assets/reference-3.png";

// Gallery thumbnail images (left sidebar)
import galleryImage1 from "@/assets/view_in_room_picture.jpg";

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
  galleryConfig: {
    alignment: string;
    spacing: number;
    borderRadius: number;
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

const getGalleryPosition = (alignment: string) => {
  switch (alignment) {
    case "left": return "left-2 xl:left-4";
    case "center": return "left-1/2 -translate-x-1/2";
    case "right": return "right-2 xl:right-4";
    default: return "left-2 xl:left-4";
  }
};

export const ProductViewer = ({ layout, fontConfig, buttonConfig, galleryConfig }: ProductViewerProps) => {
  // Gallery thumbnail images
  const galleryImages = [
    galleryImage1,
    galleryImage1,
    galleryImage1,
    galleryImage1,
    galleryImage1,
    galleryImage1,
  ];

  // Main display images - can be different from thumbnails
  const mainImages = [
    mainProductImage,
    mainProductImage,
    mainProductImage,
    mainProductImage,
    mainProductImage,
    mainProductImage,
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="relative flex-1 bg-viewer rounded-2xl overflow-hidden min-h-[600px]">
      {/* Thumbnail Gallery with dynamic positioning - Responsive size */}
      <div 
        className={`absolute top-2 xl:top-4 z-10 ${getGalleryPosition(galleryConfig.alignment)}`}
      >
        <div 
          className="flex flex-col"
          style={{
            gap: `${Math.max(galleryConfig.spacing * 0.75, 4)}px`
          }}
        >
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-12 h-12 xl:w-16 xl:h-16 overflow-hidden border-2 transition-all duration-200 hover:border-accent hover:scale-105 ${
                selectedImageIndex === index
                  ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "border-border/50"
              }`}
              style={{
                borderRadius: `${galleryConfig.borderRadius}px`
              }}
              aria-label={`View product angle ${index + 1}`}
            >
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Control buttons - Responsive size */}
      <div className="absolute top-4 xl:top-6 right-2 xl:right-6 flex flex-col gap-2 xl:gap-3 z-10">
        <Button
          variant="secondary"
          size="icon"
          className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
          aria-label="Toggle grid view"
        >
          <Grid3x3 className="h-3 w-3 xl:h-4 xl:w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
          aria-label="Fullscreen"
        >
          <Maximize2 className="h-3 w-3 xl:h-4 xl:w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-3 w-3 xl:h-4 xl:w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-3 w-3 xl:h-4 xl:w-4" />
        </Button>
      </div>

      {/* Center - Main Product Image - Reduced size */}
      <div className="w-full h-full flex items-center justify-center p-8 xl:p-12">
        <div className="max-w-[calc(100%-10px)] max-h-[calc(100%-10px)]">
          <img
            src={mainImages[selectedImageIndex]}
            alt="Cozy Lounge Chair - Main View"
            className="w-full h-full object-contain transition-opacity duration-300"
            style={{
              maxWidth: 'calc(100% - 10px)',
              maxHeight: 'calc(100% - 10px)'
            }}
          />
        </div>
      </div>

      {/* Bottom left - View in your room button - Responsive */}
      <div className="absolute bottom-4 xl:bottom-6 left-2 xl:left-4">
        <Button
          variant="outline"
          className={`text-xs xl:text-sm py-2 xl:py-3 px-3 xl:px-4 transition-all bg-card border-border hover:bg-secondary ${getShadowClass(buttonConfig.shadow)}`}
          style={{
            fontFamily: fontConfig.fontFamily,
            fontWeight: fontConfig.fontWeight,
            fontSize: `${Math.max(10, fontConfig.fontSize - 4)}px`,
            borderRadius: `${buttonConfig.borderRadius}px`
          }}
        >
          <Maximize2 className="mr-1 xl:mr-2 h-3 w-3 xl:h-4 xl:w-4" />
          View in your room
        </Button>
      </div>
    </div>
  );
};