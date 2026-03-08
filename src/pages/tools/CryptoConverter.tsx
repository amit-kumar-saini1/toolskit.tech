import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft, RefreshCw, Bitcoin, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolLayout from "@/components/tools/ToolLayout";
import { useToast } from "@/hooks/use-toast";

interface CoinPrice {
  [currency: string]: number;
}

interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

const cryptoList = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", icon: "₿" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  { id: "tether", symbol: "USDT", name: "Tether", icon: "₮" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", icon: "◆" },
  { id: "solana", symbol: "SOL", name: "Solana", icon: "◎" },
  { id: "ripple", symbol: "XRP", name: "XRP", icon: "✕" },
  { id: "usd-coin", symbol: "USDC", name: "USD Coin", icon: "$" },
  { id: "cardano", symbol: "ADA", name: "Cardano", icon: "₳" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", icon: "Ð" },
  { id: "polkadot", symbol: "DOT", name: "Polkadot", icon: "●" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", icon: "▲" },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", icon: "⬡" },
  { id: "tron", symbol: "TRX", name: "TRON", icon: "◈" },
  { id: "polygon-ecosystem-token", symbol: "POL", name: "Polygon", icon: "⬡" },
  { id: "litecoin", symbol: "LTC", name: "Litecoin", icon: "Ł" },
  { id: "shiba-inu", symbol: "SHIB", name: "Shiba Inu", icon: "🐕" },
  { id: "stellar", symbol: "XLM", name: "Stellar", icon: "✦" },
  { id: "monero", symbol: "XMR", name: "Monero", icon: "ɱ" },
  { id: "sui", symbol: "SUI", name: "Sui", icon: "💧" },
  { id: "pepe", symbol: "PEPE", name: "Pepe", icon: "🐸" },
];

const fiatCurrencies = [
  { code: "usd", name: "US Dollar", symbol: "$" },
  { code: "eur", name: "Euro", symbol: "€" },
  { code: "gbp", name: "British Pound", symbol: "£" },
  { code: "inr", name: "Indian Rupee", symbol: "₹" },
  { code: "jpy", name: "Japanese Yen", symbol: "¥" },
  { code: "aud", name: "Australian Dollar", symbol: "A$" },
  { code: "cad", name: "Canadian Dollar", symbol: "C$" },
  { code: "cny", name: "Chinese Yuan", symbol: "¥" },
  { code: "krw", name: "Korean Won", symbol: "₩" },
  { code: "aed", name: "UAE Dirham", symbol: "د.إ" },
];

const CryptoConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCrypto, setFromCrypto] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("usd");
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const [marketData, setMarketData] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { toast } = useToast();

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const ids = cryptoList.map((c) => c.id).join(",");
      const currencies = fiatCurrencies.map((f) => f.code).join(",");

      const [priceRes, marketRes] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currencies}`),
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${toCurrency}&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false`),
      ]);

      const priceData = await priceRes.json();
      const marketDataRes = await marketRes.json();

      if (priceData && !priceData.error) {
        setPrices(priceData);
        setLastUpdated(new Date().toLocaleString());
      }
      if (Array.isArray(marketDataRes)) {
        setMarketData(marketDataRes);
      }
    } catch {
      toast({
        title: "Error fetching crypto prices",
        description: "Could not fetch latest prices. CoinGecko API may be rate-limited. Try again in a minute.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toCurrency, toast]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const getConvertedValue = () => {
    const price = prices[fromCrypto]?.[toCurrency];
    if (!price || !amount) return null;
    const num = parseFloat(amount);
    if (isNaN(num)) return null;
    return num * price;
  };

  const result = getConvertedValue();
  const selectedCrypto = cryptoList.find((c) => c.id === fromCrypto);
  const selectedFiat = fiatCurrencies.find((f) => f.code === toCurrency);
  const currentPrice = prices[fromCrypto]?.[toCurrency];

  const formatPrice = (val: number) => {
    if (val >= 1) return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (val >= 0.0001) return val.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    return val.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 10 });
  };

  const formatMarketCap = (val: number) => {
    if (val >= 1e12) return `${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
    return val.toLocaleString();
  };

  return (
    <ToolLayout
      title="Crypto Converter"
      description="Convert cryptocurrencies with real-time market prices"
      icon={Bitcoin}
      toolSlug="crypto-converter"
    >
      <div className="space-y-6">
        {/* Converter */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="crypto-amount" className="text-sm font-medium">Amount</Label>
            <Input
              id="crypto-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 text-lg"
              min="0"
              step="any"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <Label className="text-sm font-medium">Cryptocurrency</Label>
              <Select value={fromCrypto} onValueChange={setFromCrypto}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptoList.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.icon} {c.symbol} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
            </div>

            <div>
              <Label className="text-sm font-medium">Fiat Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fiatCurrencies.map((f) => (
                    <SelectItem key={f.code} value={f.code}>
                      {f.symbol} {f.code.toUpperCase()} - {f.name}
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
                {parseFloat(amount || "0")} {selectedCrypto?.symbol}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary">
                {selectedFiat?.symbol}{formatPrice(result)}
              </p>
              <p className="text-sm text-muted-foreground">{selectedFiat?.name}</p>
              {currentPrice && (
                <p className="text-xs text-muted-foreground mt-2">
                  1 {selectedCrypto?.symbol} = {selectedFiat?.symbol}{formatPrice(currentPrice)}
                </p>
              )}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Fetching live prices...</span>
            </div>
          )}

          {lastUpdated && !loading && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
              <Button variant="ghost" size="sm" onClick={fetchPrices} disabled={loading}>
                <RefreshCw className="w-3 h-3 mr-1" /> Refresh
              </Button>
            </div>
          )}
        </div>

        {/* Market Overview */}
        {marketData.length > 0 && !loading && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Live Market Prices ({selectedFiat?.code.toUpperCase()})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-2 px-2 text-muted-foreground font-medium">Coin</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium">Price</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium">24h %</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium hidden sm:table-cell">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.slice(0, 15).map((coin, idx) => (
                    <tr
                      key={coin.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setFromCrypto(coin.id)}
                    >
                      <td className="py-2.5 px-2 text-muted-foreground">{idx + 1}</td>
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" loading="lazy" />
                          <span className="font-medium text-foreground">{coin.symbol.toUpperCase()}</span>
                          <span className="text-muted-foreground hidden sm:inline">{coin.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-right font-medium text-foreground">
                        {selectedFiat?.symbol}{formatPrice(coin.current_price)}
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`inline-flex items-center gap-0.5 font-medium ${
                          coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right text-muted-foreground hidden sm:table-cell">
                        {selectedFiat?.symbol}{formatMarketCap(coin.market_cap)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CryptoConverter;
