import type { Metadata } from "next";
import { StaffDashboard } from "@/components/home/StaffDashboard";

export const metadata: Metadata = {
  title: "Staff Home",
  description: "AI resources for Green River College staff and administrators.",
};

export default function StaffHomePage() {
  return <StaffDashboard />;
}
