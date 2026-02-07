import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Satellite, Send, MapPin, Leaf, BarChart3, TrendingUp, Droplets, Sun, Thermometer, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";

const SUGGESTIONS = [
  "Best crop for wet soil in Greater Noida next season?",
  "Potato price prediction for next quarter?",
  "Yearly rotation plan for maintaining soil fertility?",
];

const MOCK_PRICE_DATA = [
  { year: "2022", rice: 22, wheat: 19, potato: 12 },
  { year: "2023", rice: 25, wheat: 21, potato: 8 },
  { year: "2024", rice: 27, wheat: 23, potato: 15 },
  { year: "2025", rice: 28, wheat: 24, potato: 10 },
  { year: "2026 (P)", rice: 30, wheat: 26, potato: 18 },
];

const MOCK_SOIL_DATA = [
  { name: "Nitrogen", value: 35, color: "hsl(158, 45%, 42%)" },
  { name: "Phosphorus", value: 25, color: "hsl(195, 60%, 45%)" },
  { name: "Potassium", value: 20, color: "hsl(42, 80%, 55%)" },
  { name: "Organic Matter", value: 20, color: "hsl(30, 40%, 55%)" },
];

const MOCK_NDVI_TREND = [
  { month: "Jan", ndvi: 0.3 }, { month: "Feb", ndvi: 0.35 },
  { month: "Mar", ndvi: 0.5 }, { month: "Apr", ndvi: 0.65 },
  { month: "May", ndvi: 0.7 }, { month: "Jun", ndvi: 0.6 },
  { month: "Jul", ndvi: 0.75 }, { month: "Aug", ndvi: 0.8 },
  { month: "Sep", ndvi: 0.7 }, { month: "Oct", ndvi: 0.55 },
  { month: "Nov", ndvi: 0.4 }, { month: "Dec", ndvi: 0.32 },
];

const MOCK_CROPS = [
  { name: "Rice", price: "₹28-32/kg", confidence: 92, reasons: ["Suits wet soil", "High demand forecast", "Good NDVI in region"], icon: Leaf },
  { name: "Sugarcane", price: "₹3.5-4/kg", confidence: 85, reasons: ["High humidity tolerance", "Strong mandi prices", "Government support"], icon: TrendingUp },
  { name: "Wheat", price: "₹24-28/kg", confidence: 78, reasons: ["Winter crop rotation fit", "Stable prices", "Low salt tolerance match"], icon: BarChart3 },
];

const ROTATION_PLAN = [
  { quarter: "Q1 (Jan-Mar)", crop: "Wheat", reason: "Rabi season optimal" },
  { quarter: "Q2 (Apr-Jun)", crop: "Green Manure / Moong", reason: "Nitrogen fixing, soil recovery" },
  { quarter: "Q3 (Jul-Sep)", crop: "Rice", reason: "Kharif season, monsoon support" },
  { quarter: "Q4 (Oct-Dec)", crop: "Mustard", reason: "Low water need, soil enrichment" },
];

const WEATHER_DATA = [
  { label: "Humidity", value: "72%", icon: Droplets },
  { label: "Sunlight", value: "6.5 hrs/day", icon: Sun },
  { label: "Temperature", value: "28°C avg", icon: Thermometer },
];

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (q?: string) => {
    const finalQuery = q || query;
    if (!finalQuery.trim()) return;
    setQuery(finalQuery);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/60 backdrop-blur-md">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Satellite className="w-5 h-5 text-primary" />
          <span className="font-heading font-bold text-lg">Orbital Nexus</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Greater Noida, UP</span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar - Results */}
        <AnimatePresence>
          {hasResult && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full lg:w-[420px] border-r border-border bg-card/40 overflow-y-auto"
            >
              <div className="p-5 space-y-6">
                {/* Crop Recommendations */}
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5" /> Top Crop Recommendations
                  </h3>
                  <div className="space-y-3">
                    {MOCK_CROPS.map((crop, i) => (
                      <motion.div key={crop.name} initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                        className="glass rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-heading font-semibold">{crop.name}</h4>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {crop.confidence}% match
                          </span>
                        </div>
                        <p className="text-sm font-medium text-accent mb-2">Predicted: {crop.price}</p>
                        <ul className="space-y-1">
                          {crop.reasons.map(r => (
                            <li key={r} className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-primary" />{r}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Rotation Plan */}
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5" /> Yearly Rotation Plan
                  </h3>
                  <div className="glass rounded-xl p-4 space-y-3">
                    {ROTATION_PLAN.map((item, i) => (
                      <div key={item.quarter} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg gradient-hero-bg flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                          Q{i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.crop}</p>
                          <p className="text-xs text-muted-foreground">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-primary/80 mt-2 flex items-center gap-1">
                    <Leaf className="w-3 h-3" /> Rotate crops to maintain soil fertility & prevent nutrient loss
                  </p>
                </div>

                {/* Weather */}
                <div>
                  <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Current Conditions</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {WEATHER_DATA.map(w => (
                      <div key={w.label} className="glass rounded-xl p-3 text-center">
                        <w.icon className="w-5 h-5 mx-auto mb-1 text-accent" />
                        <p className="text-xs text-muted-foreground">{w.label}</p>
                        <p className="text-sm font-semibold">{w.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center - Map + Charts */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {hasResult ? (
            <div className="flex-1 p-5 space-y-5">
              {/* Map placeholder */}
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl h-64 lg:h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative text-center">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-3 animate-float" />
                  <p className="font-heading font-semibold">Greater Noida Region</p>
                  <p className="text-sm text-muted-foreground">NDVI Fertility Heatmap • Sentinel-2 Data</p>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-sm bg-destructive/60" />Low</div>
                    <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-sm bg-gold/60" />Medium</div>
                    <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-sm bg-primary/60" />High</div>
                  </div>
                </div>
              </motion.div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-5 md:col-span-2 lg:col-span-1">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Price Trends (₹/kg)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={MOCK_PRICE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 12%, 88%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="rice" fill="hsl(158, 45%, 42%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="wheat" fill="hsl(195, 60%, 45%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="potato" fill="hsl(42, 80%, 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Soil Composition</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={MOCK_SOIL_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                        paddingAngle={3} dataKey="value">
                        {MOCK_SOIL_DATA.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {MOCK_SOIL_DATA.map(d => (
                      <span key={d.name} className="text-[10px] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">NDVI Trend (12mo)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={MOCK_NDVI_TREND}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 12%, 88%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ndvi" stroke="hsl(158, 45%, 42%)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-lg">
                <div className="w-20 h-20 rounded-3xl gradient-hero-bg flex items-center justify-center mx-auto mb-6 shadow-glow animate-pulse-glow">
                  <Satellite className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">What would you like to grow?</h2>
                <p className="text-muted-foreground mb-8">
                  Ask about crops, prices, soil analysis, or rotation plans for your region.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => handleSubmit(s)}
                      className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors text-left">
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Prompt bar */}
          <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
            {loading && (
              <div className="max-w-2xl mx-auto mb-3">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }} className="h-full gradient-hero-bg rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 text-center">Fusing satellite, soil & market data...</p>
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              className="max-w-2xl mx-auto flex gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Ask about crops, prices, or rotation plans..."
                className="prompt-input flex-1" disabled={loading} />
              <button type="submit" disabled={loading || !query.trim()}
                className="w-12 h-12 rounded-xl gradient-hero-bg flex items-center justify-center text-primary-foreground hover-lift disabled:opacity-40 transition-all shrink-0">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
