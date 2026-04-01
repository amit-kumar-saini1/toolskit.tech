import { useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolLayout from "@/components/tools/ToolLayout";
import { toast } from "sonner";

interface PostOffice {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [results, setResults] = useState<PostOffice[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchPincode = async () => {
    const trimmed = pincode.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${trimmed}`);
      const data = await res.json();
      if (data[0]?.Status === "Success") {
        setResults(data[0].PostOffice || []);
      } else {
        setResults([]);
        toast.error("No results found for this pincode");
      }
    } catch {
      toast.error("Failed to fetch pincode details. Try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchPincode();
  };

  return (
    <ToolLayout
      title="Pincode Lookup"
      description="Find post office, district, state and more details by Indian pincode"
      icon={MapPin}
      toolSlug="pincode-lookup"
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          <Input
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            onKeyDown={handleKeyDown}
            placeholder="Enter 6-digit pincode (e.g. 110001)"
            className="h-12 font-mono text-lg"
            maxLength={6}
          />
          <Button onClick={searchPincode} disabled={loading} size="lg" className="h-12 px-6">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Search
          </Button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No post offices found for this pincode.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Pincode</p>
                  <p className="font-bold text-lg">{results[0].Pincode}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">District</p>
                  <p className="font-semibold">{results[0].District}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="font-semibold">{results[0].State}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="font-semibold">{results[0].Country}</p>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-lg">
              Post Offices ({results.length})
            </h3>

            <div className="grid gap-3">
              {results.map((po, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-base">{po.Name}</h4>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {po.BranchType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="text-xs">Division:</span>
                      <p className="text-foreground">{po.Division}</p>
                    </div>
                    <div>
                      <span className="text-xs">Region:</span>
                      <p className="text-foreground">{po.Region}</p>
                    </div>
                    <div>
                      <span className="text-xs">Block:</span>
                      <p className="text-foreground">{po.Block || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-xs">Circle:</span>
                      <p className="text-foreground">{po.Circle}</p>
                    </div>
                    <div>
                      <span className="text-xs">Delivery:</span>
                      <p className="text-foreground">{po.DeliveryStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="font-medium mb-2">About Pincode Lookup</h4>
          <p className="text-sm text-muted-foreground">
            Enter any Indian 6-digit pincode to find all post offices in that area along with district, state, division, region, and delivery status. Data is fetched from India Post's official API.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PincodeLookup;
