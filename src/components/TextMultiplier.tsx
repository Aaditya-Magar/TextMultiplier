import { useMemo, useState } from "react";
import { Copy, Download, Sparkles, Moon, Sun, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

const MAX_TEXT = 300;
const MAX_COUNT = 1000;

export const TextMultiplier = () => {
  const { theme, toggleTheme } = useTheme();
  const [text, setText] = useState("");
  const [count, setCount] = useState<string>("10");
  const [lineBreak, setLineBreak] = useState(true);
  const [comma, setComma] = useState(false);
  const [output, setOutput] = useState("");

  const numericCount = Number(count);
  const textError = text.length > MAX_TEXT ? `Text must be ${MAX_TEXT} characters or less.` : "";
  const countError =
    count === ""
      ? ""
      : !Number.isFinite(numericCount) || numericCount < 1 || !Number.isInteger(numericCount)
      ? "Enter a whole number ≥ 1."
      : numericCount > MAX_COUNT
      ? `Number must be ${MAX_COUNT} or less.`
      : "";

  const isValid = text.trim().length > 0 && !textError && !countError && numericCount >= 1;

  const handleGenerate = () => {
    if (!isValid) return;
    const separator = comma ? (lineBreak ? ",\n" : ", ") : lineBreak ? "\n" : "";
    const result = Array.from({ length: numericCount }, () => text).join(separator);
    setOutput(result);
    toast({ title: "Generated!", description: `${numericCount} repetitions ready.` });
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast({ title: "Copied to clipboard" });
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-multiplier.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalChars = useMemo(() => output.length, [output]);

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Text <span className="text-gradient-primary">Multiplier</span>
              </h1>
              <p className="text-sm text-muted-foreground">Repeat text instantly, beautifully.</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-smooth hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </header>

        {/* Input card */}
        <section className="rounded-3xl border bg-gradient-card p-6 shadow-card animate-fade-in-up sm:p-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="text">Your text</Label>
                <span
                  className={`text-xs tabular-nums ${
                    text.length > MAX_TEXT ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {text.length}/{MAX_TEXT}
                </span>
              </div>
              <Textarea
                id="text"
                placeholder="Type something to multiply…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="resize-none rounded-2xl border-border bg-background/60 transition-smooth focus-visible:ring-primary"
              />
              {textError && <p className="text-xs text-destructive">{textError}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="count">Repeat (max {MAX_COUNT})</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={MAX_COUNT}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="rounded-2xl bg-background/60 transition-smooth focus-visible:ring-primary"
                />
                {countError && <p className="text-xs text-destructive">{countError}</p>}
              </div>

              <div className="flex flex-col justify-center gap-3 rounded-2xl border bg-background/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="linebreak" className="cursor-pointer text-sm">
                    Line break between
                  </Label>
                  <Switch id="linebreak" checked={lineBreak} onCheckedChange={setLineBreak} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="comma" className="cursor-pointer text-sm">
                    Comma between
                  </Label>
                  <Switch id="comma" checked={comma} onCheckedChange={setComma} />
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!isValid}
              className="group h-12 w-full rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02] hover:shadow-glow disabled:opacity-50 disabled:hover:scale-100"
            >
              <Wand2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Generate
            </Button>
          </div>
        </section>

        {/* Output */}
        {output && (
          <section className="mt-8 rounded-3xl border bg-gradient-card p-6 shadow-card animate-scale-in sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Output</h2>
                <p className="text-xs text-muted-foreground">
                  {totalChars.toLocaleString()} characters generated
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="rounded-xl transition-smooth hover:scale-105"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button
                  onClick={handleDownload}
                  className="rounded-xl bg-gradient-primary text-primary-foreground transition-smooth hover:scale-105"
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>
            <pre className="hide-scrollbar max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-2xl border bg-background/60 p-4 text-sm leading-relaxed">
              {output}
            </pre>
          </section>
        )}

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Built with care · Text Multiplier
        </footer>
      </div>
    </div>
  );
};
