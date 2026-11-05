import { useEffect, useRef, useState } from 'react';
import { allProducts, concerns, seasonalProducts, testimonials } from './data';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSelJ-7i3LZ2wf1vKZ_6TmMQgqf8_xDccEDgW-a6mhQAo6Ukgw/viewform';
const Arrow = () => <span aria-hidden="true">↗</span>;
const faqs = [
  ['How does booking work?', 'Choose your service in the Google Form. Charlotte will email you within 12 hours with your PayPal link or invoice and any personal questions needed for your reading. Your delivery window begins after payment is confirmed. The form sends a request; payment follows by email.'],
  ["I don't know my birth time. Can I still book?", 'Yes. Tell me your birth time is unknown rather than guessing. We can explore the available chart information, but houses and some Moon interpretations may be limited. After Dark: Desire & Chemistry uses Symbolon only and does not need birth details for its analysis.'],
  ['What do I receive?', 'Your reading is delivered by email. Quick-Check is a one-card email reading; the other readings are PDF reports. Each service lists its format and delivery window. All prices are in US dollars.'],
  ['What do I need for an After Dark reading?', 'These readings are for adults 18+ only, including anyone discussed in the reading. After booking, I confirm adulthood and ask your personal questions by email. Cosmic Chemistry also uses birth date, time and place; partner information is optional and should only be shared with permission. Synastry is included when sufficient birth information is available. Unknown times limit house and some Moon interpretations.'],
  ['Is the reading personal?', 'Yes. I personally pull your cards, analyze your chart with professional software (Astro.com and TimePassages), and write your report around your questions. AI is used only as a research assistant, never as the reader.'],
  ['Can I ask follow-up questions?', 'Yes! Follow-ups are $11 per question via email. Monthly Membership members get one free Q&A per month.'],
];

function BookingLink({ children = <>Request this reading <Arrow /></>, className = 'button', product, ...props }) {
  return <a className={className} href={FORM_URL} target="_blank" rel="noopener noreferrer"
    aria-label={product ? `Request ${product.name} for $${product.price} — opens Google Form` : undefined} {...props}>{children}</a>;
}

function Symbol({ kind = 'star' }) {
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.15" aria-hidden="true">
    {kind === 'love' ? <><path d="M40 60S14 44 14 28c0-17 23-17 26-3 3-14 26-14 26 3 0 16-26 32-26 32Z"/><path d="M40 12v-5M9 40H3m74 0h-6M40 73v-6"/><path d="m24 50 16-33 16 33M20 38h40" opacity=".4"/></> : kind === 'monthly' ? <><path d="M55 14a27 27 0 1 0 11 42A29 29 0 0 1 55 14Z"/><path d="m57 31 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z"/></> : kind === 'career' ? <><circle cx="40" cy="36" r="25"/><ellipse cx="40" cy="36" rx="12" ry="25"/><path d="M16 36h48M20 22h40M20 50h40M40 61v11M25 73h30M9 12l63 48"/></> : <><path d="m40 5 7 25 24-16-15 25 19 4-23 7 13 22-25-15-7 20-5-24L6 65l15-25L5 33l25-4Z"/><circle cx="40" cy="40" r="12"/><path d="m40 19 0 42M19 40h42"/></>}
  </svg>;
}

function ProductCard({ product }) {
  const format = product.pages.replace(/(\d+)pg/, '$1-page');
  return <article className={`product-card ${product.adult ? 'adult-card' : ''}`} id={product.id}>
    <div className="product-topline"><span>{product.adult ? 'PRIVATE · 18+' : product.cards}</span>{product.badge === 'popular' && <span className="badge">Most loved</span>}</div>
    <div className="product-heading"><h3>{product.name.replace('After Dark: ', '')}</h3><p className="price">${product.price}<span>USD</span></p></div>
    {product.subtitle && <p className="product-subtitle">{product.subtitle}</p>}
    <p className="product-description">{product.desc}</p>
    <div className="product-delivery"><span>{format}</span><span>{product.time === '24hr' ? 'Within 24 hours' : `Within ${product.time}`}</span></div>
    {product.details && <details className="product-details"><summary>What’s included <span aria-hidden="true">+</span></summary><ul>{product.details.map(d => <li key={d}>{d}</li>)}</ul></details>}
    <BookingLink product={product} className="reading-link" />
  </article>;
}

export default function TarotMilkyTeaShop() {
  const [activeConcern, setActiveConcern] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [scrolled, setScrolled] = useState(false);
  const journeyRef = useRef(null);
  const rootRef = useRef(null);
  const motionOff = paused || reduced;
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 60);
      const el = journeyRef.current;
      if (el) {
        const range = Math.max(1, el.offsetHeight - window.innerHeight);
        const p = motionOff ? 0 : Math.max(0, Math.min(1, -el.getBoundingClientRect().top / range));
        el.style.setProperty('--journey', p.toFixed(4));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [motionOff]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    rootRef.current.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  const regular = allProducts.filter(p => !p.adult && (activeConcern === 'all' || p.tags.includes(activeConcern)));
  const featured = ['quick-check', 'cosmic-clarity', 'deep-dive'];
  const visible = activeConcern === 'all' && !showAll ? regular.filter(p => featured.includes(p.id)) : regular;
  const showAdult = activeConcern === 'all' || activeConcern === 'love';
  function chooseConcern(id) { setActiveConcern(id); setShowAll(true); }

  return <div className={`site ${motionOff ? 'motion-off' : ''}`} ref={rootRef}>
    <a className="skip-link" href="#readings">Skip to readings</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark" href="#home" aria-label="Tarot Milky Tea home">tarot milky tea<span className="wordmark-star" aria-hidden="true">✧</span></a>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        <a href="#readings">Readings</a><a href="#about">Meet Charlotte</a><a href="#faq">FAQ</a>
      </nav>
      <div className="header-actions"><button className="motion-button" onClick={() => setPaused(!paused)} aria-label={motionOff ? 'Resume decorative motion' : 'Pause decorative motion'} aria-pressed={motionOff} disabled={reduced} title={reduced ? 'Reduced motion follows your device setting' : 'Toggle decorative motion'}>{motionOff ? '▷' : 'Ⅱ'}</button><BookingLink className="nav-book">Book a reading <Arrow /></BookingLink><button className="menu-button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button></div>
    </header>

    <main>
      <section className="journey" id="home" ref={journeyRef} aria-labelledby="hero-title">
        <div className="hero-stage">
          <img className="hero-art" src="/images/tea-room.webp" width="1586" height="992" fetchPriority="high" alt="A sunlit cup of milk tea, tarot cards and delicate powder-blue roses on an ivory linen table." />
          <div className="hero-wash" aria-hidden="true" />
          <div className="petals" aria-hidden="true"><i/><i/><i/><i/></div>
          <div className="hero-copy"><p className="eyebrow">TAROT, ASTROLOGY & A MOMENT FOR YOU</p><h1 id="hero-title">Your story,<br/><em>over tea.</em></h1><span className="handwritten">take your time</span><p className="hero-description">Personal readings with Charlotte.<br/>There is space for your story here.</p></div>
          <div className="hero-invitation"><a href="#readings" className="button">Find your reading <Arrow /></a><span>Settle in. Scroll a little.</span></div>
          <p className="journey-whisper" aria-hidden="true">A quiet moment.<br/><em>A little clarity.</em></p>
          <div className="scene-caption" aria-hidden="true"><span>THE TEA ROOM</span><span>01 / 04</span></div>
        </div>
      </section>

      <section className="welcome section-pad" id="welcome" data-reveal>
        <p className="eyebrow">01 — MAKE YOURSELF AT HOME</p>
        <h2>You don’t have to have<br/><em>it all figured out.</em></h2>
        <p>A question about love. A crossroads. A feeling you can’t quite name.<br className="desktop-break"/> Bring it here. Together, we’ll make a little room for perspective.</p>
        <div className="welcome-signature">a cup of comfort, a little cosmic perspective <span aria-hidden="true">✧</span></div>
      </section>

      <section className="readings-section section-pad" id="readings" aria-labelledby="readings-title">
        <div className="section-intro" data-reveal><p className="eyebrow">02 — WHAT’S ON YOUR HEART?</p><h2 id="readings-title">A reading for<br/><em>your chapter.</em></h2><p>Choose what’s bringing you here today.<br/>Every reading is personal. Every story is welcome.</p></div>
        <div className="concern-grid" aria-label="Filter readings by topic">{concerns.map(c => <button key={c.id} aria-pressed={activeConcern === c.id} onClick={() => chooseConcern(c.id)}><Symbol kind={c.id}/><span>{c.label.replace('Life purpose & direction','Life & purpose')}</span><small>{c.sub}</small></button>)}</div>
        <div className="catalog-heading"><div className="catalog-links"><button className={`all-readings ${activeConcern === 'all' ? 'selected' : ''}`} aria-pressed={activeConcern === 'all'} onClick={() => { setActiveConcern('all'); setShowAll(true); }}>All readings <Arrow/></button>{showAdult && <a href="#after-dark-readings" className="after-dark-jump">After Dark · 18+ <span aria-hidden="true">↓</span></a>}</div><p role="status">{activeConcern === 'all' && !showAll ? 'A few places to begin' : `${regular.length + (showAdult ? 2 : 0)} readings for you${showAdult ? ' · including After Dark below' : ''}`}</p></div>
        <div className="product-grid">{visible.map(p => <ProductCard key={p.id} product={p}/>)}</div>
        {activeConcern === 'all' && !showAll && <button className="view-all" onClick={() => setShowAll(true)}>Explore all {allProducts.length} readings <span aria-hidden="true">↓</span></button>}
        <p className="delivery-note">All prices in USD. Delivery windows begin after confirmed payment. Your reading arrives by email.</p>
      </section>

      {showAdult && <section id="after-dark-readings" className="after-dark-section section-pad" aria-labelledby="after-dark-title">
        <div className="after-dark-intro" data-reveal><div className="after-dark-photo"><img src="/images/after-dark.webp" width="1122" height="1402" loading="lazy" alt="Blue roses, candlelight, milk tea and a fan of tarot cards."/><span>THE QUIETER QUESTIONS</span></div><div className="after-dark-copy"><p className="eyebrow">THE AFTER DARK COLLECTION · 18+</p><h2 id="after-dark-title">A softer space<br/>for <em>desire.</em></h2><p>For the chemistry you feel, the attachment you’re untangling, and the intimacy you hope for.</p><p>Two private Symbolon readings to explore your questions with curiosity and care.</p><a className="text-link" href="#after-dark-options">Find your After Dark reading <span aria-hidden="true">↓</span></a></div></div>
        <div className="product-grid adult-grid" id="after-dark-options">{allProducts.filter(p => p.adult).map(p => <ProductCard key={p.id} product={p}/>)}</div>
        <div className="adult-notes"><p>For adults 18+ only, including anyone discussed. Symbolic readings cannot verify another person’s private thoughts, sexual preferences, consent or future actions.</p><p>Charlotte follows up by email with your PayPal link, age confirmation and personal questions. Cosmic Chemistry also uses your birth date, time (or “unknown”) and place. Partner details are optional and should only be shared with permission.</p></div>
      </section>}

      <section className="booking-section section-pad" id="how-it-works" data-reveal>
        <p className="eyebrow">03 — FROM YOUR QUESTION TO YOUR INBOX</p><h2>Simple, personal,<br/><em>at your pace.</em></h2>
        <div className="booking-steps"><div><span>01</span><h3>Choose your reading</h3><p>Find the reading that feels right and send your request through the Google Form.</p></div><div><span>02</span><h3>A note from Charlotte</h3><p>I’ll email your PayPal link and the personal questions or birth details needed for your reading.</p></div><div><span>03</span><h3>A little clarity, delivered</h3><p>After payment is confirmed, I prepare your reading and send it to your inbox within its listed delivery window.</p></div></div>
        <BookingLink className="button">Send a reading request <Arrow/></BookingLink><p className="small-note">No payment is taken in the booking form.</p>
      </section>

      <section className="testimonials-section section-pad" aria-labelledby="testimonials-title" data-reveal><p className="eyebrow">WORDS FROM THE OTHER SIDE OF THE TABLE</p><h2 id="testimonials-title">A little more <em>clarity.</em></h2><div className="testimonials-grid">{testimonials.map(t => <figure key={t.name}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{t.text}</blockquote><figcaption>{t.name}<span>{t.type}</span></figcaption></figure>)}</div></section>

      <section className="about-section section-pad" id="about" data-reveal><div className="about-card" aria-hidden="true"><Symbol/><span>THE READER</span><em>Charlotte</em><div className="about-card-lines">THE STARS · THE CARDS<br/>YOUR STORY</div></div><div className="about-copy"><p className="eyebrow">04 — YOUR READER, CHARLOTTE</p><h2>A real person.<br/><em>Room for your story.</em></h2><p>I help people at life’s crossroads through astrology, tarot and Symbolon — bringing a little perspective to the questions that stay with you.</p><p>I personally pull your cards, explore your birth chart with professional software, and write your reading around your story. A thoughtful exchange, from one person to another.</p><a className="text-link" href="https://medium.com/@tarotmilkytea" target="_blank" rel="noopener noreferrer">Read my stories on Medium <Arrow/></a></div></section>

      <section className="seasonal-section section-pad"><p className="eyebrow">A NOTE FROM THE COSMOS</p>{seasonalProducts.map(p => <div className="seasonal-row" key={p.name}><div><h3>{p.name}</h3><p>{p.window} · {p.event}</p></div><span>${p.price} USD</span><BookingLink className="text-link">Ask about this reading <Arrow/></BookingLink></div>)}</section>

      <section className="faq-section section-pad" id="faq"><div><p className="eyebrow">BEFORE YOU SETTLE IN</p><h2>A few things<br/><em>you might wonder.</em></h2><p>Something else on your mind?<br/><a href="mailto:tarotmilkytea@gmail.com">Email Charlotte <Arrow/></a></p></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="closing section-pad" data-reveal><span aria-hidden="true">✧</span><p className="eyebrow">THERE’S A SEAT FOR YOU HERE</p><h2>Let’s begin<br/><em>with your story.</em></h2><BookingLink className="button">Book your reading <Arrow/></BookingLink><p>Not sure where to start? Try a one-card reading for $9.</p></section>
    </main>
    <footer><a href="#home" className="wordmark">tarot milky tea</a><div><a href="https://medium.com/@tarotmilkytea" target="_blank" rel="noopener noreferrer">Medium <Arrow/></a><a href="https://threads.net/@tarotmilkytea" target="_blank" rel="noopener noreferrer">Threads <Arrow/></a><a href="mailto:tarotmilkytea@gmail.com">Email <Arrow/></a></div><p>© {new Date().getFullYear()} Tarot Milky Tea by Charlotte</p><small>Readings are for entertainment and spiritual guidance. Not a substitute for professional advice.</small></footer>
  </div>;
}
