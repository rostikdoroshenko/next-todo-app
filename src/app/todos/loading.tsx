import Progress from "@/components/progress/Progress";

export default function Loading() {
  return (
    <>
      <div className="loading">Fetching Todos data...</div>;
      <Progress />
    </>
  );
}
