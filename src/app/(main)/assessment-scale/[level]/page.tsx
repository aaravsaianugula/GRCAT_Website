import { LevelPageContent } from "./LevelPageContent";

export default async function AssessmentLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  return <LevelPageContent level={level} />;
}
