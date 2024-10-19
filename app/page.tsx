"use client";

import { Suspense } from "react";
import MindMapContainer from "./components/MindMapContainer";
import Credits from "./components/Credits";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Suspense fallback={<div>Loading mind map...</div>}>
        <MindMapContainer />
        <Credits />
      </Suspense>
    </div>
  );
}
