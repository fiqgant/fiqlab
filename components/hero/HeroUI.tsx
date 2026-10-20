import Link from "next/link";
import { personal } from "@/data/personal";

const references = [
  { label: "Google Scholar", href: personal.googleScholar },
  { label: "SINTA", href: personal.sintaUrl },
  { label: "GitHub", href: personal.github },
  { label: "LinkedIn", href: personal.linkedin },
];

const contents = [
  ["/about", "About"],
  ["/publications", "Publications"],
  ["/portfolio", "Projects"],
  ["/blog", "Writing"],
  ["/tools", "Tools"],
  ["/contact", "Contact"],
];

export function HeroUI() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 pt-28 pb-20">
      <article className="max-w-2xl mx-auto">
        <header className="text-center space-y-2 hero-item">
          <p className="font-mono text-xs text-muted">fiqlab.dev · research notebook</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{personal.name}</h1>
          <p className="italic text-muted">
            {personal.role}, {personal.institution}
          </p>
          <p className="text-sm text-muted">
            {personal.location} ·{" "}
            <a href={`mailto:${personal.email}`} className="font-mono text-accent hover:underline">
              {personal.email}
            </a>
          </p>
        </header>

        <section className="mt-10 hero-item hero-delay-1">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em]">Abstract</h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-justify hyphens-auto">
            {personal.longBio.replace(/\n/g, " ")}
          </p>
          <p className="mt-3 text-sm">
            <span className="font-semibold italic">Keywords — </span>
            {personal.researchInterests.map((i) => i.title).join(", ")}
          </p>
        </section>

        <figure className="mt-10 hero-item hero-delay-2">
          <figcaption className="text-sm text-center mb-2">
            <span className="font-semibold">Table 1.</span> Research output to date.
          </figcaption>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-y-2 border-ink">
              <thead>
                <tr className="border-b border-ink/60">
                  {personal.stats.map((s) => (
                    <th key={s.label} className="px-2 py-1.5 font-semibold">{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {personal.stats.map((s) => (
                    <td key={s.label} className="py-1.5 text-center font-mono">{s.value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </figure>

        <section className="mt-10 hero-item hero-delay-3">
          <h2 className="text-lg font-semibold">Contents</h2>
          <ol className="mt-2 space-y-1 text-[0.95rem]">
            {contents.map(([href, label], i) => (
              <li key={href} className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-muted w-5">{i + 1}.</span>
                <Link href={href} className="hover:text-accent">{label}</Link>
                <span className="flex-1 border-b border-dotted border-ink/30" />
                <span className="font-mono text-xs text-muted">{href}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 hero-item hero-delay-4">
          <h2 className="text-lg font-semibold">References</h2>
          <ol className="mt-2 space-y-1 text-sm">
            {references.map((r, i) => (
              <li key={r.label} className="flex gap-2">
                <span className="text-muted">[{i + 1}]</span>
                <span>
                  {r.label}.{" "}
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent break-all hover:underline"
                  >
                    {r.href.replace(/^https?:\/\//, "")}
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  );
}
