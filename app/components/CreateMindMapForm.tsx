import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ShimmerButton from "@/components/ui/shimmer-button";
import RetroGrid from "@/components/ui/retro-grid";

interface CreateMindMapFormProps {
  onSubmit: (topic: string) => void;
}

export default function CreateMindMapForm({
  onSubmit,
}: CreateMindMapFormProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic) {
      onSubmit(topic);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <span className="pointer-events-none z-10 whitespace-pre-wrap pb-2 bg-gradient-to-b from-[#3a3b3b] via-[#555555] to-[#6a6a6a] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
          Learn Thing
        </span>
        <p className="text-gray-800 mb-10">
          Create an AI-powered mind map. Start learning something new today.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-3xl">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
            className="px-4 py-2 border border-gray-300 rounded z-10"
          />
          <ShimmerButton type="submit" className="px-5 z-10">
            Generate
          </ShimmerButton>
        </form>
        <RetroGrid />
      </div>
    </div>
  );
}
