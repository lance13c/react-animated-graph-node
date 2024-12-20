"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";

export interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalX: number;
  originalY: number;
}

export interface Edge {
  id: string;
  nodeA: number;
  nodeB: number;
}

export type HoverEffect = "highlight" | "push" | "none";

export interface AnimatedGraphProps {
  enableAnimations?: boolean;
  numNodes?: number;
  minNodeSize?: number;
  maxNodeSize?: number;
  nodeColor?: string;
  nodeOpacity?: number;
  connectionDistance?: number;
  lineColor?: string;
  lineOpacity?: number;
  lineWidth?: number;
  animationSpeed?: number;
  velocityFactor?: number;
  minVelocity?: number;
  hoverEffect?: HoverEffect;
  hoverLineOpacity?: number;
  hoverLineWidth?: number;
  hoverNodeOpacity?: number;
  height?: string;
  className?: string;
  pushRadius?: number;
  pushStrength?: number;
  pushElasticity?: number;
  pushDampening?: number;
  repulsionField?: number;
}

const defaultProps = {
  enableAnimations: true,
  numNodes: 24,
  minNodeSize: 0.008,
  maxNodeSize: 0.015,
  nodeColor: "rgb(76, 181, 174)",
  nodeOpacity: 0.6,
  connectionDistance: 0.3,
  lineColor: "rgb(76, 181, 174)",
  lineOpacity: 0.6,
  lineWidth: 0.004,
  animationSpeed: 0.012,
  velocityFactor: 0.01,
  minVelocity: 0.001,
  hoverEffect: "highlight" as HoverEffect,
  hoverLineOpacity: 0.8,
  hoverLineWidth: 0.002,
  hoverNodeOpacity: 1,
  className: "",
  pushRadius: 0.3,
  pushStrength: 0.5,
  pushElasticity: 0.05,
  pushDampening: 0.8,
  repulsionField: 0.2,
} as const;

export const AnimatedGraphNodes: React.FC<AnimatedGraphProps> = (userProps) => {
  const props = useMemo(() => ({ ...defaultProps, ...userProps }), [userProps]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const configRef = useRef(props);
  const animationFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  const PADDING = 0;

  const getCentralizedPositions = (numNodes: number) => {
    const positions: Array<{ x: number; y: number }> = [];
    const CENTER = 0.5;
    const MAX_RADIUS = 0.6;
    const MIN_DISTANCE = 0.08;
    const MAX_ATTEMPTS = 50;

    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const isValidPosition = (x: number, y: number) => {
      for (const pos of positions) {
        if (getDistance(x, y, pos.x, pos.y) < MIN_DISTANCE) {
          return false;
        }
      }
      return true;
    };

    for (let i = 0; i < numNodes; i++) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < MAX_ATTEMPTS) {
        const radius = Math.sqrt(Math.random()) * MAX_RADIUS;
        const angle = Math.random() * Math.PI * 2;

        const x = CENTER + radius * Math.cos(angle);
        const y = CENTER + radius * Math.sin(angle);

        if (isValidPosition(x, y)) {
          positions.push({ x, y });
          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        const radius = Math.sqrt(Math.random()) * MAX_RADIUS;
        const angle = Math.random() * Math.PI * 2;
        positions.push({
          x: CENTER + radius * Math.cos(angle),
          y: CENTER + radius * Math.sin(angle),
        });
      }
    }

    return positions;
  };

  const initializeNodes = useCallback(() => {
    const positions = getCentralizedPositions(configRef.current.numNodes);

    const newNodes = positions.map((position) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.max(
        configRef.current.minVelocity,
        Math.random() * configRef.current.velocityFactor,
      );

      return {
        x: position.x,
        y: position.y,
        originalX: position.x,
        originalY: position.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size:
          configRef.current.minNodeSize +
          Math.random() *
            (configRef.current.maxNodeSize - configRef.current.minNodeSize),
      };
    });

    nodesRef.current = newNodes;
  }, []);

  const updatePositions = useCallback(() => {
    if (!configRef.current.enableAnimations) return;

    const {
      hoverEffect,
      pushRadius,
      pushStrength,
      pushElasticity,
      pushDampening,
      animationSpeed,
    } = configRef.current;
    const mousePos = mousePositionRef.current;

    nodesRef.current.forEach((node) => {
      const effectivePadding = PADDING + node.size;
      const minX = effectivePadding;
      const maxX = 1 - effectivePadding;
      const minY = effectivePadding;
      const maxY = 1 - effectivePadding;

      // Always apply basic animation movement
      let x = node.x + node.vx * animationSpeed;
      let y = node.y + node.vy * animationSpeed;
      let vx = node.vx;
      let vy = node.vy;

      // Handle boundary collisions
      if (x < minX) {
        x = minX;
        vx = Math.abs(vx);
      } else if (x > maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      }

      if (y < minY) {
        y = minY;
        vy = Math.abs(vy);
      } else if (y > maxY) {
        y = maxY;
        vy = -Math.abs(vy);
      }

      // Apply push effect if enabled
      if (hoverEffect === "push") {
        const dx = x - mousePos.x;
        const dy = y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pushRadius) {
          // Calculate push force with smooth falloff
          const force = (1 - Math.pow(distance / pushRadius, 2)) * pushStrength;

          // Normalize direction vector
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;

          // Apply force with elasticity
          const targetX = node.originalX + normalizedDx * force;
          const targetY = node.originalY + normalizedDy * force;

          // Add elastic movement
          vx += (targetX - x) * pushElasticity;
          vy += (targetY - y) * pushElasticity;

          // Apply damping
          vx *= pushDampening;
          vy *= pushDampening;
        } else {
          // Return to original position with elastic movement
          const dx = node.originalX - x;
          const dy = node.originalY - y;

          vx += dx * pushElasticity;
          vy += dy * pushElasticity;

          vx *= pushDampening;
          vy *= pushDampening;
        }
      }

      // Update node position and velocity
      node.x = x;
      node.y = y;
      node.vx = vx;
      node.vy = vy;
    });
  }, []);

  // Update configRef when props change
  useEffect(() => {
    configRef.current = props;
  }, [props]);

  const calculateEdges = useCallback(() => {
    const edges: Edge[] = [];
    const nodes = nodesRef.current;

    nodes.forEach((nodeA, i) => {
      nodes.slice(i + 1).forEach((nodeB, j) => {
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < configRef.current.connectionDistance) {
          edges.push({
            id: `${i}-${j + i + 1}`,
            nodeA: i,
            nodeB: j + i + 1,
          });
        }
      });
    });
    edgesRef.current = edges;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(canvas.width, canvas.height);
    const offsetX = (canvas.width - scale) / 2;
    const offsetY = (canvas.height - scale) / 2;

    // Draw edges with proximity-based highlighting only when highlight effect is enabled
    edgesRef.current.forEach((edge) => {
      const nodeA = nodesRef.current[edge.nodeA];
      const nodeB = nodesRef.current[edge.nodeB];

      if (!nodeA || !nodeB) return;

      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      ctx.beginPath();
      ctx.moveTo(offsetX + nodeA.x * scale, offsetY + nodeA.y * scale);
      ctx.lineTo(offsetX + nodeB.x * scale, offsetY + nodeB.y * scale);
      ctx.strokeStyle = configRef.current.lineColor;

      if (configRef.current.hoverEffect === "highlight") {
        // Calculate cursor distance to edge midpoint for highlight effect
        const midX = (nodeA.x + nodeB.x) / 2;
        const midY = (nodeA.y + nodeB.y) / 2;
        const cursorDx = midX - mousePositionRef.current.x;
        const cursorDy = midY - mousePositionRef.current.y;
        const cursorDistance = Math.sqrt(
          cursorDx * cursorDx + cursorDy * cursorDy,
        );

        // Highlight radius and intensity calculation
        const highlightRadius = 0.2;
        const highlightIntensity = Math.max(
          0,
          Math.min(1, 1 - cursorDistance / highlightRadius),
        );

        // Interpolate line width and opacity for highlight effect
        const baseWidth = configRef.current.lineWidth;
        const highlightWidth = configRef.current.hoverLineWidth;
        const lineWidth =
          baseWidth + (highlightWidth - baseWidth) * highlightIntensity;
        ctx.lineWidth = lineWidth * scale;

        const baseOpacity =
          (1 - distance / configRef.current.connectionDistance) *
          configRef.current.lineOpacity;
        const highlightOpacity = configRef.current.hoverLineOpacity;
        ctx.globalAlpha =
          baseOpacity + (highlightOpacity - baseOpacity) * highlightIntensity;
      } else {
        // Use base values when highlight is not enabled
        ctx.lineWidth = configRef.current.lineWidth * scale;
        ctx.globalAlpha =
          (1 - distance / configRef.current.connectionDistance) *
          configRef.current.lineOpacity;
      }

      ctx.stroke();
    });

    // Draw nodes with highlighting only when highlight effect is enabled
    nodesRef.current.forEach((node) => {
      ctx.beginPath();
      ctx.arc(
        offsetX + node.x * scale,
        offsetY + node.y * scale,
        node.size * scale,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = configRef.current.nodeColor;

      if (configRef.current.hoverEffect === "highlight") {
        const dx = node.x - mousePositionRef.current.x;
        const dy = node.y - mousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate highlight intensity based on distance
        const highlightRadius = 0.2;
        const highlightIntensity = Math.max(
          0,
          Math.min(1, 1 - distance / highlightRadius),
        );

        // Interpolate opacity based on proximity
        const baseOpacity = configRef.current.nodeOpacity;
        const highlightOpacity = configRef.current.hoverNodeOpacity;
        ctx.globalAlpha =
          baseOpacity + (highlightOpacity - baseOpacity) * highlightIntensity;
      } else {
        // Use base opacity when highlight is not enabled
        ctx.globalAlpha = configRef.current.nodeOpacity;
      }

      ctx.fill();
    });
  }, []);

  const animate = useCallback(() => {
    updatePositions();
    calculateEdges();
    draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updatePositions, calculateEdges, draw]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scale = Math.min(rect.width, rect.height);
    const offsetX = (rect.width - scale) / 2;
    const offsetY = (rect.height - scale) / 2;

    const x = (event.clientX - rect.left - offsetX) / scale;
    const y = (event.clientY - rect.top - offsetY) / scale;
    mousePositionRef.current = { x, y };
  }, []);

  const handleResize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    scaleRef.current = scale;

    canvasRef.current.width = width * scale;
    canvasRef.current.height = height * scale;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
  }, []);

  useEffect(() => {
    configRef.current = props;
  }, [props]);

  useEffect(() => {
    initializeNodes();
  }, [props.numNodes, props.minNodeSize, props.maxNodeSize, initializeNodes]);

  useEffect(() => {
    handleResize();
    updatePositions();
    calculateEdges();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleResize, handleMouseMove, updatePositions, calculateEdges, draw]);

  useEffect(() => {
    if (!configRef.current.enableAnimations) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, props.enableAnimations]);

  return (
  <div
    ref={containerRef}
    className={props.className}
    style={{ 
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: '1/1',
      animation: 'fadeIn 0.5s ease-in-out forwards',
    }}
  >
    <canvas 
      ref={canvasRef} 
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
      }}
    />
  </div>
);
};
