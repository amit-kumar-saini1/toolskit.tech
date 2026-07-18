import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "age_calculator",
  title: "Age Calculator",
  description:
    "Calculate exact age in years, months, and days between a date of birth and an 'as-on' date (defaults to today).",
  inputSchema: {
    dateOfBirth: z.string().describe("Date of birth in YYYY-MM-DD format."),
    asOnDate: z.string().optional().describe("Optional cutoff date YYYY-MM-DD; defaults to today (UTC)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ dateOfBirth, asOnDate }) => {
    const dob = new Date(dateOfBirth);
    const now = asOnDate ? new Date(asOnDate) : new Date();
    if (isNaN(dob.getTime()) || isNaN(now.getTime())) {
      return { content: [{ type: "text", text: "Invalid date. Use YYYY-MM-DD." }], isError: true };
    }
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years -= 1; months += 12; }
    const totalDays = Math.floor((now.getTime() - dob.getTime()) / 86400000);
    return {
      content: [{ type: "text", text: `Age: ${years} years, ${months} months, ${days} days (${totalDays} total days).` }],
      structuredContent: { years, months, days, totalDays },
    };
  },
});