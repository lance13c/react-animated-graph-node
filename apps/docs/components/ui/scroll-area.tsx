import React, { useRef } from 'react';

// ScrollBar Component
const ScrollBar: React.FC<{
  orientation: 'horizontal' | 'vertical';
  containerRef: React.RefObject<HTMLDivElement | null>;
}> = ({ orientation, containerRef }) => {
  const handleScroll = (event: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    if (orientation === 'horizontal') {
      container.scrollLeft += event.movementX;
    } else {
      container.scrollTop += event.movementY;
    }
  };

  return (
    <div
      className={`scrollbar scrollbar-${orientation}`}
      onMouseDown={(e) => e.preventDefault()}
      onMouseMove={(e) => handleScroll(e)}
      style={{
        position: 'absolute',
        [orientation === 'horizontal' ? 'bottom' : 'right']: 0,
        [orientation === 'horizontal' ? 'height' : 'width']: '10px',
        [orientation === 'horizontal' ? 'width' : 'height']: '100%',
        backgroundColor: '#ccc',
        cursor: 'pointer',
      }}
    ></div>
  );
};

// ScrollArea Component
export const ScrollArea: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`scroll-area ${className || ''}`}
      style={{ position: 'relative', ...style }}
    >
      <div
        ref={containerRef}
        className="scroll-content"
        style={{
          overflow: 'auto',
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
      {/* Horizontal and Vertical ScrollBars */}
      <ScrollBar orientation="horizontal" containerRef={containerRef} />
      <ScrollBar orientation="vertical" containerRef={containerRef} />
    </div>
  );
};

export default ScrollArea;
