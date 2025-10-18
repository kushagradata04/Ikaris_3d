import { Maximize2, ZoomIn, ZoomOut, Grid3x3, X } from "lucide-react";
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
  layoutConfig: {
    cardRadius: number;
    containerPadding: number;
    backgroundColor: string;
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

export const ProductViewer = ({ layout, fontConfig, buttonConfig, galleryConfig, layoutConfig }: ProductViewerProps) => {
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
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom level in percentage
  const [showRoomView, setShowRoomView] = useState(false); // State for room view modal

  // Zoom In function - increases by 10%
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200)); // Max zoom 200%
  };

  // Zoom Out function - decreases by 10%
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50)); // Min zoom 50%
  };

  // Reset zoom
  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  // Toggle room view
  const toggleRoomView = () => {
    setShowRoomView(!showRoomView);
  };

  return (
    <>
      <div 
        className="relative flex-1 overflow-hidden min-h-[600px] shadow-lg"
        style={{
          backgroundColor: layoutConfig.backgroundColor,
          borderRadius: `${layoutConfig.cardRadius}px`,
          padding: `${layoutConfig.containerPadding}px`,
        }}
      >
        {/* Center - Main Product Image with Zoom functionality */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
          <div 
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <img
              src={mainImages[selectedImageIndex]}
              alt="Cozy Lounge Chair - Main View"
              className="w-full h-full object-contain"
              style={{
                maxWidth: 'calc(100% - 20px)',
                maxHeight: 'calc(100% - 20px)'
              }}
            />
          </div>
        </div>

        {/* Thumbnail Gallery with dynamic positioning - Responsive size */}
        <div 
          className={`absolute top-2 xl:top-4 z-20 ${getGalleryPosition(galleryConfig.alignment)}`}
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
                className={`w-12 h-10 xl:w-14 xl:h-12 overflow-hidden border-2 transition-all duration-200 hover:border-accent hover:scale-105 ${
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
        <div className="absolute top-4 xl:top-6 right-2 xl:right-6 flex flex-col gap-2 xl:gap-3 z-20">
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
            onClick={handleResetZoom}
            className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
            style={{
              borderRadius: `${buttonConfig.borderRadius}px`
            }}
            aria-label="Fullscreen"
            title="Reset Zoom"
          >
            <Maximize2 className="h-3 w-3 xl:h-4 xl:w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
            style={{
              borderRadius: `${buttonConfig.borderRadius}px`
            }}
            aria-label="Zoom in"
            title={`Zoom In (${zoomLevel}%)`}
          >
            <ZoomIn className="h-3 w-3 xl:h-4 xl:w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            className={`w-8 h-8 xl:w-10 xl:h-10 transition-shadow bg-card hover:bg-card/90 ${getShadowClass(buttonConfig.shadow)}`}
            style={{
              borderRadius: `${buttonConfig.borderRadius}px`
            }}
            aria-label="Zoom out"
            title={`Zoom Out (${zoomLevel}%)`}
          >
            <ZoomOut className="h-3 w-3 xl:h-4 xl:w-4" />
          </Button>
        </div>

        {/* Bottom left - View in your room button - Responsive */}
        <div className="absolute bottom-4 xl:bottom-6 left-2 xl:left-4 z-20">
          <Button
            variant="outline"
            onClick={toggleRoomView}
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

        {/* Zoom Level Indicator */}
        <div 
          className="absolute bottom-4 xl:bottom-6 right-2 xl:right-6 bg-card/80 backdrop-blur-sm px-3 py-1 text-xs font-medium z-20"
          style={{
            borderRadius: `${layoutConfig.cardRadius / 2}px`
          }}
        >
          {zoomLevel}%
        </div>
      </div>

      {/* Room View Modal/Overlay - FULL SCREEN IMAGE */}
      {showRoomView && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={toggleRoomView}
        >
          <div 
            className="relative w-full h-[90vh] bg-black overflow-hidden shadow-2xl"
            style={{
              borderRadius: `${layoutConfig.cardRadius}px`
            }}
          >
            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleRoomView}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg"
              aria-label="Close room view"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Room View Header */}
            <div 
              className="absolute top-4 left-4 z-20 bg-card/90 backdrop-blur-sm px-4 py-2 shadow-lg"
              style={{
                borderRadius: `${layoutConfig.cardRadius / 2}px`
              }}
            >
              <h3 
                className="text-lg font-semibold text-foreground"
                style={{
                  fontFamily: fontConfig.fontFamily,
                  fontWeight: Math.max(600, parseInt(fontConfig.fontWeight)),
                  fontSize: `${Math.min(fontConfig.fontSize * 1.2, 24)}px`
                }}
              >
                View in Your Room
              </h3>
              <p 
                className="text-sm text-muted-foreground"
                style={{
                  fontFamily: fontConfig.fontFamily,
                  fontWeight: fontConfig.fontWeight,
                  fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                }}
              >
                See how it looks in a real space
              </p>
            </div>

            {/* Gallery Image Display - Full Screen */}
            <div className="w-full h-full">
              <img
                src={galleryImages[selectedImageIndex]}
                alt="Product in room view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Counter */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-2 shadow-lg z-20"
              style={{
                borderRadius: `${layoutConfig.cardRadius / 2}px`
              }}
            >
              <p 
                className="text-sm font-medium"
                style={{
                  fontFamily: fontConfig.fontFamily,
                  fontWeight: fontConfig.fontWeight,
                  fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                }}
              >
                {selectedImageIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedImageIndex(prev => Math.max(0, prev - 1))}
                disabled={selectedImageIndex === 0}
                className="bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg disabled:opacity-50"
                style={{
                  borderRadius: `${buttonConfig.borderRadius}px`,
                  fontFamily: fontConfig.fontFamily,
                  fontWeight: fontConfig.fontWeight,
                  fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                }}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedImageIndex(prev => Math.min(galleryImages.length - 1, prev + 1))}
                disabled={selectedImageIndex === galleryImages.length - 1}
                className="bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg disabled:opacity-50"
                style={{
                  borderRadius: `${buttonConfig.borderRadius}px`,
                  fontFamily: fontConfig.fontFamily,
                  fontWeight: fontConfig.fontWeight,
                  fontSize: `${Math.max(12, fontConfig.fontSize - 2)}px`
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};