import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "bmi_calculator",
  title: "BMI Calculator",
  description: "Calculate Body Mass Index (BMI) and the WHO weight category from height (cm) and weight (kg).",
  inputSchema: {
    heightCm: z.number().positive().describe("Height in centimeters."),
    weightKg: z.number().positive().describe("Weight in kilograms."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ heightCm, weightKg }) => {
    const h = heightCm / 100;
    const bmi = weightKg / (h * h);
    const category =
      bmi < 18.5 ? "Underweight" :
      bmi < 25 ? "Normal" :
      bmi < 30 ? "Overweight" : "Obese";
    const rounded = Math.round(bmi * 10) / 10;
    return {
      content: [{ type: "text", text: `BMI: ${rounded} — ${category}` }],
      structuredContent: { bmi: rounded, category },
    };
  },
});