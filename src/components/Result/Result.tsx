import React from "react";
import "./Result.css";
import { FooterResult } from "../FooterResult/FooterResult";
import { ItemResult } from "../ItemResult/ItemResult";
import { Item } from "../Main/Main";

interface ResultProps {
  items: {
    title: string;
    completed: boolean;
  }[];
  toggleItem: (index: number) => void;
  handleUpdateItem: (index: number, item: Item) => void;
  filter: string;
  handleChangeFilter: (filter: string) => void;
  handleClearCompleted: () => void;
}

export class Result extends React.Component<ResultProps> {
  render() {
    const {
      items,
      toggleItem,
      handleUpdateItem,
      filter,
      handleChangeFilter,
      handleClearCompleted,
    } = this.props;

    return (
      <section>
        <ul className="todo-list">
          {items.map((item: Item, index: number) => {
            if (
              filter === "all" ||
              (filter === "active" && !item.completed) ||
              (filter === "completed" && item.completed)
            ) {
              return (
                <ItemResult
                  key={index}
                  item={item}
                  index={index}
                  toggleItem={toggleItem}
                  handleUpdateItem={handleUpdateItem}
                />
              );
            }
            return null;
          })}
        </ul>
        <FooterResult
          items={items}
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          handleClearCompleted={handleClearCompleted}
        />
      </section>
    );
  }
}
