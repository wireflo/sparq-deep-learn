# Mind Map Visualization Project

This is a simple [Next.js](https://nextjs.org) project that implements a mind map visualization tool using [React Flow](https://reactflow.dev/).

It allows users to view and interact with mind maps, and download the mind map data as a markdown file.

The mind map data is generated using [OpenAI](https://openai.com/) and leveraging [AI SDK](https://sdk.vercel.ai/docs/introduction).

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

You need to provide your own API key (`OPENAI_API_KEY`) for the OpenAI API inside a `.env.local` file.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and then you can start creating your own learning mind maps.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
