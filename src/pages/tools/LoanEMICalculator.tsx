import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(() => {
    const P = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (P <= 0 || r <= 0 || n <= 0) return null;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalPayment, totalInterest };
  }, [principal, rate, tenure]);

  const principalPercent = result ? (principal / result.totalPayment) * 100 : 0;

  return (
    <ToolLayout
      title="Loan EMI Calculator"
      description="Calculate your monthly EMI for home loan, car loan, or personal loan"
      icon={Calculator}
      toolSlug="loan-emi-calculator"
    >
      <div className="space-y-6">
        {/* Input Controls */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Loan Amount (₹)</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-36 text-right font-semibold"
                min={10000}
                max={100000000}
              />
            </div>
            <Slider
              value={[principal]}
              onValueChange={([v]) => setPrincipal(v)}
              min={10000}
              max={100000000}
              step={10000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹10K</span>
              <span>₹10 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Interest Rate (% p.a.)</Label>
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-28 text-right font-semibold"
                min={1}
                max={30}
                step={0.1}
              />
            </div>
            <Slider
              value={[rate]}
              onValueChange={([v]) => setRate(v)}
              min={1}
              max={30}
              step={0.1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Loan Tenure (Years)</Label>
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24 text-right font-semibold"
                min={1}
                max={30}
              />
            </div>
            <Slider
              value={[tenure]}
              onValueChange={([v]) => setTenure(v)}
              min={1}
              max={30}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* EMI Highlight */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-primary">
                  {formatCurrency(result.emi)}
                </p>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Principal Amount</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(principal)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-lg font-bold text-destructive">{formatCurrency(result.totalInterest)}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(result.totalPayment)}</p>
              </CardContent>
            </Card>

            {/* Visual Bar */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Payment Breakdown</p>
              <div className="h-6 rounded-full overflow-hidden flex bg-muted">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${principalPercent}%` }}
                />
                <div
                  className="bg-destructive h-full transition-all duration-500"
                  style={{ width: `${100 - principalPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  Principal ({principalPercent.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive inline-block" />
                  Interest ({(100 - principalPercent).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default LoanEMICalculator;
