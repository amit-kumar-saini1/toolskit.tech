import { createFileRoute } from "@tanstack/react-router";
import TimeZoneConverter from "@/pages/tools/TimeZoneConverter";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/time-zone-converter")({
  head: () => buildToolHead("time-zone-converter"),
  component: TimeZoneConverter,
});
