const ETSY_JOURNAL_URL = import.meta.env.VITE_COSMIC_JOURNAL_ETSY_URL;

export default function JournalsSection() {
  return (
    <section className="journals-section section-pad" id="journals" aria-labelledby="journals-title">
      <h2 id="journals-title">Journals &amp; Books</h2>
      <div className="journals-grid">
        <article className="journal-card">
          <img src="/images/shadow-mirror.webp" alt="The Shadow Mirror cover" loading="lazy" />
          <div>
            <h3>The Shadow Mirror: 30 Day Shadow Work Journal</h3>
            <p className="journal-format">Paperback, $17.99</p>
            <p>Thirty days with one card and three questions, built on the method I use in my private readings.</p>
            <a className="button" href="https://www.amazon.com/dp/B0HRB3HRBL" target="_blank" rel="noopener noreferrer">Get it on Amazon</a>
          </div>
        </article>
        <article className="journal-card">
          <img src="/images/cosmic-feelings-journal.webp" alt="2027 Cosmic Feelings Journal cover" loading="lazy" />
          <div>
            <h3>2027 Cosmic Feelings Journal</h3>
            <p className="journal-format">Instant download $16.99 / Paperback (coming soon)</p>
            <p>365 dated pages. Each day carries that day's Moon sign, one question, and room to write what you actually felt.</p>
            <div className="journal-actions">
              {ETSY_JOURNAL_URL ? (
                <a className="button" href={ETSY_JOURNAL_URL} target="_blank" rel="noopener noreferrer">Get the digital journal</a>
              ) : (
                <button className="button" type="button" disabled>Get the digital journal</button>
              )}
              <button className="button" type="button" disabled>Paperback — coming soon</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
