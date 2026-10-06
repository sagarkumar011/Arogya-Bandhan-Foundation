import prisma from "@/lib/prisma";

export interface ProgramData {
  id: string;
  slug: string;
  title: string;
  hindiTitle?: string | null;
  category: string;
  icon: string;
  imageUrl: string;
  description: string;
  detailedContent: string;
  targetGroup: string;
  target?: string;
  location: string;
  objectives: string[];
  displayOrder?: number;
}

export const ALL_PROGRAMS: ProgramData[] = [
  {
    id: "prog-health-camps",
    slug: "health-camps",
    title: "Community Health Camps",
    hindiTitle: "सामुदायिक स्वास्थ्य शिविर",
    category: "Healthcare",
    icon: "Stethoscope",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    description: "Free medical checkups, doctor consultations, essential medicine distribution, and specialized eye and diagnostic screenings in remote and underserved villages.",
    detailedContent: "Our health camps bring certified physicians, diagnostic equipment, and life-saving medicines directly to doorsteps of marginalized rural families who lack primary healthcare access. We organize comprehensive multi-specialty camps offering general medicine, pediatric care, eye screenings with free spectacles, diabetes and hypertension testing, and distribution of essential medicines without charge.",
    targetGroup: "Rural families, elderly citizens & underserved communities",
    target: "Rural families, elderly citizens & underserved communities",
    location: "Grassroots Villages & Remote Clusters, Bihar",
    objectives: [
      "Free doctor consultations and diagnostic health checkups in underserved rural areas.",
      "Distribution of essential life-saving medicines and pediatric supplements.",
      "Preventive health awareness, eye screenings, and maternal care guidance.",
      "100% transparent reporting and zero middlemen execution.",
    ],
    displayOrder: 1,
  },
  {
    id: "prog-food-drives",
    slug: "food-drives",
    title: "Food Distribution & Annadaan",
    hindiTitle: "अन्नदान एवं भोजन वितरण",
    category: "Food Support",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    description: "Weekly community food drives, nutritious meal distribution for impoverished children, and grocery ration kits for destitute elderly and daily-wage families.",
    detailedContent: "Ensuring no child or vulnerable family sleeps hungry through community kitchens, fortified nutrition programs, and monthly grain distribution to destitute households. Our Annadaan drives provide hot wholesome meals, dry ration kits containing rice, pulses, wheat flour, and cooking oil to daily-wage laborers, widows, and vulnerable rural families.",
    targetGroup: "Underprivileged children, destitute seniors & daily-wage families",
    target: "Underprivileged children, destitute seniors & daily-wage families",
    location: "Urban Slums & Rural Communities, Bihar",
    objectives: [
      "Weekly Annadaan community kitchens providing nutritious hot meals.",
      "Monthly dry ration kits distribution for destitute elderly and widows.",
      "Supplementary nutritional snacks and milk drives for slum children.",
      "Emergency hunger relief during cold waves and local crises.",
    ],
    displayOrder: 2,
  },
  {
    id: "prog-mass-marriage",
    slug: "mass-marriage",
    title: "Samuhik Vivah / Mass Marriage",
    hindiTitle: "सामूहिक विवाह महोत्सव",
    category: "Social Welfare",
    icon: "HeartHandshake",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    description: "Assisting economically weaker families by organizing dignified mass wedding ceremonies, providing essential household starter kits, and blessing new beginnings.",
    detailedContent: "Alleviating catastrophic marriage debt for impoverished families by arranging community weddings with full cultural dignity, clothing, and household starter essentials. We support eligible underprivileged brides and grooms with wedding attire, utensils, bedding, and community feasts while adhering to legal marriage registration.",
    targetGroup: "Economically disadvantaged brides, grooms & vulnerable families",
    target: "Economically disadvantaged brides, grooms & vulnerable families",
    location: "Community Centers & Civic Grounds, Bihar",
    objectives: [
      "Organizing grand, dignified traditional ceremonies for eligible couples.",
      "Providing essential household gift hampers and starter utilities.",
      "Facilitating legal marriage registration and government documentation.",
      "Protecting impoverished rural families from debilitating high-interest wedding debts.",
    ],
    displayOrder: 3,
  },
  {
    id: "prog-child-education",
    slug: "child-education",
    title: "Child Welfare & Education (Vidyadaan)",
    hindiTitle: "बाल कल्याण एवं शिक्षा सहायता (विद्यादान)",
    category: "Education & Child Welfare",
    icon: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    description: "Distribution of school bags, textbooks, stationery kits, digital learning aids, and remedial coaching camps to prevent dropouts in rural schools.",
    detailedContent: "Breaking the cycle of poverty by ensuring underprivileged boys and girls have books, uniforms, school bags, and remedial teachers to excel in school. We establish after-school learning centers, promote girl child education, and provide nutrition and health screenings to keep children healthy and eager to learn.",
    targetGroup: "Children aged 0-14, rural students & out-of-school youth",
    target: "Children aged 0-14 in distressed socioeconomic settlements",
    location: "Rural Government Schools & Slum Learning Centers, Bihar",
    objectives: [
      "Distribution of school bags, notebooks, stationery kits, and textbooks.",
      "Free after-school remedial coaching for children struggling in basic literacy and math.",
      "Encouraging girl-child school retention and reducing dropout rates.",
      "Nutritional support and routine pediatric checkups for enrolled children.",
    ],
    displayOrder: 4,
  },
  {
    id: "prog-women-empowerment",
    slug: "women-empowerment",
    title: "Women Empowerment & Livelihood",
    hindiTitle: "महिला सशक्तिकरण एवं स्वावलंबन",
    category: "Women Empowerment",
    icon: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
    description: "Vocational skill training in tailoring, handicrafts, computer basics, and financial literacy to empower rural women with dignified self-reliance.",
    detailedContent: "Equipping rural homemakers, single mothers, and adolescent girls with certified tailoring training, free sewing machines, and access to self-help micro-finance groups. Our empowerment centers foster financial independence, entrepreneurial spirit, and confidence so women can lead dignified, self-sustaining lives.",
    targetGroup: "Rural women, adolescent girls & Self-Help Group (SHG) members",
    target: "Rural women, adolescent girls & Self-Help Group (SHG) members",
    location: "Women Skill Centers & Village Clusters, Bihar",
    objectives: [
      "Professional tailoring, embroidery, and handicraft training courses.",
      "Distribution of sewing machines to graduating underprivileged women.",
      "Basic digital literacy and household financial management workshops.",
      "Formation and mentoring of women Self-Help Groups (SHGs) for micro-enterprises.",
    ],
    displayOrder: 5,
  },
  {
    id: "prog-community-awareness",
    slug: "community-awareness",
    title: "Community Awareness & Social Welfare",
    hindiTitle: "सामाजिक जागरूकता एवं जन कल्याण",
    category: "Community Awareness",
    icon: "Users",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    description: "Grassroots awareness drives on hygiene, sanitation, government welfare schemes, child rights, and legal literacy for underserved citizens.",
    detailedContent: "Empowering rural and slum communities through interactive awareness workshops, street plays (Nukkad Natak), and guidance desks explaining entitlement schemes such as Ayushman Bharat, widow pensions, and educational subsidies. We bridge the critical information gap so eligible citizens can access their rightful public benefits.",
    targetGroup: "Rural citizens, daily-wage laborers & marginalized communities",
    target: "Rural citizens, daily-wage laborers & marginalized communities",
    location: "Gram Panchayats & Community Chaupals, Bihar",
    objectives: [
      "Grassroots legal literacy and public welfare scheme registration camps.",
      "Water, sanitation, and hygiene (WASH) community workshops.",
      "De-addiction and health awareness in rural localities.",
      "Mobilizing citizen volunteers for local community problem-solving.",
    ],
    displayOrder: 6,
  },
  {
    id: "prog-community-support",
    slug: "community-support",
    title: "Community Support & Social Service",
    hindiTitle: "सामुदायिक सहयोग एवं सामाजिक सेवा",
    category: "Community Support",
    icon: "Users",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    description: "Elderly care companionship, winter clothing distribution, destitute family aid, and fostering grassroots mutual-aid volunteer networks.",
    detailedContent: "Strengthening community bonds through senior citizen support circles, annual winter blanket distribution drives, and localized mutual-aid neighborhood volunteer squads. We provide direct humanitarian aid to destitute families, abandoned elderly, and differently-abled individuals.",
    targetGroup: "Elderly persons, destitute individuals & marginalized citizens",
    target: "Elderly persons, destitute individuals & marginalized citizens",
    location: "Community Centers & Local Neighborhoods, Bihar",
    objectives: [
      "Annual winter relief drives distributing warm blankets and woolens.",
      "Care, mobility aids, and medical assistance for destitute seniors.",
      "Emergency financial aid and dry rations for families in distress.",
      "Building local volunteer networks to support vulnerable neighbors.",
    ],
    displayOrder: 7,
  },
  {
    id: "prog-rural-development",
    slug: "rural-development",
    title: "Rural & Village Development",
    hindiTitle: "ग्रामोत्थान एवं ग्रामीण विकास",
    category: "Rural Welfare",
    icon: "Trees",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
    description: "Clean drinking water installations, community sanitation drives, solar street lights, and village chaupal renovation for sustainable community living.",
    detailedContent: "Partnering with village panchayats to establish clean drinking water kiosks, community soak pits, solar street lighting, and village tree-planting drives to foster sustainable rural living.",
    targetGroup: "Remote rural villages, farmer communities & tribal belts",
    target: "Remote rural villages, farmer communities & tribal belts",
    location: "Remote Villages & Panchayats, Bihar",
    objectives: [
      "Installation of clean drinking water filtration points.",
      "Solar street lights in unlit rural village paths.",
      "Tree plantation and environmental conservation drives.",
      "Community sanitation and village hygiene infrastructure.",
    ],
    displayOrder: 8,
  },
  {
    id: "prog-emergency-relief",
    slug: "emergency-relief",
    title: "Emergency & Disaster Relief",
    hindiTitle: "आपदा राहत एवं आपातकालीन सहायता",
    category: "Disaster Relief",
    icon: "LifeBuoy",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
    description: "Rapid on-ground deployment during floods, extreme cold waves, or crises with emergency dry rations, tarpaulins, warm blankets, and medical kits.",
    detailedContent: "Rapid response volunteer teams delivering immediate emergency sustenance kits, winter blankets, tarpaulins, and temporary shelter rehabilitation during natural calamities and seasonal crises.",
    targetGroup: "Disaster-affected families & homeless individuals",
    target: "Disaster-affected families & homeless individuals",
    location: "Disaster Affected Regions & Slums, Bihar",
    objectives: [
      "Immediate emergency dry food rations and drinking water packets.",
      "Temporary shelter tarpaulins, warm bedding, and winter clothes.",
      "Mobile medical first-aid teams and water-purifying tablets.",
      "Long-term recovery and rehabilitation assistance for displaced families.",
    ],
    displayOrder: 9,
  },
  {
    id: "prog-blood-donation-camps",
    slug: "blood-donation-camps",
    title: "Voluntary Blood Donation Drives",
    hindiTitle: "रक्तदान महादान शिविर",
    category: "Healthcare",
    icon: "Droplet",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
    description: "Partnering with certified government blood banks to conduct safe voluntary blood donation drives, emergency donor matching, and thalassemia support.",
    detailedContent: "Mobilizing youth and civic volunteers to build a dependable emergency donor registry and support thalassemic children requiring monthly transfusions. We partner with certified government blood banks under sterile medical protocols.",
    targetGroup: "Patients in urgent need of life-saving blood and platelets",
    target: "Patients in urgent need of life-saving blood and platelets",
    location: "Civic Halls, Colleges & Hospital Blood Banks, Bihar",
    objectives: [
      "Conducting voluntary blood donation camps with certified blood banks.",
      "Building a 24/7 verified emergency donor helpline and database.",
      "Free blood support for children suffering from Thalassemia and Hemophilia.",
      "Promoting awareness to debunk myths around voluntary blood donation.",
    ],
    displayOrder: 10,
  },
];

// Slug alias resolver
const SLUG_ALIASES: Record<string, string> = {
  "food-distribution": "food-drives",
  "food-drives": "food-drives",
  "child-welfare": "child-education",
  "education-support": "child-education",
  "child-education": "child-education",
  "community-welfare": "community-support",
  "community-support": "community-support",
  "community-awareness": "community-awareness",
  "health-camps": "health-camps",
  "mass-marriage": "mass-marriage",
  "women-empowerment": "women-empowerment",
  "rural-development": "rural-development",
  "emergency-relief": "emergency-relief",
  "blood-donation-camps": "blood-donation-camps",
};

export async function getProgramBySlug(rawSlug: string): Promise<ProgramData | null> {
  const normalized = (rawSlug || "").toLowerCase().trim();
  const canonicalSlug = SLUG_ALIASES[normalized] || normalized;

  // 1. Try finding in in-memory constant first or by canonical slug
  const fallback = ALL_PROGRAMS.find(
    (p) => p.slug === canonicalSlug || p.slug === normalized || p.id === normalized
  );

  // 2. Try DB if available, augmenting or returning DB data if present
  try {
    const dbProgram = await prisma.program.findFirst({
      where: {
        OR: [
          { slug: canonicalSlug },
          { slug: normalized },
          { id: normalized },
        ],
      },
    });

    if (dbProgram) {
      return {
        id: dbProgram.id,
        slug: dbProgram.slug,
        title: dbProgram.title,
        hindiTitle: dbProgram.hindiTitle,
        category: fallback?.category || "Social Welfare",
        icon: dbProgram.icon || fallback?.icon || "Heart",
        imageUrl: dbProgram.imageUrl || fallback?.imageUrl || "/images/program_medical.jpg",
        description: dbProgram.description,
        detailedContent: dbProgram.detailedContent || fallback?.detailedContent || dbProgram.description,
        targetGroup: dbProgram.targetGroup || fallback?.targetGroup || "Vulnerable Communities",
        target: dbProgram.targetGroup || fallback?.targetGroup || "Vulnerable Communities",
        location: dbProgram.location || fallback?.location || "Grassroots Communities, Bihar",
        objectives: fallback?.objectives || [
          "Direct grassroots distribution and execution ensuring zero middlemen leakage.",
          "Active engagement of verified local community volunteers and coordinators.",
          "100% transparent reporting and auditable outcomes.",
        ],
        displayOrder: dbProgram.displayOrder,
      };
    }
  } catch {
    // Database unavailable, gracefully proceed with fallback
  }

  return fallback || null;
}

export function getOtherPrograms(currentSlug: string, count = 3): ProgramData[] {
  const canonical = SLUG_ALIASES[currentSlug] || currentSlug;
  return ALL_PROGRAMS.filter((p) => p.slug !== canonical && p.slug !== currentSlug).slice(0, count);
}
