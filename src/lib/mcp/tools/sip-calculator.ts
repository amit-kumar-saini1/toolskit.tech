import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "sip_calculator",
  title: "SIP Calculator",
  description:
    "Calculate the maturity value of a monthly SIP (Systematic Investment Plan) given monthly amount, expected annual return, and duration in years.",
  inputSchema: {
    monthlyAmount: z.number().positive().describe("Monthly SIP amount (in your currency)."),
    annualReturnPercent: z.number().describe("Expected annual return in percent, e.g. 12 for 12%."),
    years: z.number().positive().describe("Investment duration in years."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ monthlyAmount, annualReturnPercent, years }) => {
    const n = Math.round(years * 12);
    const r = annualReturnPercent / 100 / 12;
    const maturity = r === 0
      ? monthlyAmount * n
      : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthlyAmount * n;
    const gains = maturity - invested;
    const round = (x: number) => Math.round(x * 100) / 100;
    return {
      content: [{
        type: "text",
        text: `Invested: ${round(invested)} | Maturity: ${round(maturity)} | Wealth Gained: ${round(gains)} over ${n} months.`,
      }],
      structuredContent: {
        months: n,
        invested: round(invested),
        maturity: round(maturity),
        gains: round(gains),
      },
    };
  },
});