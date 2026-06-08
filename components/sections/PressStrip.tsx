/**
 * Credentials / press strip.
 * Sits between hero and manifesto as a trust signal.
 *
 * Year 1: Display certifications and equipment standards.
 * Year 2+: Replace with actual press logos (Travel + Leisure, Conde Nast, etc).
 */

const credentials = [
  "USCG Documented",
  "Pilates Method Alliance",
  "ACE Certified Breathwork",
  "SAMS Surveyed",
  "Lagoon 51 Iconic",
];

export function PressStrip() {
  return (
    <section className="bg-ocean text-white/70 py-[clamp(2.5rem,5vw,4rem)] border-b border-white/[0.06] on-dark">
      <div className="container-app grid items-center gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[auto_1fr]">
        <div className="font-mono text-[0.7rem] font-medium tracking-[0.28em] uppercase text-gold">
          In Good Company
        </div>
        <div className="flex gap-[clamp(1.5rem,4vw,4rem)] flex-wrap items-center">
          {credentials.map((credential) => (
            <span
              key={credential}
              className="font-display italic text-[clamp(0.95rem,1.3vw,1.15rem)] text-white/75 tracking-[0.02em] whitespace-nowrap"
            >
              {credential}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
