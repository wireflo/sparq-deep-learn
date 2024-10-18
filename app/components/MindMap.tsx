"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { convertToMarkdown, downloadJson } from "@/lib/utils";

interface Link {
  title: string;
  url: string;
}

export interface MindMapNode {
  title: string;
  description: string;
  details?: string;
  links?: Link[];
  order: number;
  nodes: MindMapNode[];
}

export interface MindMapData {
  title: string;
  description: string;
  nodes: MindMapNode[];
}

const NodeContent: React.FC<{
  title: string;
  description: string;
  details?: string;
  onClick: () => void;
}> = ({ title, onClick }) => (
  <div
    className="p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer w-48 bg-white hover:bg-gray-100"
    onClick={onClick}
  >
    <div className="text-lg font-bold text-center">{title}</div>
  </div>
);

const RootNode: React.FC<NodeProps> = ({ data }) => (
  <div className="border-2 border-blue-500 text-blue-800">
    <NodeContent {...data} />
    <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
  </div>
);

const BranchNode: React.FC<NodeProps> = ({ data }) => (
  <div className="border-2 border-green-500 text-green-800">
    <NodeContent {...data} />
    <Handle type="target" position={Position.Top} className="w-2 h-2" />
    <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
  </div>
);

const LeafNode: React.FC<NodeProps> = ({ data }) => (
  <div className="border-2 border-yellow-500 text-yellow-800">
    <NodeContent {...data} />
    <Handle type="target" position={Position.Top} className="w-2 h-2" />
  </div>
);

const createNodesAndEdges = (
  node: MindMapNode,
  parentId: string | null,
  x: number,
  y: number,
  level: number
): { nodes: Node[]; edges: Edge[] } => {
  const nodeId = `${parentId ? `${parentId}-` : ""}${(node.title || "").replace(
    /\s+/g,
    "-"
  )}`;
  const nodeType =
    level === 0 ? "root" : node.nodes.length > 0 ? "branch" : "leaf";

  const newNode: Node = {
    id: nodeId,
    type: nodeType,
    position: { x, y },
    data: {
      title: node.title,
      description: node.description,
      details: node.details,
      links: node.links,
    },
  };

  let nodes: Node[] = [newNode];
  let edges: Edge[] = [];

  if (parentId) {
    edges.push({
      id: `${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: "smoothstep",
    });
  }

  if (node.nodes && node.nodes.length > 0) {
    const childWidth = 400;
    const childStartX = x - (childWidth * (node.nodes.length - 1)) / 2;
    node.nodes.forEach((childNode, index) => {
      const childX = childStartX + index * childWidth;
      const childY = y + 200;
      const { nodes: childNodes, edges: childEdges } = createNodesAndEdges(
        childNode,
        nodeId,
        childX,
        childY,
        level + 1
      );
      nodes = [...nodes, ...childNodes];
      edges = [...edges, ...childEdges];
    });
  }

  return { nodes, edges };
};

const MindMap: React.FC<{ data: MindMapData | null }> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  if (!data) return null;

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return createNodesAndEdges({ ...data, order: 0 }, null, 0, 0, 0);
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance: any) => {
    reactFlowInstance.fitView();
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as MindMapNode);
  }, []);

  const nodeTypes = useMemo(
    () => ({
      root: RootNode,
      branch: BranchNode,
      leaf: LeafNode,
    }),
    []
  );

  const downloadMarkdown = () => {
    const markdown = convertToMarkdown(data);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title.replace(/\s+/g, "_")}_mind_map.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    downloadJson(data, `${data.title.replace(/\s+/g, "_")}_mind_map.json`);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button onClick={downloadMarkdown} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Markdown
        </Button>
        <Button
          onClick={handleDownloadJson}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download JSON
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onInit={onInit}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        elementsSelectable={false}
        nodesDraggable={false}
      >
        <Background color="#f0f0f0" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
      <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-2">
              {selectedNode?.title}
            </SheetTitle>
            <SheetDescription className="text-lg mb-4">
              {selectedNode?.description}
            </SheetDescription>
          </SheetHeader>
          {selectedNode?.details && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Details</h3>
              <p className="text-gray-700">{selectedNode.details}</p>
            </div>
          )}
          {selectedNode?.links && selectedNode.links.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Learn More</h3>
              <div className="space-y-2">
                {selectedNode.links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span className="truncate text-ellipsis">
                        {link.title}
                      </span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MindMap;
