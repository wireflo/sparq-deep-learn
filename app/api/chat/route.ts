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

  const debug=false;

  if(debug) {
    const jsonld = `{
  "@context": {
    "label": "rdfs:label",
    "contains": "http://sparq.w3.ai/contains",
    "requires": "http://sparq.w3.ai/requires",
    "implements": "http://sparq.w3.ai/implements",
    "interactsWith": "http://sparq.w3.ai/interactsWith"
  },
  "@id": "wirecube-software",
  "label": "Wirecube Software",
  "contains": [
    {
      "@id": "3d-rendering-engine",
      "label": "3D Rendering Engine",
      "implements": [
        {
          "@id": "wireframe-rendering",
          "label": "Wireframe Rendering"
        },
        {
          "@id": "mesh-processing",
          "label": "Mesh Processing"
        }
      ]
    },
    {
      "@id": "user-interface",
      "label": "User Interface",
      "contains": [
        {
          "@id": "viewport-controls",
          "label": "Viewport Controls"
        },
        {
          "@id": "tool-palette",
          "label": "Tool Palette"
        }
      ]
    }
  ],
  "requires": [
    {
      "@id": "graphics-library",
      "label": "Graphics Library",
      "interactsWith": [
        {
          "@id": "opengl",
          "label": "OpenGL"
        },
        {
          "@id": "directx",
          "label": "DirectX"
        }
      ]
    },
    {
      "@id": "development-environment",
      "label": "Development Environment",
      "contains": [
        {
          "@id": "code-editor",
          "label": "Code Editor"
        },
        {
          "@id": "debugger",
          "label": "Debugger"
        },
        {
          "@id": "compiler",
          "label": "Compiler"
        }
      ]
    }
  ]
}`;
    console.log("debug response")
    return new Response(jsonld);
  }
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

  console.timeLog(current_time)
  console.log("Response: ", result.text)

  return new Response(result.text);
}
