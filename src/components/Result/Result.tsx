import React, { useState, useEffect, useCallback } from "react";
import "./Result.css";
import { FooterResult } from "../FooterResult/FooterResult";
import { ItemResult } from "../ItemResult/ItemResult";
import { Item } from "../Main/Main";
import { withInfiniteScroll } from "../withInfiniteScroll";

interface ResultState {
  items: Item[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  filter: string;
}

export interface ResultProps {
  items: Item[];
  toggleItem: (index: number) => void;
  filter: string;
  handleChangeFilter: (filter: string) => void;
  handleClearCompleted: () => void;
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
}

const EnhancedResult: React.FC<ResultProps & { loading: boolean }> = ({
  items: initialItems,
  toggleItem,
  filter,
  handleChangeFilter,
  handleClearCompleted,
  loading,
}) => {
  const [state, setState] = useState<ResultState>({
    items: initialItems,
    page: 1,
    hasMore: true,
    loading: false,
    filter: filter,
  });

  useEffect(() => {
    if (state.items.length === 0 && initialItems.length > 0) {
      setState(prev => ({ ...prev, items: initialItems }));
    }
  }, [initialItems, state.items.length]);

  useEffect(() => {
    setState(prev => ({ ...prev, filter: filter }));
  }, [filter]);

  const filteredItems = state.items.filter((item) => {
    if (state.filter === "all") return true;
    if (state.filter === "active") return !item.completed;
    if (state.filter === "completed") return item.completed;
    return true;
  });

  return (
    <div className="result-container">
      <div className="result-list">
        {filteredItems.map((item, index) => (
          <ItemResult
            key={index}
            item={item}
            index={index}
            toggleItem={toggleItem}
          />
        ))}
        {loading && <div className="loading-indicator">Loading more items...</div>}
      </div>
      <FooterResult
        items={state.items}
        filter={state.filter}
        handleChangeFilter={handleChangeFilter}
        handleClearCompleted={handleClearCompleted}
      />
    </div>
  );
};

const ResultWithInfiniteScroll = withInfiniteScroll(EnhancedResult);

export const Result: React.FC<ResultProps> = (props) => {
  const { loadMore: propsLoadMore, hasMore: propsHasMore = true, ...restProps } = props;
  
  const loadMore = useCallback(async () => {
    if (propsLoadMore) {
      await propsLoadMore();
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }, [propsLoadMore]);
  
  return <ResultWithInfiniteScroll 
    {...restProps} 
    loadMore={loadMore} 
    hasMore={propsHasMore} 
    threshold={200} 
  />;
};
