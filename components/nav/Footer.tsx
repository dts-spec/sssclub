import Link from "next/link";

const footerNav = {
  experiences: [
    { href: "/experiences/evening-dinner", label: "Evening Dinner" },
    { href: "/experiences/local-sail", label: "Local Sail" },
    { href: "/experiences/breathwork-at-sea", label: "Breathwork at Sea" },
    { href: "/experiences/yoga-at-sea", label: "Yoga at Sea" },
    { href: "/experiences/business-meetings", label: "Business Meetings" },
    { href: "/experiences/small-events", label: "Small Events" },
    { href: "/experiences/private-charter", label: "Private Charter" },
  ],
  excursions: [
    { href: "/excursions/catalina", label: "Catalina · 2026" },
    { href: "/excursions/puerto-vallarta", label: "Puerto Vallarta · 2028" },
    { href: "/excursions/inside-passage", label: "Inside Passage · 2028" },
    { href: "/excursions/greek-islands", label: "Greek Islands · 2029" },
    { href: "/excursions/bvi", label: "British Virgin Islands · 2029" },
  ],
  about: [
    { href: "/our-story", label: "Our Story" },
    { href: "/vessel", label: "The Vessel" },
    { href: "/journal", label: "Journal" },
    { href: "/press", label: "Press" },
    { href: "#book", label: "Reserve" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ocean-deep text-white/65 px-[clamp(1.5rem,4vw,4rem)] pt-[clamp(4rem,8vw,7rem)] pb-10 on-dark">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 md:gap-16 pb-16 border-b border-white/10">
          <div>
            <div className="font-display italic font-normal text-[1.625rem] text-gold mb-5 leading-[1.15]">
              Sail, Supper, &amp; Soul Club
            </div>
            <p className="text-[0.9375rem] leading-[1.65] mb-8 font-light max-w-xs">
              Coastal restoration for couples and seekers. Six guests, never
              more.
            </p>
            <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-white/45 mb-2">
              Marina Del Rey · California
            </div>
          </div>

          {(["experiences", "excursions", "about"] as const).map((key) => (
            <div key={key}>
              <div className="font-mono text-[0.7rem] font-medium tracking-[0.24em] uppercase text-gold mb-6">
                {key === "experiences"
                  ? "Experiences"
                  : key === "excursions"
                  ? "Excursions"
                  : "About"}
              </div>
              <ul className="flex flex-col gap-3">
                {footerNav[key].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 text-[0.9375rem] font-light transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-white/40 flex-wrap gap-4">
          <span>© {new Date().getFullYear()} Sail Supper Soul Club, LLC</span>
          <span>USCG Documented · OUPV Operated · CDTFA Reg. 1620</span>
          <span>Marina Del Rey · 33°58′N 118°27′W</span>
        </div>
      </div>
    </footer>
  );
}
