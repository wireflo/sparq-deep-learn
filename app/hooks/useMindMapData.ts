"use client";

import { useState } from "react";
import { MindMapData } from "../components/MindMap";

export function useMindMapData() {
  const [data, setData] = useState<MindMapData | null>(null);
  const [rawdata, setRawData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMindMap = async (topic: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic }),
      });
      const data = await response.text();
      setData(JSON.parse(data));
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  };
  const fetchMindMapRaw = async (topic: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topic }),
      });
      const data = await response.text();
      setRawData(data);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  };

  return { data, rawdata,isLoading, error, fetchMindMap ,fetchMindMapRaw};
}
