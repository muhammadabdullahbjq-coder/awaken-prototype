'use client'

export default function ColorPalette() {
  const palettes = [
    {
      name: "Option A - Warm Muted",
      description: "Softer gold tones with warm undertones - friendly and approachable",
      colors: {
        primary: "#E8C468",
        accent: "#D4AF37",
        background: "#FFF9E6",
        black: "#1A1A1A",
        border: "#B8984F"
      }
    },
    {
      name: "Option B - Professional Subtle",
      description: "Muted mustard with aged brass - sophisticated and trustworthy",
      colors: {
        primary: "#D9B86A",
        accent: "#C0A050",
        background: "#FFFAF0",
        black: "#2C2C2C",
        border: "#9D8554"
      }
    },
    {
      name: "Option C - Modern Minimal",
      description: "Pale gold with minimal saturation - clean and contemporary",
      colors: {
        primary: "#E6C77E",
        accent: "#CCB169",
        background: "#FFFCF5",
        black: "#212121",
        border: "#A89968"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Color Palette Options</h1>
          <p className="text-lg text-gray-600">Choose a palette for the Awaken prototype</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {palettes.map((palette, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{palette.name}</h2>
                <p className="text-sm text-gray-600 mb-6">{palette.description}</p>

                {/* Color Swatches */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Primary Button</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: palette.colors.primary }}
                      />
                      <span className="text-xs font-mono">{palette.colors.primary}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Accent/Hover</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: palette.colors.accent }}
                      />
                      <span className="text-xs font-mono">{palette.colors.accent}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Background Tint</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: palette.colors.background }}
                      />
                      <span className="text-xs font-mono">{palette.colors.background}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Text/Black</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: palette.colors.black }}
                      />
                      <span className="text-xs font-mono">{palette.colors.black}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">Border/Accent</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: palette.colors.border }}
                      />
                      <span className="text-xs font-mono">{palette.colors.border}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="p-6" style={{ backgroundColor: palette.colors.background }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: palette.colors.black }}>Preview</h3>

                {/* Button Preview */}
                <button
                  className="w-full px-4 py-3 rounded-lg font-bold mb-3 transition-colors"
                  style={{
                    backgroundColor: palette.colors.primary,
                    color: palette.colors.black
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.primary}
                >
                  Primary Button
                </button>

                {/* Info Box Preview */}
                <div
                  className="rounded-lg p-4 border"
                  style={{
                    backgroundColor: palette.colors.background,
                    borderColor: palette.colors.border
                  }}
                >
                  <p className="text-xs" style={{ color: palette.colors.black }}>
                    <strong>Sample Info Box:</strong> This is how information boxes would appear with this color palette.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Palette for Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Palette (For Comparison)</h2>
          <div className="flex gap-4">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Current Yellow</div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#FED64B" }} />
                <span className="text-xs font-mono">#FED64B</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Current Black</div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg border border-gray-200" style={{ backgroundColor: "#011621" }} />
                <span className="text-xs font-mono">#011621</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">← Back to Prototype</a>
        </div>
      </div>
    </div>
  )
}
