import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DroneLanka — Drone Parts, Accessories & Repairs in Sri Lanka" },
      { name: "description", content: "Sri Lanka's home for drone parts, accessories and expert repairs. Built by pilots, for pilots." },
      { property: "og:title", content: "DroneLanka — Parts. Accessories. Repairs." },
      { property: "og:description", content: "Sri Lanka's home for drone parts, accessories and expert repairs." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain-bg noise min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Categories />
      <Repairs />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl tracking-tight">
          DRONE<span className="text-accent">·</span>LANKA
        </a>
        <nav className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <a href="#parts" className="hover:text-foreground transition">Parts</a>
          <a href="#accessories" className="hover:text-foreground transition">Accessories</a>
          <a href="#repairs" className="hover:text-foreground transition">Repairs</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <a href="#shop" className="text-xs font-mono uppercase tracking-widest bg-accent text-accent-foreground px-4 py-2 rounded-full hover:scale-105 transition">
          Shop →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex items-center pt-24">
      <motion.div style={{ scale, opacity, y }} className="relative z-10 px-6 md:px-10 max-w-[1600px] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8"
        >
          ◉ Colombo · Sri Lanka · Est. 2019
        </motion.p>

        <h1 className="font-display text-foreground text-[18vw] md:text-[14vw] leading-[0.82]">
          <WordRise delay={0.1}>FLY.</WordRise>
          <WordRise delay={0.25}>CRASH.</WordRise>
          <WordRise delay={0.4}>
            <span className="text-accent italic">REPAIR.</span>
          </WordRise>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="max-w-md text-lg md:text-xl text-muted-foreground text-balance">
            Sri Lanka's obsession with everything that flies. Parts, accessories and surgical repairs for every drone you own — or every drone you crash.
          </p>
          <div className="flex gap-3">
            <a href="#shop" className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-4 rounded-full hover:bg-accent transition">
              Shop the store
            </a>
            <a href="#repairs" className="font-mono text-xs uppercase tracking-widest border border-border px-6 py-4 rounded-full hover:border-accent hover:text-accent transition">
              Book a repair
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function WordRise({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Marquee() {
  const items = ["FRAMES", "MOTORS", "PROPS", "ESCs", "FLIGHT CONTROLLERS", "BATTERIES", "GIMBALS", "GOGGLES", "ANTENNAS", "CAMERAS"];
  return (
    <div className="border-y border-border py-6 overflow-hidden bg-background">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap font-display text-5xl md:text-7xl"
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className={i % 3 === 0 ? "text-accent" : ""}>{it}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const scale = useTransform(smooth, [0, 0.5, 1], [0.7, 1, 1.15]);

  const text = "We don't sell drones. We keep them in the sky. Every part hand-picked, every solder joint inspected, every repair tested before it leaves the bench.";
  const words = text.split(" ");

  return (
    <section ref={ref} className="py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
      <motion.p style={{ scale }} className="font-display text-4xl md:text-7xl text-balance leading-[1] origin-center">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.02 }}
            className="inline-block mr-[0.25em]"
          >
            {w === "sky." || w === "bench." ? <span className="text-accent italic">{w}</span> : w}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}

function Categories() {
  const cats = [
    { id: "01", title: "Parts", desc: "Frames, motors, ESCs, FCs, props. OEM and aftermarket — for DJI, Autel, FPV and custom builds.", count: "240+ SKUs" },
    { id: "02", title: "Accessories", desc: "Batteries, chargers, goggles, controllers, antennas, ND filters, carry cases.", count: "180+ items" },
    { id: "03", title: "Repairs", desc: "Crash repairs, gimbal calibration, board-level soldering, firmware recovery. Turnaround in 48–72h.", count: "Avg 48h" },
  ];
  return (
    <section id="parts" className="py-32 px-6 md:px-10 max-w-[1600px] mx-auto">
      <div className="mb-20 flex items-end justify-between gap-8">
        <h2 className="font-display text-6xl md:text-9xl leading-[0.85]">
          WHAT WE<br/><span className="text-accent italic">do.</span>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">[ 03 — categories ]</p>
      </div>

      <div className="grid gap-px bg-border">
        {cats.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.005 }}
            className="group bg-background hover:bg-card transition-colors p-8 md:p-12 grid md:grid-cols-12 gap-6 items-center cursor-pointer"
          >
            <div className="md:col-span-1 font-mono text-xs text-muted-foreground">{c.id}</div>
            <h3 className="md:col-span-4 font-display text-5xl md:text-7xl group-hover:text-accent transition-colors">
              {c.title}
            </h3>
            <p className="md:col-span-5 text-muted-foreground text-lg max-w-md">{c.desc}</p>
            <div className="md:col-span-2 font-mono text-xs uppercase tracking-widest text-right text-accent">
              {c.count} →
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Repairs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const steps = [
    { n: "01", t: "Diagnose", d: "Free inspection. We tell you what's actually wrong." },
    { n: "02", t: "Quote", d: "Honest pricing. No surprise add-ons at pickup." },
    { n: "03", t: "Repair", d: "Board-level soldering, gimbal calibration, firmware." },
    { n: "04", t: "Test fly", d: "Every drone tested before it leaves our bench." },
  ];

  return (
    <section id="repairs" ref={ref} className="relative py-40 px-6 md:px-10 overflow-hidden border-y border-border">
      <motion.div
        style={{ scale, rotate }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <span className="font-display text-[40vw] text-accent/5 leading-none whitespace-nowrap">
          REPAIRS
        </span>
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">◉ The bench</p>
        <h2 className="font-display text-6xl md:text-8xl mb-16 max-w-4xl text-balance">
          You crash it.<br/>
          <span className="text-accent italic">We fix it</span> properly.
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t border-border pt-6"
            >
              <div className="font-mono text-xs text-accent mb-4">{s.n} / 04</div>
              <h3 className="font-display text-3xl mb-3">{s.t}</h3>
              <p className="text-muted-foreground text-sm">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "2400+", l: "Drones repaired" },
    { n: "48h", l: "Avg turnaround" },
    { n: "420+", l: "SKUs in stock" },
    { n: "6yr", l: "On the bench" },
  ];
  return (
    <section className="py-32 px-6 md:px-10 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display text-6xl md:text-8xl text-accent">{s.n}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-3">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-40 px-6 md:px-10 max-w-[1600px] mx-auto text-center">
      <motion.h2
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[18vw] md:text-[14vw] leading-[0.82]"
      >
        GET<br/>
        <span className="text-accent italic">AIRBORNE.</span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-12 flex flex-wrap gap-4 justify-center"
      >
        <a href="https://dronelanka.com" className="font-mono text-xs uppercase tracking-widest bg-accent text-accent-foreground px-8 py-5 rounded-full hover:scale-105 transition">
          Visit dronelanka.com
        </a>
        <a href="tel:+94" className="font-mono text-xs uppercase tracking-widest border border-border px-8 py-5 rounded-full hover:border-accent hover:text-accent transition">
          Call the workshop
        </a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <div className="font-display text-xl text-foreground">DRONE<span className="text-accent">·</span>LANKA</div>
        <div>© 2026 — Built in Colombo</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent">Instagram</a>
          <a href="#" className="hover:text-accent">YouTube</a>
          <a href="#" className="hover:text-accent">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
