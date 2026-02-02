// types/user.ts

export type UserRole = "admin" | "publisher" | "editor";

// Groups 1-10 as per PRD [cite: 374]
export type WorkGroup =
  | "group1"
  | "group2"
  | "group3"
  | "group4"
  | "group5"
  | "group6"
  | "group7"
  | "group8"
  | "group9"
  | "group10"
  | "none";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;

  // PRD Workflow Mappings
  role: UserRole; // Determines if they can Publish [cite: 377]
  work_group: WorkGroup; // Maps to 'allotment' field [cite: 374]
  active: boolean;

  // Dashboard Stats (Optional but helpful for Managers)
  stats?: {
    assigned_products: number;
    pending_qc: number;
  };

  last_active: string;
}
