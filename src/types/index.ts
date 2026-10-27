/**
 * Betamind Technology — Shared TypeScript types
 */

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */
export interface NavChild {
  label: string;
  href:  string;
}

export interface NavLink {
  label:    string;
  href:     string;
  children?: NavChild[];
}

/* ------------------------------------------------------------------ */
/* Services                                                             */
/* ------------------------------------------------------------------ */
export interface Service {
  id:          string;
  icon:        string;
  title:       string;
  shortDesc:   string;
  description: string;
  benefits:    readonly string[];
  color:       string;
  href:        string;
}

/* ------------------------------------------------------------------ */
/* Portfolio / Projects                                                 */
/* ------------------------------------------------------------------ */
export interface Project {
  id:           string;
  title:        string;
  slug:         string;
  category:     string;
  tags:         string[];
  description:  string;
  image:        string;
  images?:      string[];
  client:       string;
  industry:     string;
  year:         number;
  url?:         string;
  technologies: string[];
  results:      { metric: string; value: string }[];
  featured:     boolean;
  /* optional case-study sections, shown in the project popup when present */
  role?:        string;
  status?:      string;
  problem?:     string;
  built?:       { title: string; text: string }[];
  highlights?:  { title: string; text: string }[];
  testing?:     string;
  next?:        string;
}

/* ------------------------------------------------------------------ */
/* Case Studies                                                         */
/* ------------------------------------------------------------------ */
export interface CaseStudy {
  id:           string;
  title:        string;
  slug:         string;
  client:       string;
  industry:     string;
  heroImage:    string;
  thumbnail:    string;
  challenge:    string;
  solution:     string;
  process:      { step: string; description: string }[];
  technologies: string[];
  results:      { metric: string; value: string; description?: string }[];
  testimonial?: {
    text:   string;
    name:   string;
    title:  string;
    avatar: string;
  };
  duration:     string;
  year:         number;
  featured:     boolean;
}

/* ------------------------------------------------------------------ */
/* Blog                                                                 */
/* ------------------------------------------------------------------ */
export interface BlogPost {
  id:          string;
  title:       string;
  slug:        string;
  excerpt:     string;
  content:     string;
  author: {
    name:   string;
    avatar: string;
    role:   string;
  };
  category:    string;
  tags:        string[];
  coverImage:  string;
  publishedAt: string;
  updatedAt?:  string;
  readTime:    string;
  featured:    boolean;
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                         */
/* ------------------------------------------------------------------ */
export interface Testimonial {
  id:      number;
  name:    string;
  title:   string;
  company: string;
  avatar:  string;
  rating:  number;
  text:    string;
  logo?:   string;
  video?:  string;
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */
export interface TeamMember {
  name:      string;
  title:     string;
  bio:       string;
  avatar:    string;
  linkedin?: string;
  twitter?:  string;
}

/* ------------------------------------------------------------------ */
/* Pricing                                                              */
/* ------------------------------------------------------------------ */
export interface PricingPlan {
  id:          string;
  name:        string;
  price:       { monthly: number | null; annually: number | null };
  description: string;
  badge:       string | null;
  features:    readonly string[];
  notIncluded: readonly string[];
  cta:         string;
  href:        string;
  color:       string;
}

/* ------------------------------------------------------------------ */
/* Forms                                                                */
/* ------------------------------------------------------------------ */
export interface ContactFormValues {
  name:       string;
  email:      string;
  company?:   string;
  phone?:     string;
  service?:   string;
  budget?:    string;
  message:    string;
  honeypot?:  string;
}

export interface NewsletterFormValues {
  email: string;
}

/* ------------------------------------------------------------------ */
/* Careers                                                              */
/* ------------------------------------------------------------------ */
export interface JobPosting {
  id:           string;
  title:        string;
  department:   string;
  location:     string;
  type:         "Full-time" | "Part-time" | "Contract" | "Remote";
  salary?:      string;
  description:  string;
  requirements: string[];
  niceToHave?:  string[];
  benefits:     string[];
  postedAt:     string;
  featured:     boolean;
}

/* ------------------------------------------------------------------ */
/* Misc                                                                 */
/* ------------------------------------------------------------------ */
export interface Stat {
  label:  string;
  value:  number;
  suffix: string;
  icon:   string;
}

export interface ProcessStep {
  step:        string;
  title:       string;
  description: string;
  icon:        string;
  duration:    string;
}

export type ColorVariant =
  | "blue" | "teal" | "green" | "purple" | "red"
  | "orange" | "yellow" | "sky" | "indigo" | "amber"
  | "violet" | "cyan" | "slate";
