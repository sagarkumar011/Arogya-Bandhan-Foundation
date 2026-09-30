// ===============================================================
// IN-MEMORY RESILIENT STORE FOR DEMO & DATABASE FAILOVER
// Provides graceful fallback when PostgreSQL is unreachable or unconfigured
// ===============================================================

export interface StoredVolunteerApplication {
  id: string;
  userId: string | null;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  skills: string;
  areasOfInterest: string;
  availability: string;
  message: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy?: string | null;
  reviewNotes?: string | null;
  createdAt: string;
}

export interface StoredContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED";
  adminNotes?: string | null;
  createdAt: string;
}

const globalStore = globalThis as unknown as {
  __abf_volunteers?: StoredVolunteerApplication[];
  __abf_contacts?: StoredContactMessage[];
};

if (!globalStore.__abf_volunteers) {
  globalStore.__abf_volunteers = [
    {
      id: "vol_demo_001",
      userId: "demo-user-id",
      fullName: "Dr. Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98111 22233",
      city: "New Delhi",
      occupation: "Pediatrician",
      skills: "Child Healthcare, Medical Camps, Rural Outreach",
      areasOfInterest: "Free Health Camps, Child Welfare",
      availability: "Weekends Only",
      message: "Eager to help in mobile health clinics.",
      status: "APPROVED",
      reviewedBy: "demo-admin-id",
      reviewNotes: "Verified credentials. Assigned to Delhi Rural Camp.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vol_demo_002",
      userId: null,
      fullName: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "+91 98222 33344",
      city: "Patna",
      occupation: "Software Engineer",
      skills: "Digital Literacy, Web Design, Event Coordination",
      areasOfInterest: "Education & Literacy, Digital Empowerment",
      availability: "Flexible (10-15 hrs/week)",
      message: "Ready to conduct basic computer classes.",
      status: "PENDING",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

if (!globalStore.__abf_contacts) {
  globalStore.__abf_contacts = [
    {
      id: "contact_demo_001",
      fullName: "Vikas Mehra",
      email: "vikas.mehra@example.com",
      phone: "+91 99887 76655",
      subject: "Partnership with Corporate CSR",
      message: "We would like to partner with Arogya Bandhan Foundation for our CSR healthcare drive in Madhya Pradesh.",
      status: "NEW",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export function getInMemoryVolunteers(): StoredVolunteerApplication[] {
  return globalStore.__abf_volunteers || [];
}

export function addInMemoryVolunteer(application: StoredVolunteerApplication): StoredVolunteerApplication {
  if (!globalStore.__abf_volunteers) {
    globalStore.__abf_volunteers = [];
  }
  // Add to top of list
  globalStore.__abf_volunteers.unshift(application);
  return application;
}

export function updateInMemoryVolunteer(id: string, updates: Partial<StoredVolunteerApplication>): StoredVolunteerApplication | null {
  const list = getInMemoryVolunteers();
  const idx = list.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  return list[idx];
}

export function getInMemoryContacts(): StoredContactMessage[] {
  return globalStore.__abf_contacts || [];
}

export function addInMemoryContact(message: StoredContactMessage): StoredContactMessage {
  if (!globalStore.__abf_contacts) {
    globalStore.__abf_contacts = [];
  }
  globalStore.__abf_contacts.unshift(message);
  return message;
}

export function updateInMemoryContact(id: string, updates: Partial<StoredContactMessage>): StoredContactMessage | null {
  const list = getInMemoryContacts();
  const idx = list.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  return list[idx];
}
