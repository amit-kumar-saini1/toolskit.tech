import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import LegacyAppEntry from "@/components/LegacyAppEntry";

export const Route = createFileRoute("/$")({
  component: LegacyPage,
});

function LegacyPage() {
  return (
    <ClientOnly
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
          Loading…
        </main>
      }
    >
      <LegacyAppEntry />
    </ClientOnly>
  );
}
