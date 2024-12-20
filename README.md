# React Animated Graph Node

[![NPM Version](https://img.shields.io/npm/v/@devfleet.io/react-animated-graph-node)](https://www.npmjs.com/package/@devfleet.io/react-animated-graph-node)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devfleet.io/react-animated-graph-node)](https://bundlephobia.com/package/@devfleet.io/react-animated-graph-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Beautiful, interactive animated graph nodes for React applications. Create dynamic network visualizations with smooth animations, hover effects, and responsive interactions.

![Demo Animation](https://raw.githubusercontent.com/lance13c/react-animated-graph-node/main/.github/assets/demo.gif)

## Features

- 🎨 Canvas-based rendering for optimal performance
- 🔄 Smooth animations with configurable physics
- 💫 Interactive hover effects (highlight & push)
- 📱 Fully responsive design
- 🎮 Extensive customization options
- 🚀 Zero dependencies (except React)
- 📦 Tiny bundle size
- 🌐 TypeScript support

## Installation

```bash
npm install @devfleet.io/react-animated-graph-node
# or
yarn add @devfleet.io/react-animated-graph-node
# or
pnpm add @devfleet.io/react-animated-graph-node
```

## Quick Start

```jsx
import { AnimatedGraphNodes } from '@devfleet.io/react-animated-graph-node';

function App() {
  return (
    <div style={{ width: '600px', height: '400px' }}>
      <AnimatedGraphNodes
        numNodes={24}
        nodeColor="rgb(76, 181, 174)"
        lineColor="rgb(76, 181, 174)"
        hoverEffect="highlight"
      />
    </div>
  );
}
```

## Examples

### High-Density Micro Network
```jsx
<AnimatedGraphNodes
  numNodes={65}
  nodeColor="rgb(148, 163, 184)"
  lineColor="rgb(148, 163, 184)"
  nodeOpacity={0.3}
  lineOpacity={0.15}
  minNodeSize={0.003}
  maxNodeSize={0.005}
  connectionDistance={0.4}
/>
```

### Elastic Push Response
```jsx
<AnimatedGraphNodes
  numNodes={8}
  nodeColor="rgb(236, 72, 153)"
  lineColor="rgb(236, 72, 153)"
  hoverEffect="push"
  pushRadius={0.5}
  pushStrength={0.9}
  pushElasticity={0.15}
/>
```

### Proximity Highlighting
```jsx
<AnimatedGraphNodes
  numNodes={24}
  nodeColor="rgb(34, 197, 94)"
  lineColor="rgb(34, 197, 94)"
  hoverEffect="highlight"
  hoverLineOpacity={1}
  hoverLineWidth={0.006}
/>
```

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableAnimations` | boolean | true | Toggle animations on/off |
| `numNodes` | number | 24 | Number of nodes to display |
| `minNodeSize` | number | 0.008 | Minimum size of nodes relative to canvas |
| `maxNodeSize` | number | 0.015 | Maximum size of nodes relative to canvas |
| `nodeColor` | string | 'rgb(76, 181, 174)' | Color of the nodes |
| `nodeOpacity` | number | 0.6 | Node opacity (0-1) |
| `connectionDistance` | number | 0.3 | Maximum distance for node connections |
| `lineColor` | string | 'rgb(76, 181, 174)' | Color of connection lines |
| `lineOpacity` | number | 0.6 | Line opacity (0-1) |
| `lineWidth` | number | 0.004 | Width of connection lines |
| `animationSpeed` | number | 0.012 | Speed of node movement |
| `velocityFactor` | number | 0.01 | Base velocity of node movement |
| `minVelocity` | number | 0.001 | Minimum velocity for node movement |
| `hoverEffect` | 'highlight' \| 'push' \| 'none' | 'highlight' | Type of hover interaction |
| `hoverLineOpacity` | number | 0.8 | Line opacity on hover |
| `hoverLineWidth` | number | 0.002 | Line width on hover |
| `hoverNodeOpacity` | number | 1 | Node opacity on hover |
| `height` | string | undefined | Optional fixed height for container |
| `className` | string | '' | Additional CSS classes |
| `pushRadius` | number | 0.3 | Radius of push effect |
| `pushStrength` | number | 0.5 | Strength of push effect |
| `pushElasticity` | number | 0.05 | Elasticity of push effect |
| `pushDampening` | number | 0.8 | Dampening of push effect |
| `repulsionField` | number | 0.2 | Strength of node repulsion |

## Examples

### High-Density Micro Network
```jsx
<AnimatedGraphNodes
  numNodes={65}
  nodeColor="rgb(148, 163, 184)"
  lineColor="rgb(148, 163, 184)"
  nodeOpacity={0.3}
  lineOpacity={0.15}
  minNodeSize={0.003}
  maxNodeSize={0.005}
  connectionDistance={0.4}
  animationSpeed={0.02}
  velocityFactor={0.025}
  lineWidth={0.001}
/>
```

### Elastic Push Response
```jsx
<AnimatedGraphNodes
  numNodes={8}
  nodeColor="rgb(236, 72, 153)"
  lineColor="rgb(236, 72, 153)"
  nodeOpacity={1}
  lineOpacity={0.8}
  minNodeSize={0.02}
  maxNodeSize={0.025}
  connectionDistance={0.6}
  animationSpeed={0.004}
  velocityFactor={0.002}
  lineWidth={0.006}
  hoverEffect="push"
  pushRadius={0.5}
  pushStrength={0.9}
  pushElasticity={0.15}
  pushDampening={0.95}
/>
```

### Strong Node Repulsion
```jsx
<AnimatedGraphNodes
  numNodes={32}
  nodeColor="rgb(14, 165, 233)"
  lineColor="rgb(14, 165, 233)"
  nodeOpacity={0.7}
  lineOpacity={0.4}
  minNodeSize={0.008}
  maxNodeSize={0.012}
  connectionDistance={0.15}
  animationSpeed={0.016}
  velocityFactor={0.03}
  repulsionField={0.4}
  lineWidth={0.002}
/>
```

### Uniform Node Distribution
```jsx
<AnimatedGraphNodes
  numNodes={16}
  nodeColor="rgb(168, 85, 247)"
  lineColor="rgb(168, 85, 247)"
  nodeOpacity={0.9}
  lineOpacity={0.7}
  minNodeSize={0.015}
  maxNodeSize={0.015}
  connectionDistance={0.3}
  animationSpeed={0.008}
  velocityFactor={0.005}
  lineWidth={0.004}
  repulsionField={0.1}
/>
```

### Radial Expansion
```jsx
<AnimatedGraphNodes
  numNodes={45}
  nodeColor="rgb(250, 204, 21)"
  lineColor="rgb(250, 204, 21)"
  nodeOpacity={0.8}
  lineOpacity={0.2}
  minNodeSize={0.004}
  maxNodeSize={0.018}
  connectionDistance={0.25}
  animationSpeed={0.025}
  velocityFactor={0.04}
  lineWidth={0.001}
  repulsionField={0.3}
/>
```

### Proximity Highlighting
```jsx
<AnimatedGraphNodes
  numNodes={24}
  nodeColor="rgb(34, 197, 94)"
  lineColor="rgb(34, 197, 94)"
  nodeOpacity={0.6}
  lineOpacity={0.5}
  minNodeSize={0.01}
  maxNodeSize={0.01}
  connectionDistance={0.35}
  animationSpeed={0.012}
  velocityFactor={0.008}
  lineWidth={0.003}
  hoverEffect="highlight"
  hoverLineOpacity={1}
  hoverLineWidth={0.006}
  hoverNodeOpacity={1}
/>
```

### High-Density Field
```jsx
<AnimatedGraphNodes
  numNodes={100}
  nodeColor="rgb(244, 114, 182)"
  lineColor="rgb(244, 114, 182)"
  nodeOpacity={0.4}
  lineOpacity={0.2}
  minNodeSize={0.002}
  maxNodeSize={0.006}
  connectionDistance={0.2}
  animationSpeed={0.003}
  velocityFactor={0.001}
  lineWidth={0.001}
  repulsionField={0.05}
/>
```

### Elastic Wave Propagation
```jsx
<AnimatedGraphNodes
  numNodes={18}
  nodeColor="rgb(45, 212, 191)"
  lineColor="rgb(45, 212, 191)"
  nodeOpacity={0.8}
  lineOpacity={0.6}
  minNodeSize={0.012}
  maxNodeSize={0.016}
  connectionDistance={0.4}
  animationSpeed={0.01}
  velocityFactor={0.015}
  lineWidth={0.003}
  hoverEffect="push"
  pushRadius={0.6}
  pushStrength={0.8}
  pushElasticity={0.12}
  pushDampening={0.85}
/>
```

### High-Intensity Interactions
```jsx
<AnimatedGraphNodes
  numNodes={12}
  nodeColor="rgb(239, 68, 68)"
  lineColor="rgb(239, 68, 68)"
  nodeOpacity={1}
  lineOpacity={0.9}
  minNodeSize={0.018}
  maxNodeSize={0.022}
  connectionDistance={0.5}
  animationSpeed={0.018}
  velocityFactor={0.02}
  lineWidth={0.005}
  repulsionField={0.25}
  hoverEffect="highlight"
  hoverLineOpacity={1}
  hoverLineWidth={0.008}
  hoverNodeOpacity={1}
/>
```

## Demo & Documentation

- [Live Demo](https://react-animated-graph-node.vercel.app)
- [API Documentation](https://github.com/lance13c/react-animated-graph-node/blob/main/docs/API.md)
- [Examples](https://github.com/lance13c/react-animated-graph-node/blob/main/docs/examples)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) © Dominic Cicilio

https://devfleet.io
