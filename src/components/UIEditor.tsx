import { useState } from "react";
import { Settings, Type, Square, Image, Layout, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UIEditorProps {
  onConfigChange: (config: any) => void;
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

export const UIEditor = ({ onConfigChange, fontConfig, buttonConfig, galleryConfig }: UIEditorProps) => {
  const [config, setConfig] = useState({
    typography: {
      fontFamily: fontConfig.fontFamily,
      fontWeight: fontConfig.fontWeight,
      fontSize: fontConfig.fontSize,
    },
    button: {
      borderRadius: buttonConfig.borderRadius,
      shadow: buttonConfig.shadow,
      alignment: buttonConfig.alignment,
      backgroundColor: buttonConfig.backgroundColor,
      textColor: buttonConfig.textColor,
    },
    gallery: {
      alignment: galleryConfig.alignment,
      spacing: galleryConfig.spacing,
      borderRadius: galleryConfig.borderRadius,
    },
    layout: {
      cardRadius: 16,
      containerPadding: 24,
      backgroundColor: "#ffffff",
    },
    stroke: {
      color: "#000000",
      weight: 2,
    },
  });

  const updateConfig = (section: string, key: string, value: any) => {
    const newConfig = {
      ...config,
      [section]: {
        ...config[section as keyof typeof config],
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

      <div className="p-4">
        <Tabs defaultValue="typography" className="w-full" orientation="vertical">
          <div className="flex gap-4">
            {/* Vertical Tabs List */}
            <TabsList className="flex flex-col h-auto bg-secondary p-1 w-32 shrink-0">
              <TabsTrigger value="typography" className="text-xs py-3 px-2 w-full justify-start">
                <Type className="h-4 w-4 mr-2" />
                Type
              </TabsTrigger>
              <TabsTrigger value="button" className="text-xs py-3 px-2 w-full justify-start">
                <Square className="h-4 w-4 mr-2" />
                Button
              </TabsTrigger>
              <TabsTrigger value="gallery" className="text-xs py-3 px-2 w-full justify-start">
                <Image className="h-4 w-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs py-3 px-2 w-full justify-start">
                <Layout className="h-4 w-4 mr-2" />
                Layout
              </TabsTrigger>
            </TabsList>

            {/* Tab Content with Scrollbar */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="pr-2">
                  <TabsContent value="typography" className="space-y-4 mt-0">
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
                          <SelectItem value="Inter" style={{ fontFamily: 'Inter' }}>Inter</SelectItem>
                          <SelectItem value="Roboto" style={{ fontFamily: 'Roboto' }}>Roboto</SelectItem>
                          <SelectItem value="Poppins" style={{ fontFamily: 'Poppins' }}>Poppins</SelectItem>
                          <SelectItem value="Open Sans" style={{ fontFamily: 'Open Sans' }}>Open Sans</SelectItem>
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

                  <TabsContent value="button" className="space-y-4 mt-0">
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

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.button.backgroundColor}
                          onChange={(e) => updateConfig("button", "backgroundColor", e.target.value)}
                          className="w-16 h-10 p-1 rounded-lg cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={config.button.backgroundColor}
                          onChange={(e) => updateConfig("button", "backgroundColor", e.target.value)}
                          className="flex-1 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.button.textColor}
                          onChange={(e) => updateConfig("button", "textColor", e.target.value)}
                          className="w-16 h-10 p-1 rounded-lg cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={config.button.textColor}
                          onChange={(e) => updateConfig("button", "textColor", e.target.value)}
                          className="flex-1 rounded-lg"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4 mt-0">
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

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Border Radius: {config.gallery.borderRadius}px
                      </Label>
                      <Slider
                        value={[config.gallery.borderRadius]}
                        onValueChange={(value) => updateConfig("gallery", "borderRadius", value[0])}
                        min={0}
                        max={32}
                        step={1}
                        className="py-4"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="layout" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Card Corner Radius: {config.layout.cardRadius}px
                      </Label>
                      <Slider
                        value={[config.layout.cardRadius]}
                        onValueChange={(value) => updateConfig("layout", "cardRadius", value[0])}
                        min={0}
                        max={32}
                        step={1}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Container Padding: {config.layout.containerPadding}px
                      </Label>
                      <Slider
                        value={[config.layout.containerPadding]}
                        onValueChange={(value) => updateConfig("layout", "containerPadding", value[0])}
                        min={0}
                        max={64}
                        step={4}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Section Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={config.layout.backgroundColor}
                          onChange={(e) => updateConfig("layout", "backgroundColor", e.target.value)}
                          className="w-16 h-10 p-1 rounded-lg cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={config.layout.backgroundColor}
                          onChange={(e) => updateConfig("layout", "backgroundColor", e.target.value)}
                          className="flex-1 rounded-lg"
                        />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Stroke/Border
                      </h3>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Stroke Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.stroke.color}
                            onChange={(e) => updateConfig("stroke", "color", e.target.value)}
                            className="w-16 h-10 p-1 rounded-lg cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={config.stroke.color}
                            onChange={(e) => updateConfig("stroke", "color", e.target.value)}
                            className="flex-1 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Stroke Weight: {config.stroke.weight}px
                        </Label>
                        <Slider
                          value={[config.stroke.weight]}
                          onValueChange={(value) => updateConfig("stroke", "weight", value[0])}
                          min={1}
                          max={10}
                          step={1}
                          className="py-4"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default UIEditor;