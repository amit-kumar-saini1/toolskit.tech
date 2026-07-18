import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "emi_calculator",
  title: "Loan EMI Calculator",
  description:
    "Calculate the monthly EMI, total interest, and total payment for a loan given principal, annual interest rate, and tenure in years.",
  inputSchema: {
    principal: z.number().positive().describe("Loan principal amount."),
    annualInterestPercent: z.number().nonnegative().describe("Annual interest rate in percent, e.g. 9.5"),
    years: z.number().positive().describe("Loan tenure in years."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ principal, annualInterestPercent, years }) => {
    const n = Math.round(years * 12);
    const r = annualInterestPercent / 100 / 12;
    const emi = r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - principal;
    const round = (x: number) => Math.round(x * 100) / 100;
    return {
      content: [{
        type: "text",
        text: `EMI: ${round(emi)}/mo | Total Interest: ${round(interest)} | Total Payment: ${round(total)} over ${n} months.`,
      }],
      structuredContent: {
        emi: round(emi),
        totalPayment: round(total),
        totalInterest: round(interest),
        months: n,
      },
    };
  },
});