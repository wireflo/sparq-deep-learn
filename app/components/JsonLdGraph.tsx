import React from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';

const JsonLdGraph = ({ jsonLdData }) => {
    // Convert JSON-LD to graph format
    const convertJsonLdToGraph = (data) => {
        const nodes = [];
        const edges = [];
        const processedNodes = new Set();

        const addNode = (id, label, group = 'default') => {
            if (!processedNodes.has(id)) {
                nodes.push({
                    id,
                    label: label || id,
                    group,
                    font: { size: 16 },
                    shape: group === 'root' ? 'diamond' : 'dot',
                });
                processedNodes.add(id);
            }
        };

        const processObject = (obj, parentId = null) => {
            if (!obj || typeof obj !== 'object') return;

            // Add current node
            const currentId = obj['@id'];
            const currentLabel = obj.label;
            const isRoot = obj['@type'] === 'Rechtskategorie';

            if (currentId) {
                addNode(currentId, currentLabel, isRoot ? 'root' : 'default');

                // Add edge from parent if exists
                if (parentId) {
                    edges.push({
                        from: parentId,
                        to: currentId,
                        // Get the relationship type from the parent object's keys
                        label: Object.keys(obj).find(key =>
                            typeof obj[key] === 'object' && obj[key]['@id'] === currentId
                        ) || ''
                    });
                }
            }

            // Process all properties that might contain nested nodes
            Object.entries(obj).forEach(([key, value]) => {
                if (key !== '@context' && key !== '@type' && key !== '@id' && key !== 'label') {
                    if (Array.isArray(value)) {
                        value.forEach(item => processObject(item, currentId));
                    } else if (typeof value === 'object') {
                        processObject(value, currentId);
                    }
                }
            });
        };

        processObject(data);
        return { nodes, edges };
    };

    const { nodes, edges } = convertJsonLdToGraph(jsonLdData);

    const options = {
        nodes: {
            borderWidth: 2,
            size: 30,
            color: {
                border: '#2B7CE9',
                background: '#97C2FC',
                highlight: {
                    border: '#2B7CE9',
                    background: '#D2E5FF'
                }
            },
            font: {
                color: '#343434',
                size: 14
            }
        },
        edges: {
            color: '#2B7CE9',
            width: 1,
            font: {
                size: 12,
                align: 'middle'
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
            }
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 200,
                springConstant: 0.01,
                nodeDistance: 150,
            },
            solver: 'hierarchicalRepulsion',
        },
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed',
                levelSeparation: 150
            }
        }
    };



    return (
        <div style={{ height: '800px', width: '100%' }}>
            <Graph
                graph={{ nodes, edges }}
                options={options}

            />
        </div>
    );
};


export default JsonLdGraph;