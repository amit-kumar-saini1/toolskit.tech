import { useState } from "react";
import { Calendar, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolLayout from "@/components/tools/ToolLayout";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: number;
}

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: daysUntilBirthday,
    });
  };

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age from birthdate"
      icon={Calendar}
      toolSlug="age-calculator"
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="flex items-end">
            <Button variant="gradient" onClick={calculateAge} className="w-full h-12">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Age
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Main Age Display */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
              <h3 className="text-lg text-muted-foreground mb-2">Your Age</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold gradient-text">{result.years}</span>
                <span className="text-xl text-muted-foreground">years</span>
                <span className="text-3xl font-bold text-foreground">{result.months}</span>
                <span className="text-lg text-muted-foreground">months</span>
                <span className="text-3xl font-bold text-foreground">{result.days}</span>
                <span className="text-lg text-muted-foreground">days</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{result.totalMonths}</div>
                <div className="text-xs text-muted-foreground">Total Months</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-secondary">{result.totalWeeks}</div>
                <div className="text-xs text-muted-foreground">Total Weeks</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.totalDays.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Days</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{result.nextBirthday}</div>
                <div className="text-xs text-muted-foreground">Days to Birthday</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;
