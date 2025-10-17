import { ChevronDown, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialSelector } from "./MaterialSelector";
import { Separator } from "@/components/ui/separator";

export const CustomizationPanel = () => {
  return (
    <div className="w-full lg:w-96 bg-panel rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Cozy Lounge Chair</h1>
          <p className="text-muted-foreground">Premium comfortable seating</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      <Separator />

      {/* Customization Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Customize your Chair</h2>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="arms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="arms" className="rounded-lg">
              Arms
            </TabsTrigger>
            <TabsTrigger value="finish" className="rounded-lg">
              Arm Finish
            </TabsTrigger>
          </TabsList>
          <TabsContent value="arms" className="mt-6">
            <MaterialSelector />
          </TabsContent>
          <TabsContent value="finish" className="mt-6">
            <MaterialSelector />
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      {/* Price and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Total Price</span>
          <span className="text-3xl font-bold text-foreground">$1,299</span>
        </div>
        <Button className="w-full rounded-xl py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all">
          Add to Cart
        </Button>
      </div>

      {/* AR View Button */}
      <Button
        variant="outline"
        className="w-full rounded-xl py-6 text-base font-semibold border-border"
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
