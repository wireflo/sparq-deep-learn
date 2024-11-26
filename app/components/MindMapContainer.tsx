"use client";

import { ReactFlowProvider } from "reactflow";
import MindMap from "./MindMap";
import { useMindMapData } from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
const JsonGraphStatic = dynamic(()=>import("./JsonLdGraph"),{ssr:false});
import JsonLdGraph from "@/app/components/JsonLdGraph";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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
        <JsonGraphStatic jsonLdData={data} />
      </div>
  );

}
