import { createFileRoute } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

function NotFoundPage() {
  const location = useLocation();
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("404: route not found:", location.pathname);
    }
  }, [location.pathname]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Link
        to="/"
        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Go home
      </Link>
    </main>
  );
}

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page Not Found – ToolsKit.tech" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});
