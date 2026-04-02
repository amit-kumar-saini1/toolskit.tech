import { useState, useMemo } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

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
      description="Calculate mutual fund SIP returns — monthly investment se kitna paisa banega"
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
                  <p className="text-base sm:text-lg font-bold text-green-600">{formatCurrency(result.totalReturns)}</p>
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
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${100 - investedPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Invested ({investedPercent.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Returns ({(100 - investedPercent).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default SIPCalculator;
