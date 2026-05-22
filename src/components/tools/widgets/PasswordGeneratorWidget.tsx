import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUM = "0123456789";
const SYM = "!@#$%^&*()-_=+[]{};:,.<>?/";

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", w: "33%" };
  if (score <= 4) return { label: "Medium", color: "bg-yellow-500", w: "66%" };
  return { label: "Strong", color: "bg-green-500", w: "100%" };
}

export default function PasswordGeneratorWidget() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [nums, setNums] = useState(true);
  const [sym, setSym] = useState(true);
  const [pw, setPw] = useState("");

  const generate = useCallback(() => {
    let pool = "";
    if (lower) pool += LOWER;
    if (upper) pool += UPPER;
    if (nums) pool += NUM;
    if (sym) pool += SYM;
    if (!pool) { setPw(""); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = "";
    for (let i = 0; i < length; i++) out += pool[arr[i] % pool.length];
    setPw(out);
  }, [length, lower, upper, nums, sym]);

  const s = pw ? strength(pw) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input value={pw} readOnly placeholder="Click Generate to create a password" className="font-mono text-base" />
        <Button onClick={() => navigator.clipboard.writeText(pw)} disabled={!pw} variant="outline">Copy</Button>
      </div>
      {s && (
        <div>
          <div className="flex justify-between text-xs mb-1"><span>Strength</span><span className="font-semibold">{s.label}</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden"><div className={`h-full ${s.color}`} style={{ width: s.w }} /></div>
        </div>
      )}
      <div>
        <Label>Length: {length}</Label>
        <Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={6} max={64} step={1} className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex items-center gap-2 cursor-pointer"><Checkbox checked={lower} onCheckedChange={(v) => setLower(!!v)} /> Lowercase (a-z)</label>
        <label className="flex items-center gap-2 cursor-pointer"><Checkbox checked={upper} onCheckedChange={(v) => setUpper(!!v)} /> Uppercase (A-Z)</label>
        <label className="flex items-center gap-2 cursor-pointer"><Checkbox checked={nums} onCheckedChange={(v) => setNums(!!v)} /> Numbers (0-9)</label>
        <label className="flex items-center gap-2 cursor-pointer"><Checkbox checked={sym} onCheckedChange={(v) => setSym(!!v)} /> Symbols (!@#…)</label>
      </div>
      <Button onClick={generate} className="w-full" size="lg">Generate Password</Button>
    </div>
  );
}