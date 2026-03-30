/**
 * Theme Showcase Component
 * Demonstrates the DigitalQatalyst brand colors and theme usage
 */

import { useEffect, useState } from "react";

export function ThemeShowcase() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground p-8 space-y-12">
      {/* Header with Dark Mode Toggle */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-sans transition-colors"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <h1 className="font-heading text-4xl font-bold text-foreground">
          DigitalQatalyst Theme
        </h1>
        <p className="text-muted-foreground font-sans">
          Based on the production color scheme: Orange (#FF6B4D) primary, Navy
          Blue (#2E4580) secondary
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-sans transition-colors">
            Primary Button (Orange)
          </button>
          <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 font-sans transition-colors">
            Secondary Button (Navy)
          </button>
          <button className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-sans transition-colors">
            Muted Button
          </button>
          <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 font-sans transition-colors">
            Accent Button
          </button>
          <button className="px-6 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground font-sans transition-colors">
            Outline Button
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground border border-border rounded-lg p-6 space-y-2">
            <h3 className="font-heading text-lg font-semibold">Default Card</h3>
            <p className="text-sm font-sans">
              This uses the card background and foreground colors.
            </p>
          </div>
          <div className="bg-muted text-muted-foreground border border-border rounded-lg p-6 space-y-2">
            <h3 className="font-heading text-lg font-semibold">Muted Card</h3>
            <p className="text-sm font-sans">
              This uses muted colors for less emphasis.
            </p>
          </div>
          <div className="bg-accent text-accent-foreground border border-primary rounded-lg p-6 space-y-2">
            <h3 className="font-heading text-lg font-semibold">Accent Card</h3>
            <p className="text-sm font-sans">
              This uses accent colors for highlighting.
            </p>
          </div>
        </div>
      </section>

      {/* Color Swatches */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-primary rounded-lg border border-border"></div>
            <p className="text-sm font-sans font-medium">Primary (Orange)</p>
            <code className="text-xs text-muted-foreground">bg-primary</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-secondary rounded-lg border border-border"></div>
            <p className="text-sm font-sans font-medium">Secondary (Navy)</p>
            <code className="text-xs text-muted-foreground">bg-secondary</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-muted rounded-lg border border-border"></div>
            <p className="text-sm font-sans font-medium">Muted</p>
            <code className="text-xs text-muted-foreground">bg-muted</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-accent rounded-lg border border-border"></div>
            <p className="text-sm font-sans font-medium">Accent</p>
            <code className="text-xs text-muted-foreground">bg-accent</code>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Typography</h2>
        <div className="space-y-3">
          <h1 className="font-heading text-4xl font-bold">
            Heading 1 - Plus Jakarta Sans
          </h1>
          <h2 className="font-heading text-3xl font-semibold">
            Heading 2 - Plus Jakarta Sans
          </h2>
          <h3 className="font-heading text-2xl font-medium">
            Heading 3 - Plus Jakarta Sans
          </h3>
          <p className="font-sans text-base">
            Body text - DM Sans. This is the default font for body content and
            UI elements.
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            Muted text - DM Sans with muted foreground color.
          </p>
          <p className="font-sans text-base text-primary">
            Highlighted text using primary orange color.
          </p>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Form Controls</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-sans font-medium mb-2">
              Input Field
            </label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-sans"
            />
          </div>
          <div>
            <label className="block text-sm font-sans font-medium mb-2">
              Textarea
            </label>
            <textarea
              placeholder="Enter description..."
              rows={3}
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-sans resize-none"
            />
          </div>
        </div>
      </section>

      {/* Navigation Example */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">
          Navigation States
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-sans">
            Active (Navy)
          </button>
          <button className="px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-lg font-sans transition-colors">
            Hover Me
          </button>
          <button className="px-4 py-2 text-muted-foreground rounded-lg font-sans">
            Default
          </button>
        </div>
      </section>
    </div>
  );
}
