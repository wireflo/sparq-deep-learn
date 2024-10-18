"use client";

import { Suspense } from "react";
import ChatComponent from "./components/ChatComponent";
import MindMapWrapper from "./components/MindMapWrapper";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Suspense fallback={<div>Loading mind map...</div>}>
        <MindMapWrapper />
      </Suspense>
      <ChatComponent />
    </div>
  );
}
