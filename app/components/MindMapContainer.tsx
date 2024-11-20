"use client";

import { ReactFlowProvider } from "reactflow";
import MindMap from "./MindMap";
import { useMindMapData } from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
import JsonLdGraph from "@/app/components/JsonLdGraph";
import { useRouter } from "next/navigation";

export default function MindMapContainer() {
  const {data, isLoading, error, fetchMindMap} = useMindMapData();
  const router = useRouter();

 if (isLoading) return <LoadingMindMap/>;

  if (error) {
    router.push("/?error=true");
    return <CreateMindMap fetchMindMap={fetchMindMap}/>;
  }


  if (!data) return <CreateMindMap fetchMindMap={fetchMindMap}/>;


  return (
      <div>
        <JsonLdGraph jsonLdData={data} />
      </div>
  );

}
