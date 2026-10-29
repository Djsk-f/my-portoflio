import { IconType } from "react-icons";

export interface ProjectLink {
  url: string;
  label: string;
  icon?: IconType;
}

export type ProjectSector = "banking" | "industry" | "ecommerce";

export interface Project {
  id: string; // Added for routing and search
  title: string;
  role: string;
  description: string;
  link?: ProjectLink;
  stack: string[];
  image: string;
  
  // Case Study fields (Senior ++)
  context?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  results?: string[];
  
  // Content Versioning
  version?: string;
  changelog?: string[];
  
  // UI Flags
  featured?: boolean;
  sector?: ProjectSector;
  // Outil interne d'un client (back-office, administration, recette) : en production mais
  // sans lien ni adresse publiés
  confidential?: boolean;
}