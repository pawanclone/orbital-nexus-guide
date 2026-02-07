import { Satellite, Leaf, TrendingUp, Map, BarChart3, Sun } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const }
  }),
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Satellite view of farmland" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-space/80 via-space/60 to-background" />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8">
          <Satellite className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary-foreground/80">Hyperspace Innovation Hackathon 2026</span>
        </motion.div>
        <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
          Orbital <span className="gradient-text">Nexus</span>
        </motion.h1>
        <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
          className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 font-light">
          AI-powered guided farming platform fusing multi-satellite data with soil, weather & market intelligence
          to help Indian farmers make smarter crop decisions.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("/dashboard")}
            className="gradient-hero-bg px-8 py-3.5 rounded-xl text-primary-foreground font-semibold text-lg shadow-glow hover-lift">
            Get Started →
          </button>
          <a href="#problem"
            className="px-8 py-3.5 rounded-xl border border-primary-foreground/20 text-primary-foreground/80 font-medium hover:bg-primary-foreground/5 transition-colors">
            Learn More
          </a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

const ProblemSection = () => (
  <section id="problem" className="section-padding bg-background">
    <div className="max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <span className="text-sm font-semibold text-accent uppercase tracking-widest">The Challenge</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-5">Agriculture in Crisis</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          140M+ Indian farmers lose billions annually due to siloed data, supply-demand mismatches, and unpredictable markets.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: TrendingUp, title: "Price Crashes", desc: "Overproduction floods markets — potato prices dropped 50% last season, devastating small farmers.", color: "text-destructive" },
          { icon: Map, title: "Siloed Data", desc: "Satellite imagery, soil data, and mandi prices exist in isolation — inaccessible to those who need it most.", color: "text-accent" },
          { icon: Leaf, title: "Soil Degradation", desc: "Without rotation guidance, continuous mono-cropping depletes fertility, reducing yields 20-30% over time.", color: "text-primary" },
        ].map((item, i) => (
          <motion.div key={item.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="stat-card text-center group">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <item.icon className={`w-7 h-7 ${item.color}`} />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="section-padding bg-muted/30">
    <div className="max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-widest">Our Solution</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-5">Intelligent Fusion Engine</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          We combine multi-satellite data (Sentinel, Landsat, ISRO) with soil, weather, and market intelligence into one actionable dashboard.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Satellite, title: "Satellite Fusion", desc: "NDVI & land-use analysis from multiple sources" },
          { icon: Sun, title: "Weather + Soil", desc: "Humidity, sunlight, salt content factor analysis" },
          { icon: BarChart3, title: "Price Prediction", desc: "Historical mandi trends + demand forecasting" },
          { icon: Leaf, title: "Rotation Plans", desc: "Sustainability-driven crop rotation guidance" },
        ].map((item, i) => (
          <motion.div key={item.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass rounded-2xl p-6 hover-lift">
            <div className="w-12 h-12 rounded-xl gradient-hero-bg flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BusinessSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-5xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
        <span className="text-sm font-semibold text-gold uppercase tracking-widest">Business Model</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-5">Freemium for Everyone</h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
        className="grid md:grid-cols-2 gap-6">
        <div className="stat-card border-2 border-primary/20">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Free Tier</span>
          <h3 className="text-2xl font-heading font-bold mt-3 mb-4">Basic Insights</h3>
          <ul className="space-y-3 text-muted-foreground">
            {["Soil type analysis", "Top 3 crop recommendations", "Basic price trends", "Sustainability tips"].map(f => (
              <li key={f} className="flex items-center gap-2"><Leaf className="w-4 h-4 text-primary" />{f}</li>
            ))}
          </ul>
        </div>
        <div className="stat-card border-2 border-gold/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-bl-lg">COMING SOON</div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest">Premium</span>
          <h3 className="text-2xl font-heading font-bold mt-3 mb-4">Full Intelligence</h3>
          <ul className="space-y-3 text-muted-foreground">
            {["Detailed market analytics", "Geopolitical risk alerts", "Custom rotation plans", "Partner distribution network"].map(f => (
              <li key={f} className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" />{f}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section className="section-padding gradient-space-bg">
    <div className="max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
        <span className="text-sm font-semibold text-primary uppercase tracking-widest">Impact</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-5 text-space-foreground">Empowering Sustainable Agriculture</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { stat: "140M+", label: "Farmers Addressable" },
          { stat: "20-30%", label: "Yield Improvement" },
          { stat: "50%", label: "Price Loss Reduction" },
          { stat: "3+", label: "Satellite Sources Fused" },
        ].map((item, i) => (
          <motion.div key={item.label} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center p-6">
            <p className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">{item.stat}</p>
            <p className="text-space-foreground/60 text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-space px-6 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Satellite className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-lg text-space-foreground">Orbital Nexus</span>
        </div>
        <p className="text-space-foreground/50 text-sm text-center">
          Built with 💚 at Hyperspace Innovation Hackathon 2026 — Team: Anand, Dheershikha, Harsh, Manvendra, Mansi
        </p>
        <div className="flex gap-4 text-space-foreground/40 text-sm">
          <span>@OrbitalNexusIN</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BusinessSection />
      <ImpactSection />
      <Footer />
    </div>
  );
}
