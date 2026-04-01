import { useState, useEffect } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [results, setResults] = useState<PostOffice[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Location-based search
  const [selectedState, setSelectedState] = useState("");
  const [postOfficeName, setPostOfficeName] = useState("");
  const [locationResults, setLocationResults] = useState<PostOffice[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationSearched, setLocationSearched] = useState(false);

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

  const searchByLocation = async () => {
    if (!postOfficeName.trim()) {
      toast.error("Please enter a post office name");
      return;
    }
    setLocationLoading(true);
    setLocationSearched(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(postOfficeName.trim())}`);
      const data = await res.json();
      if (data[0]?.Status === "Success") {
        let offices = data[0].PostOffice || [];
        if (selectedState) {
          offices = offices.filter((po: PostOffice) => po.State === selectedState);
        }
        setLocationResults(offices);
        if (offices.length === 0) {
          toast.error("No post offices found. Try a different name or state.");
        }
      } else {
        setLocationResults([]);
        toast.error("No results found. Check the post office name.");
      }
    } catch {
      toast.error("Failed to fetch data. Try again.");
      setLocationResults([]);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchPincode();
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") searchByLocation();
  };

  const ResultCard = ({ po, index }: { po: PostOffice; index: number }) => (
    <div key={index} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-base">{po.Name}</h4>
        <div className="flex gap-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{po.BranchType}</span>
          <span className="text-xs bg-accent/50 text-foreground px-2 py-1 rounded-full font-mono">{po.Pincode}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
        <div><span className="text-xs">District:</span><p className="text-foreground">{po.District}</p></div>
        <div><span className="text-xs">State:</span><p className="text-foreground">{po.State}</p></div>
        <div><span className="text-xs">Division:</span><p className="text-foreground">{po.Division}</p></div>
        <div><span className="text-xs">Region:</span><p className="text-foreground">{po.Region}</p></div>
        <div><span className="text-xs">Block:</span><p className="text-foreground">{po.Block || "N/A"}</p></div>
        <div><span className="text-xs">Delivery:</span><p className="text-foreground">{po.DeliveryStatus}</p></div>
      </div>
    </div>
  );

  const SummaryCard = ({ data }: { data: PostOffice }) => (
    <div className="bg-muted/50 rounded-xl p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><p className="text-xs text-muted-foreground">Pincode</p><p className="font-bold text-lg">{data.Pincode}</p></div>
        <div><p className="text-xs text-muted-foreground">District</p><p className="font-semibold">{data.District}</p></div>
        <div><p className="text-xs text-muted-foreground">State</p><p className="font-semibold">{data.State}</p></div>
        <div><p className="text-xs text-muted-foreground">Country</p><p className="font-semibold">{data.Country}</p></div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12 text-muted-foreground">
      <MapPin className="w-12 h-12 mx-auto mb-3 opacity-40" />
      <p>No post offices found. Try a different search.</p>
    </div>
  );

  return (
    <ToolLayout
      title="Pincode Lookup"
      description="Find post office, district, state and more details by Indian pincode"
      icon={MapPin}
      toolSlug="pincode-lookup"
    >
      <div className="space-y-6">
        <Tabs defaultValue="pincode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pincode">Search by Pincode</TabsTrigger>
            <TabsTrigger value="location">Search by Location</TabsTrigger>
          </TabsList>

          {/* Tab 1: Search by Pincode */}
          <TabsContent value="pincode" className="space-y-4 mt-4">
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

            {!loading && searched && results.length === 0 && <EmptyState />}

            {!loading && results.length > 0 && (
              <div className="space-y-4">
                <SummaryCard data={results[0]} />
                <h3 className="font-semibold text-lg">Post Offices ({results.length})</h3>
                <div className="grid gap-3">
                  {results.map((po, i) => <ResultCard key={i} po={po} index={i} />)}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab 2: Search by Location */}
          <TabsContent value="location" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>State (Optional)</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Post Office Name</Label>
                <div className="flex gap-2">
                  <Input
                    value={postOfficeName}
                    onChange={(e) => setPostOfficeName(e.target.value)}
                    onKeyDown={handleLocationKeyDown}
                    placeholder="e.g. Connaught Place"
                    className="h-12"
                  />
                  <Button onClick={searchByLocation} disabled={locationLoading} size="lg" className="h-12 px-6">
                    {locationLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {locationLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!locationLoading && locationSearched && locationResults.length === 0 && <EmptyState />}

            {!locationLoading && locationResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Results ({locationResults.length})</h3>
                <div className="grid gap-3">
                  {locationResults.map((po, i) => <ResultCard key={i} po={po} index={i} />)}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="font-medium mb-2">About Pincode Lookup</h4>
          <p className="text-sm text-muted-foreground">
            Enter any Indian 6-digit pincode to find all post offices, or search by location name to find the pincode. Data is fetched from India Post's official API.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PincodeLookup;
