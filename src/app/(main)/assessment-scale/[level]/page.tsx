import { LevelPageContent } from "./LevelPageContent";

export function generateStaticParams() {
  return [{ level: "1" }, { level: "2" }, { level: "3" }, { level: "4" }, { level: "5" }];
}

export default async function AssessmentLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  return <LevelPageContent level={level} />;
}
