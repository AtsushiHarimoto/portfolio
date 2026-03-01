'use client';

import { useEffect, useRef, useState } from 'react';

let mermaidInitialized = false;

export default function MermaidBlock({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              primaryColor: '#2d2540',
              primaryTextColor: '#f0e8ff',
              primaryBorderColor: '#6c5ce7',
              lineColor: '#ffc0d3',
              secondaryColor: '#1e1833',
              secondaryTextColor: '#f0e8ff',
              secondaryBorderColor: '#8b7ec8',
              tertiaryColor: '#2a1520',
              tertiaryTextColor: '#f0e8ff',
              tertiaryBorderColor: '#c77d9a',
              nodeTextColor: '#f0e8ff',
              mainBkg: '#2d2540',
              nodeBorder: '#6c5ce7',
              clusterBkg: '#16112a',
              clusterBorder: '#6c5ce7',
              titleColor: '#f0e8ff',
              edgeLabelBackground: '#1a1625',
              textColor: '#f0e8ff',
              fontSize: '14px',
            },
            flowchart: { curve: 'basis' },
            securityLevel: 'loose',
          });
          mermaidInitialized = true;
        }

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, code.trim());

        if (!cancelled) {
          setSvg(rendered);
        }
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <pre className="bg-moyin-dark rounded-xl p-4 mb-4 overflow-x-auto border border-red-500/20 text-sm leading-relaxed text-red-400">
        <code>{code}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="bg-moyin-dark rounded-xl p-8 mb-4 border border-white/5 flex items-center justify-center">
        <span className="text-moyin-text-muted text-sm animate-pulse">Rendering diagram...</span>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto">
      <div
        ref={containerRef}
        className="bg-moyin-dark/50 rounded-xl p-4 border border-white/5 flex justify-center [&_svg]:max-w-full [&_text]:!fill-[#f0e8ff] [&_.nodeLabel]:!text-[#f0e8ff] [&_.label]:!text-[#f0e8ff] [&_.edgeLabel]:!text-[#f0e8ff] [&_.cluster-label]:!text-[#f0e8ff]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
