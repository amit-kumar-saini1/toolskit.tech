import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome" },
      { name: "description", content: "Start building your app." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-background px-4"
      data-lovable-blank-page-placeholder
    >
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-3">Fresh start</h1>
        <p className="text-muted-foreground">
          REPLACE this with your app. Tell me what you want to build next.
        </p>
      </div>
    </main>
  );
}

