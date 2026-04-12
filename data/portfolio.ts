export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: "research" | "tool" | "webapp" | "embedded";
  featured?: boolean;
  year: number;
}

export const projects: Project[] = [];
