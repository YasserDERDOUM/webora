import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Sparkles, Clock, Shield, Send,
  Utensils, Coffee, ShoppingBag, Briefcase, Star
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ORG = 'linear-gradient(135deg,#F97316,#FB923C)';

const PLANS = [
  { id: 'starter', name: 'Starter', price: '499€', desc: 'Site vitrine simple, livré en 48h.' },
  { id: 'pro', name: 'Pro', price: '999€', desc: 'Site complet + SEO + réservation.', popular: true },
  { id: 'premium', name: 'Premium', price: '1999€', desc: 'Sur-mesure, e-commerce, intégrations.' },
];

const BUSINESS_TYPES = [
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'cafe', label: 'Café / Bar', icon: Coffee },
  { id: 'commerce', label: 'Commerce local', icon: ShoppingBag },
  { id: 'autre', label: 'Autre', icon: Briefcase },
];

export default function Devis() {
  const [location] = useLocation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    plan: 'pro',
    type: 'restaurant',
    name: '',
    business: '',
    email: '',
    phone: '',
    city: '',
    website: '',
    budget: '',
    deadline: '',
    message: '',
  });

  // pre-select plan from query (?plan=pro)
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const p = qs.get('plan');
    if (p && PLANS.some(pl => pl.id === p)) setForm(f => ({ ...f, plan: p }));
  }, [location]);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook to backend / email service
    await new Promise(r => setTimeout(r, 700));
    setSubmitted(true);
  };

  const canNext1 = form.plan && form.type;
  const canNext2 = form.name && form.email && form.business;

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── DYNAMIC BG ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: 'radial-gradient(circle,#F97316,transparent 70%)' }}
          animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.14] blur-3xl"
          style={{ background: 'radial-gradient(circle,#FB923C,transparent 70%)' }}
          animate={{ x: [0, 80, 40, 0], y: [0, -50, 30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-20 px-6 py-5 border-b border-[#F1F1F1] bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#111]/60 hover:text-[#F97316] transition">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">Devis gratuit · 24h</span>
        </div>
      </header>

      <main className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12">

          {/* LEFT — FORM */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F97316]/30 bg-[#F97316]/8 text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Demande de devis
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Parlons de votre <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: ORG, backgroundClip: 'text' }}>projet</span>.
              </h1>
              <p className="text-lg text-[#111]/55 mb-10 max-w-xl">
                Remplissez ce formulaire en 2 minutes. On vous répond sous 24h avec un devis détaillé et un appel de cadrage gratuit.
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-[#F1F1F1] bg-white p-12 text-center shadow-xl"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: ORG }}>
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>Demande reçue !</h2>
                <p className="text-[#111]/60 mb-8 max-w-md mx-auto">
                  Merci {form.name}, on revient vers vous sous 24h à l'adresse <strong>{form.email}</strong> avec un devis détaillé.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/33612345678" target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-lg hover:scale-105 transition">
                    <SiWhatsapp className="w-5 h-5" /> Échanger sur WhatsApp
                  </a>
                  <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#111]/15 font-bold hover:border-[#F97316] hover:text-[#F97316] transition">
                    Retour à l'accueil
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-[#F1F1F1] bg-white p-8 md:p-10 shadow-xl">

                {/* Stepper */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="flex-1 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step >= n ? 'text-white shadow-md' : 'bg-[#F1F1F1] text-[#111]/40'
                      }`} style={step >= n ? { background: ORG } : undefined}>
                        {n}
                      </div>
                      {n < 3 && <div className={`flex-1 h-1 rounded-full ${step > n ? 'bg-[#F97316]' : 'bg-[#F1F1F1]'}`} />}
                    </div>
                  ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold mb-3">Quelle formule vous intéresse ?</label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {PLANS.map(p => (
                          <button type="button" key={p.id} onClick={() => update('plan', p.id)}
                            className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
                              form.plan === p.id ? 'border-[#F97316] bg-[#F97316]/5 shadow-md' : 'border-[#F1F1F1] hover:border-[#F97316]/40'
                            }`}>
                            {p.popular && (
                              <span className="absolute -top-2 right-3 text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: ORG }}>POPULAIRE</span>
                            )}
                            <div className="text-xs font-semibold uppercase tracking-wider text-[#111]/40 mb-1">Formule</div>
                            <div className="text-lg font-extrabold" style={{ fontFamily: "'Syne',sans-serif" }}>{p.name}</div>
                            <div className="text-2xl font-black my-1" style={{ color: '#F97316', fontFamily: "'Syne',sans-serif" }}>{p.price}</div>
                            <p className="text-xs text-[#111]/55">{p.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-3">Type d'activité</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {BUSINESS_TYPES.map(b => (
                          <button type="button" key={b.id} onClick={() => update('type', b.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                              form.type === b.id ? 'border-[#F97316] bg-[#F97316]/5' : 'border-[#F1F1F1] hover:border-[#F97316]/40'
                            }`}>
                            <b.icon className={`w-6 h-6 ${form.type === b.id ? 'text-[#F97316]' : 'text-[#111]/50'}`} />
                            <span className="text-sm font-semibold">{b.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button type="button" disabled={!canNext1} onClick={() => setStep(2)}
                        className="px-8 py-3.5 rounded-full text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:scale-[1.02] transition"
                        style={{ background: ORG }}>
                        Continuer →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Votre nom *" value={form.name} onChange={v => update('name', v)} placeholder="Jean Dupont" />
                      <Field label="Nom de l'entreprise *" value={form.business} onChange={v => update('business', v)} placeholder="Le Bistro Parisien" />
                      <Field label="Email *" type="email" value={form.email} onChange={v => update('email', v)} placeholder="vous@domaine.fr" />
                      <Field label="Téléphone" value={form.phone} onChange={v => update('phone', v)} placeholder="+33 6 12 34 56 78" />
                      <Field label="Ville" value={form.city} onChange={v => update('city', v)} placeholder="Paris" />
                      <Field label="Site actuel (si existant)" value={form.website} onChange={v => update('website', v)} placeholder="https://..." />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-3 rounded-full font-bold text-[#111]/60 hover:text-[#111] transition">
                        ← Retour
                      </button>
                      <button type="button" disabled={!canNext2} onClick={() => setStep(3)}
                        className="px-8 py-3.5 rounded-full text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:scale-[1.02] transition"
                        style={{ background: ORG }}>
                        Continuer →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">Budget envisagé</label>
                        <select value={form.budget} onChange={e => update('budget', e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-[#F1F1F1] bg-white focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 transition">
                          <option value="">Choisir...</option>
                          <option value="<500">Moins de 500€</option>
                          <option value="500-1000">500€ – 1 000€</option>
                          <option value="1000-2000">1 000€ – 2 000€</option>
                          <option value="2000+">Plus de 2 000€</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Délai souhaité</label>
                        <select value={form.deadline} onChange={e => update('deadline', e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-[#F1F1F1] bg-white focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 transition">
                          <option value="">Choisir...</option>
                          <option value="48h">Urgent — 48h</option>
                          <option value="1sem">Sous 1 semaine</option>
                          <option value="2-4sem">2 à 4 semaines</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Parlez-nous de votre projet</label>
                      <Textarea
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        rows={5}
                        placeholder="Vos objectifs, ce qui vous plaît, ce qu'il vous faut absolument..."
                        className="rounded-xl border-[#F1F1F1] focus-visible:ring-[#F97316]/30"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button type="button" onClick={() => setStep(2)} className="px-6 py-3 rounded-full font-bold text-[#111]/60 hover:text-[#111] transition">
                        ← Retour
                      </button>
                      <button type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold shadow-lg hover:scale-[1.02] transition"
                        style={{ background: ORG }}>
                        <Send className="w-4 h-4" /> Envoyer ma demande
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}
          </div>

          {/* RIGHT — TRUST PANEL */}
          <aside className="space-y-5">
            <div className="rounded-3xl p-7 text-white shadow-xl relative overflow-hidden" style={{ background: ORG }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>Pourquoi Webora ?</h3>
              <ul className="space-y-3 text-sm">
                {[
                  ['Réponse sous 24h', 'Toujours, même le week-end.'],
                  ['Devis transparent', 'Pas de frais cachés.'],
                  ['Livraison 48h–5j', 'Selon la formule choisie.'],
                  ['Satisfait ou remboursé', '14 jours pour changer d\'avis.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{t}</p>
                      <p className="text-white/80 text-xs">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl p-7 bg-white border border-[#F1F1F1] shadow-md">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F97316] text-[#F97316]" />)}
                <span className="ml-2 text-sm font-bold">4.9/5</span>
              </div>
              <p className="text-sm text-[#111]/70 italic mb-4">
                "Devis reçu en 6h, site livré en 4 jours, réservations doublées le mois suivant. Aucune hésitation."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center" style={{ background: ORG }}>M</div>
                <div>
                  <p className="text-sm font-bold">Marc L.</p>
                  <p className="text-xs text-[#111]/50">Le Bistro Parisien</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-7 bg-[#FAFAFA] border border-[#F1F1F1]">
              <div className="flex items-center gap-2 mb-2 text-[#F97316]">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">100% confidentiel</span>
              </div>
              <p className="text-xs text-[#111]/60">
                Vos infos restent chez nous. Aucun spam, aucun partage à des tiers.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#111]/50 px-2">
              <Clock className="w-4 h-4" /> Temps moyen de réponse : 4h
            </div>
          </aside>
        </div>
      </main>

      {/* floating WhatsApp */}
      <a
        href="https://wa.me/33612345678"
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-[#25D366] text-white font-bold shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <SiWhatsapp className="w-6 h-6 relative z-10" />
        <span className="relative z-10 hidden sm:inline text-sm">WhatsApp</span>
      </a>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl border-[#F1F1F1] focus-visible:ring-[#F97316]/30 focus-visible:border-[#F97316]"
      />
    </div>
  );
}
