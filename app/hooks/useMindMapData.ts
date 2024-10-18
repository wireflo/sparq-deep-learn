"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { MindMapData } from "../components/MindMap";

export function useMindMapData() {
  const [data, setData] = useState<MindMapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { messages } = useChat();

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      try {
        const parsedData = JSON.parse(messages[messages.length - 1].content);
        setData(parsedData);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }
  }, [messages]);

  return { data, isLoading, error };
}
