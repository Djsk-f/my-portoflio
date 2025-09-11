import { IconType } from "react-icons";

export interface ProjectLink {
  url: string;
  label: string;
  icon?: IconType;
}

export class Project {
  title: string;
  role: string;
  description: string;
  link?: ProjectLink;
  stack: string[];
  image: string;

  constructor() {
    this.title = "";
    this.role = "";
    this.description = "";
    this.stack = [];
    this.image = "";
  }
}