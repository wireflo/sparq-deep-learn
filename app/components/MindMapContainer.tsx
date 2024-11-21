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
  const debug=false;

  if(debug){
      const jsonld=`{
  "@context": {
    "label": "rdfs:label",
    "contains": "http://sparq.w3.ai/contains",
    "requires": "http://sparq.w3.ai/requires",
    "implements": "http://sparq.w3.ai/implements",
    "interactsWith": "http://sparq.w3.ai/interactsWith"
  },
  "@id": "wirecube-software",
  "label": "Wirecube Software",
  "contains": [
    {
      "@id": "3d-rendering-engine",
      "label": "3D Rendering Engine",
      "implements": [
        {
          "@id": "wireframe-rendering",
          "label": "Wireframe Rendering"
        },
        {
          "@id": "mesh-processing",
          "label": "Mesh Processing"
        }
      ]
    },
    {
      "@id": "user-interface",
      "label": "User Interface",
      "contains": [
        {
          "@id": "viewport-controls",
          "label": "Viewport Controls"
        },
        {
          "@id": "tool-palette",
          "label": "Tool Palette"
        }
      ]
    }
  ],
  "requires": [
    {
      "@id": "graphics-library",
      "label": "Graphics Library",
      "interactsWith": [
        {
          "@id": "opengl",
          "label": "OpenGL"
        },
        {
          "@id": "directx",
          "label": "DirectX"
        }
      ]
    },
    {
      "@id": "development-environment",
      "label": "Development Environment",
      "contains": [
        {
          "@id": "code-editor",
          "label": "Code Editor"
        },
        {
          "@id": "debugger",
          "label": "Debugger"
        },
        {
          "@id": "compiler",
          "label": "Compiler"
        }
      ]
    }
  ]
}`;
      return (
          <div  >
              <JsonGraphStatic jsonLdData={jsonld} />
          </div>
      );
  }
  
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
