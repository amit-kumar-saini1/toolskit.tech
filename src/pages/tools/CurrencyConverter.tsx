import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft, RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolLayout from "@/components/tools/ToolLayout";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRates {
  [key: string]: number;
}

const popularCurrencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchRates = useCallback(async (base: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await res.json();
      if (data.result === "success") {
        setRates(data.rates);
        setLastUpdated(data.time_last_update_utc || new Date().toUTCString());
      } else {
        throw new Error("API error");
      }
    } catch {
      toast({
        title: "Error fetching rates",
        description: "Could not fetch latest exchange rates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  useEffect(() => {
    if (rates[toCurrency] && amount) {
      const num = parseFloat(amount);
      if (!isNaN(num)) {
        setResult(num * rates[toCurrency]);
      }
    }
  }, [amount, rates, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencyLabel = (code: string) => {
    const c = popularCurrencies.find((c) => c.code === code);
    return c ? `${c.flag} ${c.code} - ${c.name}` : code;
  };

  const rate = rates[toCurrency];

  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert currencies with real-time exchange rates"
      icon={TrendingUp}
      toolSlug="currency-converter"
    >
      <div className="space-y-6">
        {/* Converter Card */}
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 text-lg"
              min="0"
            />
          </div>

          {/* From / Swap / To */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <Label className="text-sm font-medium">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularCurrencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="self-end mb-0.5"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>

            <div>
              <Label className="text-sm font-medium">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularCurrencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result */}
          {result !== null && !loading && (
            <div className="bg-muted/50 rounded-xl p-4 sm:p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {parseFloat(amount || "0").toLocaleString()} {getCurrencyLabel(fromCurrency)}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </p>
              <p className="text-sm text-muted-foreground">{getCurrencyLabel(toCurrency)}</p>
              {rate && (
                <p className="text-xs text-muted-foreground mt-2">
                  1 {fromCurrency} = {rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {toCurrency}
                </p>
              )}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Fetching latest rates...</span>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && !loading && (
            <p className="text-xs text-muted-foreground text-center">
              Rates last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          )}
        </div>

        {/* Popular Rates Table */}
        {rates && Object.keys(rates).length > 0 && !loading && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Popular Exchange Rates (1 {fromCurrency})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {popularCurrencies
                .filter((c) => c.code !== fromCurrency && rates[c.code])
                .slice(0, 12)
                .map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setToCurrency(c.code)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-sm transition-colors hover:bg-muted/50 ${
                      toCurrency === c.code ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{c.code}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {rates[c.code]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CurrencyConverter;
