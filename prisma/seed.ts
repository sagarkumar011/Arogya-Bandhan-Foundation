// ===============================================================
// AROGYA BANDHAN FOUNDATION - COMPREHENSIVE SEED DATA
// Tagline: "Healthy People | Stronger Communities"
// Position: Broad Social Welfare Foundation / Trust
// NOTE: DEMO DATA — REPLACE BEFORE PRODUCTION
// ===============================================================

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Arogya Bandhan Foundation database seed...");

  // Clean existing tables (in order of relations)
  await prisma.adminActivityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.paymentTransaction.deleteMany();
  await prisma.donationReceipt.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.volunteerApplication.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.galleryAlbum.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.successStory.deleteMany();
  await prisma.transparencyDocument.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.program.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Demo Users
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash("Admin@12345", salt);
  const userPasswordHash = await bcrypt.hash("User@12345", salt);

  const admin = await prisma.user.create({
    data: {
      email: "admin@arogyabandhan.org",
      name: "Dr. Arvind Sharma",
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      phone: "+91 98765 00001",
      city: "New Delhi",
      address: "Institutional Area, Sector 18, New Delhi",
      emailVerified: true,
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      email: "user@arogyabandhan.org",
      name: "Rajesh Kumar",
      passwordHash: userPasswordHash,
      role: "USER",
      status: "ACTIVE",
      phone: "+91 98765 00002",
      city: "Lucknow",
      address: "Aliganj, Lucknow, Uttar Pradesh",
      emailVerified: true,
    },
  });

  console.log("✅ Created Demo Admin and Demo User");

  // 2. Create 10 Official Programs (Broad Social Welfare)
  const programs = [
    {
      title: "Community Health Camps",
      hindiTitle: "सामुदायिक स्वास्थ्य शिविर",
      slug: "health-camps",
      icon: "Stethoscope",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      description: "Free medical checkups, doctor consultations, essential medicine distribution, and specialized eye and diagnostic screenings in remote villages.",
      detailedContent: "Our health camps bring certified physicians, diagnostic equipment, and life-saving medicines directly to doorsteps of marginalized rural families who lack primary healthcare access.",
      targetGroup: "Rural families, elderly citizens & underserved communities",
      location: "Grassroots Villages & Remote Clusters",
      displayOrder: 1,
    },
    {
      title: "Food Distribution & Annadaan",
      hindiTitle: "अन्नदान एवं भोजन वितरण",
      slug: "food-distribution",
      icon: "Utensils",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      description: "Weekly community food drives, nutritious meal distribution for impoverished children, and grocery ration kits for destitute elderly and daily-wage families.",
      detailedContent: "Ensuring no child sleeps hungry through community kitchens, fortified nutrition programs, and monthly grain distribution to destitute households.",
      targetGroup: "Underprivileged children, destitute seniors & daily-wage families",
      location: "Urban Slums & Rural Communities",
      displayOrder: 2,
    },
    {
      title: "Samuhik Vivah / Mass Marriage",
      hindiTitle: "सामूहिक विवाह महोत्सव",
      slug: "mass-marriage",
      icon: "HeartHandshake",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      description: "Assisting economically weaker families by organizing dignified mass wedding ceremonies, providing essential household starter kits, and blessing new beginnings.",
      detailedContent: "Alleviating catastrophic marriage debt for impoverished families by arranging community weddings with full cultural dignity, clothing, and household starter essentials.",
      targetGroup: "Economically disadvantaged brides, grooms & vulnerable families",
      location: "Community Centers & Civic Grounds",
      displayOrder: 3,
    },
    {
      title: "Child Welfare & Protection",
      hindiTitle: "बाल कल्याण एवं सुरक्षा",
      slug: "child-welfare",
      icon: "Baby",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      description: "Nurturing orphaned and vulnerable children with supplementary nutrition, routine pediatric health checkups, clothing, and safe community learning spaces.",
      detailedContent: "Creating holistic protection ecosystems where children receive balanced meals, routine pediatric checkups, emotional care, and a safe childhood.",
      targetGroup: "Children aged 0-14 in distressed socioeconomic settlements",
      location: "Grassroots Child Welfare Centers",
      displayOrder: 4,
    },
    {
      title: "Education Support & Vidyadaan",
      hindiTitle: "शिक्षा सहायता एवं विद्यादान",
      slug: "education-support",
      icon: "BookOpen",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
      description: "Distribution of school bags, textbooks, stationery kits, digital learning aids, and remedial coaching camps to prevent dropouts in rural schools.",
      detailedContent: "Breaking the cycle of poverty by ensuring underprivileged boys and girls have books, uniforms, solar lamps, and remedial teachers to excel in school.",
      targetGroup: "Primary & secondary students in rural and slum areas",
      location: "Rural Government Schools & Community Centers",
      displayOrder: 5,
    },
    {
      title: "Women Empowerment & Livelihood",
      hindiTitle: "महिला सशक्तिकरण एवं स्वावलंबन",
      slug: "women-empowerment",
      icon: "Sparkles",
      imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
      description: "Vocational skill training in tailoring, handicrafts, computer basics, and financial literacy to empower rural women with dignified self-reliance.",
      detailedContent: "Equipping rural homemakers and adolescent girls with certified tailoring training, free sewing machines, and access to self-help micro-finance groups.",
      targetGroup: "Rural women, adolescent girls & Self-Help Group (SHG) members",
      location: "Women Skill Centers",
      displayOrder: 6,
    },
    {
      title: "Rural & Village Development",
      hindiTitle: "ग्रामोत्थान एवं ग्रामीण विकास",
      slug: "rural-development",
      icon: "Trees",
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
      description: "Clean drinking water installations, community sanitation drives, solar street lights, and village chaupal renovation for sustainable community living.",
      detailedContent: "Partnering with village panchayats to establish clean drinking water kiosks, community soak pits, solar street lighting, and village tree-planting drives.",
      targetGroup: "Remote rural villages, farmer communities & tribal belts",
      location: "Remote Villages & Panchayats",
      displayOrder: 7,
    },
    {
      title: "Emergency & Disaster Relief",
      hindiTitle: "आपदा राहत एवं आपातकालीन सहायता",
      slug: "emergency-relief",
      icon: "LifeBuoy",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
      description: "Rapid on-ground deployment during floods, extreme cold waves, or crises with emergency dry rations, tarpaulins, warm blankets, and medical kits.",
      detailedContent: "Rapid response volunteer teams delivering immediate emergency sustenance kits, winter blankets, and temporary shelter rehabilitation during calamities.",
      targetGroup: "Disaster-affected families & homeless individuals",
      location: "Disaster Affected Regions & Slums",
      displayOrder: 8,
    },
    {
      title: "Voluntary Blood Donation Drives",
      hindiTitle: "रक्तदान महादान शिविर",
      slug: "blood-donation-camps",
      icon: "Droplet",
      imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
      description: "Partnering with certified government blood banks to conduct safe voluntary blood donation drives, emergency donor matching, and thalassemia support.",
      detailedContent: "Mobilizing youth and civic volunteers to build a dependable emergency donor registry and support thalassemic children requiring monthly transfusions.",
      targetGroup: "Patients in urgent need of life-saving blood and platelets",
      location: "Civic Halls & College Campuses",
      displayOrder: 9,
    },
    {
      title: "Community Welfare & Social Service",
      hindiTitle: "सामाजिक सेवा एवं जन कल्याण",
      slug: "community-welfare",
      icon: "Users",
      imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
      description: "Elderly care companionship, winter clothing distribution, legal and civic awareness camps, and fostering grassroots volunteer solidarity.",
      detailedContent: "Strengthening community bonds through senior citizen support circles, winter sweater drives, and localized mutual-aid neighborhood volunteer squads.",
      targetGroup: "Elderly persons, destitute individuals & marginalized citizens",
      location: "Community Centers",
      displayOrder: 10,
    },
  ];

  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }
  console.log("✅ Created 10 Social Welfare Programs");

  // 3. Create Diverse Social Welfare Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      title: "Support a Samuhik Vivah (Mass Marriage of 25 Couples)",
      hindiTitle: "सामूहिक विवाह महोत्सव — 25 कन्याओं का कन्यादान",
      slug: "support-samuhik-vivah-mass-marriage",
      category: "Mass Marriage",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      description: "Supporting 25 underprivileged couples with a dignified traditional wedding ceremony, essential household starter kits, and bride blessings.",
      story: "For many economically disadvantaged families in rural India, marriage expenses cause crippling, generational moneylender debt. Arogya Bandhan Foundation organizes an honorable, joyful Samuhik Vivah where couples are provided with bridal attire, household utensils, bedding, and community blessings without spending their life savings.",
      goalAmount: 350000,
      raisedAmount: 140000,
      donorsCount: 38,
      beneficiariesCount: 50,
      status: "ACTIVE",
      isFeatured: true,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-11-30"),
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      title: "Feed 500 Families (Monthly Nutrition & Ration Kits)",
      hindiTitle: "अन्नपूर्णा अभियान — 500 परिवारों को मासिक राशन किट",
      slug: "feed-500-families-monthly-ration",
      category: "Food Distribution",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      description: "Providing wholesome monthly ration packs containing wheat flour, rice, pulses, cooking oil, and basic spices to 500 destitute families.",
      story: "Daily-wage workers, widows, and elderly citizens often face acute food insecurity. Our Annapurna drive distributes wholesome, dignified dry ration kits providing complete 30-day nourishment for a family of four, ensuring no elder or infant suffers from hunger.",
      goalAmount: 250000,
      raisedAmount: 115000,
      donorsCount: 45,
      beneficiariesCount: 2000,
      status: "ACTIVE",
      isFeatured: true,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-12-31"),
    },
  });

  const campaign3 = await prisma.campaign.create({
    data: {
      title: "School Bags & Books for 600 Rural Children",
      hindiTitle: "विद्यादान — 600 ग्रामीण बच्चों हेतु बस्ते व पुस्तकें",
      slug: "school-bags-books-rural-children",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
      description: "Equipping first-generation learners in remote government schools with durable school bags, textbooks, notebooks, and learning stationery.",
      story: "A lack of basic notebooks and a torn bag often leads rural children to drop out of school in frustration. By gifting complete learning packs and conducting weekend remedial reading sessions, we inspire children to remain in school and dream of brighter futures.",
      goalAmount: 200000,
      raisedAmount: 92000,
      donorsCount: 31,
      beneficiariesCount: 600,
      status: "ACTIVE",
      isFeatured: true,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-10-31"),
    },
  });

  const campaign4 = await prisma.campaign.create({
    data: {
      title: "Women Skill Development & Sewing Machine Distribution",
      hindiTitle: "महिला स्वावलंबन — सिलाई मशीन एवं कौशल प्रशिक्षण",
      slug: "women-tailoring-skill-development",
      category: "Women Empowerment",
      imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
      description: "Sponsoring 3-month tailoring courses and gifting sewing machines to 100 rural women to help them earn dignified home-based income.",
      story: "Empowering a mother transforms an entire generation. This campaign funds hands-on tailoring and garment-making training and awards heavy-duty sewing machines upon graduation, enabling rural women to generate independent income for their family's education and nutrition.",
      goalAmount: 180000,
      raisedAmount: 76000,
      donorsCount: 22,
      beneficiariesCount: 100,
      status: "ACTIVE",
      isFeatured: true,
      startDate: new Date("2026-02-15"),
      endDate: new Date("2026-11-15"),
    },
  });

  const campaign5 = await prisma.campaign.create({
    data: {
      title: "Free Community Health & Eye Screening Camps in 20 Villages",
      hindiTitle: "निःशुल्क स्वास्थ्य एवं नेत्र जांच शिविर (20 गांव)",
      slug: "free-health-eye-camps-20-villages",
      category: "Healthcare",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      description: "Organizing weekend diagnostic camps with volunteer doctors, basic blood tests, free prescription glasses, and vital medicines.",
      story: "Preventative healthcare saves lives. In remote villages where the nearest primary health center is 20 km away, our health camps bring qualified physicians, blood pressure screening, diabetes tests, and free eye glasses directly to village chaupals.",
      goalAmount: 300000,
      raisedAmount: 135000,
      donorsCount: 36,
      beneficiariesCount: 3500,
      status: "ACTIVE",
      isFeatured: true,
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  const campaign6 = await prisma.campaign.create({
    data: {
      title: "Winter Relief: Warm Blankets & Clothes for Homeless Families",
      hindiTitle: "शीतकालीन राहत — जरूरतमंदों हेतु गर्म कंबल व वस्त्र वितरण",
      slug: "winter-relief-blankets-clothing",
      category: "Emergency Relief",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
      description: "Distributing thick winter blankets, sweaters, and woolens to roadside laborers, destitute elderly, and children facing harsh winter.",
      story: "Harsh north Indian winters are life-threatening for homeless individuals and poorly sheltered slum families. Our volunteers conduct midnight distribution drives providing thick thermal blankets and warm woolens to protect vulnerable lives.",
      goalAmount: 150000,
      raisedAmount: 62000,
      donorsCount: 19,
      beneficiariesCount: 800,
      status: "ACTIVE",
      isFeatured: false,
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  console.log("✅ Created 6 Diverse Social Welfare Campaigns");

  // 4. Initial Verified Donations
  const donation1 = await prisma.donation.create({
    data: {
      donationNumber: "ABF-DON-2026-0001",
      userId: demoUser.id,
      donorName: "Rajesh Kumar",
      donorEmail: "user@arogyabandhan.org",
      donorPhone: "+91 98765 00002",
      donorPan: "ABCDE1234F",
      campaignId: campaign1.id,
      amount: 2500,
      currency: "INR",
      frequency: "ONE_TIME",
      status: "SUCCESS",
      paymentMethod: "RAZORPAY",
      razorpayOrderId: "order_mock_001",
      razorpayPaymentId: "pay_mock_001",
      receiptNumber: "ABF-REC-2026-0001",
    },
  });

  await prisma.paymentTransaction.create({
    data: {
      donationId: donation1.id,
      gateway: "RAZORPAY",
      orderId: "order_mock_001",
      paymentId: "pay_mock_001",
      signature: "simulated_success_sig",
      status: "SUCCESS",
      amount: 2500,
    },
  });

  await prisma.donationReceipt.create({
    data: {
      receiptNumber: "ABF-REC-2026-0001",
      donationId: donation1.id,
      donorName: "Rajesh Kumar",
      donorEmail: "user@arogyabandhan.org",
      amount: 2500,
      campaignName: campaign1.title,
    },
  });

  // 5. Create Broad Social Welfare Events
  const event1 = await prisma.event.create({
    data: {
      title: "Annual Samuhik Vivah (Mass Marriage) Mahotsav",
      slug: "annual-samuhik-vivah-mahotsav-2026",
      category: "Mass Marriage",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      description: "Dignified community wedding ceremony for 25 eligible couples with Vedic rituals, bride blessing kits, and community feast.",
      detailedStory: "Organized with wide community support. Each couple is gifted household essentials, kitchen utensils, bridal wear, and legal marriage registration certificates.",
      eventDate: new Date("2026-11-20T10:00:00Z"),
      startTime: "10:00 AM",
      endTime: "05:00 PM",
      location: "Ramleela Grounds, Aliganj, Lucknow",
      venueAddress: "Aliganj Main Grounds, Lucknow, Uttar Pradesh - 226024",
      registrationLimit: 500,
      registeredCount: 140,
      status: "OPEN",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Mega Community Health & Eye Screening Camp",
      slug: "mega-community-health-eye-camp",
      category: "Health Camp",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      description: "Comprehensive health checkup by general physicians, pediatricians, ophthalmologists with free eye glasses and basic medication.",
      detailedStory: "Organized in collaboration with volunteer medical specialists. Services include blood pressure screening, diabetes check, cataract evaluation, and pediatric nutrition guidance.",
      eventDate: new Date("2026-10-15T09:00:00Z"),
      startTime: "09:00 AM",
      endTime: "04:30 PM",
      location: "Community Hall, Vikas Nagar, Lucknow",
      venueAddress: "Vikas Nagar Sector 4, Lucknow, Uttar Pradesh - 226022",
      registrationLimit: 250,
      registeredCount: 65,
      status: "OPEN",
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "Annapurna Food Drive & Ration Distribution",
      slug: "annapurna-food-drive-ration-distribution",
      category: "Food Distribution",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      description: "Distributing 500 hot nutritious meals and 100 dry ration packs to daily-wage workers and destitute elderly citizens.",
      detailedStory: "Join our volunteers for community meal preparation and distribution. All grains and ingredients are sourced locally from small farmers.",
      eventDate: new Date("2026-10-25T11:00:00Z"),
      startTime: "11:00 AM",
      endTime: "03:00 PM",
      location: "ABF Civic Centre, New Delhi",
      venueAddress: "Plot 42, Institutional Area, Sector 18, New Delhi",
      registrationLimit: 100,
      registeredCount: 42,
      status: "OPEN",
    },
  });

  await prisma.eventRegistration.create({
    data: {
      eventId: event1.id,
      userId: demoUser.id,
      fullName: "Rajesh Kumar",
      email: "user@arogyabandhan.org",
      phone: "+91 98765 00002",
      ticketNumber: "ABF-TKT-2026-0001",
      status: "CONFIRMED",
    },
  });

  console.log("✅ Seeded Events & Registration");

  // 6. Volunteer Application
  await prisma.volunteerApplication.create({
    data: {
      userId: demoUser.id,
      fullName: "Rajesh Kumar",
      email: "user@arogyabandhan.org",
      phone: "+91 98765 00002",
      city: "Lucknow",
      occupation: "Social Worker & Teacher",
      skills: "Community Mobilization, Event Management, Food Distribution",
      areasOfInterest: "Community Work, Mass Marriage, Food Distribution",
      availability: "Weekends",
      message: "I am deeply inspired by Arogya Bandhan Foundation's holistic community welfare initiatives and would love to coordinate during mass marriages and food drives.",
      status: "APPROVED",
      reviewedBy: admin.id,
      reviewNotes: "Strong community background. Approved for welfare events coordination.",
    },
  });

  // 7. Success Stories Across Verticals
  await prisma.successStory.create({
    data: {
      title: "Dignity and Joy: Rekha & Sunil's Wedding at Samuhik Vivah",
      slug: "rekha-sunil-samuhik-vivah",
      category: "Mass Marriage",
      location: "Hardoi District, Uttar Pradesh",
      challenge: "Rekha's elderly widowed father had suffered a paralyzing stroke, making it impossible for the family to bear traditional marriage expenses.",
      supportProvided: "Arogya Bandhan Foundation welcomed Rekha and Sunil into our annual Samuhik Vivah, providing complete bridal attire, household starter essentials, and a community feast.",
      outcome: "The couple began their married life with joy and zero debt burden, surrounded by community elders and well-wishers.",
      personName: "Rekha & Sunil (Beneficiaries)",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      quote: "Our marriage felt like a festival of blessings. My father did not have to borrow a single rupee from moneylenders.",
      isPublished: true,
    },
  });

  await prisma.successStory.create({
    data: {
      title: "Nutritious Meals Restoring Smiles for Chhotu & Friends",
      slug: "nutritious-meals-chhotu",
      category: "Food Distribution",
      location: "East Delhi Slum Settlements",
      challenge: "8-year-old Chhotu and his younger sister often scavenged empty-stomach when their mother worked 14-hour construction shifts.",
      supportProvided: "Enrolled in Arogya Bandhan's daily community meal program, receiving balanced hot lunches enriched with lentils, milk, and seasonal fruits.",
      outcome: "Chhotu has gained healthy weight, recovered from chronic lethargy, and has regularly started attending the local community study center.",
      personName: "Chhotu & Family",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      quote: "Now we eat hot dal, roti, and kheer every afternoon. I want to study well and help other children too.",
      isPublished: true,
    },
  });

  await prisma.successStory.create({
    data: {
      title: "From Looming Dropout to School Topper: Aarav's Journey",
      slug: "aarav-education-journey",
      category: "Education",
      location: "Sitapur Rural Area",
      challenge: "Aarav was on the verge of quitting school after his family could not afford notebooks, school bag, or exam fees.",
      supportProvided: "Provided a complete Vidyadaan kit (bag, books, geometry box) and enrolled him in our after-school volunteer coaching center.",
      outcome: "Aarav scored 88% in his class 8 board examinations and now aspires to become a civil engineer.",
      personName: "Aarav Sharma",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
      quote: "My new school bag gave me confidence. When volunteers sat with me to teach mathematics, my fear vanished.",
      isPublished: true,
    },
  });

  await prisma.successStory.create({
    data: {
      title: "Smt. Sunita Devi Becoming a Self-Reliant Micro-Entrepreneur",
      slug: "sunita-devi-tailoring-journey",
      category: "Women Empowerment",
      location: "Barabanki District, Uttar Pradesh",
      challenge: "After losing her husband during the pandemic, Sunita had no independent source of income to support her two daughters.",
      supportProvided: "Completed Arogya Bandhan Foundation's 3-month tailoring and garment design training and received a donated heavy-duty sewing machine.",
      outcome: "She now operates a bustling home tailoring business, earning ₹9,000 monthly and paying for both daughters' private school fees.",
      personName: "Smt. Sunita Devi",
      imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
      quote: "This sewing machine gave me back my dignity. I don't need to beg anyone to feed my daughters.",
      isPublished: true,
    },
  });

  // 8. Gallery Images Across All Categories
  const galleryImages = [
    {
      title: "Samuhik Vivah: Blessing 25 Couples at Community Wedding",
      caption: "Community elders and volunteers blessing newly married couples during the annual mass marriage festival.",
      category: "Mass Marriage",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      title: "Annapurna Food Drive: Serving Hot Meals to Slum Children",
      caption: "Volunteers distributing wholesome, hygienic khichdi and fruits to 300 children in an urban settlement.",
      category: "Food Distribution",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      title: "Vidyadaan: Distributing School Bags & Books",
      caption: "Joyous first-generation rural students receiving their new school bags and study materials.",
      category: "Education",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      title: "Women Empowerment: Tailoring & Skill Training Center",
      caption: "Rural women practicing garment crafting and sewing machine operations at our livelihood center.",
      category: "Women",
      imageUrl: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      title: "Community Health Camp: Free Eye Screening in Village Chaupal",
      caption: "Volunteer ophthalmologist testing vision and distributing free spectacles to village elders.",
      category: "Health Camps",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
    },
    {
      title: "Child Welfare: Recreational & Growth Monitoring Camp",
      caption: "Children engaging in sports and receiving routine pediatric weight and height checks.",
      category: "Children",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      title: "Winter Relief: Warm Blanket Distribution in Slums",
      caption: "Volunteers handing out thick thermal blankets to homeless families during cold wave.",
      category: "Relief Work",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      title: "Voluntary Blood Donation: Life-Saving Community Drive",
      caption: "Civic volunteers donating blood at our certified university camp.",
      category: "Volunteers",
      imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
      isFeatured: false,
    },
    {
      title: "Village Chaupal: Community Meeting on Sanitation & Welfare",
      caption: "Grassroots dialogue with village elders and women on clean water and social schemes.",
      category: "Community",
      imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
      isFeatured: false,
    },
  ];

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img });
  }

  // 9. Blog Posts (Broad Social Welfare)
  await prisma.blogPost.create({
    data: {
      title: "The Transformative Impact of Samuhik Vivah on Rural Families",
      hindiTitle: "सामूहिक विवाह: ग्रामीण परिवारों के स्वाभिमान व मुक्ति का आधार",
      slug: "impact-of-samuhik-vivah",
      category: "Social Welfare",
      excerpt: "How mass weddings alleviate generational moneylender debt while preserving cultural dignity and celebration.",
      content: "Across rural India, marriage expenses often force smallholder farmers and daily-wage laborers into the hands of exploitative moneylenders. By organizing community weddings with collective participation, Arogya Bandhan Foundation turns what could be a financial disaster into a joyful celebration of solidarity.",
      authorName: "Arogya Bandhan Editorial",
      authorRole: "Welfare Research Cell",
      featuredImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      isPublished: true,
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Why Food Security is the Foundation of Child Learning",
      hindiTitle: "पोषण ही है बाल शिक्षा की मजबूत नींव",
      slug: "food-security-and-child-education",
      category: "Food Support",
      excerpt: "Examining how regular hot meals in slum communities directly reduce absenteeism and enhance cognitive outcomes.",
      content: "A hungry child cannot focus on letters or numbers. When Arogya Bandhan Foundation introduced daily nutritious meal counters in community study centers, attendance leaped by 42%. Food is not merely charity—it is the prerequisite for all educational progress.",
      authorName: "Arogya Bandhan Editorial",
      authorRole: "Child Development Team",
      featuredImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      isPublished: true,
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Bringing Healthcare to the Last Mile: Lessons from 100+ Health Camps",
      hindiTitle: "अंतिम व्यक्ति तक स्वास्थ्य सेवाएं: 100+ शिविरों के अनुभव",
      slug: "last-mile-healthcare-lessons",
      category: "Health Camps",
      excerpt: "Insights from our mobile doctors screening chronic ailments and restoring vision across rural Uttar Pradesh.",
      content: "Most lifestyle and infectious diseases can be managed affordably if caught in early stages. Our free medical camps bring certified doctors and diagnostic equipment right to village chaupals, breaking the barrier of geographical isolation.",
      authorName: "Dr. Arvind Sharma",
      authorRole: "Chief Medical Advisor",
      featuredImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      isPublished: true,
    },
  });

  // 10. Transparency Documents
  const transparencyDocs = [
    {
      title: "Official Foundation Registration Deed",
      category: "Legal Registration",
      year: "2025-26",
      documentUrl: "#",
      fileSize: "1.4 MB",
      isPublic: true,
      statusNote: "Registered Social Welfare Trust under Indian Trusts Act",
    },
    {
      title: "Permanent Account Number (PAN) Card",
      category: "Statutory Compliances",
      year: "2025-26",
      documentUrl: "#",
      fileSize: "450 KB",
      isPublic: true,
      statusNote: "Official Entity PAN Allotted by Income Tax Department",
    },
    {
      title: "Section 12A & 80G Tax Exemption Filing",
      category: "Statutory Compliances",
      year: "2025-26",
      documentUrl: "#",
      fileSize: "850 KB",
      isPublic: true,
      statusNote: "Application Filed & Under Statutory Verification",
    },
    {
      title: "Annual Social Welfare & Impact Report",
      category: "Annual Impact Reports",
      year: "2025-26",
      documentUrl: "#",
      fileSize: "3.2 MB",
      isPublic: true,
      statusNote: "Comprehensive Field Activities, Beneficiaries & Audit Summary",
    },
  ];

  for (const doc of transparencyDocs) {
    await prisma.transparencyDocument.create({ data: doc });
  }

  // 11. Foundation Settings & Public Impact Numbers
  const settingsData = [
    { key: "foundationName", value: "Arogya Bandhan Foundation" },
    { key: "tagline", value: "Healthy People | Stronger Communities" },
    { key: "mission", value: "Arogya Bandhan Foundation works for the welfare of communities through healthcare camps, education, food support, social welfare, women and child development, mass marriage initiatives and community service." },
    { key: "email", value: "contact@arogyabandhan.org" },
    { key: "phone", value: "+91 98765 43210" },
    { key: "address", value: "Plot 42, Institutional Area, Sector 18, New Delhi - 110001, India" },
    { key: "facebookUrl", value: "https://facebook.com/arogyabandhan" },
    { key: "instagramUrl", value: "https://instagram.com/arogyabandhan" },
    { key: "youtubeUrl", value: "https://youtube.com/@arogyabandhan" },
    { key: "linkedinUrl", value: "https://linkedin.com/company/arogyabandhan" },
    { key: "twitterUrl", value: "https://x.com/arogyabandhan" },
    { key: "stat_people_reached", value: "25,000+" },
    { key: "stat_volunteers", value: "750+" },
    { key: "stat_health_camps", value: "150+" },
    { key: "stat_communities_reached", value: "85+" },
  ];

  for (const s of settingsData) {
    await prisma.setting.create({ data: s });
  }

  // 12. Seed FAQs
  const faqs = [
    {
      question: "What is Arogya Bandhan Foundation's core mission?",
      answer: "Arogya Bandhan Foundation is a broad social welfare trust working for community welfare, food distribution, mass marriage assistance for disadvantaged families, child education, women empowerment, and community health camps across India.",
      category: "General",
      displayOrder: 1,
    },
    {
      question: "What is the Samuhik Vivah (Mass Marriage) program?",
      answer: "Our Samuhik Vivah program helps economically weaker families celebrate their daughters' and sons' weddings with dignity, cultural festivities, and complete household starter kits without incurring catastrophic moneylender debt.",
      category: "Programs",
      displayOrder: 2,
    },
    {
      question: "How does the Food Distribution (Annapurna) drive work?",
      answer: "We organize weekly community meals for slum children and distribute monthly dry ration kits (wheat flour, rice, pulses, cooking oil) to destitute elderly citizens and daily-wage families.",
      category: "Programs",
      displayOrder: 3,
    },
    {
      question: "How are my donations utilized?",
      answer: "Every rupee directly supports on-ground social welfare: food distribution, school kits for children, sewing machines for women, wedding kits for mass marriages, and medical supplies for free health camps. Official receipts are generated immediately.",
      category: "Donation",
      displayOrder: 4,
    },
    {
      question: "How can I volunteer with Arogya Bandhan Foundation?",
      answer: "You can apply through our Volunteer page by selecting your areas of interest—such as organizing health camps, food distribution, teaching children, or helping during mass marriage events. Our team will review and connect with you.",
      category: "Volunteering",
      displayOrder: 5,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  console.log("🎉 Database successfully seeded with broad social welfare ecosystem!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
