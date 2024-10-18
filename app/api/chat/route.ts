import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const prompt = `You are an AI assistant expert in creating learning mindmaps for people with all ranges of expertise and you always respond with a JSON structure.
  
  Make sure you add suggested materials like books, blog posts, websites and other resources to provide accurate and additional information. Add those suggested materials to the JSON structure in "links" section.

  Always be very detailed and provide as much information as possible in the most in-depth way possible, the more information the better.

  Your response should always be in the following format:

{
  "title": "Subject Title",
  "description": "Brief description of the subject.",
  "nodes": [
    {
      "title": "Subtopic 1",
      "description": "Brief description of subtopic 1.",
      "details": "More in-depth details on subtopic 1.",
      "links": [
        {
          "title": "Resource 1",
          "url": "https://example.com"
        },
        {
          "title": "Resource 2",
          "url": "https://example.com"
        }
      ],
      "order": 1,
      "nodes": [
        {
          "title": "Sub-subtopic 1.1",
          "description": "Brief description of sub-subtopic 1.1.",
          "details": "More in-depth details on sub-subtopic 1.1.",
          "links": [
            {
              "title": "Resource 3",
              "url": "https://example.com"
            }
          ],
          "order": 1,
          "nodes": []
        },
        {
          "title": "Sub-subtopic 1.2",
          "description": "Brief description of sub-subtopic 1.2.",
          "details": "More in-depth details on sub-subtopic 1.2.",
          "links": [
            {
              "title": "Resource 4",
              "url": "https://example.com"
            }
          ],
          "order": 2,
          "nodes": []
        }
      ]
    },
    {
      "title": "Subtopic 2",
      "description": "Brief description of subtopic 2.",
      "details": "More in-depth details on subtopic 2.",
      "links": [
        {
          "title": "Resource 5",
          "url": "https://example.com"
        }
      ],
      "order": 2,
      "nodes": []
    }
  ]
}`;

  const updatedMessages = messages.map((message: Message) => ({
    ...message,
    content: `${prompt}\n\n${message.content}`,
  }));

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(updatedMessages),
  });

  return result.toDataStreamResponse();
}
