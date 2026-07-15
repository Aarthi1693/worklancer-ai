export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;

  taskType: "DIGITAL" | "FIELD";

  status: string;
}