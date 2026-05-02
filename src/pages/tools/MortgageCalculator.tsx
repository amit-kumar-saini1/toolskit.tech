import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(5400);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);

  const result = useMemo(() => {
    const safePrice = Math.max(homePrice, 1);
    const safeDownPayment = Math.min(Math.max(downPayment, 0), safePrice);
    const loanAmount = safePrice - safeDownPayment;
    const months = Math.max(loanTerm * 12, 1);
    const monthlyRate = interestRate / 100 / 12;
    const principalAndInterest =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const monthlyTax = Math.max(propertyTax, 0) / 12;
    const monthlyInsurance = Math.max(insurance, 0) / 12;
    const downPaymentPercent = safeDownPayment / safePrice;
    const monthlyPmi = downPaymentPercent < 0.2 ? (loanAmount * 0.006) / 12 : 0;
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + hoa + monthlyPmi;
    const totalInterest = principalAndInterest * months - loanAmount;
    const totalCost = monthlyPayment * months + safeDownPayment;

    let balance = loanAmount;
    const yearlyBreakdown = Array.from({ length: Math.min(loanTerm, 10) }, (_, index) => {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 0; month < 12; month += 1) {
        const interest = balance * monthlyRate;
        const principal = Math.min(principalAndInterest - interest, balance);
        balance = Math.max(balance - principal, 0);
        yearlyPrincipal += principal;
        yearlyInterest += interest;
      }

      return {
        year: index + 1,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance,
      };
    });

    return {
      loanAmount,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      monthlyPayment,
      totalInterest,
      totalCost,
      downPaymentPercent,
      yearlyBreakdown,
    };
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa]);

  const monthlyItems = [
    { label: "Principal & Interest", value: result.principalAndInterest },
    { label: "Property Tax", value: result.monthlyTax },
    { label: "Home Insurance", value: result.monthlyInsurance },
    { label: "PMI", value: result.monthlyPmi },
    { label: "HOA", value: hoa },
  ].filter((item) => item.value > 0);

  return (
    <ToolLayout
      title="Mortgage Calculator"
      description="Estimate monthly mortgage payments, taxes, insurance, PMI, and total interest."
      icon={Calculator}
      toolSlug="mortgage-calculator"
    >
      <div className="space-y-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label className="font-semibold">Home Price</Label>
                <Input className="w-36 text-right font-semibold" type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
              </div>
              <Slider value={[homePrice]} min={50000} max={2500000} step={5000} onValueChange={([value]) => setHomePrice(value)} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label className="font-semibold">Down Payment</Label>
                <Input className="w-36 text-right font-semibold" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              </div>
              <Slider value={[Math.min(downPayment, homePrice)]} min={0} max={Math.max(homePrice, 1)} step={1000} onValueChange={([value]) => setDownPayment(value)} />
              <p className="text-xs text-muted-foreground">Down payment: {percent.format(result.downPaymentPercent)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mortgage-rate">Interest Rate (%)</Label>
                <Input id="mortgage-rate" type="number" min={0} step={0.01} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mortgage-term">Loan Term (Years)</Label>
                <Input id="mortgage-term" type="number" min={1} max={40} value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="property-tax">Annual Property Tax</Label>
                <Input id="property-tax" type="number" min={0} value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Annual Insurance</Label>
                <Input id="insurance" type="number" min={0} value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoa">Monthly HOA Fees</Label>
              <Input id="hoa" type="number" min={0} value={hoa} onChange={(e) => setHoa(Number(e.target.value))} />
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5 text-center">
                <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                <p className="mt-2 text-4xl font-extrabold text-primary">{currency.format(result.monthlyPayment)}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="text-xl font-bold">{currency.format(result.loanAmount)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Interest</p>
              <p className="text-xl font-bold text-destructive">{currency.format(result.totalInterest)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total Cost</p>
              <p className="text-xl font-bold">{currency.format(result.totalCost)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <h3 className="mb-4 font-bold">Monthly Payment Breakdown</h3>
            <div className="space-y-3">
              {monthlyItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{currency.format(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <h3 className="mb-4 font-bold">First 10 Years Amortization</h3>
            <div className="max-h-72 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card text-muted-foreground">
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-2">Year</th>
                    <th className="py-2 pr-2">Principal</th>
                    <th className="py-2 pr-2">Interest</th>
                    <th className="py-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-border/60">
                      <td className="py-2 pr-2 font-semibold">{row.year}</td>
                      <td className="py-2 pr-2">{currency.format(row.principal)}</td>
                      <td className="py-2 pr-2">{currency.format(row.interest)}</td>
                      <td className="py-2">{currency.format(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MortgageCalculator;