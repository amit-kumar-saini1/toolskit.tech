import { useState, useEffect } from "react";
import { Clock, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolLayout from "@/components/tools/ToolLayout";

const timeZones = [
  { value: "Asia/Kolkata", label: "India (IST, UTC+5:30)" },
  { value: "America/New_York", label: "New York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { value: "Asia/Dubai", label: "Dubai (GST, UTC+4)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST, UTC+9)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST, UTC+8)" },
  { value: "Asia/Singapore", label: "Singapore (SGT, UTC+8)" },
  { value: "Asia/Karachi", label: "Karachi (PKT, UTC+5)" },
  { value: "Asia/Dhaka", label: "Dhaka (BST, UTC+6)" },
  { value: "Asia/Kathmandu", label: "Kathmandu (NPT, UTC+5:45)" },
  { value: "Asia/Colombo", label: "Colombo (IST, UTC+5:30)" },
  { value: "Asia/Seoul", label: "Seoul (KST, UTC+9)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT, UTC+8)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
  { value: "America/Toronto", label: "Toronto (EST/EDT)" },
  { value: "America/Denver", label: "Denver (MST/MDT)" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
  { value: "Africa/Cairo", label: "Cairo (EET)" },
  { value: "Africa/Lagos", label: "Lagos (WAT, UTC+1)" },
  { value: "Europe/Moscow", label: "Moscow (MSK, UTC+3)" },
  { value: "Europe/Istanbul", label: "Istanbul (TRT, UTC+3)" },
];

const TimeZoneConverter = () => {
  const [fromZone, setFromZone] = useState("Asia/Kolkata");
  const [toZone, setToZone] = useState("America/New_York");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [convertedTime, setConvertedTime] = useState("");
  const [currentTimes, setCurrentTimes] = useState<{ from: string; to: string }>({ from: "", to: "" });

  // Set initial date/time to now
  useEffect(() => {
    const now = new Date();
    setInputDate(now.toISOString().split("T")[0]);
    setInputTime(now.toTimeString().slice(0, 5));
  }, []);

  // Update current times every second
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTimes({
        from: now.toLocaleString("en-US", { timeZone: fromZone, dateStyle: "medium", timeStyle: "medium" }),
        to: now.toLocaleString("en-US", { timeZone: toZone, dateStyle: "medium", timeStyle: "medium" }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [fromZone, toZone]);

  // Convert whenever inputs change
  useEffect(() => {
    if (!inputDate || !inputTime) return;

    try {
      // Build a date string and interpret it in the "from" timezone
      const dateTimeStr = `${inputDate}T${inputTime}:00`;
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: fromZone,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      });

      // Get UTC offset for the "from" timezone at the given date
      const localDate = new Date(dateTimeStr);
      const fromParts = formatter.formatToParts(localDate);
      const fromStr = `${getPart(fromParts, "year")}-${getPart(fromParts, "month")}-${getPart(fromParts, "day")}T${getPart(fromParts, "hour")}:${getPart(fromParts, "minute")}:${getPart(fromParts, "second")}`;

      // Calculate the difference and adjust
      const fromDate = new Date(fromStr);
      const diff = localDate.getTime() - fromDate.getTime();
      const adjustedDate = new Date(localDate.getTime() + diff);

      // Format in the "to" timezone
      const result = adjustedDate.toLocaleString("en-US", {
        timeZone: toZone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setConvertedTime(result);
    } catch {
      setConvertedTime("Invalid date/time");
    }
  }, [inputDate, inputTime, fromZone, toZone]);

  const getPart = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "00";

  const handleSwap = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };

  const getZoneLabel = (value: string) =>
    timeZones.find((z) => z.value === value)?.label || value;

  return (
    <ToolLayout
      title="Time Zone Converter"
      description="Convert time between different time zones"
      icon={Clock}
      toolSlug="time-zone-converter"
    >
      <div className="space-y-6">
        {/* Live Clocks */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{getZoneLabel(fromZone)}</p>
            <p className="text-lg font-semibold font-mono">{currentTimes.from}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{getZoneLabel(toZone)}</p>
            <p className="text-lg font-semibold font-mono">{currentTimes.to}</p>
          </div>
        </div>

        {/* Zone Selectors */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div className="space-y-2">
            <Label>From Time Zone</Label>
            <Select value={fromZone} onValueChange={setFromZone}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="icon" onClick={handleSwap} className="mb-1">
            <ArrowRightLeft className="w-5 h-5" />
          </Button>

          <div className="space-y-2">
            <Label>To Time Zone</Label>
            <Select value={toZone} onValueChange={setToZone}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date & Time Input */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        {/* Result */}
        {convertedTime && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Converted Time in {getZoneLabel(toZone)}</p>
            <p className="text-xl md:text-2xl font-bold text-foreground">{convertedTime}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TimeZoneConverter;
