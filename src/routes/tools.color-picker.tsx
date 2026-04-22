import { createFileRoute } from "@tanstack/react-router";
import ColorPicker from "@/pages/tools/ColorPicker";
import { buildToolHead } from "@/lib/toolHead";

export const Route = createFileRoute("/tools/color-picker")({
  head: () => buildToolHead("color-picker"),
  component: ColorPicker,
});
