import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "gst_calculator",
  title: "GST Calculator",
  description:
    "Calculate GST (Goods and Services Tax) inclusive or exclusive amounts given a base amount and GST rate percent.",
  inputSchema: {
    amount: z.number().positive().describe("Base amount."),
    gstRatePercent: z.number().describe("GST rate in percent (e.g. 5, 12, 18, 28)."),
    mode: z.enum(["exclusive", "inclusive"]).describe("'exclusive' adds GST to amount; 'inclusive' extracts GST from amount."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ amount, gstRatePercent, mode }) => {
    const round = (x: number) => Math.round(x * 100) / 100;
    let base: number, gst: number, total: number;
    if (mode === "exclusive") {
      base = amount; gst = amount * gstRatePercent / 100; total = base + gst;
    } else {
      total = amount; base = amount / (1 + gstRatePercent / 100); gst = total - base;
    }
    return {
      content: [{ type: "text", text: `Base: ${round(base)} | GST @ ${gstRatePercent}%: ${round(gst)} | Total: ${round(total)}` }],
      structuredContent: { base: round(base), gst: round(gst), total: round(total), rate: gstRatePercent, mode },
    };
  },
});