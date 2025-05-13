import React from "react";
import { Item, UpdateItemContext } from "../Main/Main";
import "./ItemResult.css";

interface ItemProps {
  item: {
    title: string;
    completed: boolean;
  };
  index: number;
  toggleItem: (index: number) => void;
}

interface State {
  updateItem: Item | null;
}

export class ItemResult extends React.Component<ItemProps, State> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      updateItem: null,
    };
  }

  checkIsCompleted = (completed: boolean) => {
    return completed ? "completed" : "";
  };

  render() {
    const { item, index, toggleItem } = this.props;
    return (
      <UpdateItemContext.Consumer>
        {(context) => {
          if (!context) {
            throw new Error("UpdateItemContext is not provided");
          }
          return (
            <li className="todo-item" key={index}>
              <input
                type="checkbox"
                checked={item.completed}
                onClick={() => toggleItem(index)}
              />
              <div
                className="todo-item-title"
                onDoubleClick={() => {
                  context.setUpdateItem(item);
                }}
              >
                {item.title}
              </div>
            </li>
          );
        }}
      </UpdateItemContext.Consumer>
    );
  }
}
