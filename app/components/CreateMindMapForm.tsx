"use client";

import React, { useState } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";

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

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter" && topic) {
            onSubmit(topic);
        }
    };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-3xl">
      <textarea
        rows={1}
        value={topic}
        cols={100}
        onChange={(e) => setTopic(e.target.value)}
        autoFocus
        placeholder="Enter a topic or document"
        className="px-4 py-2 border border-gray-300 rounded z-10"
        onKeyDown={handleEnter}
      />
      <ShimmerButton type="submit" className="px-5 z-10">
        Generate
      </ShimmerButton>
    </form>
  );
}
