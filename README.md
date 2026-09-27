# Arogya Bandhan Foundation (आरोग्य बंधन फाउंडेशन)
> **Tagline:** *"Healthy People | Stronger Communities"*  
> **Broad Social Welfare Foundation & Trust**  
> **Production Live URL:** [https://arogya-bandhan-foundation-2.onrender.com](https://arogya-bandhan-foundation-2.onrender.com)

---

## 1. Project Overview & Brand Positioning

**Arogya Bandhan Foundation** is a comprehensive, production-ready, full-stack digital ecosystem for a **broad Indian social welfare foundation and trust**. Built with **Next.js 14 (App Router)**, **TypeScript**, **PostgreSQL / SQLite via Prisma ORM**, **Tailwind CSS**, and **Framer Motion**, it provides an end-to-end connected architecture for:

- **Broad Social Welfare Identity:** Healthcare is only one pillar (~20%) of the Foundation's multifaceted mission. The platform balances:
  - 🍲 **Food Distribution & Annadaan:** Weekly community kitchens and grocery kits for destitute families.
  - 💍 **Samuhik Vivah (Mass Marriage):** Dignified community wedding ceremonies and household starter kits.
  - 👶 **Child Welfare & Protection:** Nutrition, clothing, and safe spaces for vulnerable children.
  - 📚 **Child Education & Vidyadaan:** School bags, textbooks, uniforms, and learning camps.
  - 👩 **Women Empowerment:** Tailoring skill centers, self-reliance workshops, and SHG micro-support.
  - 🏥 **Health Camps & Medical Aid:** Free diagnostic screenings, doctor consultations, and medicine distribution.
  - 🏘️ **Rural & Village Development:** Clean water installations, sanitation, and solar streetlights.
  - 🆘 **Emergency & Disaster Relief:** Immediate food, clothing, and crisis relief supplies.
- **Public Website (18+ Routes):** Fully responsive, bilingual (English/Hindi), accessible, and SEO-optimized public portal with a humanitarian 5-slide hero carousel, program showcases, active community campaigns, verified success stories, events, media gallery, volunteer registration, and statutory transparency filings.
- **Dedicated User Panel (`/user/*`):** Donor portal with 80G tax receipts, personal donation history, volunteer tracking, registered events, and in-app notifications.
- **Dedicated Admin Command Center (`/admin/*`):** Executive governance dashboard with role-based access control (RBAC), multi-metric analytics, dynamic program & campaign management, volunteer vetting, media gallery CMS, blog publishing, transparency document control, and immutable audit logs.
- **Razorpay-Ready Financial Architecture:** End-to-end payment order creation, secure server-side HMAC-SHA256 signature verification, idempotent database ledger, and automated client-side/server-side PDF receipt generation with foundation seal.

---

## 2. Brand Identity & Visual System

The visual design avoids sterile hospital/medical tropes and instead embodies a warm, trustworthy, and dignified Indian social welfare foundation:

- **Primary Brand Color (Trust & Community Green):** `#087F5B` (Represents grassroots growth, community wellbeing, primary CTA buttons)
- **Secondary Color (Professional Blue):** `#0877C9` (Represents education, information, transparent governance)
- **Accent Color (Warm Orange / Saffron):** `#F58220` (Represents donation highlights, vital CTAs, impact numbers)
- **Dark Neutral (Dignified Deep Green):** `#0B2F2A` (Header accents, footer, high-contrast headings)
- **Text Color:** `#17324D` (Optimal readability across devices)
- **Backgrounds:** `#EAF7F2` (Light Green), `#EAF4FB` (Light Blue), `#FFF2E8` (Soft Orange)
- **Official Brand Logo:** Authentically integrated from source files at `public/logo.png` across Header, Footer, Mobile Drawer, Login pages, User Dashboard, and Admin Dashboard.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & UI** | Tailwind CSS, Lucide React Icons, Framer Motion, Canvas Confetti |
| **Charts & Analytics** | Recharts |
| **Backend & APIs** | Next.js Server Components, Route Handlers, Express.js microservice (`server/index.ts`) |
| **Database & ORM** | PostgreSQL (Production) / SQLite (Local Zero-Config Dev), Prisma ORM |
| **Authentication & Security** | JWT (JSON Web Tokens), HTTP-Only Cookies, bcryptjs, Zod validation |
| **Payment Gateway** | Razorpay SDK with SHA256 Signature Verification |
| **Document Generation** | jsPDF with custom foundation seal and branding |
| **Cloud Storage** | Cloudinary / S3-compatible architecture |
| **Email Service** | SMTP / Resend transactional email architecture |

---

## 4. Application Architecture & Folder Structure

```
arogya-bandhan-foundation/
├── app/
│   ├── api/                              # REST API Route Handlers
│   │   ├── auth/                         # Register, Login, Me, Logout, Change-Password
│   │   ├── campaigns/                    # Public & ID campaign endpoints
│   │   ├── programs/                     # Public programs list
│   │   ├── donations/                    # Razorpay order, signature verification, receipts
│   │   ├── volunteers/                   # Application submission & tracking
│   │   ├── events/                       # Health camps, registrations
│   │   ├── gallery/                      # Media assets & categories
│   │   ├── blog/                         # Articles & health guides
│   │   ├── contact/                      # Contact enquiry submissions
│   │   ├── transparency/                 # Public legal & compliance records
│   │   ├── notifications/                # User in-app notifications
│   │   ├── users/profile/                # Member profile updates
│   │   └── admin/                        # Admin Endpoints (RBAC Enforced)
│   │       ├── analytics/                # Multi-period donation/user trends
│   │       ├── donations/                # Donation ledger & CSV exports
│   │       ├── campaigns/                # Campaign CRUD & status
│   │       ├── programs/                 # Program CRUD & ordering
│   │       ├── volunteers/               # Review & approval pipeline
│   │       ├── events/                   # Camp scheduling & attendee roster
│   │       ├── users/                    # User directory & role assignment
│   │       ├── gallery/                  # Photo uploads & featured badges
│   │       ├── blog/                     # Article publishing CMS
│   │       ├── transparency/             # Governance document manager
│   │       ├── contact/                  # Message management & notes
│   │       ├── audit-logs/               # Immutable activity trail
│   │       └── settings/                 # Foundation identity & impact stats
│   ├── (public pages)
│   │   ├── page.tsx                      # Master Homepage
│   │   ├── about/                        # Mission, Vision, Core Values
│   │   ├── programs/ & [slug]/           # 10 Official Welfare Programs
│   │   ├── campaigns/ & [slug]/          # Live fundraising campaigns with real stats
│   │   ├── donate/                       # Dedicated donation flow & instant receipt
│   │   ├── gallery/                      # Filterable media showcase
│   │   ├── events/                       # Health checkup camps & RSVPs
│   │   ├── success-stories/              # Community impact narratives
│   │   ├── volunteer/                    # Application submission form
│   │   ├── transparency/                 # Statutory compliance filings
│   │   ├── blog/ & [slug]/               # Medical and health publications
│   │   ├── contact/                      # Secretariat coordinates & inquiry form
│   │   ├── faq/                          # Frequently Asked Questions
│   │   ├── privacy-policy/               # Data protection notice
│   │   └── terms-and-conditions/         # Donor & participant terms
│   ├── user/                             # USER PANEL
│   │   ├── layout.tsx                    # User dashboard navigation
│   │   ├── login/ & register/            # Donor authentication
│   │   ├── dashboard/                    # Giving overview & quick stats
│   │   ├── donations/                    # Transaction ledger
│   │   ├── receipts/                     # PDF download center
│   │   ├── volunteer/                    # My volunteer applications
│   │   ├── events/                       # My registered camps
│   │   ├── profile/                      # Personal coordinates
│   │   ├── notifications/                # Real-time event notifications
│   │   └── security/                     # Password updates
│   └── admin/                            # ADMIN COMMAND CENTER
│       ├── layout.tsx                    # Executive dark sidebar & RBAC guard
│       ├── login/                        # Admin credential validation
│       ├── dashboard/                    # Executive KPI cards & recent activity
│       ├── analytics/                    # Recharts financial and growth trends
│       ├── donations/                    # Financial ledger & CSV exporter
│       ├── campaigns/                    # Campaign builder & monitor
│       ├── programs/                     # Welfare programs CMS
│       ├── volunteers/                   # Application vetting & status updates
│       ├── events/                       # Health camp manager
│       ├── users/                        # Member directory & role controls
│       ├── gallery/                      # Media gallery manager
│       ├── blog/                         # Article publishing CMS
│       ├── transparency/                 # Governance & legal documents
│       ├── contact/                      # Citizen messages & status tracker
│       ├── audit-logs/                   # Cryptographic security audit log
│       └── settings/                     # Foundation details & live impact stats
├── components/                           # Reusable UI Components
│   ├── Header.tsx                        # Sticky navigation with EN/HI toggle
│   ├── Footer.tsx                        # Single official footer
│   ├── CampaignCard.tsx                  # Real-time progress calculation
│   ├── ProgramCard.tsx                   # Welfare initiative card
│   ├── ImpactCounter.tsx                 # Animated database-driven stats
│   ├── QuickDonationModal.tsx            # Modal checkout with PDF receipt
│   ├── EventCard.tsx                     # Camp registration card
│   └── GalleryLightbox.tsx               # Modal image viewer
├── contexts/                             # Global React State
│   ├── AuthContext.tsx                   # User session & role management
│   └── LanguageContext.tsx               # English / Hindi translation toggle
├── lib/                                  # Utilities & Core Services
│   ├── prisma.ts                         # Prisma client singleton
│   ├── auth.ts                           # JWT signing, verify, bcrypt, RBAC
│   ├── constants.ts                      # Foundation defaults & 10 programs
│   ├── razorpay.ts                       # Payment orders & HMAC verification
│   ├── receipt-generator.ts              # jsPDF official donation receipt
│   └── email.ts                          # Transactional email templates
├── prisma/
│   ├── schema.prisma                     # SQLite schema (instant local run)
│   ├── schema.postgresql.prisma          # PostgreSQL schema (production)
│   ├── seed.ts                           # Database seeder with demo accounts
│   └── dev.db                            # SQLite database file
└── public/
    ├── logo.png                          # Official uploaded brand logo
    ├── images/                           # Authentic high-resolution photos
    └── favicon.ico                       # Platform icon
```

---

## 5. Getting Started (Local Development)

### Prerequisites
- Node.js LTS (v18 or v20+)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-org/arogya-bandhan-foundation.git
cd "Arogya Bandhan Foundation"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` settings for local SQLite execution:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="arogya_bandhan_super_secure_jwt_secret_key_2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
RAZORPAY_KEY_ID="rzp_test_placeholder"
RAZORPAY_KEY_SECRET="rzp_secret_placeholder"
```

### 3. Initialize & Seed Database
```bash
npx prisma db push
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 6. Default Demo Credentials

> **Notice:** The database is pre-seeded with initial development data.

| Account Type | Email | Password | Role | Permissions |
|---|---|---|---|---|
| **Super Admin** | `admin@arogyabandhan.org` | `Admin@12345` | `SUPER_ADMIN` | Full access to `/admin/*`, system settings, user roles, financial ledger |
| **Standard User** | `user@arogyabandhan.org` | `User@12345` | `USER` | Access to `/user/dashboard`, donation history, tax receipts, volunteer tracking |

---

---

## 7. PostgreSQL Production Setup

When deploying to **Render**, **Railway**, **Supabase**, **Neon**, or **AWS RDS**:

1. Replace `DATABASE_URL` in your production environment settings with your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/arogya_bandhan?schema=public"
   ```
2. Copy `prisma/schema.postgresql.prisma` to `prisma/schema.prisma` or adjust the datasource block:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run migrations and seed in production:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npm run db:seed
   ```

---

## 8. Production Deployment Guide

### A. Deploy Frontend to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your `Arogya-Bandhan-Foundation` repository.
4. Framework Preset: **Next.js**.
5. Build Command: `npm run build` (runs `prisma generate && next build`).
6. Set the Environment Variables:
   - `DATABASE_URL`: Your production PostgreSQL connection string
   - `JWT_SECRET`: Your 32+ character random secret string
   - `NEXT_PUBLIC_APP_URL`: Your Vercel production domain (e.g., `https://arogyabandhan.vercel.app`)
   - `RAZORPAY_KEY_ID`: Razorpay public key
   - `RAZORPAY_KEY_SECRET`: Razorpay secret key
7. Click **Deploy**. Vercel will build and launch your full-stack platform globally.

### B. Deploy Full-Stack Platform to Render (Live Production)
**Production URL:** [https://arogya-bandhan-foundation-2.onrender.com](https://arogya-bandhan-foundation-2.onrender.com)

1. Go to [Render Dashboard](https://dashboard.render.com).
2. Connect your GitHub repository: `sagarkumar011/Arogya-Bandhan-Foundation`.
3. Use the included `render.yaml` Blueprint or create a **Web Service**:
   - Runtime: **Node**
   - Build Command: `npx prisma generate && npx prisma db push && npm run build`
   - Start Command: `npm start`
4. Configure Environment Variables:
   - `DATABASE_URL`: Your Render PostgreSQL Internal Database URL
   - `NEXT_PUBLIC_SITE_URL`: `https://arogya-bandhan-foundation-2.onrender.com`
   - `NEXT_PUBLIC_APP_URL`: `https://arogya-bandhan-foundation-2.onrender.com`
   - `NEXT_PUBLIC_API_URL`: `https://arogya-bandhan-foundation-2.onrender.com`
   - `JWT_SECRET`: Random 32+ character string
   - `CORS_ORIGIN`: `https://arogya-bandhan-foundation-2.onrender.com,http://localhost:3000`
5. Render deploys your full-stack Next.js 14 platform with automatic HTTPS.

---

## 9. Payment Gateway Setup (Razorpay)

1. Sign up on [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Generate your API Keys in **Settings > API Keys**.
3. Add credentials to `.env`:
   ```env
   RAZORPAY_KEY_ID="rzp_live_your_actual_key"
   RAZORPAY_KEY_SECRET="your_actual_secret_key"
   ```
4. The system validates payments using backend cryptographic HMAC-SHA256 signature verification:
   ```typescript
   const expectedSignature = crypto
     .createHmac("sha256", secret)
     .update(`${orderId}|${paymentId}`)
     .digest("hex");
   ```
5. Real donations automatically update campaign progress bars and generate downloadable PDF receipts.

---

## 10. Security & Access Control Checklist

- [x] **No hardcoded credentials:** All secrets loaded via environment variables.
- [x] **HTTP-Only Cookies:** Authentication tokens stored securely with `SameSite=Lax` and `HttpOnly`.
- [x] **Server-side Authorization:** All `/api/admin/*` endpoints strictly enforce `ADMIN` and `SUPER_ADMIN` roles at the API layer.
- [x] **No fake 80G/12A claims:** Legal filings transparently state "Application Filed & Under Statutory Verification" adhering strictly to compliance guidelines.
- [x] **Mathematical Integrity:** Campaign progress bars and donor counts are calculated directly from successful database transactions.
- [x] **Single Footer:** Clean page structure with no duplicated footers or overlapping layouts.
- [x] **Official Brand Logo:** Authentically displayed without distortion or redraw across all interfaces.

---

## 11. License & Rights

© 2026 **Arogya Bandhan Foundation**. All Rights Reserved.  
*Building Healthier Lives, Stronger Communities.*
