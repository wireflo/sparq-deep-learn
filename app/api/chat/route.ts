import { convertToCoreMessages, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { defaultExternalPrompt, defaultAnthropicPrompt} from "@/app/lib/prompts";
import {anthropic} from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const shouldPreferAnthropic =
      process.env.ANTHROPIC_MODELS_PREFERRED === "true";
  const model = shouldPreferAnthropic
    ? anthropic("claude-3-5-sonnet-20241022")
    : openai("gpt-4o");
  console.time()
  console.log("Sending prompt: ", topic)
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
  console.timeLog()
  console.log("Response: ", result.text)

  return new Response(result.text);
}
