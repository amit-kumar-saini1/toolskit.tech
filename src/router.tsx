import type { ReactNode } from "react";
import {
  ClientOnly,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  createRoute,
  createRouter,
  useRouter,
} from "@tanstack/react-router";
import "@/index.css";
import LegacyAppEntry from "@/components/LegacyAppEntry";

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function DefaultErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <RootDocument>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Preview error</p>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
        <button
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Retry
        </button>
      </main>
    </RootDocument>
  );
}

function NotFoundPage() {
  return (
    <RootDocument>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">404</p>
          <h1 className="text-3xl font-semibold">Page not found</h1>
        </div>
        <Link
          to="/"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </main>
    </RootDocument>
  );
}

const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ToolsKit.tech" },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LegacyPage,
});

const legacyCatchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$",
  component: LegacyPage,
});

function LegacyPage() {
  return (
    <ClientOnly fallback={<main className="flex min-h-screen items-center justify-center bg-background text-foreground">Loading…</main>}>
      <LegacyAppEntry />
    </ClientOnly>
  );
}

const routeTree = rootRoute.addChildren([indexRoute, legacyCatchAllRoute]);

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultErrorComponent: DefaultErrorComponent,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
