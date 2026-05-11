import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Menu, Star, X, Zap, Target,
  Search, Edit3, Settings, Phone, ArrowUpRight, TrendingUp,
  Clock, Shield, ChevronDown
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featuredProject, portfolioProjects } from "@/data/portfolio";

/* â”€â”€â”€ brand helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const ORG = 'linear-gradient(135deg,#F97316,#FB923C)';

function WeboraLogo({ size = 'md', dark = false }: { size?: 'sm' | 'md' | 'lg'; dark?: boolean }) {
  const textColor = dark ? '#FFFFFF' : '#111111';
  const sizes = { sm: { font: 22, oSize: 22, gap: 1 }, md: { font: 28, oSize: 28, gap: 2 }, lg: { font: 36, oSize: 36, gap: 3 } };
  const s = sizes[size];
  const r = s.oSize / 2;
  const cx = r;
  const cy = r;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: s.font,
        color: textColor,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>Web</span>
      {/* The iconic O */}
      <svg width={s.oSize} height={s.oSize} viewBox={`0 0 ${s.oSize} ${s.oSize}`} fill="none" style={{ display: 'block', flexShrink: 0 }}>
        <defs>
          <linearGradient id="lg-o" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F97316" /><stop offset="1" stopColor="#FB923C" />
          </linearGradient>
        </defs>
        {/* outer ring */}
        <circle cx={cx} cy={cy} r={r * 0.88} stroke="url(#lg-o)" strokeWidth={r * 0.18} fill="none" />
        {/* inner swirl â€” bold arc */}
        <path
          d={`M${cx + r * 0.55} ${cy - r * 0.3}
              C${cx + r * 0.85} ${cy + r * 0.1}
               ${cx + r * 0.55} ${cy + r * 0.75}
               ${cx - r * 0.1} ${cy + r * 0.6}
              C${cx - r * 0.6} ${cy + r * 0.45}
               ${cx - r * 0.65} ${cy - r * 0.05}
               ${cx - r * 0.2} ${cy - r * 0.4}
              C${cx + r * 0.1} ${cy - r * 0.65}
               ${cx + r * 0.4} ${cy - r * 0.5}
               ${cx + r * 0.55} ${cy - r * 0.3}Z`}
          fill="url(#lg-o)" opacity="0.9"
        />
        {/* accent dot â€” top right */}
        <circle cx={cx + r * 0.68} cy={cy - r * 0.68} r={r * 0.2} fill="#F97316" />
      </svg>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: s.font,
        color: textColor,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>ra</span>
    </div>
  );
}

/* â”€â”€â”€ animated counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, target, mv]);

  useEffect(() => spring.on('change', v => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* â”€â”€â”€ framer variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

/* â”€â”€â”€ section heading helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F97316]/30 bg-[#F97316]/8 text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
      {children}
    </span>
  );
}

/* â”€â”€â”€ creative CTA button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function OrangeCTA({
  label, icon = '→', outline = false, href, onClick, testId, size = 'md', fullWidth = false
}: {
  label: string; icon?: string; outline?: boolean; href?: string;
  onClick?: () => void; testId?: string; size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean;
}) {
  const pad = size === 'lg' ? 'px-9 py-4.5 text-[15px]' : size === 'sm' ? 'px-5 py-2 text-sm' : 'px-7 py-3.5 text-sm';
  const base = `group relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold overflow-hidden transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${pad}`;
  const filled = `${base} text-white border border-white/15 shadow-[0_18px_45px_rgba(249,115,22,0.28)] hover:shadow-[0_24px_60px_rgba(249,115,22,0.4)] hover:-translate-y-0.5`;
  const ghost = `${base} border border-[#111]/10 bg-white/74 backdrop-blur-md text-[#111] shadow-[0_14px_30px_rgba(17,17,17,0.05)] hover:border-[#F97316]/35 hover:text-[#F97316] hover:bg-white hover:-translate-y-0.5`;

  const inner = (
    <>
      {!outline && (
        <span className="absolute inset-0 opacity-100" style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)' }} />
      )}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: outline ? 'linear-gradient(135deg,rgba(249,115,22,0.08),rgba(251,146,60,0.18))' : 'linear-gradient(135deg,#FB923C,#F97316)' }}
      />
      <span className="absolute inset-y-0 -left-1/3 w-1/3 rotate-[18deg] bg-white/20 blur-xl opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
      <span className="relative z-10 tracking-tight">{label}</span>
      <span className={`relative z-10 inline-flex items-center justify-center ${size === 'lg' ? 'w-7 h-7' : 'w-6 h-6'} rounded-full text-xs font-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${outline ? 'bg-[#F97316]/10 text-[#F97316]' : 'bg-white/18 text-white'}`}>
        {icon}
      </span>
    </>
  );

  if (href) return <a href={href} className={outline ? ghost : filled} data-testid={testId}>{inner}</a>;
  return <button onClick={onClick} className={outline ? ghost : filled} data-testid={testId}>{inner}</button>;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % 3);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Processus', href: '#process' },
    { label: 'Tarifs', href: '#pricing' },
  ];

  const portfolioMetrics = [
    { value: '12', label: 'projets restos lancés ce trimestre' },
    { value: '4.8j', label: 'délai moyen de livraison' },
    { value: '+47%', label: 'hausse moyenne de trafic local' },
  ];

  const heroHighlights = [
    'Sites pensés mobile-first',
    'Design premium et conversion',
    'Livraison rapide sans compromis',
  ];

  const heroPhrases = [
    'attirent vos clients',
    'vendent votre image',
    'convertissent sur mobile',
  ];

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-x-hidden webora-aurora" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Dynamic animated background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_34%),linear-gradient(180deg,rgba(255,247,240,0.95),rgba(255,255,255,0.92)_42%,rgba(255,248,244,0.9))]" />
        <div className="absolute inset-0 webora-grid opacity-40" />
        <motion.div
          className="absolute top-[-8%] left-[8%] h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: 'conic-gradient(from 90deg,#F97316,#FDBA74,#FB923C,#F97316)' }}
          animate={{ rotate: [0, 180, 360], scale: [1, 1.08, 0.94, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: 'radial-gradient(circle,#F97316,transparent 70%)' }}
          animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.14] blur-3xl"
          style={{ background: 'radial-gradient(circle,#FB923C,transparent 70%)' }}
          animate={{ x: [0, 80, 40, 0], y: [0, -50, 30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-[450px] h-[450px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: 'radial-gradient(circle,#F97316,transparent 70%)' }}
          animate={{ x: [0, -70, 50, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full opacity-[0.10] blur-3xl"
          style={{ background: 'radial-gradient(circle,#FFB37A,transparent 70%)' }}
          animate={{ x: [0, 100, -60, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-x-[12%] top-[18%] h-px bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent"
          animate={{ opacity: [0.25, 0.8, 0.25], scaleX: [0.9, 1, 0.92] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[10%] h-56 w-56 rounded-full border border-[#F97316]/15"
          animate={{ y: [0, -16, 0], rotate: [0, 20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[6%] top-[24%] h-3 w-3 rounded-full bg-[#F97316]/60 shadow-[0_0_24px_rgba(249,115,22,0.7)]"
          animate={{ y: [0, 26, -8, 0], x: [0, 12, 0], opacity: [0.35, 1, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[12%] top-[38%] h-2.5 w-2.5 rounded-full bg-[#111]/20 shadow-[0_0_24px_rgba(17,17,17,0.15)]"
          animate={{ y: [0, -18, 0], x: [0, -10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVBAR â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <header className="fixed top-0 w-full z-50 px-3 sm:px-5 pt-3 sm:pt-4">
        <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-[1.65rem] border ${scrolled
          ? 'bg-white/82 backdrop-blur-2xl border-white/70 shadow-[0_18px_55px_rgba(17,17,17,0.08)]'
          : 'bg-white/62 backdrop-blur-xl border-white/55 shadow-[0_14px_42px_rgba(249,115,22,0.08)]'}`}>
          <div className="px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4">

            <a href="#" className="flex items-center gap-3 min-w-0" data-testid="link-logo">
              <WeboraLogo size="md" />
              <span className="hidden xl:flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#111]/38 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_14px_rgba(249,115,22,0.6)]" />
                Agency for bold local brands
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-[#111]/6 bg-white/75 px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              {navLinks.map((l, i) => (
                <a key={l.href} href={l.href}
                  className="group relative px-4 py-2 rounded-full text-sm font-medium text-[#111]/58 hover:text-[#111] transition-colors duration-200">
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(249,115,22,0.14),rgba(251,146,60,0.05))] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{l.label}</span>
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1.5 h-1 w-1 rounded-full bg-[#F97316] transition-all duration-300 ${i === 0 ? 'opacity-40' : 'opacity-0 group-hover:opacity-40'}`} />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end leading-none">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#111]/32">Réponse rapide</span>
                <span className="text-xs font-semibold text-[#111]/72">Sous 15 min en moyenne</span>
              </div>
              <Link href="/devis"
                data-testid="button-nav-cta"
                className="group relative px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-[0_16px_34px_rgba(249,115,22,0.24)] hover:shadow-[0_22px_46px_rgba(249,115,22,0.34)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                style={{ background: ORG }}>
                <span className="absolute inset-y-0 -left-1/3 w-1/3 rotate-[18deg] bg-white/20 blur-xl opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
                <span className="relative z-10">Devis gratuit</span>
              </Link>
            </div>

            <button className="md:hidden z-50 p-2.5 rounded-full border border-[#111]/10 bg-white/70 backdrop-blur-xl shadow-sm" onClick={() => setMenuOpen(v => !v)} data-testid="button-mobile-menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              className="mt-3 mx-auto max-w-7xl rounded-[1.7rem] bg-white/94 backdrop-blur-2xl border border-white/70 px-6 py-8 flex flex-col gap-6 md:hidden shadow-[0_24px_54px_rgba(17,17,17,0.1)]">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-xl font-semibold text-[#111] hover:text-[#F97316] transition-colors">
                  {l.label}
                </a>
              ))}
              <Link href="/devis" data-testid="button-mobile-cta"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full text-white font-bold text-base"
                style={{ background: ORG }}>
                Devis gratuit
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="min-h-screen flex flex-col justify-center pt-28 sm:pt-32 pb-14 sm:pb-18 px-4 sm:px-6 relative overflow-hidden">

          {/* grid texture */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(#111 1px,transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <motion.div
            className="absolute inset-x-[10%] top-24 h-24 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle,#F97316,transparent 70%)' }}
            animate={{ opacity: [0.2, 0.35, 0.2], scaleX: [0.9, 1.05, 0.92] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 lg:gap-16 items-center">

              {/* LEFT */}
              <div className="relative z-10">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 backdrop-blur-md border border-[#F97316]/20 text-[#F97316] text-sm font-semibold mb-6 sm:mb-8 shadow-[0_10px_30px_rgba(249,115,22,0.08)]">
                    <Star className="w-4 h-4 fill-[#F97316]" />
                    Noté 4.9/5 par les restaurateurs
                  </div>
                </motion.div>

                <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
                  className="text-[clamp(2.5rem,7vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em] mb-5 sm:mb-6 max-w-[11ch]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Des sites web qui{' '}
                  <span className="relative inline-flex min-h-[1.2em] min-w-[8.2ch] sm:min-w-[9.4ch] items-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroPhrases[heroIndex]}
                        initial={{ opacity: 0, y: 22, rotateX: -70, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -18, rotateX: 60, filter: 'blur(8px)' }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 inline-block will-change-transform"
                        style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: ORG, backgroundClip: 'text' }}
                      >
                        {heroPhrases[heroIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span
                      key={`underline-${heroIndex}`}
                      className="absolute bottom-1 left-0 h-3 w-full opacity-20 rounded-sm -z-10"
                      style={{ background: ORG }}
                      initial={{ scaleX: 0.8, opacity: 0 }}
                      animate={{ scaleX: [0.88, 1.06, 1], opacity: [0, 0.3, 0.18] }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  {' '}chaque jour.
                </motion.h1>

                <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
                  className="text-base sm:text-lg text-[#111]/60 leading-relaxed mb-8 sm:mb-10 max-w-xl">
                  Webora crée des sites modernes et performants pour restaurants, cafés et commerces locaux, livrés en 48h à 5 jours.
                </motion.p>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <OrangeCTA label="Obtenir un devis gratuit" icon="→" size="lg" href="/devis" testId="button-hero-primary" />
                  <OrangeCTA label="Voir nos réalisations" icon="↓" size="lg" outline href="#portfolio" testId="button-hero-secondary" />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
                  className="mt-7 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                  <div className="flex -space-x-3 justify-center sm:justify-start">
                    {['👨‍🍳', '👩‍💼', '👨‍🍳', '👩‍🍳'].map((e, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#F1F1F1] flex items-center justify-center text-base shadow-sm">{e}</div>
                    ))}
                  </div>
                  <div className="text-sm text-[#111]/60 text-center sm:text-left">
                    <span className="font-bold text-[#111]">50+ restaurateurs</span> nous font confiance
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={5}
                  className="mt-8 flex flex-wrap gap-2.5"
                >
                  {heroHighlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-[#111]/8 bg-white/75 backdrop-blur-md px-3.5 py-2 text-xs sm:text-sm font-medium text-[#111]/65 shadow-[0_10px_30px_rgba(17,17,17,0.04)]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT - browser mockup */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="relative w-full max-w-[680px] mx-auto lg:max-w-none">

                {/* glow */}
                <div className="absolute inset-0 blur-3xl opacity-25 scale-90"
                  style={{ background: 'radial-gradient(ellipse,#F97316,transparent 65%)' }} />
                <motion.div
                  className="absolute inset-[7%] rounded-[2rem] border border-white/35"
                  animate={{ opacity: [0.24, 0.5, 0.24], scale: [0.98, 1.01, 0.98] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* floating badge 1 */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute left-2 top-4 sm:-left-6 sm:top-12 lg:-left-10 lg:top-16 z-20 bg-white/88 backdrop-blur-md rounded-2xl shadow-2xl border border-[#F1F1F1] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-100">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#111]/50 font-medium">Clients en plus</p>
                    <p className="text-lg font-extrabold text-[#111]" style={{ fontFamily: "'Syne',sans-serif" }}>+40%</p>
                  </div>
                </motion.div>

                {/* floating badge 2 */}
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                  className="absolute right-2 bottom-6 sm:-right-3 sm:bottom-16 lg:-right-6 lg:bottom-24 z-20 bg-white/88 backdrop-blur-md rounded-2xl shadow-2xl border border-[#F1F1F1] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#F97316]/10">
                    <Clock className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#111]/50 font-medium">Livraison</p>
                    <p className="text-lg font-extrabold text-[#111]" style={{ fontFamily: "'Syne',sans-serif" }}>48h</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 left-6 sm:left-10 z-20 rounded-2xl border border-white/45 bg-white/88 backdrop-blur-md px-4 py-3 shadow-2xl"
                  animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/40 mb-1">Taux de conversion</p>
                  <p className="text-xl font-extrabold text-[#111]" style={{ fontFamily: "'Syne',sans-serif" }}>+31%</p>
                </motion.div>

                {/* browser frame */}
                <motion.div
                  whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative rounded-[1.75rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.18)] border border-[#F1F1F1] bg-white"
                >
                  <div className="h-10 bg-[#F7F7F7] border-b border-[#F1F1F1] flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    <div className="mx-auto flex-1 max-w-xs ml-4 bg-white rounded-lg px-3 py-1.5 text-xs text-[#111]/40 font-mono border border-[#F1F1F1]">
                      lebistroparisien.fr
                    </div>
                  </div>
                  <img src="/hero-mockup.png" alt="Site restaurant moderne" className="w-full object-cover object-top aspect-[4/3] sm:aspect-[16/13] lg:aspect-[4/3]" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* scroll hint */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#111]/30 text-xs">
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• STATS BAND â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-12 border-y border-[#F1F1F1] bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: 50, suffix: '+', label: 'Sites livrés' },
                { val: 40, suffix: '%', label: 'Clients en plus en moyenne' },
                { val: 5, suffix: 'j', label: 'Délai max de livraison' },
                { val: 98, suffix: '%', label: 'Clients satisfaits' },
              ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="text-center">
                  <p className="text-4xl font-extrabold text-[#111] mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-[#111]/50">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• TRUST BAR â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-10 overflow-hidden">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#111]/30 mb-8">Ils nous ont fait confiance</p>
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
            {['Le Bistro Parisien', 'Tokyo Street Food', 'Mama Pasta', 'Urban Burger', 'Casa Verde', 'Sakura Sushi', 'Le Bistro Parisien', 'Tokyo Street Food', 'Mama Pasta', 'Urban Burger'].map((name, i) => (
              <span key={i} className="text-lg font-bold text-[#111]/20 hover:text-[#F97316]/60 transition-colors shrink-0 cursor-default">{name}</span>
            ))}
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• PROBLEM â†’ SOLUTION â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>Le problème</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                Votre site vous coûte des clients
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* BEFORE */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                className="rounded-3xl bg-[#FAFAFA] border border-[#F1F1F1] p-10 relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#111]/8 text-xs font-bold text-[#111]/40 uppercase tracking-wider">Avant</div>
                <div className="space-y-6 mt-4">
                  {[
                    { title: 'Design vieillissant', desc: 'Vos visiteurs ferment l\'onglet en 3 secondes.' },
                    { title: 'Invisible sur Google', desc: 'Vos concurrents captent tous les clients qui cherchent.' },
                    { title: 'Aucune réservation en ligne', desc: 'Vous perdez des tables chaque soir sans le savoir.' },
                    { title: 'Pas de menu digital', desc: 'Vos clients ne savent pas ce que vous proposez.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 opacity-50">
                      <div className="w-8 h-8 rounded-full bg-[#111]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-[#111]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-0.5">{item.title}</h3>
                        <p className="text-sm text-[#111]/55 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AFTER */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="rounded-3xl border p-10 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#fff8f5,#fff)', borderColor: '#F97316' + '33' }}>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: ORG, color: '#fff' }}>Avec Webora</div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle,#F97316,transparent)' }} />
                <div className="space-y-6 mt-4">
                  {[
                    { title: 'Design premium qui inspire confiance', desc: 'Un visiteur qui reste, c\'est un futur client.' },
                    { title: 'SEO local optimisé', desc: 'Apparaissez en premier sur Google Maps.' },
                    { title: 'Réservation en ligne 24h/24', desc: 'Remplissez vos tables même quand vous dormez.' },
                    { title: 'Menu digital QR code', desc: 'Mis à jour en temps réel, zéro coût d\'impression.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)' }}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-0.5">{item.title}</h3>
                        <p className="text-sm text-[#111]/55 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SERVICES â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="services" className="py-24 px-6 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>Nos services</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                Tout pour briller en ligne
              </h2>
              <p className="mt-4 text-lg text-[#111]/50 max-w-xl mx-auto">On s'occupe de la technique, vous vous concentrez sur votre métier.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Target, title: 'Site restaurant', desc: 'Design sur-mesure, optimisé conversion et image de marque.', accent: '#F97316' },
                { icon: Zap, title: 'Menu QR code', desc: 'Menu digital élégant, accessible en 1 scan, mis à jour en temps réel.', accent: '#FB923C' },
                { icon: Edit3, title: 'Système de réservation', desc: 'Acceptez des réservations 24h/24 sans commission.', accent: '#F97316' },
                { icon: Search, title: 'SEO local', desc: 'Soyez trouvÃ© sur Google Maps par les clients proches de vous.', accent: '#FB923C' },
                { icon: Settings, title: 'Refonte de site', desc: 'Transformez un site obsolète en machine à clients.', accent: '#F97316' },
                { icon: Phone, title: 'Maintenance & support', desc: 'Hébergement, mises à jour et assistance toute l\'année.', accent: '#FB923C' },
              ].map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 3}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl border border-[#F1F1F1] p-8 cursor-default hover:border-[#F97316]/30 hover:shadow-xl hover:shadow-[#F97316]/8 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: s.accent + '15' }}>
                    <s.icon className="w-6 h-6 transition-colors duration-300" style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>{s.title}</h3>
                  <p className="text-sm text-[#111]/55 leading-relaxed">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.accent }}>
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div>
                <SectionLabel>Portfolio</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Des résultats visibles,<br />pas des maquettes vides.
                </h2>
                <p className="mt-3 text-[#111]/50 max-w-xl">
                  On construit des sites pensés pour faire venir plus de clients, mieux présenter la carte
                  et convertir sur mobile dès les premiers jours.
                </p>
              </div>
              <OrangeCTA href="/rendez-vous" label="Réserver un appel" icon="↗" outline />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="grid md:grid-cols-3 gap-4 mb-8"
            >
              {portfolioMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-[#F1F1F1] bg-[#FAFAFA]/80 px-6 py-5">
                  <p className="text-3xl font-extrabold mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>{metric.value}</p>
                  <p className="text-sm text-[#111]/55">{metric.label}</p>
                </div>
              ))}
            </motion.div>

            <Link href={`/portfolio/${featuredProject.slug}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="group cursor-pointer mb-6"
            >
              <div className="grid lg:grid-cols-[1.25fr_0.95fr] gap-6 items-stretch">
                <div className="relative overflow-hidden rounded-3xl bg-[#0C0C0C] shadow-2xl">
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-[#1A1A1A] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 max-w-xs ml-3 bg-[#111] rounded-md px-3 py-1 text-xs text-white/30 font-mono flex items-center gap-1.5">
                      <span className="text-green-500 text-[10px]">●</span> {featuredProject.domain}
                    </div>
                    <div className="ml-auto flex items-center gap-2 text-white/20 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-white/5">{featuredProject.badge}</span>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 p-8">
                      <p className="text-white/60 text-sm mb-3">Résultats après 30 jours</p>
                      <div className="flex flex-wrap gap-5">
                        {featuredProject.heroMetrics.map((item) => (
                          <div key={item.label}>
                            <span className="text-2xl font-black text-white" style={{ fontFamily: "'Syne',sans-serif" }}>{item.value}</span>
                            <p className="text-xs text-white/60">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#F1F1F1] bg-white p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-extrabold group-hover:text-[#F97316] transition-colors" style={{ fontFamily: "'Syne',sans-serif" }}>
                        {featuredProject.name}
                      </h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">{featuredProject.badge}</span>
                    </div>
                    <p className="text-[#111]/50 mb-4">
                      {featuredProject.category} · {featuredProject.city} · {featuredProject.delivery}
                    </p>
                    <p className="text-sm text-[#111]/65 leading-relaxed mb-6">{featuredProject.summary}</p>

                    <div className="space-y-3 mb-6">
                      {featuredProject.timeline.map((step) => (
                        <div key={step} className="flex items-start gap-3 text-sm text-[#111]/65">
                          <div className="w-7 h-7 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {featuredProject.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-[#F1F1F1] text-[#111]/60 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#F1F1F1] flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#111]/35 mb-1">Objectif du projet</p>
                      <p className="text-sm font-semibold text-[#111]">Transformer les visites mobiles en réservations immédiates</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>

            <div className="flex items-center justify-between gap-4 mt-12 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#111]/35 font-semibold">Autres réalisations</p>
                <h3 className="text-2xl font-extrabold mt-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Des cas variés, toujours orientés conversion.
                </h3>
              </div>
              <p className="hidden lg:block text-sm text-[#111]/45 max-w-sm text-right">
                Chaque carte présente un angle business clair : visibilité locale, commandes, réservations ou image de marque.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {portfolioProjects.map((p, i) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i}
                  className="group cursor-pointer rounded-3xl border border-[#F1F1F1] bg-white p-4 hover:border-[#F97316]/25 hover:shadow-2xl hover:shadow-[#F97316]/10 transition-all duration-500"
                >
                  <div className="rounded-2xl overflow-hidden bg-[#111] shadow-xl transition-all duration-500 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1A1A1A]">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                      <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                      <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                      <span className="ml-2 text-[10px] text-white/25 font-mono truncate">{p.domain}</span>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                        <span className="px-3 py-1.5 rounded-full text-xs font-black text-white shadow-lg" style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)' }}>
                          {p.result}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1 gap-3">
                      <h3 className="font-extrabold group-hover:text-[#F97316] transition-colors" style={{ fontFamily: "'Syne',sans-serif" }}>{p.name}</h3>
                      <ArrowUpRight className="w-4 h-4 text-[#111]/30 group-hover:text-[#F97316] group-hover:scale-110 transition-all" />
                    </div>
                    <p className="text-sm text-[#111]/50 mb-2">{p.category} · {p.city}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/8 text-[#F97316] text-xs font-bold mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {p.focus}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-[#F1F1F1] text-[#111]/55 font-medium">{t}</span>
                      ))}
                      <span className="text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700 font-bold">Live</span>
                    </div>
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-10 rounded-3xl border border-[#F1F1F1] bg-[#FAFAFA] px-6 py-6 md:px-8 md:py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#111]/35 font-semibold mb-2">Ce que le portfolio montre</p>
                <p className="text-[#111]/65 max-w-2xl">
                  Des sites rapides, pensés pour le mobile, avec un angle clair par établissement et un vrai plan d’acquisition local.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['SEO local', 'Réservation', 'Click & Collect', 'QR Menu', 'Refonte', 'Analytics'].map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full bg-white border border-[#ECECEC] text-sm text-[#111]/60 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• BEFORE / AFTER â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-24 px-6 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%,#F97316 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl opacity-20"
            style={{ background: 'radial-gradient(ellipse,#F97316,transparent)' }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>La transformation Webora</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "'Syne',sans-serif" }}>
                Avant. Après. La différence.
              </h2>
              <p className="mt-4 text-lg text-white/50">Arrêtez de perdre des clients à cause d'un mauvais design.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 items-end max-w-4xl mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-sm font-semibold text-white/40 uppercase tracking-widest">Avant</span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 grayscale opacity-60">
                  <img src="/before-site.png" alt="Ancien site" className="w-full object-cover aspect-[4/3] object-top" />
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="md:translate-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#F97316' }}>Après Webora</span>
                </div>
                <div className="rounded-2xl overflow-hidden relative shadow-[0_0_60px_rgba(255,106,0,0.25)]"
                  style={{ border: '1px solid rgba(255,106,0,0.4)' }}>
                  <img src="/after-site.png" alt="Nouveau site" className="w-full object-cover aspect-[4/3] object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F97316]/10 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• PROCESS â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="process" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>Comment ça marche</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                En 4 étapes, votre site est en ligne.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />

              {[
                { n: '01', title: 'Appel découverte', desc: 'Un échange gratuit de 15 min pour comprendre vos besoins et vos objectifs.', icon: Phone },
                { n: '02', title: 'Stratégie & design', desc: 'On crée une identité visuelle unique qui correspond à votre image.', icon: Edit3 },
                { n: '03', title: 'Développement', desc: 'Site rapide, responsive, optimisé SEO dès le départ.', icon: Zap },
                { n: '04', title: 'Mise en ligne & suivi', desc: 'On gère l\'hébergement et la maintenance pour vous.', icon: Shield },
              ].map((step, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="relative text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: ORG, boxShadow: '0 10px 30px rgba(255,106,0,0.3)' }}
                  >
                    {step.n}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>{step.title}</h3>
                  <p className="text-sm text-[#111]/55 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• PRICING â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section id="pricing" className="py-24 px-6 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>Tarifs</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                Transparent. Sans surprise.
              </h2>
              <p className="mt-4 text-lg text-[#111]/50">Pas de frais cachés. Juste un site qui rapporte.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* STARTER */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                className="bg-white rounded-3xl border border-[#F1F1F1] p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Starter</h3>
                <p className="text-sm text-[#111]/50 mb-6">Idéal pour une première présence en ligne.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-[#111]" style={{ fontFamily: "'Syne',sans-serif" }}>499€</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Page d\'accueil unique', 'Design responsive mobile', 'Formulaire de contact', 'SEO de base', 'Livraison en 48h'].map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#111]/70">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#111]/30" /> {f}
                    </li>
                  ))}
                </ul>
                <OrangeCTA label="Choisir Starter" icon="→" outline fullWidth href="/devis?plan=starter" testId="button-pricing-starter" />
              </motion.div>

              {/* PRO â€” highlighted */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="rounded-3xl p-8 relative shadow-2xl shadow-[#F97316]/20 md:-translate-y-4"
                style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#F97316] text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  Le plus populaire
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Pro</h3>
                <p className="text-sm text-white/70 mb-6">Pour restaurants & commerces ambitieux.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>999€</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Site multi-pages complet', 'SEO local avancé', 'Système de réservation', 'Menu QR code digital', 'Intégration Google Maps', 'Livraison prioritaire'].map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-white" /> {f}
                    </li>
                  ))}
                </ul>
            <Link href="/devis?plan=pro" data-testid="button-pricing-pro"
                  className="group w-full py-3.5 rounded-full text-sm font-black bg-white text-[#F97316] border border-white/60 shadow-[0_18px_42px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:bg-white/95 transition-all flex items-center justify-center gap-2.5">
                  Choisir Pro
                  <span className="w-6 h-6 rounded-full bg-[#F97316]/12 text-xs font-black flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-transform">→</span>
                </Link>
              </motion.div>

              {/* PREMIUM */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
                className="bg-white rounded-3xl border border-[#F1F1F1] p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Premium</h3>
                <p className="text-sm text-[#111]/50 mb-6">Sur-mesure et accompagnement complet.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-[#111]" style={{ fontFamily: "'Syne',sans-serif" }}>1999€</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Design 100% sur-mesure', 'E-commerce & paiement', 'Rédaction professionnelle', '1 an de maintenance offerte', 'Révisions illimitées'].map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#111]/70">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#111]/30" /> {f}
                    </li>
                  ))}
                </ul>
                <OrangeCTA label="Choisir Premium" icon="→" outline fullWidth href="/devis?plan=premium" testId="button-pricing-premium" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• TESTIMONIALS â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionLabel>Témoignages</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Syne',sans-serif" }}>
                Ils témoignent.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Julien R.', role: 'Gérant, Le Bistro Parisien', text: 'Webora a tout compris dès notre premier appel. Le résultat est bluffant, les réservations en ligne ont bondi de 30% le premier mois.', stars: 5 },
                { name: 'Sarah M.', role: 'Manager, Tokyo Street Food', text: 'Rapides, pros, et à l\'écoute de notre univers. L\'intégration du menu QR a changé la vie de notre équipe en salle.', stars: 5 },
                { name: 'Marco V.', role: 'Chef, Mama Pasta', text: 'Je connais la cuisine, pas les sites web. Ils ont tout géré. Le site est magnifique et on attire enfin les touristes.', stars: 5 },
              ].map((t, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="bg-[#FAFAFA] rounded-2xl border border-[#F1F1F1] p-8 hover:border-[#F97316]/30 hover:shadow-lg hover:shadow-[#F97316]/5 transition-all duration-300">
                  <div className="flex gap-1 mb-5 text-[#FFB800]">
                    {Array(t.stars).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[#111]/80 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#F1F1F1]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                      style={{ background: ORG }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#111]">{t.name}</p>
                      <p className="text-xs text-[#111]/50">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• FINAL CTA â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-32 md:py-34 px-4 sm:px-6 relative overflow-hidden scroll-mt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#F97316,#FB923C_45%,#FF9A3C)]" />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 80%,white 1px,transparent 1px),radial-gradient(circle at 80% 20%,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-y-10 left-[6%] hidden xl:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-10 right-[6%] hidden xl:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-end">
              <div className="text-center lg:text-left text-white">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/18 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Prêt à passer à la vitesse supérieure ?
                </span>
                <h2 className="text-[clamp(3rem,7vw,6.3rem)] font-extrabold leading-[0.94] tracking-[-0.05em] mb-6 max-w-[10.5ch]" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Votre business mérite une présence qui imprime.
                </h2>
                <p className="text-lg md:text-xl text-white/78 mb-10 max-w-2xl lg:max-w-xl">
                  Un appel de 15 minutes suffit pour lancer votre projet. C'est gratuit, sans engagement, et pensé pour accélérer vos réservations.
                </p>

                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10">
                <a href="https://wa.me/33612345678" target="_blank" rel="noreferrer" data-testid="button-cta-whatsapp"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-black text-[#111] bg-white border border-white/70 hover:-translate-y-0.5 transition-all overflow-hidden shadow-[0_18px_46px_rgba(255,255,255,0.16)] hover:shadow-[0_24px_52px_rgba(255,255,255,0.22)]">
                  <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,244,236,0.88))]" />
                  <span className="absolute inset-y-0 -left-1/3 w-1/3 rotate-[18deg] bg-[#F97316]/12 blur-xl opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.3)]">
                    <SiWhatsapp className="w-4.5 h-4.5" />
                  </span>
                  <span className="relative z-10 flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#111]/38">Canal direct</span>
                    <span className="text-sm font-extrabold text-[#111]">Écrire sur WhatsApp</span>
                  </span>
                </a>
                <Link href="/rendez-vous" data-testid="button-cta-message"
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold border border-white/24 bg-black/10 backdrop-blur-md text-white hover:bg-white/12 hover:-translate-y-0.5 transition-all shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-black text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                    ↗
                  </span>
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/52">Calendrier</span>
                    <span className="text-sm font-extrabold text-white">Réserver un appel</span>
                  </span>
                </Link>
                </div>

                <div className="flex max-w-md lg:max-w-xl mx-auto lg:mx-0 gap-3">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    data-testid="input-cta-email"
                    className="flex-1 h-12 rounded-full bg-white/16 border border-white/26 text-white placeholder:text-white/52 focus:bg-white/24 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  />
                  <button data-testid="button-cta-email"
                    className="group h-12 px-6 rounded-full bg-[#111] text-white font-bold text-sm border border-black/10 hover:bg-[#181818] hover:-translate-y-0.5 transition-all shrink-0 shadow-[0_16px_34px_rgba(17,17,17,0.18)]">
                    <span className="inline-flex items-center gap-2">
                      Envoyer
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-[2rem] border border-white/18 bg-white/12 backdrop-blur-xl p-6 sm:p-7 text-white shadow-[0_28px_65px_rgba(0,0,0,0.16)]">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/55 mb-2">Pourquoi maintenant</p>
                      <h3 className="text-2xl font-extrabold leading-tight max-w-[12ch]" style={{ fontFamily: "'Syne',sans-serif" }}>
                        Le site devient votre meilleur vendeur.
                      </h3>
                    </div>
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/14 border border-white/15 flex items-center justify-center text-lg">
                      ↗
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[
                      ['Réservation', '+38% en 30 jours'],
                      ['Temps de livraison', '48h à 5 jours'],
                      ['Accompagnement', 'Simple, rapide, clair'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/8 px-4 py-3">
                        <span className="text-sm text-white/64">{label}</span>
                        <span className="text-sm font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/12 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {['J', 'S', 'M'].map((letter) => (
                        <div key={letter} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/14 flex items-center justify-center text-sm font-bold text-white">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-white/72">
                      Des commerçants qui veulent une marque plus forte, pas juste un site de plus.
                    </p>
                  </div>
                </div>

                <div className="absolute -top-4 right-3 sm:-right-4 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/84 backdrop-blur-md">
                  Créatif + rentable
                </div>
                <div className="absolute -bottom-4 left-4 sm:left-8 rounded-2xl border border-white/14 bg-black/10 px-4 py-3 text-white/78 backdrop-blur-md shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-1">Disponibilité</p>
                  <p className="text-sm font-semibold">1 nouveau projet cette semaine</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* â”€â”€ FLOATING WHATSAPP BUTTON â”€â”€ */}
      <a
        href="https://wa.me/33612345678"
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter sur WhatsApp"
        data-testid="button-floating-whatsapp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-3 rounded-full border border-[#F97316]/15 bg-white/88 pl-3 pr-4 py-3 text-[#111] backdrop-blur-xl shadow-[0_20px_44px_rgba(17,17,17,0.12)] hover:-translate-y-1 hover:border-[#F97316]/35 hover:shadow-[0_24px_56px_rgba(249,115,22,0.18)] transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(249,115,22,0.08),rgba(251,146,60,0.02))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute inset-y-0 -left-1/3 w-1/3 rotate-[16deg] bg-white/65 blur-xl opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_24px_rgba(37,211,102,0.28)] ring-4 ring-[#25D366]/10">
          <SiWhatsapp className="w-5 h-5 text-white" />
        </span>
        <span className="relative z-10 hidden sm:flex flex-col leading-none pr-1">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#111]/35">Réponse rapide</span>
          <span className="text-sm font-semibold text-[#F97316]">WhatsApp</span>
        </span>
      </a>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <footer className="relative z-10 overflow-hidden bg-[#0E0E0E] text-white/50 py-16 px-6">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 left-[12%] h-40 w-40 rounded-full bg-[#F97316]/12 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-52 w-52 rounded-full bg-[#FB923C]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 rounded-[2rem] border border-white/8 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <div className="grid md:grid-cols-[1.3fr_0.7fr_0.7fr] gap-12 mb-12">
            <div>
              <div className="mb-5">
                <WeboraLogo size="sm" dark={true} />
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-white/42">
                Agence digitale premium, nous créons des sites web qui font croître les restaurants, cafés et commerces locaux.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ['Instagram', 'IG'],
                  ['LinkedIn', 'LI'],
                  ['Twitter/X', 'X'],
                ].map(([label, short]) => (
                  <a key={label} href="#" className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/42 hover:text-white hover:border-white/20 transition-all">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-bold text-white/70 group-hover:bg-[#F97316]/18">
                      {short}
                    </span>
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/18 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_10px_24px_rgba(249,115,22,0.28)]">↗</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/36 mb-1">Création rapide</p>
                  <p className="text-sm font-semibold text-white">48h à 5 jours selon le scope</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-[0.22em]">Navigation</h4>
              <ul className="space-y-3 text-sm">
                {['Services', 'Portfolio', 'Processus', 'Tarifs'].map(l => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="group inline-flex items-center gap-2 text-white/46 hover:text-white transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]/0 group-hover:bg-[#F97316]" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-[0.22em]">Contact</h4>
              <ul className="space-y-3 text-sm text-white/46">
                <li>hello@webora.agency</li>
                <li>+33 6 12 34 56 78</li>
                <li>Paris, France</li>
              </ul>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/36 mb-2">Disponibilité</p>
                <p className="text-sm font-semibold text-white">Nouveaux projets ouverts cette semaine</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/34">
            <p>© 2026 Webora. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
}

