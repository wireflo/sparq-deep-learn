"use client";


import { useMindMapData } from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
import { useRouter } from "next/navigation";
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';


export default function MermaidMindMapContainer() {
  const { data, isLoading, error, fetchMindMap } = useMindMapData();
  const router = useRouter();

  if (isLoading) return <LoadingMindMap />;

  if (error) {
    router.push("/?error=true");
    return <CreateMindMap fetchMindMap={fetchMindMap} />;
  }

  if (!data) return <CreateMindMap fetchMindMap={fetchMindMap} />;

  return (
    <div className="w-full h-full">
      <MermaidDiagram>{`graph TD;\nA-->B;\nB-->C;`}</MermaidDiagram>

    </div>
  );
}
