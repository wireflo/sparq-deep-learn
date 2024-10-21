import { ollama } from "ollama-ai-provider";
import { convertToCoreMessages, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import {defaultLocalPrompt, defaultExternalPrompt, defaultAnthropicPrompt} from "@/app/lib/prompts";
import {anthropic} from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  const { topic } = await req.json();
  const shouldUseLocalModels =
    process.env.NEXT_PUBLIC_USE_LOCAL_MODELS === "true";
  const shouldPreferAnthropic =
      process.env.ANTHROPIC_MODELS_PREFERRED === "true";
  const model = shouldPreferAnthropic
    ? anthropic("claude-3-5-sonnet-20240620")
    : openai("gpt-4o");

  const result = await generateText({
    model,
    messages: convertToCoreMessages([
      {
        role: "user",
        content: shouldPreferAnthropic
          ? defaultAnthropicPrompt + topic
          : defaultExternalPrompt + topic,
      },
    ]),
  });
  return new Response(result.text);
}
