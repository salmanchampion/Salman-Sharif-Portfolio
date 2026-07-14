export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // FontAwesome icon class
  features: string[];
}

export interface Skill {
  name: string;
  level: number; // percentage value eg 95
  icon?: string;
}

export interface SkillCategory {
  categoryName: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL for full mock project preview
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  details?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  bullets: string[];
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "visa" | "tickets" | "tips" | "hajj" | string;
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  imagePrompt: string;
  content: string;
}

export interface PortfolioData {
  name: string;
  englishName: string;
  title: string;
  subtitles: string[];
  tagline: string;
  phone: string;
  email: string;
  location: string;
  institution: string;
  profileImage: string;
  cvUrl: string;
  services: Service[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  testimonials: Testimonial[];
  statistics: Statistic[];
  blogs: BlogPost[];
  socialLinks: {
    facebook: string;
    linkedin: string;
    github: string;
    whatsapp: string;
    youtube: string;
  };
  telegramBotToken?: string;
  telegramChatId?: string;
  googleScriptURL?: string;
}
