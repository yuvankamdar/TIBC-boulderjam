export type ExperienceLevel =
  | "First Timer"
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type NeedShoes = "Yes" | "No";

export type ParticipantForm = {
  fullName: string;
  age: number;
  phone: string;
  email: string;
  instagram?: string;
  experienceLevel: ExperienceLevel;
  needRentalShoes: NeedShoes;
  emergencyName: string;
  emergencyPhone: string;
  riskAck: boolean;
};

