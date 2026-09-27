export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arogya-bandhan-foundation-2.onrender.com";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://arogya-bandhan-foundation-2.onrender.com";

export const BRAND = {
  name: "Arogya Bandhan Foundation",
  shortName: "ABF",
  tagline: "Healthy People | Stronger Communities",
  website: SITE_URL,
  mission:
    "Arogya Bandhan Foundation works for the welfare of communities through healthcare camps, education, food support, social welfare, women and child development, mass marriage initiatives and community service.",
  phone: "+91 98765 43210",
  email: "contact@arogyabandhan.org",
  address: "Plot 42, Institutional Area, Sector 18, New Delhi - 110001, India",
  officeHours: "Monday - Saturday: 9:00 AM - 6:00 PM IST",
  colors: {
    primaryGreen: "#087F5B",
    secondaryBlue: "#0877C9",
    accentOrange: "#F58220",
    lightGreen: "#EAF7F2",
    lightBlue: "#EAF4FB",
    softOrange: "#FFF2E8",
    dark: "#0B2F2A",
    text: "#17324D",
  },
  socials: {
    facebook: "https://facebook.com/arogyabandhan",
    instagram: "https://instagram.com/arogyabandhan",
    youtube: "https://youtube.com/@arogyabandhan",
    linkedin: "https://linkedin.com/company/arogyabandhan",
    twitter: "https://x.com/arogyabandhan",
  },
  donationAmounts: [100, 500, 1000, 2500, 5000],
  complianceNote:
    "Transparency is our foundation. Official registration and statutory documents are managed in our public compliance ledger.",
};

export const DONATION_CATEGORIES = [
  { id: "general", label: "❤️ General Welfare", desc: "Support overall foundation activities where needed most" },
  { id: "health_camps", label: "🏥 Health Camps", desc: "Free diagnostic checkups, doctor consultations & essential medicines" },
  { id: "food_distribution", label: "🍛 Food Distribution", desc: "Warm community meals and nutritious ration kits for vulnerable families" },
  { id: "mass_marriage", label: "💍 Mass Marriage (Samuhik Vivah)", desc: "Supporting eligible couples with dignified weddings and household kits" },
  { id: "child_welfare", label: "👶 Child Welfare", desc: "Nutritional therapy, health screening and safety for young children" },
  { id: "education", label: "📚 Education", desc: "School bags, books, learning materials and remedial learning support" },
  { id: "women_empowerment", label: "👩 Women Empowerment", desc: "Sewing machines, vocational training and self-help group initiatives" },
  { id: "emergency_relief", label: "🆘 Emergency Relief", desc: "Disaster response, dry rations, blankets and crisis assistance" },
  { id: "community_development", label: "🏘️ Community Development", desc: "Village cleanliness, drinking water points and rural civic infrastructure" },
];

export const PROGRAM_LIST = [
  {
    title: "Community Health Camps",
    hindiTitle: "सामुदायिक स्वास्थ्य शिविर",
    slug: "health-camps",
    icon: "Stethoscope",
    category: "Healthcare",
    description:
      "Free medical checkups, doctor consultations, essential medicine distribution, and specialized eye and diagnostic screenings in remote and underserved villages.",
    target: "Rural families, elderly citizens & underserved communities",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Food Distribution & Annadaan",
    hindiTitle: "अन्नदान एवं भोजन वितरण",
    slug: "food-distribution",
    icon: "Utensils",
    category: "Food Support",
    description:
      "Weekly community food drives, nutritious meal distribution for impoverished children, and grocery ration kits for destitute elderly and daily-wage families.",
    target: "Underprivileged children, destitute seniors & daily-wage families",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Samuhik Vivah / Mass Marriage",
    hindiTitle: "सामूहिक विवाह महोत्सव",
    slug: "mass-marriage",
    icon: "HeartHandshake",
    category: "Social Welfare",
    description:
      "Assisting economically weaker families by organizing dignified mass wedding ceremonies, providing essential household starter kits, and blessing new beginnings.",
    target: "Economically disadvantaged brides, grooms & vulnerable families",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Child Welfare & Protection",
    hindiTitle: "बाल कल्याण एवं सुरक्षा",
    slug: "child-welfare",
    icon: "Baby",
    category: "Children",
    description:
      "Nurturing orphaned and vulnerable children with supplementary nutrition, routine pediatric health checkups, clothing, and safe community learning spaces.",
    target: "Children aged 0-14 in distressed socioeconomic settlements",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Education Support & Vidyadaan",
    hindiTitle: "शिक्षा सहायता एवं विद्यादान",
    slug: "education-support",
    icon: "BookOpen",
    category: "Education",
    description:
      "Distribution of school bags, textbooks, stationery kits, digital learning aids, and remedial coaching camps to prevent dropouts in rural schools.",
    target: "Primary & secondary students in rural and slum areas",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Women Empowerment & Livelihood",
    hindiTitle: "महिला सशक्तिकरण एवं स्वावलंबन",
    slug: "women-empowerment",
    icon: "Sparkles",
    category: "Women",
    description:
      "Vocational skill training in tailoring, handicrafts, computer basics, and financial literacy to empower rural women with dignified self-reliance.",
    target: "Rural women, adolescent girls & Self-Help Group (SHG) members",
    imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rural & Village Development",
    hindiTitle: "ग्रामोत्थान एवं ग्रामीण विकास",
    slug: "rural-development",
    icon: "Trees",
    category: "Rural Welfare",
    description:
      "Clean drinking water installations, community sanitation drives, solar street lights, and village chaupal renovation for sustainable community living.",
    target: "Remote rural villages, farmer communities & tribal belts",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Emergency & Disaster Relief",
    hindiTitle: "आपदा राहत एवं आपातकालीन सहायता",
    slug: "emergency-relief",
    icon: "LifeBuoy",
    category: "Disaster Relief",
    description:
      "Rapid on-ground deployment during floods, extreme cold waves, or crises with emergency dry rations, tarpaulins, warm blankets, and medical kits.",
    target: "Disaster-affected families & homeless individuals",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Voluntary Blood Donation Drives",
    hindiTitle: "रक्तदान महादान शिविर",
    slug: "blood-donation-camps",
    icon: "Droplet",
    category: "Healthcare",
    description:
      "Partnering with certified government blood banks to conduct safe voluntary blood donation drives, emergency donor matching, and thalassemia support.",
    target: "Patients in urgent need of life-saving blood and platelets",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Community Welfare & Social Service",
    hindiTitle: "सामाजिक सेवा एवं जन कल्याण",
    slug: "community-welfare",
    icon: "Users",
    category: "Community",
    description:
      "Elderly care companionship, winter clothing distribution, legal and civic awareness camps, and fostering grassroots volunteer solidarity.",
    target: "Elderly persons, destitute individuals & marginalized citizens",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
  },
];
