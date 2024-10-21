"use client";


import { useMindMapData } from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
import { useRouter } from "next/navigation";
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';


export default function MermaidMindMapContainer() {
  const { data,rawdata, isLoading, error, fetchMindMapRaw } = useMindMapData();
  const router = useRouter();

  if (isLoading) return <LoadingMindMap />;

  if (error) {
    router.push("/?error=true");
    return <CreateMindMap fetchMindMap={fetchMindMapRaw} />;
  }
  const diagram_text :string=rawdata?rawdata:"";
  if (!diagram_text) return <CreateMindMap fetchMindMap={fetchMindMapRaw} />;

  return (
    <div className="w-full h-full">
      <MermaidDiagram>
        {diagram_text}
      </MermaidDiagram>

    </div>
  );
}
