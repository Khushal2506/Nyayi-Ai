export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'purchase' | 'defect' | 'support' | 'rejection' | 'escalation';
  description: string;
  evidenceRef?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: 'Invoice' | 'Inspection Report' | 'Photographic' | 'Correspondence' | 'Payment';
  status: 'verified' | 'missing';
  fileName?: string;
  fileSize?: string;
  dateAdded?: string;
  priority: 'high' | 'medium' | 'low';
  significance: string;
  actionRequired?: string;
}

export interface LegalSource {
  id: string;
  act: string;
  section: string;
  title: string;
  year: number;
  referenceExcerpt: string;
  plainSummary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  extractedFacts?: {
    label: string;
    value: string;
  }[];
}

export const DEMO_CASE = {
  id: "NC-2024-8841",
  title: "Defective Laptop Delivery & Warranty Disavowal",
  complainant: {
    name: "Rahul Sharma",
    phone: "+91 98450 XXXXX",
    email: "rahul.sharma@example.in",
    city: "Bengaluru, Karnataka",
    pincode: "560038",
  },
  oppositeParty: {
    name: "NexaCart Retail India Pvt. Ltd.",
    designation: "Authorized E-Commerce Marketplace & Seller ApexGadgets",
    registeredAddress: "Level 4, Outer Ring Road, Bellandur, Bengaluru 560103",
    supportTicket: "TKT-89412-NC",
  },
  transaction: {
    date: "14 Oct 2024",
    orderId: "OD-9921409214",
    invoiceNumber: "GST-KA-2024-99120",
    product: "Zephyrus Pro 15.6 Ultra HD Laptop (32GB / 1TB SSD)",
    amountPaid: 64999,
    paymentMode: "UPI / ICICI Bank",
  },
  jurisdiction: {
    forum: "District Consumer Disputes Redressal Commission",
    bench: "Bengaluru Urban Bench I",
    pecuniaryLimit: "Up to ₹50,00,000 (Section 34, CPA 2019)",
    qualifies: true,
  },
  reliefSought: {
    primary: "Full refund of purchase consideration (₹64,999) with 12% p.a. interest",
    compensation: "₹15,000 for mental agony, harassment, and work interruption",
    litigationCosts: "₹5,000 for notice preparation and administrative expenses",
    totalClaim: "₹84,999",
  },
  evidenceReadiness: 75, // percentage
};

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: "evt-1",
    date: "14 Oct 2024, 11:24 AM",
    title: "Order Placed & Payment Debited",
    category: "purchase",
    description: "Paid ₹64,999 via UPI for Zephyrus Pro Laptop on NexaCart with stated next-day dispatch.",
    evidenceRef: "GST Tax Invoice #GST-KA-2024-99120",
  },
  {
    id: "evt-2",
    date: "18 Oct 2024, 04:15 PM",
    title: "Delivery Received (Dead on Arrival)",
    category: "defect",
    description: "Courier delivered sealed parcel. Upon powering on, device exhibited permanent vertical display lines and failed to post beyond BIOS.",
    evidenceRef: "Unboxing Video & High-Res Photographs",
  },
  {
    id: "evt-3",
    date: "19 Oct 2024, 09:30 AM",
    title: "Return Request Lodged (Within 7 Days)",
    category: "support",
    description: "Registered return ticket #TKT-89412-NC requesting immediate replacement or full refund under e-commerce policy.",
  },
  {
    id: "evt-4",
    date: "22 Oct 2024, 02:00 PM",
    title: "Authorized Technician Physical Inspection",
    category: "support",
    description: "Brand-authorized engineer visited complainant's residence. Certified internal display controller hardware defect with zero physical or liquid impact.",
    evidenceRef: "Technician Job-Sheet #AS-902",
  },
  {
    id: "evt-5",
    date: "25 Oct 2024, 06:40 PM",
    title: "NexaCart Arbitrary Rejection of Return",
    category: "rejection",
    description: "Automated SMS and email from NexaCart claiming item is non-returnable citing 'customer handling', in direct contradiction to technician report.",
    evidenceRef: "Rejection Email & SMS Log",
  },
  {
    id: "evt-6",
    date: "28 Oct 2024, 11:00 AM",
    title: "Grievance Officer Escalation (Unanswered)",
    category: "escalation",
    description: "Complainant served formal written email to NexaCart Nodal Grievance Officer pursuant to E-Commerce Rules, 2020. No statutory response provided within 48 hours.",
  },
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: "ev-1",
    title: "Tax Invoice with GST Breakdown",
    category: "Invoice",
    status: "verified",
    fileName: "NexaCart_TaxInvoice_GST99120.pdf",
    fileSize: "412 KB",
    dateAdded: "28 Oct 2024",
    priority: "high",
    significance: "Proves transaction value (₹64,999), date (14 Oct 2024), consumer status under CPA 2019 § 2(7), and seller identity.",
  },
  {
    id: "ev-2",
    title: "Authorized Technician Inspection Job-Sheet",
    category: "Inspection Report",
    status: "verified",
    fileName: "ApexService_JobSheet_AS902.pdf",
    fileSize: "850 KB",
    dateAdded: "28 Oct 2024",
    priority: "high",
    significance: "Conclusive neutral proof of inherent manufacturing display defect, rebutting seller's false claim of customer damage.",
  },
  {
    id: "ev-3",
    title: "Unboxing Photographs & Defective Screen Capture",
    category: "Photographic",
    status: "verified",
    fileName: "Laptop_Screen_VerticalArtifacts.jpg",
    fileSize: "3.2 MB",
    dateAdded: "28 Oct 2024",
    priority: "medium",
    significance: "Demonstrates immediate dead-on-arrival condition showing barcode serial number intact.",
  },
  {
    id: "ev-4",
    title: "Formal Written Rejection Email from NexaCart",
    category: "Correspondence",
    status: "missing",
    priority: "high",
    significance: "Essential to prove 'Unfair Trade Practice' under CPA 2019 § 2(47) for refusal to take back defective merchandise.",
    actionRequired: "Download full email header (.eml or screenshot) from your registered email showing timestamp and sender.",
  },
  {
    id: "ev-5",
    title: "Bank Statement / UPI Debit Confirmation (UTR)",
    category: "Payment",
    status: "missing",
    priority: "medium",
    significance: "Supplements invoice to conclusively demonstrate actual financial consideration debited from complainant's account.",
    actionRequired: "Download UPI 12-digit UTR transaction record from ICICI iMobile / GPay statement.",
  },
];

export const ILLUSTRATIVE_LEGAL_REFERENCES: LegalSource[] = [
  {
    id: "sec-2-10",
    act: "Consumer Protection Act, 2019",
    section: "Section 2(10)",
    title: "Definition of 'Defect'",
    year: 2019,
    referenceExcerpt: "'Defect' means any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard which is required to be maintained by or under any law for the time being in force or under any contract, express or implied, or as is claimed by the trader in any manner whatsoever in relation to any goods.",
    plainSummary: "If goods do not match promised quality or fail to perform their basic intended function, they are legally 'defective'.",
  },
  {
    id: "sec-2-47",
    act: "Consumer Protection Act, 2019",
    section: "Section 2(47)",
    title: "Unfair Trade Practice — Refusal of Return / Refund",
    year: 2019,
    referenceExcerpt: "'Unfair trade practice' means a trade practice which, for the purpose of promoting the sale, use or supply of any goods or for the provision of any service, adopts any unfair method or unfair or deceptive practice including... refusing to take back or withdraw defective goods or to refund the consideration contemplated within the period stipulated.",
    plainSummary: "Section 2(47) covers specified unfair or deceptive trade practices, including certain refusals to take back defective goods or refund consideration within the stipulated period. Applicability depends on the facts and current law.",
  },
  {
    id: "ecom-rule-5",
    act: "Consumer Protection (E-Commerce) Rules, 2020",
    section: "Rule 5(3) & Rule 6(2)",
    title: "Mandatory Grievance Redressal & Return Obligations",
    year: 2020,
    referenceExcerpt: "Every marketplace e-commerce entity shall ensure that the grievance officer acknowledges the receipt of any consumer complaint within forty-eight hours and redresses the complaint within one month from the date of receipt of the complaint... No e-commerce entity shall refuse to take back goods, or withdraw or discontinue services purchased... if such goods are defective, deficient or delivered late.",
    plainSummary: "The E-Commerce Rules include grievance-handling timelines and duties concerning certain defective, deficient or late-delivered goods. Check the precise rule and its applicability to the entity and facts.",
  },

];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "assistant",
    timestamp: "10:30 AM",
    content: "Namaste! I am Nyaya AI, your legal assistant for consumer disputes in India. Could you please describe what went wrong with your product or service?",
  },
  {
    id: "msg-2",
    sender: "user",
    timestamp: "10:32 AM",
    content: "I bought a Zephyrus Pro laptop from NexaCart on 14 October for ₹64,999. When delivered on 18 October, the screen was displaying vertical pink lines and flickering. An authorized service engineer visited on 22 October and confirmed it was a motherboard defect. But NexaCart just rejected my return request claiming customer damage!",
  },
  {
    id: "msg-3",
    sender: "assistant",
    timestamp: "10:33 AM",
    content: "I understand how distressing this is. The facts may raise issues under consumer-protection law, but the applicable provisions and remedy depend on the evidence and circumstances. The relevant statutory text should be verified before drawing a legal conclusion.",
    extractedFacts: [
      { label: "Opposite Party", value: "NexaCart Retail India Pvt. Ltd." },
      { label: "Transaction Value", value: "₹64,999" },
      { label: "Date of Delivery", value: "18 October 2024" },
      { label: "Crucial Proof", value: "Technician Job Sheet #AS-902" },
    ],
  },
  {
    id: "msg-4",
    sender: "assistant",
    timestamp: "10:33 AM",
    content: "To understand the available next steps, did you receive NexaCart's rejection in writing (via email or support ticket response)?",
  },
];
