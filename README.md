# Mind Map Visualization Project

This is a simple [Next.js](https://nextjs.org) project that implements a mind map visualization tool using [React Flow](https://reactflow.dev/).

The UI is built using [shadcn](https://ui.shadcn.com/) and some components from [Magic UI](https://magicui.design/).

It allows users to view and interact with mind maps, and download the mind map data as a markdown file.

The mind map data is generated using local models from [Ollama](https://ollama.com/) and leveraging [AI SDK](https://sdk.vercel.ai/docs/introduction).

## Features

- Interactive mind map visualization
- Node details view in a side sheet
- Markdown export functionality
- Save mind map data to a local JSON file

## Getting Started

Install all dependencies:

```bash
npm install
```

You must specify the model running using Ollama in the `route.ts` file.

If you want to learn how to run a model locally, check out the [Ollama documentation](https://github.com/ollama/ollama/blob/main/README.md#quickstart).

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and then start creating your own learning mind maps.

## Using external AI models

If you want to use external AI models, you can do so by modifying the `route.ts` file.

Check out the [AI SDK documentation](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router) for more information on how to use external AI models.
