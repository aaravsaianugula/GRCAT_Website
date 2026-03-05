import type { Metadata } from "next";
import { FacultyDashboard } from "@/components/home/FacultyDashboard";

export const metadata: Metadata = {
  title: "Faculty Home",
  description: "AI teaching resources for Green River College faculty.",
};

export default function FacultyHomePage() {
  return <FacultyDashboard />;
}
