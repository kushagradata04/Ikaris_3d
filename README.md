# Furniture Product Customizer

A real-time product customization interface built with React, TypeScript, and Tailwind CSS featuring live preview capabilities and extensive styling controls.

🔗 **Live Demo:** [https://kushagra-102203571.vercel.app/](https://kushagra-102203571.vercel.app/)

---

## 📦 Component API and Configurable Props

### **ProductViewer**
Main product display with interactive controls.

```typescript
interface ProductViewerProps {
  layout: "default" | "alternate";
  fontConfig: { fontFamily: string; fontWeight: string; fontSize: number; };
  buttonConfig: {
    borderRadius: number;        // 0-32px
    shadow: string;              // "none" | "small" | "medium" | "large"
    alignment: string;           // "left" | "center" | "right"
    backgroundColor: string;     // Hex color
    textColor: string;          // Hex color
  };
  galleryConfig: {
    alignment: string;           // "left" | "center" | "right"
    spacing: number;            // Gap between thumbnails (0-48px)
    borderRadius: number;       // Thumbnail corners (0-32px)
  };
  layoutConfig: {
    cardRadius: number;         // Card corners (0-32px)
    containerPadding: number;   // Inner padding (0-64px)
    backgroundColor: string;    // Hex color
  };
}
```

**Features:** 6-image gallery, zoom controls (50%-200%), room view modal, responsive positioning

---

### **CustomizationPanel**
Product options and purchase interface.

```typescript
interface CustomizationPanelProps {
  fontConfig: { fontFamily: string; fontWeight: string; fontSize: number; };
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
  strokeConfig: {
    color: string;              // Border/stroke color
    weight: number;             // Border width (1-10px)
  };
  materialLayout: "vertical" | "horizontal";
}
```

**Features:** Accordion sections (Arms, Arms Finish, Legs Finish), Material selector integration, Price display, Add to Cart & AR View buttons

---

### **MaterialSelector**
Material and color picker with dual layouts.

```typescript
interface MaterialSelectorProps {
  fontConfig: { fontFamily: string; fontWeight: string; fontSize: number; };
  layout?: "vertical" | "horizontal";
  onSelectionChange?: (material: string, color: string, colorName: string) => void;
}
```

**Materials Available:** LEATHER (11 colors), SILICON (10), ALUMINIUM (10), STEEL (10), POLYESTER (10), PLAST (10)

**Layout Modes:**
- **Vertical (Grid):** All materials stacked, 6-column color grids
- **Horizontal (List):** Material tabs on top, 5-column color grid below

---

### **UIEditor**
Real-time visual editor for interface customization.

```typescript
interface UIEditorProps {
  onConfigChange: (config: ConfigObject) => void;
  fontConfig: FontConfig;
  buttonConfig: ButtonConfig;
  galleryConfig: GalleryConfig;
}
```

**5 Configuration Tabs:**

1. **Typography:** Font family (4 options), weight (400-700), size (10-60px)
2. **Button:** Border radius, shadow level, alignment, colors
3. **Gallery:** Thumbnail alignment, spacing, border radius
4. **Layout:** Card radius, container padding, background color
5. **Stroke:** Border color and weight (separate tab)

---

## ⚙️ How the Editor Works

### Real-Time Configuration Flow

```
User adjusts control in UIEditor
    ↓
UIEditor updates local state
    ↓
onConfigChange(newConfig) callback fires
    ↓
Index.tsx receives and updates uiConfig state
    ↓
Updated config passed as props to all components
    ↓
Components re-render with new styles immediately
```

### Style Application

**Inline Styles** (dynamic values):
```typescript
style={{
  fontFamily: fontConfig.fontFamily,
  fontSize: `${fontConfig.fontSize}px`,
  borderRadius: `${buttonConfig.borderRadius}px`
}}
```

**Tailwind Classes** (static/conditional):
```typescript
className={`transition-all ${getShadowClass(shadow)}`}
```

### State Management
- **Single Source of Truth:** Index.tsx holds complete `uiConfig`
- **Unidirectional Flow:** Props down, callbacks up
- **No Storage:** All state in memory (no localStorage/sessionStorage)
- **Immediate Feedback:** Changes apply instantly without save button

---

## 💡 Design Decisions & UX Improvements

### 1. **Dual Material Layout System**
**Decision:** Offer vertical (grid) and horizontal (list) layouts

**Rationale:** 
- Vertical shows all materials for easy comparison
- Horizontal reduces scrolling, better for mobile
- User toggle allows personal preference

---

### 2. **Accordion-Based Customization**
**Decision:** Expandable sections instead of all-visible options

**Rationale:**
- Reduces cognitive load (one decision at a time)
- Shows selection summary when collapsed
- Saves vertical space
- Guides users through customization flow

---

### 3. **Separated Stroke Settings**
**Decision:** Dedicated Stroke tab instead of being in Layout

**Rationale:**
- Stroke/border styling conceptually different from layout spacing
- Prevents tab overload
- Easier to find specific settings
- Allows future expansion (dash patterns, etc.)

---

### 4. **Zoom Controls with Visual Feedback**
**Decision:** Granular zoom (50-200%) with level indicator

**Rationale:**
- Users need product detail inspection
- 10% increments provide smooth control
- Visible percentage keeps users oriented
- Reset button for quick return

---

### 5. **Room View Full-Screen Modal**
**Decision:** Immersive overlay for contextual viewing

**Rationale:**
- Eliminates distractions with dark backdrop
- Helps visualize product in real setting
- Integrated navigation within modal
- Emphasizes the room context

---

### 6. **Dual Color Input Methods**
**Decision:** Color picker AND hex text input

**Rationale:**
- Picker: Visual, intuitive for casual users
- Hex input: Precise values for designers
- Both stay synchronized
- Supports brand guideline implementation

---

### 7. **Dynamic Font Loading**
**Decision:** Load Google Fonts on mount, not in bundle

**Rationale:**
- Reduces initial bundle size
- Fonts load once and cached
- Users see actual typeface immediately
- No flash of unstyled text

---

### 8. **Multi-Layer Selection Feedback**
**Decision:** Combined visual indicators for selections

**Implementation:**
- Accent border + ring effect
- Background tint on active items
- Scale animation on hover (1.1x)
- Tooltips with color names

**Rationale:** Multiple cues ensure users always know current selection state

---

### 9. **Material Selection Callback**
**Decision:** Child reports to parent via callback

```typescript
onSelectionChange?: (material: string, color: string, colorName: string)
```

**Rationale:**
- Parent controls state (single source of truth)
- Selector remains reusable
- Enables formatted display: "Leather Dark Brown"
- Selection persists in accordion summary

---

### 10. **Responsive Control Sizing**
**Decision:** Different sizes for mobile vs desktop

```typescript
className="w-8 h-8 xl:w-10 xl:h-10"
```

**Rationale:**
- Smaller on mobile (screen space optimization)
- Touch targets remain accessible
- Larger on desktop for prominence
- Maintains visual hierarchy across devices

---

## 🚀 Future Enhancement Opportunities

1. **Theme Presets:** Save/load configurations, light/dark mode
2. **Material Filtering:** Search, color family filters, sorting
3. **Advanced Typography:** Line height, letter spacing controls
4. **Animation Controls:** Transition duration, hover intensity
5. **Export/Import:** JSON download, URL sharing, Figma integration
6. **Accessibility Mode:** High contrast, reduced motion, focus customization

---

## 🛠️ Technical Notes

- **Architecture:** Modular components, clear separation of concerns
- **Performance:** React batching, optimized re-renders, lazy font loading
- **Accessibility:** ARIA labels, keyboard navigation, focus management
- **Browser Support:** Modern CSS (Grid, Flexbox), ES6+, graceful degradation

---

**Built with React, TypeScript, Tailwind CSS, and shadcn/ui**