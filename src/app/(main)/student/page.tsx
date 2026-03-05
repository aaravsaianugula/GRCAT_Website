import type { Metadata } from "next";
import { StudentDashboard } from "@/components/home/StudentDashboard";

export const metadata: Metadata = {
  title: "Student Home",
  description: "AI resources tailored for Green River College students.",
};

export default function StudentHomePage() {
  return <StudentDashboard />;
}
