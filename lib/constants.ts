import { ALL_PROGRAMS } from "./programs-data";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:3000";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "http://localhost:3000";

export const BRAND = {
  name: "Arogya Bandhan Foundation",
  shortName: "ABF",
  tagline: "Healthy People | Stronger Communities",
  website: SITE_URL,
  mission:
    "Arogya Bandhan Foundation works for the welfare of communities through healthcare camps, education, food support, social welfare, women and child development, mass marriage initiatives and community service.",
  phone: "+91 75449 90585",
  email: "aarogyabandhanfoundation@gmail.com",
  address: "Village – Tetarpur, P.O. – Khagaul, Police Station – Danapur, District – Patna, Bihar",
  addressHindi: "ग्राम – टेटरपुर, पो० – खगौल, थाना – दानापुर, जिला – पटना, बिहार",
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

export { ALL_PROGRAMS };
export const PROGRAM_LIST = ALL_PROGRAMS;

