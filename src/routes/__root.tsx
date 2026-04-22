import type { ReactNode } from "react";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import AppProviders from "@/App";
import ScrollToTop from "@/components/ScrollToTop";
import "@/index.css";

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProviders>
          <ScrollToTop />
          {children}
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ToolsKit.tech – Free Online Tools" },
      {
        name: "description",
        content:
          "ToolsKit.tech offers 50+ free online tools: PDF converter, image compressor, background remover, QR generator and more. No signup required.",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <Link to="/" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Go home
        </Link>
      </main>
    </RootDocument>
  ),
});
