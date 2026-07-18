import { defineMcp } from "@lovable.dev/mcp-js";
import sipCalculator from "./tools/sip-calculator";
import emiCalculator from "./tools/emi-calculator";
import ageCalculator from "./tools/age-calculator";
import bmiCalculator from "./tools/bmi-calculator";
import gstCalculator from "./tools/gst-calculator";
import wordCounter from "./tools/word-counter";
import percentageCalculator from "./tools/percentage-calculator";

export default defineMcp({
  name: "toolskit-mcp",
  title: "ToolsKit.tech Calculators",
  version: "0.1.0",
  instructions:
    "Free calculators and text utilities from ToolsKit.tech. Use `sip_calculator` for mutual-fund SIP maturity, `emi_calculator` for loan EMIs, `age_calculator` for exact age between two dates, `bmi_calculator` for BMI + WHO category, `gst_calculator` for inclusive/exclusive GST, `word_counter` for text stats, and `percentage_calculator` for percent-of / what-percent / percent-change math. All tools are read-only, deterministic, and require no authentication.",
  tools: [
    sipCalculator,
    emiCalculator,
    ageCalculator,
    bmiCalculator,
    gstCalculator,
    wordCounter,
    percentageCalculator,
  ],
});