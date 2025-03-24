"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loadMore: () => Promise<T[]>;
  hasMore: boolean;
  loadingText?: string;
  endText?: string;
  className?: string;
}

export default function InfiniteScrollList<T>({
  items: initialItems,
  renderItem,
  loadMore,
  hasMore: initialHasMore,
  loadingText = "Caricamento in corso...",
  endText = "Non ci sono altri elementi da caricare",
  className = "",
}: InfiniteScrollListProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(initialItems);
    setHasMore(initialHasMore);
  }, [initialItems, initialHasMore]);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    const handleObserver = async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        try {
          const newItems = await loadMore();
          if (newItems.length === 0) {
            setHasMore(false);
          } else {
            setItems((prevItems) => [...prevItems, ...newItems]);
          }
        } catch (error) {
          console.error("Error loading more items:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, loadMore]);

  return (
    <div className={className}>
      {items.map((item, index) => renderItem(item, index))}

      <div ref={loadingRef} className="py-4 text-center">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">{loadingText}</span>
          </div>
        ) : hasMore ? null : (
          <p className="text-sm text-muted-foreground">{endText}</p>
        )}
      </div>
    </div>
  );
}
