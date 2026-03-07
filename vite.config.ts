import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - react core (cached long-term)
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // UI library chunk
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "@radix-ui/react-popover", "@radix-ui/react-select", "@radix-ui/react-tabs", "@radix-ui/react-accordion"],
          // Heavy libs loaded only when needed
          "vendor-pdf": ["jspdf", "pdfjs-dist"],
          "vendor-qr": ["qrcode"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: "esbuild",
    // CSS code splitting
    cssCodeSplit: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
