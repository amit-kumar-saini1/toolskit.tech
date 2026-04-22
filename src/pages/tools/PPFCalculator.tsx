import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { PiggyBank } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

// PPF: yearly compounding, yearly deposits at start of each year
const calcPPF = (yearly: number, rate: number, years: number) => {
  let balance = 0;
  for (let i = 0; i < years; i++) {
    balance = (balance + yearly) * (1 + rate / 100);
  }
  const invested = yearly * years;
  return { amount: balance, invested, interest: balance - invested };
};

// SIP for comparison
const calcSIP = (monthly: number, rate: number, years: number) => {
  const r = rate / 12 / 100;
  const n = years * 12;
  if (r <= 0 || n <= 0) return { amount: 0, invested: 0, returns: 0 };
  const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { amount: fv, invested: monthly * n, returns: fv - monthly * n };
};

const PPF_EXAMPLES = [
  { yearly: "₹50,000/yr", y15: "₹14.4L", y25: "₹34.0L", interest15: "₹6.9L" },
  { yearly: "₹1,00,000/yr", y15: "₹28.8L", y25: "₹68.1L", interest15: "₹13.8L" },
  { yearly: "₹1,50,000/yr", y15: "₹43.2L", y25: "₹1.02Cr", interest15: "₹20.7L" },
];

const PPFCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [interestRate, setInterestRate] = useState(7.1);
  const [timePeriod, setTimePeriod] = useState(15);

  const ppfResult = useMemo(
    () => calcPPF(yearlyInvestment, interestRate, timePeriod),
    [yearlyInvestment, interestRate, timePeriod]
  );

  const comparison = useMemo(() => {
    const monthlySIP = yearlyInvestment / 12;
    const sipResult = calcSIP(monthlySIP, 12, timePeriod);
    return { ppf: ppfResult, sip: sipResult, monthlySIP };
  }, [yearlyInvestment, interestRate, timePeriod, ppfResult]);

  // Year-wise breakdown
  const yearWise = useMemo(() => {
    const rows: { year: number; invested: number; interest: number; balance: number }[] = [];
    let balance = 0;
    for (let i = 1; i <= timePeriod; i++) {
      balance = (balance + yearlyInvestment) * (1 + interestRate / 100);
      const invested = yearlyInvestment * i;
      rows.push({ year: i, invested, interest: balance - invested, balance });
    }
    return rows;
  }, [yearlyInvestment, interestRate, timePeriod]);

  const interestPercent = ppfResult.amount > 0 ? (ppfResult.interest / ppfResult.amount) * 100 : 0;

  return (
    <ToolLayout title="PPF Calculator" description="Calculate Public Provident Fund maturity amount, interest earned & compare with SIP" icon={PiggyBank} toolSlug="ppf-calculator">
      <div className="max-w-4xl mx-auto space-y-8">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">PPF Calculator</TabsTrigger>
            <TabsTrigger value="comparison">SIP vs PPF</TabsTrigger>
            <TabsTrigger value="yearwise">Year-wise</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Yearly Investment: {formatCurrency(yearlyInvestment)}
                  </Label>
                  <Slider
                    value={[yearlyInvestment]}
                    onValueChange={([v]) => setYearlyInvestment(v)}
                    min={500}
                    max={150000}
                    step={500}
                  />
                  <Input
                    type="number"
                    value={yearlyInvestment}
                    onChange={(e) => setYearlyInvestment(Number(e.target.value) || 0)}
                    min={500}
                    max={150000}
                  />
                  <p className="text-xs text-muted-foreground">PPF max limit: ₹1,50,000/year</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Interest Rate: {interestRate}%
                  </Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={([v]) => setInterestRate(v)}
                    min={1}
                    max={15}
                    step={0.1}
                  />
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">Current PPF rate: 7.1% (Q1 2026)</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Time Period: {timePeriod} Years
                  </Label>
                  <Slider
                    value={[timePeriod]}
                    onValueChange={([v]) => setTimePeriod(v)}
                    min={15}
                    max={50}
                    step={5}
                  />
                  <Input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value) || 15)}
                    min={15}
                    max={50}
                  />
                  <p className="text-xs text-muted-foreground">PPF lock-in: 15 years (extend in 5-year blocks)</p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Maturity Amount</p>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(ppfResult.amount)}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground">Total Invested</p>
                      <p className="text-lg font-semibold">{formatCurrency(ppfResult.invested)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(ppfResult.interest)}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Visual bar */}
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-2">Investment vs Interest</p>
                    <div className="w-full h-6 rounded-full overflow-hidden flex">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${100 - interestPercent}%` }}
                      />
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${interestPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Principal ({(100 - interestPercent).toFixed(0)}%)</span>
                      <span>Interest ({interestPercent.toFixed(0)}%)</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>✅ Tax-free maturity amount (Section 80C)</p>
                  <p>✅ Government-backed guarantee</p>
                  <p>✅ Loan facility after 3rd year</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SIP vs PPF Tab */}
          <TabsContent value="comparison" className="space-y-6 mt-6">
            <p className="text-muted-foreground">
              Same ₹{(yearlyInvestment / 12).toLocaleString("en-IN")}/month for {timePeriod} years — PPF @{interestRate}% vs SIP @12%
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/30">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" /> PPF (Guaranteed)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invested</span>
                      <span className="font-medium">{formatCurrency(comparison.ppf.invested)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest</span>
                      <span className="font-medium text-green-600">{formatCurrency(comparison.ppf.interest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Maturity</span>
                      <span className="font-bold text-primary">{formatCurrency(comparison.ppf.amount)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">🔒 Tax-free, Government-backed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">📈 SIP (Market-linked)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invested</span>
                      <span className="font-medium">{formatCurrency(comparison.sip.invested)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Returns</span>
                      <span className="font-medium text-green-600">{formatCurrency(comparison.sip.returns)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Est. Value</span>
                      <span className="font-bold text-green-600">{formatCurrency(comparison.sip.amount)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">⚠️ Returns not guaranteed, market risk</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 Tip: PPF + SIP दोनों में invest करें — safety + growth combo!{" "}
              <Link to="/tools/sip-calculator" className="text-primary hover:underline">SIP Calculator →</Link>
            </p>
          </TabsContent>

          {/* Year-wise Tab */}
          <TabsContent value="yearwise" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Year</th>
                    <th className="text-right p-2">Invested</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {yearWise.map((row) => (
                    <tr key={row.year} className="border-b border-border/50">
                      <td className="p-2">{row.year}</td>
                      <td className="text-right p-2">{formatCurrency(row.invested)}</td>
                      <td className="text-right p-2 text-green-600">{formatCurrency(row.interest)}</td>
                      <td className="text-right p-2 font-medium">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {/* SEO Pre-calculated Table */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">PPF Returns Table @7.1% (2026)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Yearly Investment</th>
                    <th className="text-right p-2">15 Years</th>
                    <th className="text-right p-2">25 Years</th>
                    <th className="text-right p-2">Interest (15Y)</th>
                  </tr>
                </thead>
                <tbody>
                  {PPF_EXAMPLES.map((row) => (
                    <tr key={row.yearly} className="border-b border-border/50">
                      <td className="p-2 font-medium">{row.yearly}</td>
                      <td className="text-right p-2">{row.y15}</td>
                      <td className="text-right p-2">{row.y25}</td>
                      <td className="text-right p-2 text-green-600">{row.interest15}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <h2 className="text-xl font-bold text-foreground">PPF Calculator क्या है?</h2>
          <p>
            PPF (Public Provident Fund) भारत सरकार की सबसे लोकप्रिय tax-free savings scheme है। इस 
            <strong> PPF calculator</strong> से आप अपनी yearly investment पर maturity amount, total interest 
            और year-wise growth आसानी से calculate कर सकते हैं। PPF में ₹500 से लेकर ₹1,50,000 तक हर साल invest कर सकते हैं।
          </p>

          <h2 className="text-xl font-bold text-foreground">PPF के फायदे (2026)</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tax-free returns</strong> — Section 80C deduction + tax-free maturity (EEE status)</li>
            <li><strong>Government guarantee</strong> — 100% safe, sovereign-backed</li>
            <li><strong>7.1% interest rate</strong> — compounded annually</li>
            <li><strong>Loan facility</strong> — 3rd से 6th year के बीच loan ले सकते हैं</li>
            <li><strong>Partial withdrawal</strong> — 7th year से partial withdrawal allowed</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground">PPF vs SIP — कौन बेहतर?</h2>
          <p>
            PPF guaranteed returns देता है और पूरी तरह tax-free है। SIP market-linked होता है — ज़्यादा returns दे 
            सकता है लेकिन risk भी है। Best strategy: दोनों में invest करें।{" "}
            <Link to="/tools/sip-calculator" className="text-primary hover:underline">SIP Calculator</Link> |{" "}
            <Link to="/tools/fd-calculator" className="text-primary hover:underline">FD Calculator</Link>
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PPFCalculator;
