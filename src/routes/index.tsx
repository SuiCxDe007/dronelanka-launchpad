import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DroneLanka — Drone Parts, Accessories & Repairs in Sri Lanka" },
      { name: "description", content: "Sri Lanka's home for drones, parts, accessories and expert repairs. Built by pilots, for pilots." },
      { property: "og:title", content: "DroneLanka — Drones. Parts. Repairs." },
      { property: "og:description", content: "Sri Lanka's home for drones, parts, accessories and expert repairs." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain-bg noise min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <DroneSelector />
      <Categories />
      <Products />
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
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="/" className="font-display text-2xl tracking-tight">
          DRONE<span className="text-accent">·</span>LANKA
        </a>
        <nav className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <a href="#drones" className="hover:text-foreground transition">Drones</a>
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col pt-20">
      <motion.div style={{ scale, opacity, y }} className="relative z-10 px-6 md:px-10 max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent mb-4"
        >
          ◉ Colombo · Sri Lanka · Est. 2019
        </motion.p>

        <h1 className="font-display text-foreground text-[18vw] md:text-[13vw] leading-[0.82]">
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
          className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="max-w-xl font-display text-2xl md:text-4xl leading-[1.05] text-foreground/90">
            Sri Lanka's obsession with everything that flies. <span className="text-accent italic">Drones, parts, accessories</span> and surgical repairs.
          </p>
          <div className="flex gap-3 shrink-0">
            <a href="#shop" className="font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-4 rounded-full hover:bg-accent transition">
              Shop the store
            </a>
            <a href="#repairs" className="font-mono text-xs uppercase tracking-widest border border-border px-6 py-4 rounded-full hover:border-accent hover:text-accent transition">
              Book a repair
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }}>
        <Marquee />
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
  const items = ["DRONES", "FRAMES", "MOTORS", "PROPS", "ESCs", "FLIGHT CONTROLLERS", "BATTERIES", "GIMBALS", "GOGGLES", "ANTENNAS", "CAMERAS"];
  return (
    <div className="border-y border-border py-5 overflow-hidden bg-background/60 backdrop-blur-sm">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap font-display text-4xl md:text-6xl"
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

function DroneSelector() {
  const drones = [
    { name: "DJI Mavic 3 Pro", tag: "Cinematic flagship", spec: "4/3 CMOS · 43min" },
    { name: "DJI Air 3S", tag: "All-rounder", spec: "Dual cam · 45min" },
    { name: "DJI Mini 4 Pro", tag: "Sub-249g", spec: "Tri-directional sensing" },
    { name: "Autel EVO Lite+", tag: "Low-light king", spec: "1\" CMOS · 40min" },
    { name: "DJI Avata 2", tag: "Cinewhoop FPV", spec: "Immersive · O4" },
    { name: "GEPRC Mark5", tag: "5\" Freestyle", spec: "Analog/HD ready" },
    { name: "iFlight Nazgul Evoque", tag: "Long range", spec: "Crossfire · 6S" },
    { name: "Skydio 2+", tag: "Autonomous", spec: "AI tracking" },
    { name: "Custom Cinewhoop", tag: "Built in Colombo", spec: "Made to order" },
  ];

  const N = drones.length;
  const STEP = 28; // degrees between items on the wheel
  const rotation = useMotionValue(0);
  const smooth = useSpring(rotation, { stiffness: 120, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startRot = useRef(0);

  useMotionValueEvent(smooth, "change", (v) => {
    const idx = ((Math.round(-v / STEP) % N) + N) % N;
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const snap = () => {
    const v = rotation.get();
    const target = Math.round(v / STEP) * STEP;
    animate(rotation, target, { type: "spring", stiffness: 180, damping: 24 });
  };

  // Wheel scroll inside the selector area
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      // only hijack when pointer is over the wheel zone
      e.preventDefault();
      rotation.set(rotation.get() - e.deltaY * 0.4);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // debounce snap
        clearTimeout((onWheel as any)._t);
        (onWheel as any)._t = setTimeout(snap, 120);
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rotation]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    startRot.current = rotation.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dy = e.clientY - startY.current;
    rotation.set(startRot.current - dy * 0.6);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    snap();
  };

  const selectIndex = (i: number) => {
    const current = rotation.get();
    // find shortest path target
    const desired = -i * STEP;
    const diff = ((desired - current) % (STEP * N) + STEP * N) % (STEP * N);
    const signed = diff > (STEP * N) / 2 ? diff - STEP * N : diff;
    animate(rotation, current + signed, { type: "spring", stiffness: 160, damping: 22 });
  };

  const activeDrone = drones[active];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden border-y border-border bg-card/30">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto mb-16 md:mb-24 flex items-end justify-between gap-8 flex-wrap">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">◉ Pick your machine</p>
          <h2 className="font-display text-6xl md:text-9xl leading-[0.85]">
            THE<br/><span className="text-accent italic">fleet.</span>
          </h2>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground max-w-xs">
          [ scroll · drag · tap a name to spin the wheel ]
        </p>
      </div>

      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-[640px] md:h-[720px] select-none touch-none"
      >
        {/* Half circle wheel anchored to left edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-[55vw] md:-left-[42vw] w-[110vw] md:w-[84vw] aspect-square">
          {/* ring border */}
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-[6%] rounded-full border border-border/60" />
          <div className="absolute inset-[12%] rounded-full border border-dashed border-border/40" />

          {/* selector indicator at 3 o'clock (right edge of circle) */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 flex items-center gap-3 z-20">
            <span className="h-px w-12 bg-accent" />
            <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(0,0,0,0.04)]" />
          </div>

          <motion.div style={{ rotate: smooth }} className="absolute inset-0">
            {drones.map((d, i) => {
              const angle = i * STEP;
              const isActive = i === active;
              return (
                <div
                  key={d.name}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -50%)`,
                    width: "50%",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => selectIndex(i)}
                    className="w-full flex items-center justify-end pr-[3%] group"
                  >
                    <CounterRotate angle={angle} rotation={smooth}>
                      <span
                        className={`font-display whitespace-nowrap transition-all duration-300 ${
                          isActive
                            ? "text-foreground text-3xl md:text-5xl"
                            : "text-muted-foreground/50 hover:text-foreground/70 text-xl md:text-2xl"
                        }`}
                      >
                        {d.name}
                      </span>
                    </CounterRotate>
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Active drone display */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-16 w-[55%] md:w-[48%] max-w-[640px] z-10">
          <motion.div
            key={activeDrone.name}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square bg-foreground rounded-2xl overflow-hidden">
              {/* placeholder 3D-ish drone */}
              <div className="absolute inset-0 grain-bg opacity-30" />
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-display text-[8rem] md:text-[12rem] text-background/10 leading-none">
                  {String(active + 1).padStart(2, "0")}
                </span>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/40">
                  [ 3D preview · placeholder ]
                </span>
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-background/60">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-2">{activeDrone.tag}</p>
                <h3 className="font-display text-3xl md:text-5xl leading-tight">{activeDrone.name}</h3>
                <p className="font-mono text-xs text-muted-foreground mt-2">{activeDrone.spec}</p>
              </div>
              <a
                href="https://dronelanka.com"
                className="font-mono text-xs uppercase tracking-widest bg-accent text-accent-foreground px-5 py-3 rounded-full hover:scale-105 transition shrink-0"
              >
                View →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CounterRotate({ angle, rotation, children }: { angle: number; rotation: any; children: React.ReactNode }) {
  const counter = useTransform(rotation, (r: number) => -(angle + r));
  return <motion.span style={{ rotate: counter, display: "inline-block" }}>{children}</motion.span>;
}

function Categories() {
  const cats = [
    { id: "01", title: "Drones", desc: "DJI, Autel, Skydio, FPV freestyle, cinewhoops and custom builds. Brand new and certified pre-loved.", count: "60+ models" },
    { id: "02", title: "Parts", desc: "Frames, motors, ESCs, FCs, props. OEM and aftermarket — for every platform.", count: "240+ SKUs" },
    { id: "03", title: "Accessories", desc: "Batteries, chargers, goggles, controllers, antennas, ND filters, carry cases.", count: "180+ items" },
    { id: "04", title: "Repairs", desc: "Crash repairs, gimbal calibration, board-level soldering, firmware recovery.", count: "Avg 48h" },
  ];
  return (
    <section id="drones" className="py-32 px-6 md:px-10 max-w-[1600px] mx-auto">
      <div className="mb-20 flex items-end justify-between gap-8">
        <h2 className="font-display text-6xl md:text-9xl leading-[0.85]">
          WHAT WE<br/><span className="text-accent italic">do.</span>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">[ 04 — categories ]</p>
      </div>

      <div className="grid gap-px bg-border">
        {cats.map((c, i) => (
          <CategoryRow key={c.id} {...c} index={i} />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({ id, title, desc, count, index }: { id: string; title: string; desc: string; count: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-background hover:bg-card transition-colors p-8 md:p-12 grid md:grid-cols-12 gap-6 items-center cursor-pointer overflow-hidden"
    >
      {/* sweep accent */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
      />
      {/* ghost title */}
      <span
        aria-hidden
        className="absolute -right-6 -bottom-10 font-display text-[14rem] md:text-[18rem] text-accent/0 group-hover:text-accent/[0.06] transition-colors duration-500 pointer-events-none leading-none"
      >
        {title}
      </span>

      <div className="md:col-span-1 font-mono text-xs text-muted-foreground relative">{id}</div>
      <h3 className="md:col-span-4 font-display text-5xl md:text-7xl group-hover:text-accent transition-colors relative">
        <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-3">
          {title}
        </span>
      </h3>
      <p className="md:col-span-5 text-muted-foreground text-lg max-w-md relative">{desc}</p>
      <div className="md:col-span-2 font-mono text-xs uppercase tracking-widest text-right text-accent relative">
        <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
          {count} →
        </span>
      </div>
    </motion.div>
  );
}

function Products() {
  const products = [
    { sku: "DL-001", name: "DJI Mavic 3 Pro", cat: "Drone", price: "Rs 745,000", tag: "Flagship", swatch: "bg-foreground" },
    { sku: "DL-014", name: "T-Motor F90 2207", cat: "Motor", price: "Rs 12,500", tag: "FPV", swatch: "bg-accent" },
    { sku: "DL-029", name: "GEPRC Mark5 Frame", cat: "Frame", price: "Rs 38,900", tag: "5\" Freestyle", swatch: "bg-foreground" },
    { sku: "DL-047", name: "Tattu R-Line 1550mAh 6S", cat: "Battery", price: "Rs 9,800", tag: "100C", swatch: "bg-accent" },
    { sku: "DL-052", name: "DJI Goggles 2", cat: "FPV Gear", price: "Rs 198,000", tag: "Micro-OLED", swatch: "bg-foreground" },
    { sku: "DL-068", name: "HQProp 5.1×4.6×3", cat: "Propellers", price: "Rs 1,450", tag: "Set of 4", swatch: "bg-accent" },
    { sku: "DL-073", name: "RadioMaster TX16S MKII", cat: "Controller", price: "Rs 84,000", tag: "ELRS", swatch: "bg-foreground" },
    { sku: "DL-091", name: "GoPro Hero 12 Black", cat: "Camera", price: "Rs 165,000", tag: "5.3K60", swatch: "bg-accent" },
  ];

  return (
    <section id="shop" className="relative py-32 px-6 md:px-10 border-y border-border bg-card/40">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">◉ The shelf</p>
            <h2 className="font-display text-6xl md:text-9xl leading-[0.85]">
              FEATURED<br/><span className="text-accent italic">drops.</span>
            </h2>
          </div>
          <a href="https://dronelanka.com" className="font-mono text-xs uppercase tracking-widest border border-foreground px-6 py-4 rounded-full hover:bg-foreground hover:text-background transition">
            Shop all →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {products.map((p, i) => (
            <ProductCard key={p.sku} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ sku, name, cat, price, tag, swatch, index }: { sku: string; name: string; cat: string; price: string; tag: string; swatch: string; index: number }) {
  return (
    <motion.a
      href="https://dronelanka.com"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-background hover:bg-card transition-colors p-6 flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
        <span>{sku}</span>
        <span className="text-accent">{tag}</span>
      </div>

      <div className={`relative aspect-square ${swatch} overflow-hidden mb-6`}>
        <motion.span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-[6rem] text-background/10 group-hover:text-background/20 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          {cat.charAt(0)}
        </motion.span>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-background/70">
          {cat}
        </div>
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-accent origin-bottom"
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono text-xs uppercase tracking-widest text-accent-foreground">
          View →
        </span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors">
        {name}
      </h3>
      <div className="mt-auto pt-6 flex items-center justify-between font-mono text-xs">
        <span className="text-foreground">{price}</span>
        <span className="text-muted-foreground uppercase tracking-widest">In stock</span>
      </div>
    </motion.a>
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
