import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "percentage_calculator",
  title: "Percentage Calculator",
  description:
    "Percentage utilities. Modes: 'percent_of' (X% of Y), 'what_percent' (X is what % of Y), 'change' (percent change from A to B).",
  inputSchema: {
    mode: z.enum(["percent_of", "what_percent", "change"]).describe("Which calculation to perform."),
    a: z.number().describe("First number. Meaning depends on mode."),
    b: z.number().describe("Second number. Meaning depends on mode."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ mode, a, b }) => {
    const round = (x: number) => Math.round(x * 10000) / 10000;
    let result = 0, label = "";
    if (mode === "percent_of") { result = (a / 100) * b; label = `${a}% of ${b} = ${round(result)}`; }
    else if (mode === "what_percent") {
      if (b === 0) return { content: [{ type: "text", text: "Cannot divide by zero." }], isError: true };
      result = (a / b) * 100; label = `${a} is ${round(result)}% of ${b}`;
    } else {
      if (a === 0) return { content: [{ type: "text", text: "Base value cannot be zero for percent change." }], isError: true };
      result = ((b - a) / a) * 100; label = `Change from ${a} to ${b}: ${round(result)}%`;
    }
    return {
      content: [{ type: "text", text: label }],
      structuredContent: { mode, result: round(result) },
    };
  },
});