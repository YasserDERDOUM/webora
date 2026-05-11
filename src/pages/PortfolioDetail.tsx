import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Globe, MapPin } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";

const ORG = "linear-gradient(135deg,#F97316,#FB923C)";

export default function PortfolioDetail() {
  const [, params] = useRoute("/portfolio/:slug");
  const project = portfolioProjects.find((item) => item.slug === params?.slug) ?? portfolioProjects[0];

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_34%),linear-gradient(180deg,rgba(255,248,244,0.95),rgba(255,255,255,0.92)_42%,rgba(255,249,246,0.92))]" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#111]/58 hover:text-[#F97316] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <div className="flex flex-wrap gap-2">
              <Link href="/rendez-vous" className="inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(17,17,17,0.16)] hover:-translate-y-0.5 transition-all">
                Réserver un appel
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/18 bg-[#F97316]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#F97316] mb-6"
              >
                Étude de cas
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-[clamp(2.7rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em] max-w-[10ch]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {project.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-lg text-[#111]/62 leading-relaxed max-w-2xl"
              >
                {project.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#ECECEC] px-4 py-2 text-sm font-medium text-[#111]/65">
                  <MapPin className="w-4 h-4 text-[#F97316]" />
                  {project.city}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#ECECEC] px-4 py-2 text-sm font-medium text-[#111]/65">
                  <Clock3 className="w-4 h-4 text-[#F97316]" />
                  {project.delivery}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#ECECEC] px-4 py-2 text-sm font-medium text-[#111]/65">
                  <Globe className="w-4 h-4 text-[#F97316]" />
                  {project.domain}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-[#F1F1F1] bg-white p-6 shadow-[0_24px_60px_rgba(17,17,17,0.06)]"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-4">Résultats clés</p>
              <div className="grid grid-cols-3 gap-3">
                {project.heroMetrics.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#FAFAFA] px-4 py-5">
                    <p className="text-2xl font-extrabold text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.value}</p>
                    <p className="text-xs text-[#111]/48 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#F1F1F1]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-3">Angle du projet</p>
                <p className="text-lg font-bold text-[#111]" style={{ fontFamily: "'Syne', sans-serif" }}>{project.focus}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-[2rem] overflow-hidden border border-[#F1F1F1] bg-[#111] shadow-[0_28px_80px_rgba(17,17,17,0.16)]"
          >
            <div className="flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-white/30 font-mono">{project.domain}</span>
            </div>
            <img src={project.image} alt={project.name} className="w-full aspect-[16/9] object-cover object-top" />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            <section className="rounded-[2rem] border border-[#F1F1F1] bg-white p-7 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-4">Le défi</p>
              <h2 className="text-2xl font-extrabold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Contexte</h2>
              <p className="text-[#111]/62 leading-relaxed">{project.challenge}</p>
            </section>

            <section className="rounded-[2rem] border border-[#F1F1F1] bg-white p-7 shadow-sm lg:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-4">Ce qu'on a conçu</p>
              <h2 className="text-2xl font-extrabold mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Solution</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.solution.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#FAFAFA] px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-sm leading-relaxed text-[#111]/68">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#F1F1F1] bg-white p-7 shadow-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-4">Impact</p>
            <h2 className="text-2xl font-extrabold mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Résultats et bénéfices</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {project.outcomes.map((item) => (
                <div key={item} className="rounded-2xl border border-[#F1F1F1] px-5 py-5">
                  <p className="text-sm leading-relaxed text-[#111]/66">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] bg-[#111] text-white px-7 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/36 mb-3">Vous voulez un résultat similaire ?</p>
                <h2 className="text-3xl font-extrabold leading-tight max-w-[13ch]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  On peut construire votre prochaine étude de cas.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/rendez-vous" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#111] hover:bg-white/90 transition-all">
                  Réserver un appel
                </Link>
                <Link href="/devis" className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-bold text-white hover:bg-white/8 transition-all">
                  Demander un devis
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
