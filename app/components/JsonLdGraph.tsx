import React from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';

const JsonLdGraph = ({ jsonLdData }) => {
    // Convert JSON-LD to graph format

    const options = {
        nodes: {
            borderWidth: 2,
            size: 30,
            shape: 'box',
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
                centralGravity: 0.2,
                springLength: 200,
                springConstant: 0.01,
                nodeDistance: 100,
            },
            solver: 'hierarchicalRepulsion',
        },
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed',
                levelSeparation: 50
            }
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
                nodes.push({ id, label: obj.label || id });
                seen.add(id);

                if (parentId) {
                    edges.push({
                        from: parentId,
                        to: id,
                        label: relationship
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