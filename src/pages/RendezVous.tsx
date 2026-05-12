import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSubmitRendezVous } from "@workspace/api-client-react";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, Phone, Video } from "lucide-react";

const ORG = "linear-gradient(135deg,#F97316,#FB923C)";

const days = [
  { key: "mar", label: "Mardi", date: "14 mai" },
  { key: "mer", label: "Mercredi", date: "15 mai" },
  { key: "jeu", label: "Jeudi", date: "16 mai" },
  { key: "ven", label: "Vendredi", date: "17 mai" },
];

const slotsByDay: Record<string, string[]> = {
  mar: ["10:00", "11:30", "14:00", "16:30"],
  mer: ["09:30", "12:00", "15:00", "17:30"],
  jeu: ["10:30", "13:00", "15:30", "18:00"],
  ven: ["09:00", "11:00", "14:30", "16:00"],
};

export default function RendezVous() {
  const [selectedDay, setSelectedDay] = useState(days[0].key);
  const [selectedSlot, setSelectedSlot] = useState(slotsByDay[days[0].key][1]);
  const [meetingType, setMeetingType] = useState<"visio" | "appel">("visio");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    website: "",
    notes: "",
  });

  const selectedDayLabel = useMemo(
    () => days.find((item) => item.key === selectedDay),
    [selectedDay]
  );

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submitRendezVous = useSubmitRendezVous({
    mutation: { onSuccess: () => setSubmitted(true) },
  });

  const canSubmit = form.name && form.email && form.business && selectedSlot;

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.1),transparent_32%),linear-gradient(180deg,rgba(255,247,240,0.95),rgba(255,255,255,0.94)_40%,rgba(255,250,246,0.92))]" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#111]/58 hover:text-[#F97316] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/14 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#F97316] shadow-sm">
              <CalendarDays className="w-3.5 h-3.5" />
              Rendez-vous stratégique
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
            <section className="rounded-[2rem] border border-[#F1F1F1] bg-white p-7 sm:p-8 shadow-[0_24px_60px_rgba(17,17,17,0.05)]">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[clamp(2.6rem,7vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.05em] max-w-[10ch]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Réservez un appel de cadrage.
              </motion.h1>
              <p className="mt-5 text-lg leading-relaxed text-[#111]/62 max-w-xl">
                On échange 15 minutes pour comprendre votre activité, votre objectif et vous orienter vers la bonne formule.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Audit rapide de votre présence actuelle",
                  "Recommandation sur le bon format de site",
                  "Plan d'action concret pour le lancement",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#FAFAFA] px-4 py-4">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#111]/68">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.7rem] bg-[#111] px-5 py-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/36 mb-4">Format du rendez-vous</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMeetingType("visio")}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all ${meetingType === "visio" ? "border-white/24 bg-white/12" : "border-white/10 bg-white/4 hover:bg-white/8"}`}
                  >
                    <Video className="w-5 h-5 mb-3 text-[#FB923C]" />
                    <p className="font-bold">Visio</p>
                    <p className="text-sm text-white/55 mt-1">Lien envoyé par email</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType("appel")}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all ${meetingType === "appel" ? "border-white/24 bg-white/12" : "border-white/10 bg-white/4 hover:bg-white/8"}`}
                  >
                    <Phone className="w-5 h-5 mb-3 text-[#FB923C]" />
                    <p className="font-bold">Appel téléphonique</p>
                    <p className="text-sm text-white/55 mt-1">On vous appelle à l'heure choisie</p>
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#F1F1F1] bg-white p-7 sm:p-8 shadow-[0_24px_60px_rgba(17,17,17,0.05)]">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-18 h-18 mx-auto mb-6 rounded-full flex items-center justify-center text-white" style={{ background: ORG }}>
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Rendez-vous confirmé
                  </h2>
                  <p className="text-[#111]/60 max-w-md mx-auto leading-relaxed">
                    Merci {form.name}, on vous envoie la confirmation pour {selectedDayLabel?.label} {selectedDayLabel?.date} à {selectedSlot}.
                  </p>
                  <div className="mt-8 flex justify-center gap-3">
                    <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#111]/10 px-5 py-3 text-sm font-bold text-[#111] hover:border-[#F97316]/30 hover:text-[#F97316] transition-all">
                      Retour à l'accueil
                    </Link>
                    <Link href="/devis" className="inline-flex items-center justify-center rounded-full bg-[#111] px-5 py-3 text-sm font-bold text-white transition-all">
                      Demander un devis
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#111]/36 mb-2">Choisissez un créneau</p>
                      <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Disponibilités
                      </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#111]/58">
                      <Clock3 className="w-4 h-4 text-[#F97316]" />
                      15 minutes
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3 mb-5">
                    {days.map((day) => (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => {
                          setSelectedDay(day.key);
                          setSelectedSlot(slotsByDay[day.key][0]);
                        }}
                        className={`rounded-2xl border px-4 py-4 text-left transition-all ${selectedDay === day.key ? "border-[#F97316] bg-[#F97316]/6 shadow-sm" : "border-[#F1F1F1] hover:border-[#F97316]/24"}`}
                      >
                        <p className="text-sm font-bold text-[#111]">{day.label}</p>
                        <p className="text-xs text-[#111]/48 mt-1">{day.date}</p>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {slotsByDay[selectedDay].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-full border px-4 py-3 text-sm font-bold transition-all ${selectedSlot === slot ? "border-[#F97316] bg-[#111] text-white shadow-[0_14px_28px_rgba(17,17,17,0.12)]" : "border-[#F1F1F1] text-[#111]/66 hover:border-[#F97316]/30"}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Votre nom *" value={form.name} onChange={(value) => update("name", value)} placeholder="Jean Dupont" />
                    <Field label="Email *" type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="vous@domaine.fr" />
                    <Field label="Entreprise *" value={form.business} onChange={(value) => update("business", value)} placeholder="Le Bistro Parisien" />
                    <Field label="Site actuel" value={form.website} onChange={(value) => update("website", value)} placeholder="https://..." />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-bold mb-2">Ce que vous voulez débloquer</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={5}
                      placeholder="Ex: refonte du site, plus de réservations, besoin d'un meilleur portfolio..."
                      className="w-full rounded-2xl border border-[#F1F1F1] px-4 py-3 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/15 transition"
                    />
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#FAFAFA] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#111]">
                        {selectedDayLabel?.label} {selectedDayLabel?.date} · {selectedSlot}
                      </p>
                      <p className="text-sm text-[#111]/52">
                        {meetingType === "visio" ? "Visio" : "Appel téléphonique"} · confirmation envoyée par email
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={!canSubmit || submitRendezVous.isPending}
                      onClick={() => {
                        submitRendezVous.mutate({
                          data: {
                            name: form.name,
                            email: form.email,
                            business: form.business,
                            website: form.website || null,
                            notes: form.notes || null,
                            day: selectedDay,
                            slot: selectedSlot,
                            meetingType,
                          },
                        });
                      }}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_16px_34px_rgba(249,115,22,0.28)] hover:-translate-y-0.5 transition-all"
                      style={{ background: ORG }}
                    >
                      {submitRendezVous.isPending ? "Confirmation..." : "Confirmer le rendez-vous"}
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-2xl border border-[#F1F1F1] px-4 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/15 transition"
      />
    </div>
  );
}
