import { useState } from "react";

// ⬇️ 구글폼 링크. 폼 주소 바뀌면 이 한 줄만 고치면 전체 버튼이 따라 바뀜.
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSelJ-7i3LZ2wf1vKZ_6TmMQgqf8_xDccEDgW-a6mhQAo6Ukgw/viewform";

const COLORS = {
  bg: "#0B0B1A",
  bgCard: "#12122A",
  bgCardHover: "#1A1A3A",
  accent: "#C4A7E7",
  accentGlow: "rgba(196,167,231,0.3)",
  gold: "#E8C872",
  goldSoft: "rgba(232,200,114,0.15)",
  pink: "#E8879C",
  pinkSoft: "rgba(232,135,156,0.12)",
  teal: "#7EC8B8",
  tealSoft: "rgba(126,200,184,0.12)",
  text: "#E8E4F0",
  textMuted: "#9B94A7",
  textDim: "#6B6580",
  border: "rgba(196,167,231,0.12)",
  borderHover: "rgba(196,167,231,0.25)",
};

const concerns = [
  { id: "love", emoji: "💕", label: "Love & relationships", sub: "Their feelings, staying or leaving, compatibility" },
  { id: "purpose", emoji: "🔮", label: "Life purpose & direction", sub: "Why am I here? Breaking patterns, spiritual growth" },
  { id: "career", emoji: "💼", label: "Career & decisions", sub: "Next move, crossroads, timing" },
  { id: "monthly", emoji: "🌙", label: "Monthly guidance", sub: "Ongoing cosmic weather for your chart" },
];

const allProducts = [
  {
    id: "quick-check",
    name: "Quick-Check",
    price: 9,
    time: "24hr",
    pages: "Email",
    cards: "1 card",
    desc: "One yes/no question. One card. One clear answer.",
    tags: ["love", "career", "purpose"],
    tier: "try",
    badge: null,
  },
  {
    id: "quick-glimpse",
    name: "Quick Cosmic Glimpse",
    price: 25,
    time: "3 days",
    pages: "3pg PDF",
    cards: "3 cards + chart",
    desc: "Birth chart snapshot with a focused 3-card answer to your specific question.",
    tags: ["career", "purpose"],
    tier: "quick",
    badge: null,
  },
  {
    id: "whats-on-their-mind",
    name: "What's On Their Mind",
    price: 35,
    time: "3 days",
    pages: "4pg PDF",
    cards: "Symbolon 3+1",
    desc: "What are they really feeling? A Symbolon deep-read into someone's true thoughts about you.",
    tags: ["love"],
    tier: "quick",
    badge: "new",
  },
  {
    id: "cosmic-clarity",
    name: "Cosmic Clarity",
    price: 49,
    time: "5 days",
    pages: "5pg PDF",
    cards: "5 cards + full chart",
    desc: "Why does this pattern keep repeating? Full chart analysis with tarot guidance for your crossroads.",
    tags: ["career", "purpose", "love"],
    tier: "core",
    badge: "popular",
  },
  {
    id: "second-half",
    name: "The Second Half: Eclipse-to-Year-End Map",
    price: 79,
    launchPrice: 69,
    time: "7 days",
    pages: "16-18pg PDF",
    cards: "19 cards + chart",
    desc: "The Aug 12 eclipse resets one area of your life. This maps which one — and how the final 5 months of 2026 unfold for you, month by month.",
    tags: ["love", "purpose", "career", "monthly"],
    tier: "deep",
    badge: "new",
  },
  {
    id: "toxic-pattern",
    name: "Toxic Pattern Breaker",
    price: 69,
    time: "5-7 days",
    pages: "7pg PDF",
    cards: "Symbolon 4+1 + chart",
    desc: "Why you stayed, why it broke, and how to never repeat it. Deep Symbolon psychology for toxic cycles.",
    tags: ["love"],
    tier: "deep",
    badge: null,
  },
  {
    id: "deep-dive",
    name: "Deep Dive: Stars + Cards",
    price: 85,
    time: "7 days",
    pages: "10pg PDF",
    cards: "7-10 cards + complete chart",
    desc: "The full cosmic download. Every planet, every house, 3-month forecast, week-by-week action plan.",
    tags: ["career", "purpose", "love"],
    tier: "deep",
    badge: null,
  },
  {
    id: "souls-blueprint",
    name: "Soul's Blueprint",
    price: 85,
    time: "7 days",
    pages: "10pg PDF",
    cards: "7 cards + soul chart",
    desc: "Your soul's mission, karmic patterns, past-life cycles, and the spiritual gifts you're here to share.",
    tags: ["purpose"],
    tier: "deep",
    badge: null,
  },
  {
    id: "compatibility",
    name: "Ultimate Compatibility",
    price: 89,
    time: "7 days",
    pages: "8pg PDF",
    cards: "7 cards + 2 charts",
    desc: "Both charts analyzed. Where you align, where you clash, and the honest verdict: stay or let go.",
    tags: ["love"],
    tier: "deep",
    badge: null,
  },
  {
    id: "symbolon-depth",
    name: "Symbolon Depth Psychology",
    price: 119,
    time: "7-10 days",
    pages: "12pg PDF",
    cards: "Symbolon 5+1 + 3-axis fusion",
    desc: "A reading no other practitioner offers. European depth psychology cards × your birth chart × today's sky.",
    tags: ["love", "purpose", "career"],
    tier: "premium",
    badge: "exclusive",
  },
  {
    id: "membership",
    name: "Monthly Cosmic Membership",
    price: 39,
    priceLabel: "/month",
    time: "Monthly",
    pages: "5pg PDF/mo",
    cards: "4 cards + transits",
    desc: "Your personalized monthly roadmap. Week-by-week timing, action days, and one email Q&A included.",
    tags: ["monthly"],
    tier: "subscription",
    badge: null,
  },
];

const seasonalProducts = [
  { name: "Venus Rx Love Audit", price: 69, window: "Oct-Nov 2026", event: "Venus retrograde through Scorpio → Libra", badge: null },
  { name: "2027 Year Ahead", price: 85, window: "December 2026", event: "Your complete 2027 cosmic roadmap", badge: null },
];

const testimonials = [
  { text: "Your words and the way you held my story with such sensitivity mean a lot to me. The messages in the cards brought both comfort and clarity.", name: "C.", type: "Deep Dive Client" },
  { text: "This provided clarity and insight! This all jives with my intuitive thoughts! I appreciate you so much for doing this!", name: "A.", type: "Cosmic Clarity Client" },
  { text: "This has given me more clarity and guidance to pursue my goals. I would take this as a green light from the universe.", name: "R.", type: "Cosmic Clarity Client" },
];

function Badge({ type }) {
  const styles = {
    new: { bg: COLORS.pinkSoft, color: COLORS.pink, label: "New" },
    popular: { bg: COLORS.goldSoft, color: COLORS.gold, label: "Most popular" },
    exclusive: { bg: "rgba(196,167,231,0.15)", color: COLORS.accent, label: "Only here" },
  };
  const s = styles[type];
  if (!s) return null;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.color, letterSpacing: "0.02em" }}>
      {s.label}
    </span>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const isSubscription = product.tier === "subscription";
  const isFeatured = product.id === "second-half";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? COLORS.bgCardHover : COLORS.bgCard,
        border: `1px solid ${hovered ? COLORS.borderHover : COLORS.border}`,
        borderRadius: 16,
        padding: "24px 26px",
        transition: "all 0.2s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        ...(isSubscription ? { borderColor: COLORS.teal, borderWidth: 2 } : {}),
        ...(isFeatured ? { borderColor: COLORS.pink, borderWidth: 2 } : {}),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: COLORS.text }}>{product.name}</span>
            {product.badge && <Badge type={product.badge} />}
          </div>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
          {product.launchPrice ? (
            <>
              <span style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold }}>${product.launchPrice}</span>
              <span style={{ fontSize: 13, color: COLORS.textDim, textDecoration: "line-through", marginLeft: 6 }}>${product.price}</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 22, fontWeight: 700, color: isSubscription ? COLORS.teal : COLORS.gold }}>${product.price}</span>
              {product.priceLabel && <span style={{ fontSize: 13, color: COLORS.textMuted }}>{product.priceLabel}</span>}
            </>
          )}
        </div>
      </div>

      {product.launchPrice && (
        <span style={{ fontSize: 12, color: COLORS.pink, fontWeight: 600 }}>Launch price through August 1 · then ${product.price}</span>
      )}

      <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6, margin: 0 }}>{product.desc}</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12, color: COLORS.textDim }}>
        <span>⏱ {product.time}</span>
        <span>📄 {product.pages}</span>
        <span>🃏 {product.cards}</span>
      </div>

      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 4,
          padding: "10px 0",
          textAlign: "center",
          textDecoration: "none",
          background: hovered
            ? isSubscription ? COLORS.teal : COLORS.gold
            : "transparent",
          color: hovered ? COLORS.bg : isSubscription ? COLORS.teal : COLORS.gold,
          border: `1px solid ${isSubscription ? COLORS.teal : COLORS.gold}`,
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {isSubscription ? "Join membership →" : "Book this reading →"}
      </a>
    </div>
  );
}

export default function TarotMilkyTeaShop() {
  const [activeConcern, setActiveConcern] = useState(null);

  const filtered = activeConcern
    ? allProducts.filter((p) => p.tags.includes(activeConcern))
    : allProducts.filter((p) => p.tier !== "subscription");

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Comfortaa', 'Nunito', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.03em", color: COLORS.accent }}>tarot milky tea</span>
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: COLORS.textMuted }}>
          <a href="#readings" style={{ color: "inherit", textDecoration: "none" }}>Readings</a>
          <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
          <a href="https://medium.com/@tarotmilkytea" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Blog ↗</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "80px 32px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <p style={{ fontSize: 13, letterSpacing: "0.2em", color: COLORS.textMuted, textTransform: "uppercase", marginBottom: 16, position: "relative" }}>
          Astrology + Tarot for absolute clarity
        </p>

        <h1 style={{
          fontSize: "clamp(48px, 8vw, 72px)",
          fontWeight: 700,
          lineHeight: 1.1,
          margin: "0 0 20px",
          position: "relative",
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.pink} 50%, ${COLORS.gold} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.01em",
        }}>
          tarot<br/>milky tea
        </h1>

        <p style={{ fontSize: 17, color: COLORS.textMuted, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.6, position: "relative", fontFamily: "system-ui, sans-serif" }}>
          Your birth chart is the map. Tarot is the path.<br/>
          Personalized readings by Charlotte — not algorithms, not AI-generated fluff.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative", flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("readings")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "14px 32px", background: COLORS.gold, color: COLORS.bg,
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Find your reading →
          </button>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{
            padding: "14px 32px", background: "transparent", color: COLORS.textMuted,
            border: `1px solid ${COLORS.border}`, borderRadius: 12, fontSize: 14,
            cursor: "pointer", fontFamily: "system-ui, sans-serif", textDecoration: "none",
            display: "inline-flex", alignItems: "center",
          }}>
            Try for $9
          </a>
        </div>

        {/* Trust bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48, fontSize: 12, color: COLORS.textDim, fontFamily: "system-ui, sans-serif", flexWrap: "wrap" }}>
          <span>✦ 50+ readings delivered</span>
          <span>✦ Clients in 8+ countries</span>
          <span>✦ 2 years on Medium</span>
        </div>
      </section>

      {/* ECLIPSE BANNER */}
      <section style={{ padding: "0 32px", maxWidth: 720, margin: "0 auto 20px" }}>
        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{
            padding: "18px 24px",
            background: `linear-gradient(135deg, ${COLORS.pinkSoft}, ${COLORS.goldSoft})`,
            border: `1px solid ${COLORS.borderHover}`,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                🌙 The August 12 eclipse is coming — where does it hit YOUR chart?
              </div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "system-ui, sans-serif" }}>
                The Second Half Map · launch price $69 through August 1
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold, whiteSpace: "nowrap" }}>Book now →</span>
          </div>
        </a>
      </section>

      {/* WHAT BRINGS YOU HERE */}
      <section id="readings" style={{ padding: "40px 32px 20px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>What brings you here?</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: COLORS.textMuted, marginBottom: 28, fontFamily: "system-ui, sans-serif" }}>
          Choose what you need clarity on — I'll show you the right reading.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {concerns.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConcern(activeConcern === c.id ? null : c.id)}
              style={{
                padding: "16px 14px",
                background: activeConcern === c.id ? COLORS.bgCardHover : COLORS.bgCard,
                border: `1px solid ${activeConcern === c.id ? COLORS.accent : COLORS.border}`,
                borderRadius: 14,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: "inherit" }}>{c.label}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 3, lineHeight: 1.4, fontFamily: "system-ui, sans-serif" }}>{c.sub}</div>
            </button>
          ))}
        </div>

        {activeConcern && (
          <button
            onClick={() => setActiveConcern(null)}
            style={{ display: "block", margin: "12px auto 0", fontSize: 12, color: COLORS.textMuted, background: "none", border: "none", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}
          >
            ✕ Show all readings
          </button>
        )}
      </section>

      {/* PRODUCT GRID */}
      <section style={{ padding: "20px 32px 60px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Subscription callout */}
        {!activeConcern && (
          <div style={{ marginTop: 20 }}>
            <ProductCard product={allProducts.find((p) => p.id === "membership")} />
          </div>
        )}
      </section>

      {/* SEASONAL */}
      <section style={{ padding: "40px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>✦ Seasonal specials</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20, fontFamily: "system-ui, sans-serif" }}>Limited readings aligned with 2026's most powerful celestial events.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {seasonalProducts.map((sp, i) => (
            <a key={i} href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                borderRadius: 14, borderLeft: `3px solid ${COLORS.gold}`,
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{sp.name}</span>
                    {sp.badge && <span style={{ fontSize: 10, background: COLORS.goldSoft, color: COLORS.gold, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{sp.badge}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 3, fontFamily: "system-ui, sans-serif" }}>{sp.window} — {sp.event}</div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.gold }}>${sp.price}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "50px 32px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24 }}>What people are saying</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: "20px 24px",
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              fontFamily: "system-ui, sans-serif",
            }}>
              <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.7, margin: "0 0 10px", fontStyle: "italic" }}>"{t.text}"</p>
              <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>— {t.name}, {t.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "50px 32px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "32px 30px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Hi, I'm Charlotte 🌙</h2>
          <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
            <p style={{ margin: "0 0 12px" }}>I help people at life's crossroads by combining astrology (your birth chart = WHO you are) with tarot (WHAT to do next).</p>
            <p style={{ margin: "0 0 12px" }}>Every reading is crafted specifically for you — I personally pull cards, analyze your chart with professional software, and write your PDF report with real insight, not copy-paste astrology.</p>
            <p style={{ margin: 0 }}>Active writer on <a href="https://medium.com/@tarotmilkytea" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.accent }}>Medium</a> · Follow on <a href="https://threads.net/@tarotmilkytea" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.accent }}>Threads</a></p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "50px 32px 40px", maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Frequently asked</h2>
        {[
          ["I don't know my exact birth time — can I still get a reading?", "Yes! For $9-$49 readings, we use 12:00 PM as default and you still get 90% of the insight. For $85+ readings, exact time is ideal but we can work without it. Check your birth certificate or call the hospital where you were born."],
          ["How do I pay?", "PayPal only. After you fill out the intake form, I'll send a secure PayPal invoice within 12 hours. Pay the invoice, and your reading begins immediately."],
          ["Is this real astrology or AI-generated?", "This is REAL, personalized astrology + tarot. I use professional software (Astro.com, TimePassages), personally pull cards for you, and use AI only as a research assistant — never as the reader."],
          ["Can I ask follow-up questions?", "Yes! Follow-ups are $11 per question via email. Monthly Membership members get 1 free Q&A per month."],
        ].map(([q, a], i) => (
          <details key={i} style={{
            marginBottom: 8,
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <summary style={{
              padding: "16px 20px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.text,
              fontFamily: "system-ui, sans-serif",
            }}>{q}</summary>
            <div style={{ padding: "0 20px 16px", fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, fontFamily: "system-ui, sans-serif" }}>{a}</div>
          </details>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: "center", padding: "50px 32px 80px" }}>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 8, fontFamily: "system-ui, sans-serif" }}>Still thinking about it?</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Start with $9. See what the stars say.</h2>
        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          padding: "16px 40px",
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.pink})`,
          color: "#fff",
          border: "none",
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          textDecoration: "none",
        }}>
          Book your reading →
        </a>
        <p style={{ fontSize: 12, color: COLORS.textDim, marginTop: 16, fontFamily: "system-ui, sans-serif" }}>
          tarotmilkytea@gmail.com · Not sure which reading? Email me, I'll help you choose.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: COLORS.textDim, fontFamily: "system-ui, sans-serif", flexWrap: "wrap", gap: 8 }}>
        <span>© 2026 Tarot Milky Tea by Charlotte</span>
        <span>Readings are for entertainment and spiritual guidance. Not a substitute for professional advice.</span>
      </footer>

      <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
