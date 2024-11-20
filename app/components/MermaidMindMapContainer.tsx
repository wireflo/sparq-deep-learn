"use client";

import {useMindMapData} from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
import {useRouter} from "next/navigation";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {MermaidDiagram} from '@lightenna/react-mermaid-diagram';
import mermaid from 'mermaid';

// Configure mermaid globally
mermaid.initialize({
    startOnLoad: true,
    securityLevel: 'loose',
    flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
    },
});

export default function MermaidMindMapContainer() {
    const {rawdata, isLoading, error, fetchMindMapRaw} = useMindMapData();
    const router = useRouter();

    if (isLoading) return <LoadingMindMap/>;

    if (error) {
        router.push("/?error=true");
        return <CreateMindMap fetchMindMap={fetchMindMapRaw}/>;
    }

    const diagram_text: string = rawdata ? rawdata : "";
    if (!diagram_text) return <CreateMindMap fetchMindMap={fetchMindMapRaw}/>;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            <TransformWrapper
                initialScale={2}
                minScale={0.5}
                maxScale={10}
                centerOnInit={true}
                limitToBounds={false}
                smooth={true}
                wheel={{smoothStep: 0.005}}
            >
                {({zoomIn, zoomOut, resetTransform}) => (
                    <>
                        <div className="tools-container fixed top-4 right-4 z-10 bg-white/80 p-2 rounded-lg shadow-md">
                            <button
                                className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => zoomIn(0.2)}
                            >
                                +
                            </button>
                            <button
                                className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => zoomOut(0.2)}
                            >
                                -
                            </button>
                            <button
                                className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => resetTransform()}
                            >
                                Reset
                            </button>
                        </div>
                        <TransformComponent
                            wrapperStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                            contentStyle={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="mermaid-container flex items-center justify-center w-full h-full">
                                <MermaidDiagram>
                                    {diagram_text}
                                </MermaidDiagram>
                            </div>
                        </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
