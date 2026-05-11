export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  city: string;
  delivery: string;
  domain: string;
  image: string;
  badge: string;
  summary: string;
  result: string;
  focus: string;
  tags: string[];
  heroMetrics: { value: string; label: string }[];
  timeline: string[];
  challenge: string;
  solution: string[];
  outcomes: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "le-bistro-parisien",
    name: "Le Bistro Parisien",
    category: "Gastronomie française",
    city: "Paris 6ème",
    delivery: "livré en 4 jours",
    domain: "lebistroparisien.fr",
    image: "/portfolio-1.png",
    badge: "Live",
    summary:
      "Refonte complète du site avec réservation mobile-first, menu saisonnier et pages locales optimisées pour Google Maps.",
    result: "+38% réservations",
    focus: "Réservation instantanée",
    tags: ["SEO local", "Réservation", "QR Menu"],
    heroMetrics: [
      { value: "+38%", label: "réservations" },
      { value: "#1", label: "sur Google Maps" },
      { value: "4.9★", label: "note Google" },
    ],
    timeline: [
      "Jour 1 · cadrage, identité visuelle et architecture",
      "Jour 2 · landing, menu et tunnel de réservation",
      "Jour 4 · SEO local, analytics et mise en ligne",
    ],
    challenge:
      "Le restaurant avait une image très premium sur place, mais un site trop daté qui ne convertissait pas les visiteurs mobiles.",
    solution: [
      "Refonte de la hiérarchie de contenu pour mettre la réservation au centre.",
      "Création d'un menu plus immersif et plus lisible sur mobile.",
      "Optimisation du référencement local et des pages d'accès rapide.",
    ],
    outcomes: [
      "Hausse immédiate des réservations en ligne dès le premier mois.",
      "Meilleure perception de marque grâce à un design éditorial plus fort.",
      "Site plus rapide et plus simple à maintenir pour l'équipe.",
    ],
  },
  {
    slug: "tokyo-street-food",
    name: "Tokyo Street Food",
    category: "Street food",
    city: "Lyon",
    delivery: "livré en 3 jours",
    domain: "tokyostreetfood.fr",
    image: "/portfolio-2.png",
    badge: "Live",
    summary:
      "Site rapide orienté commande, click & collect et visibilité locale pour maximiser les commandes récurrentes.",
    result: "+52% commandes",
    focus: "Commande rapide",
    tags: ["QR Menu", "Maps", "Click & Collect"],
    heroMetrics: [
      { value: "+52%", label: "commandes" },
      { value: "+31%", label: "clics mobile" },
      { value: "3 j", label: "livraison projet" },
    ],
    timeline: [
      "Jour 1 · cadrage express et structure conversion",
      "Jour 2 · menu dynamique et click & collect",
      "Jour 3 · mise en ligne et tracking",
    ],
    challenge:
      "La marque générait déjà du trafic social, mais les utilisateurs perdaient du temps avant de commander.",
    solution: [
      "Refonte complète du parcours mobile.",
      "Mise en avant des best sellers et call-to-action plus visibles.",
      "Connexion plus claire entre menu, horaires et commande.",
    ],
    outcomes: [
      "Meilleure fluidité du tunnel de commande.",
      "Baisse des abandons sur mobile.",
      "Plus de commandes récurrentes à l'heure du déjeuner.",
    ],
  },
  {
    slug: "mama-pasta",
    name: "Mama Pasta",
    category: "Italien",
    city: "Bordeaux",
    delivery: "livré en 5 jours",
    domain: "mamapasta.fr",
    image: "/portfolio-3.png",
    badge: "Live",
    summary:
      "Refonte chaleureuse et plus visible localement, pensée pour les recherches Google et la réservation.",
    result: "+44% visites",
    focus: "Visibilité locale",
    tags: ["SEO", "Réservation", "Menu"],
    heroMetrics: [
      { value: "+44%", label: "visites" },
      { value: "+22%", label: "temps passé" },
      { value: "5 j", label: "livraison projet" },
    ],
    timeline: [
      "Jour 1 · audit et repositionnement visuel",
      "Jour 3 · contenu, menu et réservation",
      "Jour 5 · SEO local et publication",
    ],
    challenge:
      "Le restaurant manquait de visibilité et de personnalité en ligne malgré une bonne expérience sur place.",
    solution: [
      "Design plus éditorial et plus gourmand.",
      "Structuration SEO des pages clés.",
      "Réservation plus visible sur mobile et desktop.",
    ],
    outcomes: [
      "Trafic local en hausse.",
      "Meilleure cohérence entre image réelle et image digitale.",
      "Plus de demandes organiques sans dépendre uniquement d'Instagram.",
    ],
  },
  {
    slug: "urban-burger",
    name: "Urban Burger",
    category: "Burger gourmet",
    city: "Marseille",
    delivery: "livré en 4 jours",
    domain: "urbanburger.fr",
    image: "/portfolio-4.png",
    badge: "Live",
    summary:
      "Refonte plus urbaine et plus directe, orientée conversion mobile et avis Google.",
    result: "+61% clics",
    focus: "Conversion mobile",
    tags: ["Click & Collect", "SEO", "Avis Google"],
    heroMetrics: [
      { value: "+61%", label: "clics" },
      { value: "+28%", label: "avis consultés" },
      { value: "4 j", label: "livraison projet" },
    ],
    timeline: [
      "Jour 1 · identité visuelle et storytelling",
      "Jour 2 · landing et carte produit",
      "Jour 4 · publication et SEO",
    ],
    challenge:
      "Le site ne valorisait ni les produits, ni les preuves sociales, ni la rapidité du service.",
    solution: [
      "Refonte graphique plus assumée.",
      "Mise en avant des avis et des produits stars.",
      "Call-to-action plus visibles sur mobile.",
    ],
    outcomes: [
      "Plus de clics vers les actions clés.",
      "Meilleure valorisation de la marque.",
      "Expérience plus efficace pour les utilisateurs pressés.",
    ],
  },
  {
    slug: "casa-verde",
    name: "Casa Verde",
    category: "Cuisine méditerranéenne",
    city: "Nice",
    delivery: "livré en 4 jours",
    domain: "casaverde.fr",
    image: "/portfolio-1.png",
    badge: "Live",
    summary:
      "Site plus premium pour renforcer la perception de marque et soutenir les réservations groupe.",
    result: "+33% réservations",
    focus: "Image premium",
    tags: ["Refonte", "Storytelling", "SEO local"],
    heroMetrics: [
      { value: "+33%", label: "réservations" },
      { value: "+19%", label: "demandes groupe" },
      { value: "4 j", label: "livraison projet" },
    ],
    timeline: [
      "Jour 1 · direction artistique",
      "Jour 2 · pages expérience et événements",
      "Jour 4 · intégration et publication",
    ],
    challenge:
      "Le lieu était beau, mais l'univers digital ne reflétait pas l'expérience réelle ni le niveau de prix.",
    solution: [
      "Design plus sensoriel et plus éditorial.",
      "Valorisation des moments forts et de la salle.",
      "Réassurance renforcée pour les réservations groupe.",
    ],
    outcomes: [
      "Meilleure perception de marque.",
      "Hausse des demandes pour les repas de groupe.",
      "Contenu plus réutilisable pour les réseaux sociaux.",
    ],
  },
  {
    slug: "sakura-sushi",
    name: "Sakura Sushi",
    category: "Sushi bar",
    city: "Lille",
    delivery: "livré en 3 jours",
    domain: "sakurasushi.fr",
    image: "/portfolio-2.png",
    badge: "Live",
    summary:
      "Menu digital plus clair, plus rapide et plus agréable à consulter en salle comme à distance.",
    result: "+58% scans menu",
    focus: "Menu digital",
    tags: ["QR Menu", "Livraison", "Menu dynamique"],
    heroMetrics: [
      { value: "+58%", label: "scans menu" },
      { value: "+24%", label: "temps menu" },
      { value: "3 j", label: "livraison projet" },
    ],
    timeline: [
      "Jour 1 · architecture menu et design",
      "Jour 2 · UX mobile et QR",
      "Jour 3 · mise en ligne",
    ],
    challenge:
      "Le menu PDF cassait l'expérience mobile et ne pouvait pas évoluer facilement.",
    solution: [
      "Passage à un menu digital structuré.",
      "Navigation simplifiée par catégories.",
      "Visuels plus cohérents pour les plats phares.",
    ],
    outcomes: [
      "Lecture plus fluide du menu.",
      "Mises à jour plus faciles côté équipe.",
      "Usage plus fort du QR code en salle.",
    ],
  },
];

export const featuredProject = portfolioProjects[0];
