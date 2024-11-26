"use client";
import React from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';

const JsonLdGraph = ({ jsonLdData }) => {
    // Convert JSON-LD to graph format

    const options = {
        nodes: {
            margin: 10,
            borderWidth: 1,
            size: 50,
            shape: 'box',
            shapeProperties:{
                borderRadius: 2
        },
            widthConstraint: {
                minimum: 150},
            font: {
                face: 'Inter, system-ui, sans-serif',
                size: 18,
                color: '#4c4c4c',
                strokeWidth: 3,
                strokeColor: '#ffffff'
            },
            color: {
                border: '#656667',
                background: '#f4f4f4',
                highlight: {
                    border: '#2d7736',
                    background: '#bef8d7'
                },
                hover: {
                    border: '#42e14a',
                    background: '#9ee8b6'
                }
            }
        },

        physics:  {
            enabled: true,
            solver: 'repulsion',
            minVelocity: 0.1,
            maxVelocity: 50,
            repulsion: {
                nodeDistance: 150,    // Minimum distance between nodes
                centralGravity: 0.1,  // Pull to center
                // Lower = more spread out
                springLength: 150,    // Rest length of edges
                // Higher = longer edges

                springConstant: 0.01, // Edge "spring" stiffness
                // Higher = more rigid edge

                damping: 0.3       // How much nodes slow down
                // Higher = more stable
            },
            stabilization: {
                enabled: true,
                iterations: 100,
                updateInterval: 25
            }
        },
        layout: {
            improvedLayout: true,
            randomSeed: 2  // For consistency
        },
        interaction: {
            navigationButtons: true,
            hoverConnectedEdges: true
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
                    nodes.push({ id, label: obj.label || id, margin:15,borderWidth:2,color: {
                            color: '#abd69d',
                            background:'#ffffff',
                            hover: '#9ee8b6',
                            border: '#033313'

                        },font: {
                            size: 22,
                            color: '#08190d',
                            strokeWidth: 1,
                            strokeColor: '#ffffff'
                        }
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