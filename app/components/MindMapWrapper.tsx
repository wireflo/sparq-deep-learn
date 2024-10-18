"use client";

import { ReactFlowProvider } from "reactflow";
import MindMap from "./MindMap";
import { useMindMapData } from "../hooks/useMindMapData";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import RetroGrid from "@/components/ui/retro-grid";

export default function MindMapWrapper() {
  const { data, isLoading, error } = useMindMapData();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Progress value={progress} className="w-[60%] mb-4" />
        <p className="text-sm text-gray-500">Loading mind map...</p>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <span className="pointer-events-none z-10 whitespace-pre-wrap pb-2 bg-gradient-to-b from-[#3a3b3b] via-[#555555] to-[#6a6a6a] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
            Learn Thing
          </span>
          <p className="text-gray-800">Learn something new today.</p>
          <RetroGrid />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <MindMap data={data} />
      </ReactFlowProvider>
    </div>
  );
}
