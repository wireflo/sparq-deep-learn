"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatComponent() {
  const { input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-3xl mx-auto space-x-2"
      >
        <Input
          className="flex-grow"
          value={input}
          placeholder="What do you want to learn?"
          onChange={handleInputChange}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
