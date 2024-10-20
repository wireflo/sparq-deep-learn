import { ollama } from "ollama-ai-provider";
import { convertToCoreMessages, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { defaultPrompt } from "@/app/lib/prompts";

export async function POST(req: Request) {
  const { topic } = await req.json();
  const shouldUseLocalModels =
    process.env.NEXT_PUBLIC_USE_LOCAL_MODELS === "true";
  const model = shouldUseLocalModels
    ? ollama("llama3.1")
    : openai("gpt-3.5-turbo");

  const result = await generateText({
    model,
    messages: convertToCoreMessages([
      {
        role: "user",
        content: defaultPrompt + topic,
      },
    ]),
  });
  return new Response(result.text);
}
