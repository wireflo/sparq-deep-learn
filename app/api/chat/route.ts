import { convertToCoreMessages, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  defaultExternalPrompt,
  defaultAnthropicPrompt,
  jsonLdAnthropicPrompt,
  jsonLdSystemprompt
} from "@/app/lib/prompts";
import {anthropic} from "@ai-sdk/anthropic";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const shouldPreferAnthropic =
      process.env.ANTHROPIC_MODELS_PREFERRED === "true";
  const model = shouldPreferAnthropic
    ? anthropic("claude-3-5-sonnet-20241022")
    : openai("gpt-4o");
  const current_time = ""+new Date().getTime();
  console.time(current_time);
  console.log("Sending prompt: ", topic)
  const result = await generateText({
    model,
    system: shouldPreferAnthropic
        ? jsonLdSystemprompt
        : defaultExternalPrompt,
    messages: convertToCoreMessages([
      {
        role: "user",
        content: jsonLdAnthropicPrompt + topic,
      },
    ]),
  });
  console.timeLog()
  console.log("Response: ", result.text)

  return new Response(result.text);
}
