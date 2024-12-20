'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Example } from "@/lib/example-configs";
import AnimatedGraphNodes from "@devfleet/react-animated-graph-node";
import { ChevronLeft, Code, Copy, X } from "lucide-react";
import React, { useState } from 'react';

export const ExampleCard = ({ 
  example, 
  onClick, 
  isExpanded 
}: { 
  example: Example;
  onClick: () => void;
  isExpanded: boolean;
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const configString = JSON.stringify(example.config, null, 2);
    navigator.clipboard.writeText(
      `<AnimatedGraphNodes\n${configString.slice(1, -1).split('\n').join('\n  ')}\n/>`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCode(!showCode);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95">
          <div className="relative h-full flex flex-col">
            <Button
              variant="ghost" 
              size="icon"
              onClick={onClick}
              className="absolute top-4 left-4 z-10 rounded-full bg-white/90 shadow-lg hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <CardContent className="flex-1 min-h-0 p-8">
              <div className="relative h-full min-h-[400px]">
                <AnimatedGraphNodes
                  {...example.config}
                  className="w-full h-full"
                />
              </div>
            </CardContent>

            <div className="flex-none border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
              <CardHeader className="py-3">
                <CardTitle className="font-display text-xl">{example.title}</CardTitle>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{example.description}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 h-8"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleToggleCode}
                    className="flex items-center gap-1.5 h-8"
                  >
                    {showCode ? <X className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                    <span className="text-sm">{showCode ? 'Hide Code' : 'View Code'}</span>
                  </Button>
                </div>
              </CardHeader>

              {showCode && (
                <CardFooter className="pt-0 pb-4">
                  <ScrollArea className="w-full max-h-64 rounded-lg">
                    <pre className="bg-gray-50/80 rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <code>
                        {'<AnimatedGraphNodes\n' + 
                         JSON.stringify(example.config, null, 2)
                           .slice(1, -1)
                           .split('\n')
                           .map(line => '  ' + line)
                           .join('\n') +
                         '\n/>'}
                      </code>
                    </pre>
                  </ScrollArea>
                </CardFooter>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl w-[300px] cursor-pointer bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      onClick={onClick}
    >
      <div className="w-[300px] h-[200px] relative">
        <AnimatedGraphNodes
          {...example.config}
          className="absolute inset-0"
        />
      </div>

      <CardHeader className="p-4 border-t space-y-2">
        <CardTitle className="font-display text-lg group-hover:text-blue-600 transition-colors">
          {example.title}
        </CardTitle>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {example.description}
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1.5 h-8"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggleCode}
            className="flex items-center gap-1.5 h-8"
          >
            {showCode ? <X className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span className="text-sm">{showCode ? 'Hide Code' : 'View Code'}</span>
          </Button>
        </div>
      </CardHeader>

      {showCode && (
        <CardFooter className="pt-0 pb-4 px-4">
          <ScrollArea className="w-full max-h-48 rounded-lg">
            <pre className="bg-gray-50/80 rounded-lg p-4 text-sm font-mono leading-relaxed">
              <code>
                {'<AnimatedGraphNodes\n' + 
                 JSON.stringify(example.config, null, 2)
                   .slice(1, -1)
                   .split('\n')
                   .map(line => '  ' + line)
                   .join('\n') +
                 '\n/>'}
              </code>
            </pre>
          </ScrollArea>
        </CardFooter>
      )}
    </Card>
  );
};

export default ExampleCard;
