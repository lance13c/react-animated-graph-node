'use client';
import { ExampleCard } from "@/components/ExampleCard";
import { EXAMPLES } from "@/lib/example-configs";
import { useState } from "react";

export default function AnimatedGraphShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Animated Graph Node</h1>
        <p className="text-xl text-gray-600 mb-8">
          Interactive examples of animated node graphs with different configurations.
          Click any example to explore in detail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {EXAMPLES.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
              isExpanded={expandedId === example.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
