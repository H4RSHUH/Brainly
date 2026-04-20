import type { ReactNode } from "react";
import { useMemo } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number;
}

/**
 * Distributes children across columns using a round-robin 
 * approach that mimics Pinterest-style masonry.
 * Each new item goes to the next column in order, which 
 * naturally fills gaps when items have varying heights.
 */
export function MasonryGrid({ children, columns = 3 }: MasonryGridProps) {
  const columnArrays = useMemo(() => {
    const cols: ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Round-robin distribution — simple and effective
    children.forEach((child, i) => {
      cols[i % columns].push(
        <div key={i} className="mb-5">
          {child}
        </div>
      );
    });

    return cols;
  }, [children, columns]);

  return (
    <div className="flex gap-5 w-full">
      {columnArrays.map((col, i) => (
        <div key={i} className="flex-1 min-w-0 flex flex-col">
          {col}
        </div>
      ))}
    </div>
  );
}
