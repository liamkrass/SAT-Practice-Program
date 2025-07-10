// VisualElements.tsx - React component for rendering question visuals
import React from 'react';

interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

interface VisualElementProps {
  visual: VisualElement;
  className?: string;
}

export const VisualElementRenderer: React.FC<VisualElementProps> = ({ 
  visual, 
  className = "" 
}) => {
  // Helper: Try to parse a line graph from description
  const tryRenderLineGraphFromDescription = (desc: string) => {
    // Example desc: 'A line graph on an xy-plane with a grid. The x-axis ranges from -2 to 10. The y-axis ranges from -2 to 10. There are two lines graphed. The first line passes through the points (0, 8) and (8, 0). The second line passes through the points (0, 4) and (8, 0).'
    const xRangeMatch = desc.match(/x-axis ranges from ([\-\d\.]+) to ([\-\d\.]+)/i);
    const yRangeMatch = desc.match(/y-axis ranges from ([\-\d\.]+) to ([\-\d\.]+)/i);
    const lineMatches = Array.from(desc.matchAll(/line passes through the points? \(([^)]+)\) and \(([^)]+)\)/gi));
    if (!xRangeMatch || !yRangeMatch || lineMatches.length === 0) return null;
    const xMin = parseFloat(xRangeMatch[1]);
    const xMax = parseFloat(xRangeMatch[2]);
    const yMin = parseFloat(yRangeMatch[1]);
    const yMax = parseFloat(yRangeMatch[2]);
    const width = 220, height = 220, pad = 32;
    // Map (x, y) to SVG coords
    const map = (x: number, y: number) => [
      pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad),
      height - (pad + ((y - yMin) / (yMax - yMin)) * (height - 2 * pad))
    ];
    // Parse lines
    const lines = lineMatches.map(match => {
      const [x1, y1] = match[1].split(',').map(Number);
      const [x2, y2] = match[2].split(',').map(Number);
      return { x1, y1, x2, y2 };
    });
    // SVG
    return (
      <svg width={width} height={height} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 8 }}>
        {/* Grid lines */}
        {[...Array(11)].map((_, i) => (
          <line key={i} x1={pad} x2={width-pad} y1={pad + i*(height-2*pad)/10} y2={pad + i*(height-2*pad)/10} stroke="#e0e7ef" strokeWidth={1}/>
        ))}
        {[...Array(11)].map((_, i) => (
          <line key={i} y1={pad} y2={height-pad} x1={pad + i*(width-2*pad)/10} x2={pad + i*(width-2*pad)/10} stroke="#e0e7ef" strokeWidth={1}/>
        ))}
        {/* Axes */}
        <line x1={pad} x2={width-pad} y1={height-pad} y2={height-pad} stroke="#222" strokeWidth={2}/>
        <line x1={pad} x2={pad} y1={pad} y2={height-pad} stroke="#222" strokeWidth={2}/>
        {/* Lines */}
        {lines.map((line, i) => {
          const [x1, y1] = map(line.x1, line.y1);
          const [x2, y2] = map(line.x2, line.y2);
          const color = i === 0 ? '#2563eb' : '#f59e42';
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={3}/>;
        })}
        {/* Axis labels */}
        <text x={width/2} y={height-4} textAnchor="middle" fontSize="12" fill="#222">x</text>
        <text x={10} y={height/2} textAnchor="middle" fontSize="12" fill="#222" transform={`rotate(-90 10,${height/2})`}>y</text>
      </svg>
    );
  };

  // Helper: Render structured graph data
  const renderStructuredGraph = (data: any) => {
    const { xRange, yRange, lines } = data;
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const width = 300, height = 300, pad = 40;
    
    // Map (x, y) to SVG coords
    const map = (x: number, y: number) => [
      pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad),
      height - (pad + ((y - yMin) / (yMax - yMin)) * (height - 2 * pad))
    ];
    
    return (
      <svg width={width} height={height} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 8 }}>
        {/* Grid lines */}
        {[...Array(11)].map((_, i) => (
          <line key={`h${i}`} x1={pad} x2={width-pad} y1={pad + i*(height-2*pad)/10} y2={pad + i*(height-2*pad)/10} stroke="#e0e7ef" strokeWidth={1}/>
        ))}
        {[...Array(11)].map((_, i) => (
          <line key={`v${i}`} y1={pad} y2={height-pad} x1={pad + i*(width-2*pad)/10} x2={pad + i*(width-2*pad)/10} stroke="#e0e7ef" strokeWidth={1}/>
        ))}
        {/* Axes */}
        <line x1={pad} x2={width-pad} y1={height-pad} y2={height-pad} stroke="#222" strokeWidth={2}/>
        <line x1={pad} x2={pad} y1={pad} y2={height-pad} stroke="#222" strokeWidth={2}/>
        {/* Lines */}
        {lines.map((line: any, i: number) => {
          const [x1, y1] = map(line.points[0][0], line.points[0][1]);
          const [x2, y2] = map(line.points[1][0], line.points[1][1]);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={line.color} strokeWidth={3}/>;
        })}
        {/* Axis labels */}
        <text x={width/2} y={height-4} textAnchor="middle" fontSize="12" fill="#222">x</text>
        <text x={10} y={height/2} textAnchor="middle" fontSize="12" fill="#222" transform={`rotate(-90 10,${height/2})`}>y</text>
        {/* Scale indicators */}
        <text x={pad} y={height-pad+15} textAnchor="middle" fontSize="10" fill="#666">{xMin}</text>
        <text x={width-pad} y={height-pad+15} textAnchor="middle" fontSize="10" fill="#666">{xMax}</text>
        <text x={pad-15} y={height-pad} textAnchor="middle" fontSize="10" fill="#666">{yMin}</text>
        <text x={pad-15} y={pad} textAnchor="middle" fontSize="10" fill="#666">{yMax}</text>
      </svg>
    );
  };

  // Helper: Render structured table data
  const renderStructuredTable = (data: any) => {
    const { headers, rows } = data;
    return (
      <div className={`visual-table ${className}`}>
        <table className="border-collapse border border-gray-300 mx-auto">
          <thead>
            <tr>
              {headers.map((header: string, i: number) => (
                <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cell: string, j: number) => (
                  <td key={j} className="border border-gray-300 px-4 py-2 text-center">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper: Render multiple choice tables
  const renderMultipleChoiceTables = (tables: any[]) => {
    return (
      <div className={`visual-multiple-tables ${className}`}>
        <div className="grid grid-cols-2 gap-4">
          {tables.map((table: any, i: number) => (
            <div key={i} className="text-center">
              <h4 className="font-semibold mb-2">{table.label}</h4>
              <table className="border-collapse border border-gray-300 mx-auto">
                <thead>
                  <tr>
                    {table.headers.map((header: string, j: number) => (
                      <th key={j} className="border border-gray-300 px-3 py-1 bg-gray-100 text-sm font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row: string[], j: number) => (
                    <tr key={j}>
                      {row.map((cell: string, k: number) => (
                        <td key={k} className="border border-gray-300 px-3 py-1 text-center text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVisual = () => {
    switch (visual.type) {
      case 'graph':
      case 'chart':
      case 'diagram':
        if (visual.svg) {
          return (
            <div 
              className={`visual-svg ${className}`}
              dangerouslySetInnerHTML={{ __html: visual.svg }}
            />
          );
        }
        // Check if we have structured graph data
        if (visual.data && visual.data.xRange && visual.data.yRange && visual.data.lines) {
          return renderStructuredGraph(visual.data);
        }
        // Try to auto-generate SVG from description
        const autoSVG = tryRenderLineGraphFromDescription(visual.description);
        if (autoSVG) return autoSVG;
        return (
          <div className={`visual-placeholder ${className}`}>
            <p className="text-sm text-gray-600">{visual.description}</p>
          </div>
        );
        
      case 'table':
        // Check if we have structured table data
        if (visual.data) {
          if (visual.data.multipleChoice && visual.data.tables) {
            return renderMultipleChoiceTables(visual.data.tables);
          }
          if (visual.data.headers && visual.data.rows) {
            return renderStructuredTable(visual.data);
          }
        }
        // Legacy table rendering
        if (visual.data?.table) {
          return (
            <div className={`visual-table ${className}`}>
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {visual.data.table.headers.map((header: string, i: number) => (
                      <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visual.data.table.rows.map((row: any[], i: number) => (
                    <tr key={i}>
                      {row.map((cell: any, j: number) => (
                        <td key={j} className="border border-gray-300 px-4 py-2 text-center">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        // Try to parse a table from the description
        const tableFromDesc = (() => {
          // Example: 'A table with two columns, x and y. The rows contain the following pairs of values: (18, 130), (23, 160), (26, 178).'
          const colMatch = visual.description.match(/table with (\w+) columns?,? ([^\.]+)\./i);
          let headers: string[] = [];
          if (colMatch) {
            headers = colMatch[2].split(/,| and /).map(h => h.trim());
          }
          const rowMatch = visual.description.match(/rows contain the following pairs of values: ([^\.]+)\./i);
          let rows: string[][] = [];
          if (rowMatch) {
            rows = rowMatch[1].split(/\),/).map(pair => {
              const clean = pair.replace(/[()]/g, '').replace(/\.$/, '').trim();
              return clean.split(',').map(v => v.trim());
            });
          }
          if (headers.length && rows.length) {
            return (
              <div className={`visual-table ${className}`}>
                <table className="border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      {headers.map((header, i) => (
                        <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-300 px-4 py-2 text-center">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        })();
        if (tableFromDesc) return tableFromDesc;
        break;
        
      case 'equation':
        return (
          <div className={`visual-equation ${className}`}>
            <div className="math-display text-lg font-mono">
              {visual.description}
            </div>
          </div>
        );
        
      default:
        return (
          <div className={`visual-description ${className}`}>
            <p className="text-sm italic text-gray-600">{visual.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="visual-element-container my-4">
      {renderVisual()}
    </div>
  );
};

export default VisualElementRenderer;
