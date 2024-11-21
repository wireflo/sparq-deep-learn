import React from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';

const JsonLdGraph = ({ jsonLdData }) => {
    // Convert JSON-LD to graph format

    const options = {
        nodes: {
            borderWidth: 2,
            size: 50,
            shape: 'box',
            widthConstraint: {
                minimum: 100},
            font: {
                face: 'Inter, system-ui, sans-serif',
                size: 14,
                color: '#2D3748',
                strokeWidth: 2,
                strokeColor: '#ffffff'
            },
            color: {
                border: '#4A5568',
                background: '#EDF2F7',
                highlight: {
                    border: '#2B6CB0',
                    background: '#BEE3F8'
                },
                hover: {
                    border: '#3182CE',
                    background: '#E6F6FF'
                }
            }
        },

        physics:  {
            enabled: true,
            repulsion: {
                nodeDistance: 300,    // Minimum distance between nodes
                centralGravity: 0.1,  // Pull to center
                // Lower = more spread out
                springLength: 200,    // Rest length of edges
                // Higher = longer edges

                springConstant: 0.03, // Edge "spring" stiffness
                // Higher = more rigid edges

                damping: 0.09        // How much nodes slow down
                // Higher = more stable
            },
            stabilization: {
                enabled: true,
                iterations: 100,
                updateInterval: 25,
                onceEnabled: true
            }
        },
        layout: {
            improvedLayout: true,
            randomSeed: 2  // For consistency
        }
    };

// Convert JSON-LD to graph format
    const convertToGraph = (jsonLd) => {
        const nodes = [];
        const edges = [];
        const seen = new Set();

        const processNode = (obj, parentId = null, relationship = null) => {
            if (!obj || typeof obj !== 'object') return;

            const id = obj['@id'];
            if (id && !seen.has(id)) {

                seen.add(id);

                if (parentId) {
                    nodes.push({ id, label: obj.label || id });
                    edges.push({
                        from: parentId,
                        to: id,
                        label: relationship
                    });
                } else {
                    nodes.push({ id, label: obj.label || id, color: {
                            color: '#c4ccd7',
                            highlight: '#4299E1',
                            hover: '#63B3ED'

                        },font: {
                            size: 18,
                            color: '#2D3748',
                            strokeWidth: 4,
                            strokeColor: '#ffffff'
                        },
                        width: 2.5
                    });
                }
            }

            Object.entries(obj).forEach(([key, value]) => {
                if (key !== '@context' && key !== '@type' && key !== '@id' && key !== 'label') {
                    if (Array.isArray(value)) {
                        value.forEach(item => processNode(item, id, key));
                    } else if (typeof value === 'object') {
                        processNode(value, id, key);
                    }
                }
            });
        };

        processNode(jsonLd);
        return { nodes, edges };
    };

    const { nodes, edges } = convertToGraph(jsonLdData);



    return (
        <div style={{ height: '600px' }}>
            <Graph
                graph={{ nodes, edges }}
                options={options}
            />
        </div>
    );
};


export default JsonLdGraph;