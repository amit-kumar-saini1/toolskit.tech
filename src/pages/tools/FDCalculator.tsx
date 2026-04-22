import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

// FD formula: A = P × (1 + r/n)^(n*t)
const calcFD = (principal: number, rate: number, years: number, compounding: number = 4) => {
  const r = rate / 100;
  const amount = principal * Math.pow(1 + r / compounding, compounding * years);
  return { amount, interest: amount - principal, principal };
};

// SIP formula for comparison
const calcSIP = (monthly: number, rate: number, years: number) => {
  const r = rate / 12 / 100;
  const n = years * 12;
  if (r <= 0 || n <= 0) return { amount: 0, invested: 0, returns: 0 };
  const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { amount: fv, invested: monthly * n, returns: fv - monthly * n };
};

// Pre-calculated FD table
const FD_EXAMPLES = [
  { amount: "₹1 Lakh", y1: "₹1.07L", y3: "₹1.23L", y5: "₹1.40L" },
  { amount: "₹5 Lakh", y1: "₹5.36L", y3: "₹6.15L", y5: "₹7.01L" },
  { amount: "₹10 Lakh", y1: "₹10.72L", y3: "₹12.30L", y5: "₹14.03L" },
];

const FDCalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(5);

  const fdResult = useMemo(() => calcFD(principal, interestRate, timePeriod), [principal, interestRate, timePeriod]);

  // SIP vs FD comparison — same total amount invested
  const comparison = useMemo(() => {
    const monthlySIP = principal / (timePeriod * 12);
    const sipResult = calcSIP(monthlySIP, 12, timePeriod);
    return {
      fd: fdResult,
      sip: sipResult,
      monthlySIP,
      sipRate: 12,
    };
  }, [principal, interestRate, timePeriod, fdResult]);

  const interestPercent = fdResult ? (fdResult.interest / fdResult.amount) * 100 : 0;

  return (
    <ToolLayout
      title="FD Calculator"
      description="Fixed Deposit maturity amount calculate karein — FD vs SIP comparison ke saath. Free FD interest calculator 2026."
      icon={Landmark}
      toolSlug="fd-calculator"
    >
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">FD Calculator</TabsTrigger>
          <TabsTrigger value="comparison">SIP vs FD</TabsTrigger>
        </TabsList>

        {/* FD Calculator Tab */}
        <TabsContent value="calculator" className="space-y-5 pt-2">
          {/* Principal Amount */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm font-semibold whitespace-nowrap">Principal Amount (₹)</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-32 text-right font-semibold"
                min={1000}
                max={10000000}
              />
            </div>
            <Slider value={[principal]} onValueChange={([v]) => setPrincipal(v)} min={1000} max={10000000} step={1000} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹1,000</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <Label className="text-sm font-semibold whitespace-nowrap">Interest Rate (% p.a.)</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-24 text-right font-semibold"
                min={1}
                max={15}
                step={0.1}
              />
            </div>
            <Slider value={[interestRate]} onValueChange={([v]) => setInterestRate(v)} min={1} max={15} step={0.1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>15%</span>
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
                max={25}
              />
            </div>
            <Slider value={[timePeriod]} onValueChange={([v]) => setTimePeriod(v)} min={1} max={25} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 Year</span>
              <span>25 Years</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3 pt-1">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Maturity Amount</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                  {formatCurrency(fdResult.amount)}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2.5">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">Principal</p>
                  <p className="text-base sm:text-lg font-bold text-foreground">{formatCurrency(fdResult.principal)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-[11px] sm:text-xs text-muted-foreground mb-0.5">Total Interest</p>
                  <p className="text-base sm:text-lg font-bold text-accent-foreground">{formatCurrency(fdResult.interest)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Visual Bar */}
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">Principal vs Interest</p>
              <div className="h-5 rounded-full overflow-hidden flex bg-muted">
                <div className="bg-primary h-full transition-all duration-500" style={{ width: `${100 - interestPercent}%` }} />
                <div className="bg-accent h-full transition-all duration-500" style={{ width: `${interestPercent}%` }} />
              </div>
              <div className="flex justify-between text-[11px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Principal ({(100 - interestPercent).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  Interest ({interestPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SIP vs FD Comparison Tab */}
        <TabsContent value="comparison" className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Same <strong>{formatCurrency(principal)}</strong> invest karna hai <strong>{timePeriod} saal</strong> ke liye — FD mein ya SIP mein? Dekho farak:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* FD Card */}
            <Card className="border-blue-500/30">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-foreground">Fixed Deposit</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invested</span>
                    <span className="font-semibold text-foreground">{formatCurrency(comparison.fd.principal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-foreground">{interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="font-semibold text-blue-500">{formatCurrency(comparison.fd.interest)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Maturity</span>
                    <span className="font-extrabold text-blue-600">{formatCurrency(comparison.fd.amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SIP Card */}
            <Card className="border-green-500/30">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h3 className="font-bold text-foreground">SIP (Mutual Fund)</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly SIP</span>
                    <span className="font-semibold text-foreground">{formatCurrency(comparison.monthlySIP)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Return</span>
                    <span className="font-semibold text-foreground">{comparison.sipRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Returns</span>
                    <span className="font-semibold text-green-500">{formatCurrency(comparison.sip.returns)}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total Value</span>
                    <span className="font-extrabold text-green-600">{formatCurrency(comparison.sip.amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {comparison.sip.amount > comparison.fd.amount ? (
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-3 text-center text-sm">
                <p className="text-foreground">
                  SIP mein <strong className="text-green-600">{formatCurrency(comparison.sip.amount - comparison.fd.amount)}</strong> zyada milega!
                  <br />
                  <span className="text-xs text-muted-foreground">* SIP mein market risk hota hai, FD guaranteed return deta hai</span>
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-3 text-center text-sm">
                <p className="text-foreground">
                  FD mein <strong className="text-blue-600">{formatCurrency(comparison.fd.amount - comparison.sip.amount)}</strong> zyada milega — guaranteed!
                </p>
              </CardContent>
            </Card>
          )}

          <p className="text-xs text-muted-foreground">
            * SIP returns 12% estimated annual return pe based hain. FD quarterly compounding pe calculated hai. 
            Detailed SIP calculation ke liye{" "}
            <Link to="/tools/sip-calculator" className="text-primary hover:underline">SIP Calculator</Link> use karein.
          </p>
        </TabsContent>
      </Tabs>

      {/* FD Returns Table — SEO Content */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          FD Returns Table — 7% Interest Rate (Quarterly Compounding)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left font-semibold text-foreground">Amount</th>
                <th className="p-2 text-center font-semibold text-foreground">1 Year</th>
                <th className="p-2 text-center font-semibold text-foreground">3 Years</th>
                <th className="p-2 text-center font-semibold text-foreground">5 Years</th>
              </tr>
            </thead>
            <tbody>
              {FD_EXAMPLES.map((row) => (
                <tr key={row.amount} className="border-t border-border">
                  <td className="p-2 font-medium text-foreground">{row.amount}</td>
                  <td className="p-2 text-center text-muted-foreground">{row.y1}</td>
                  <td className="p-2 text-center text-muted-foreground">{row.y3}</td>
                  <td className="p-2 text-center text-muted-foreground">{row.y5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          * Values 7% annual interest rate aur quarterly compounding pe based hain. Actual rates bank pe depend karte hain.
        </p>
      </div>

      {/* SEO Rich Content */}
      <div className="mt-6 space-y-5 prose prose-sm max-w-none text-muted-foreground">
        <h2 className="text-lg font-bold text-foreground">Fixed Deposit (FD) Kya Hota Hai?</h2>
        <p>
          <strong>Fixed Deposit (FD)</strong> ek safe investment option hai jisme aap ek fixed amount ek fixed time ke liye bank mein 
          rakhte hain aur bank aapko <strong>guaranteed interest</strong> deta hai. FD mein koi market risk nahi hota — aapka paisa 
          100% safe rehta hai. India mein sabse popular investment options mein se ek hai FD. Is{" "}
          <Link to="/tools/fd-calculator" className="text-primary hover:underline">FD calculator</Link> se apni maturity amount 
          turant calculate karein.
        </p>

        <h2 className="text-lg font-bold text-foreground">FD vs SIP — Kahan Invest Karna Chahiye?</h2>
        <p>
          <strong>FD</strong> mein guaranteed return milta hai (currently 6-7.5%), lekin <strong>SIP mein mutual fund</strong> ke through 
          historically 12-15% return mila hai. Lekin SIP mein market risk hota hai — short-term mein loss bhi ho sakta hai. 
          Agar aap risk nahi lena chahte toh FD best hai. Long-term wealth creation ke liye{" "}
          <Link to="/tools/sip-calculator" className="text-primary hover:underline">SIP Calculator</Link> se returns compare karein.
        </p>

        <h2 className="text-lg font-bold text-foreground">FD Calculator Kaise Use Kare?</h2>
        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
          <li><strong>Principal amount daalein</strong> — ₹1,000 se ₹1 Crore tak</li>
          <li><strong>Interest rate set karein</strong> — apne bank ka current FD rate daalein</li>
          <li><strong>Time period choose karein</strong> — 1 se 25 saal tak</li>
          <li>Calculator turant <strong>maturity amount aur total interest</strong> dikhayega</li>
          <li><strong>SIP vs FD tab</strong> mein comparison dekho — kahan zyada return milega</li>
        </ol>

        <h2 className="text-lg font-bold text-foreground">FD Ke Fayde</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li><strong>Guaranteed Returns</strong> — market risk zero, fixed interest milta hai</li>
          <li><strong>Safe Investment</strong> — DICGC se ₹5 lakh tak insured</li>
          <li><strong>Flexible Tenure</strong> — 7 din se lekar 10 saal tak</li>
          <li><strong>Loan Against FD</strong> — emergency mein FD pe loan le sakte hain</li>
          <li><strong>Senior Citizen Benefit</strong> — 0.25-0.50% extra interest milta hai</li>
        </ul>

        <h2 className="text-lg font-bold text-foreground">2026 Mein Best FD Interest Rates</h2>
        <p>
          2026 mein major banks ke FD rates: SBI (6.50-7.10%), HDFC Bank (7.00-7.40%), ICICI Bank (6.90-7.25%), 
          Post Office FD (7.50%). Senior citizens ko additional 0.25-0.50% extra milta hai. 
          EMI calculate karna ho toh{" "}
          <Link to="/tools/loan-emi-calculator" className="text-primary hover:underline">Loan EMI Calculator</Link> use karein.
        </p>

        <p className="text-xs text-muted-foreground mt-4">
          <strong>Disclaimer:</strong> Yeh calculator estimated returns dikhata hai. Actual FD rates bank aur tenure pe depend karte hain. 
          Tax Deducted at Source (TDS) applicable hai agar interest ₹40,000 se zyada ho (senior citizens ke liye ₹50,000). 
          Investment se pehle bank se confirm karein.
        </p>
      </div>
    </ToolLayout>
  );
};

export default FDCalculator;
