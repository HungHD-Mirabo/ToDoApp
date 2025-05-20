import React, { useState, useEffect, useCallback } from 'react';

export interface WithInfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
}

export function withInfiniteScroll(WrappedComponent: React.ComponentType<any>) {
  return function WithInfiniteScroll({ loadMore, hasMore, threshold = 100, ...rest }: WithInfiniteScrollProps) {
    const [loading, setLoading] = useState(false);

    const handleScroll = useCallback(async () => {
      if (!hasMore || loading) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      if (distanceFromBottom < threshold) {
        setLoading(true);
        try {
          await loadMore();
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    }, [loadMore, hasMore, threshold, loading]);

    useEffect(() => {
      setTimeout(() => {
        handleScroll();
      }, 100);
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, [handleScroll]);

    return (
      <WrappedComponent
        {...rest}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
      />
    );
  };
}
