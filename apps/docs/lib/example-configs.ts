import { AnimatedGraphProps } from '@devfleet/react-animated-graph-node';

export interface Example {
  id: string;
  title: string;
  description: string;
  config: Partial<AnimatedGraphProps>;
}

export const EXAMPLES: Example[] = [
  {
    id: 'micro-network',
    title: 'High-Density Micro Nodes',
    description: 'Large number of tiny nodes with minimal opacity connections',
    config: {
      numNodes: 65,
      nodeColor: 'rgb(148, 163, 184)',
      lineColor: 'rgb(148, 163, 184)',
      nodeOpacity: 0.3,
      lineOpacity: 0.15,
      minNodeSize: 0.003,
      maxNodeSize: 0.005,
      connectionDistance: 0.4,
      animationSpeed: 0.02,
      velocityFactor: 0.025,
      lineWidth: 0.001,
    }
  },
  {
    id: 'elastic-cluster',
    title: 'Elastic Push Response',
    description: 'Strong elastic deformation with smooth damping',
    config: {
      numNodes: 8,
      nodeColor: 'rgb(236, 72, 153)',
      lineColor: 'rgb(236, 72, 153)',
      nodeOpacity: 1,
      lineOpacity: 0.8,
      minNodeSize: 0.02,
      maxNodeSize: 0.025,
      connectionDistance: 0.6,
      animationSpeed: 0.004,
      velocityFactor: 0.002,
      lineWidth: 0.006,
      hoverEffect: 'push',
      pushRadius: 0.5,
      pushStrength: 0.9,
      pushElasticity: 0.15,
      pushDampening: 0.95,
    }
  },
  {
    id: 'repulsion-field',
    title: 'Strong Node Repulsion',
    description: 'Enhanced repulsion forces with rapid movement',
    config: {
      numNodes: 32,
      nodeColor: 'rgb(14, 165, 233)',
      lineColor: 'rgb(14, 165, 233)',
      nodeOpacity: 0.7,
      lineOpacity: 0.4,
      minNodeSize: 0.008,
      maxNodeSize: 0.012,
      connectionDistance: 0.15,
      animationSpeed: 0.016,
      velocityFactor: 0.03,
      repulsionField: 0.4,
      lineWidth: 0.002,
    }
  },
  {
    id: 'uniform-grid',
    title: 'Uniform Node Distribution',
    description: 'Evenly sized nodes with consistent spacing',
    config: {
      numNodes: 16,
      nodeColor: 'rgb(168, 85, 247)',
      lineColor: 'rgb(168, 85, 247)',
      nodeOpacity: 0.9,
      lineOpacity: 0.7,
      minNodeSize: 0.015,
      maxNodeSize: 0.015,
      connectionDistance: 0.3,
      animationSpeed: 0.008,
      velocityFactor: 0.005,
      lineWidth: 0.004,
      repulsionField: 0.1,
    }
  },
  {
    id: 'radial-expansion',
    title: 'Radial Velocity Field',
    description: 'Outward radial movement with variable node sizes',
    config: {
      numNodes: 45,
      nodeColor: 'rgb(250, 204, 21)',
      lineColor: 'rgb(250, 204, 21)',
      nodeOpacity: 0.8,
      lineOpacity: 0.2,
      minNodeSize: 0.004,
      maxNodeSize: 0.018,
      connectionDistance: 0.25,
      animationSpeed: 0.025,
      velocityFactor: 0.04,
      lineWidth: 0.001,
      repulsionField: 0.3,
    }
  },
  {
    id: 'proximity-highlight',
    title: 'Proximity Highlighting',
    description: 'Distance-based opacity and width variation',
    config: {
      numNodes: 24,
      nodeColor: 'rgb(34, 197, 94)',
      lineColor: 'rgb(34, 197, 94)',
      nodeOpacity: 0.6,
      lineOpacity: 0.5,
      minNodeSize: 0.01,
      maxNodeSize: 0.01,
      connectionDistance: 0.35,
      animationSpeed: 0.012,
      velocityFactor: 0.008,
      lineWidth: 0.003,
      hoverEffect: 'highlight',
      hoverLineOpacity: 1,
      hoverLineWidth: 0.006,
      hoverNodeOpacity: 1,
    }
  },
  {
    id: 'dense-field',
    title: 'High-Density Field',
    description: 'Maximum node count with minimal movement',
    config: {
      numNodes: 100,
      nodeColor: 'rgb(244, 114, 182)',
      lineColor: 'rgb(244, 114, 182)',
      nodeOpacity: 0.4,
      lineOpacity: 0.2,
      minNodeSize: 0.002,
      maxNodeSize: 0.006,
      connectionDistance: 0.2,
      animationSpeed: 0.003,
      velocityFactor: 0.001,
      lineWidth: 0.001,
      repulsionField: 0.05,
    }
  },
  {
    id: 'elastic-wave',
    title: 'Elastic Wave Propagation',
    description: 'Long-range elastic deformation waves',
    config: {
      numNodes: 18,
      nodeColor: 'rgb(45, 212, 191)',
      lineColor: 'rgb(45, 212, 191)',
      nodeOpacity: 0.8,
      lineOpacity: 0.6,
      minNodeSize: 0.012,
      maxNodeSize: 0.016,
      connectionDistance: 0.4,
      animationSpeed: 0.01,
      velocityFactor: 0.015,
      lineWidth: 0.003,
      hoverEffect: 'push',
      pushRadius: 0.6,
      pushStrength: 0.8,
      pushElasticity: 0.12,
      pushDampening: 0.85,
    }
  },
  {
    id: 'intense-interaction',
    title: 'High-Intensity Interactions',
    description: 'Maximum opacity and connection strength',
    config: {
      numNodes: 12,
      nodeColor: 'rgb(239, 68, 68)',
      lineColor: 'rgb(239, 68, 68)',
      nodeOpacity: 1,
      lineOpacity: 0.9,
      minNodeSize: 0.018,
      maxNodeSize: 0.022,
      connectionDistance: 0.5,
      animationSpeed: 0.018,
      velocityFactor: 0.02,
      lineWidth: 0.005,
      repulsionField: 0.25,
      hoverEffect: 'highlight',
      hoverLineOpacity: 1,
      hoverLineWidth: 0.008,
      hoverNodeOpacity: 1,
    }
  }
];
