import React from "react";

const MindMapLegend: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 bg-white p-6 rounded-lg border border-gray-200 z-10">
      <h3 className="text-lg font-semibold mb-2">How to use</h3>
      <ul className="space-y-2 text-sm">
        <li>• Double-click a node to view details;</li>
        <li>• Drag nodes to rearrange the map;</li>
        <li>• Use mouse wheel or pinch to zoom;</li>
        <li>• Click and drag the background to pan;</li>
        <li>• Download the map as JSON or Markdown.</li>
      </ul>
    </div>
  );
};

export default MindMapLegend;
