import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

// Pre-calculated SIP examples for SEO content
const SIP_EXAMPLES = [
  { amount: 1000, years: 10, rate: 12, value: "₹2.3 Lakh" },
  { amount: 1000, years: 20, rate: 12, value: "₹10 Lakh" },
  { amount: 1000, years: 30, rate: 12, value: "₹35 Lakh" },
  { amount: 5000, years: 10, rate: 12, value: "₹11.6 Lakh" },
  { amount: 5000, years: 20, rate: 12, value: "₹50 Lakh" },
  { amount: 5000, years: 30, rate: 12, value: "₹1.76 Cr" },
  { amount: 10000, years: 10, rate: 12, value: "₹23.2 Lakh" },
  { amount: 10000, years: 20, rate: 12, value: "₹1 Cr" },
  { amount: 10000, years: 30, rate: 12, value: "₹3.53 Cr" },
];

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const result = useMemo(() => {
    const P = monthlyInvestment;
    const r = expectedReturn / 12 / 100;
    const n = timePeriod * 12;

    if (P <= 0 || r <= 0 || n <= 0) return null;

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const totalReturns = futureValue - totalInvested;

    return { futureValue, totalInvested, totalReturns };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const investedPercent = result ? (result.totalInvested / result.futureValue) * 100 : 0;

  return (
    <ToolLayout
      title="SIP Calculator"
      description="₹5000 monthly SIP se 10, 20, 30 saal mein kitna paisa banega? Free mutual fund SIP return calculator 2026 — SIP se crorepati bane!"
      icon={TrendingUp}
      toolSlug="sip-calculator"
    >
      <div className="space-y-5">
        {/* Monthly Investment */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm font-semibold whitespace-nowrap">Monthly Investment (₹)</Label>
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-28 text-right font-semibold"
              min={500}
              max={500000}
            />
          </div>
          <Slider
            value={[monthlyInvestment]}
            onValueChange={([v]) => setMonthlyInvestment(v)}
            min={500}
            max={500000}
            step={500}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹500</span>
            <span>₹5 Lakh</span>
          </div>
        </div>

        {/* Expected Return */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm font-semibold whitespace-nowrap">Expected Return (% p.a.)</Label>
            <Input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-24 text-right font-semibold"
              min={1}
              max={30}
              step={0.5}
            />
          </div>
          <Slider
            value={[expectedReturn]}
            onValueChange={([v]) => setExpectedReturn(v)}
            min={1}
            max={30}
            step={0.5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Time Period */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm font-semibold whitespace-nowrap">Time Period (Years)</Label>
            <Input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-20 text-right font-semibold"
              min={1}
              max={40}
            />
          </div>
          <Slider
            value={[timePeriod]}
            onValueChange={([v]) => setTimePeriod(v)}
            min={1}
            max={40}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Year</span>
            <span>40 Years</span>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-3 pt-1">
            {/* Total Value Highlight */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Value</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                  {formatCurrency(result.futureValue)}
                </p>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-2.5">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">Invested Amount</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{formatCurrency(result.totalInvested)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">Est. Returns</p>
                  <p className="text-base sm:text-lg font-bold text-accent-foreground">{formatCurrency(result.totalReturns)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Visual Bar */}
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">Investment vs Returns</p>
              <div className="h-5 rounded-full overflow-hidden flex bg-muted">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${investedPercent}%` }}
                />
                <div
                  className="bg-accent h-full transition-all duration-500"
                  style={{ width: `${100 - investedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Invested ({investedPercent.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  Returns ({(100 - investedPercent).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SIP Returns Table — SEO Content */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            ₹1000, ₹5000, ₹10000 Monthly SIP Returns Table (12% p.a.)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left font-semibold text-foreground">Monthly SIP</th>
                  <th className="p-2 text-center font-semibold text-foreground">10 Years</th>
                  <th className="p-2 text-center font-semibold text-foreground">20 Years</th>
                  <th className="p-2 text-center font-semibold text-foreground">30 Years</th>
                </tr>
              </thead>
              <tbody>
                {[1000, 5000, 10000].map((amt) => (
                  <tr key={amt} className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">₹{amt.toLocaleString("en-IN")}</td>
                    {[10, 20, 30].map((yr) => {
                      const row = SIP_EXAMPLES.find(e => e.amount === amt && e.years === yr);
                      return (
                        <td key={yr} className="p-2 text-center text-muted-foreground">
                          {row?.value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            * Yeh estimated values hain 12% annual return ke basis pe. Actual returns market conditions pe depend karte hain.
          </p>
        </div>

        {/* SEO Rich Content */}
        <div className="mt-6 space-y-5 prose prose-sm max-w-none text-muted-foreground">
          <h2 className="text-lg font-bold text-foreground">SIP Se Crorepati Kaise Bane?</h2>
          <p>
            Bahut se log sochte hain ki <strong>crorepati banne ke liye lakho rupaye chahiye</strong>, lekin yeh sach nahi hai. 
            Agar aap sirf <strong>₹10,000 har mahine SIP</strong> karte hain 12% expected return pe, toh lagbhag <strong>20 saal mein ₹1 Crore</strong> ban 
            sakta hai. Yeh compounding ka kamaal hai — aapka paisa paisa kamata hai! Is{" "}
            <Link to="/tools/sip-calculator" className="text-primary hover:underline">SIP calculator</Link> se exact calculation karein.
          </p>

          <h2 className="text-lg font-bold text-foreground">SIP vs FD — Kahan Invest Karna Chahiye?</h2>
          <p>
            <strong>Fixed Deposit (FD)</strong> mein 6-7% fixed return milta hai bina risk ke. Lekin <strong>SIP mein mutual fund</strong> ke through 
            historically 12-15% return mila hai long-term mein. 10 saal ke liye ₹5000/month — FD mein ₹8.2 lakh milega, SIP mein ₹11.6 lakh! 
            Apni risk capacity ke hisaab se choose karein. EMI calculate karna ho toh{" "}
            <Link to="/tools/loan-emi-calculator" className="text-primary hover:underline">Loan EMI Calculator</Link> use karein.
          </p>

          <h2 className="text-lg font-bold text-foreground">SIP Calculator Kaise Use Kare?</h2>
          <p>
            ToolsKit.tech ka yeh <strong>free SIP calculator</strong> bahut simple hai:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li><strong>Monthly amount daalein</strong> — ₹500 se ₹5 lakh tak slider se set karein</li>
            <li><strong>Expected return rate</strong> — equity funds ke liye 12%, debt ke liye 7%</li>
            <li><strong>Time period choose karein</strong> — 1 se 40 saal tak</li>
            <li>Calculator turant <strong>total value, invested amount, aur profit</strong> dikhayega</li>
          </ol>

          <h2 className="text-lg font-bold text-foreground">Mutual Fund SIP Ke Fayde</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>Rupee Cost Averaging</strong> — market girne pe zyada units milte hain</li>
            <li><strong>Compounding Power</strong> — returns pe bhi returns milte hain</li>
            <li><strong>Discipline</strong> — har mahine automatic investment hoti hai</li>
            <li><strong>Low Minimum</strong> — sirf ₹500 se start kar sakte hain</li>
            <li><strong>Flexibility</strong> — kabhi bhi increase, pause ya stop kar sakte hain</li>
          </ul>

          <p className="text-xs text-muted-foreground mt-4">
            <strong>Disclaimer:</strong> Yeh calculator estimated returns dikhata hai. Mutual fund investments market risk ke adheen hain. 
            Past performance future returns ki guarantee nahi deta. Investment se pehle financial advisor se zaroor salah lein.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SIPCalculator;
