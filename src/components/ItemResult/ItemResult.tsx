import React from "react";
import { Item } from "../Main/Main";
import "./ItemResult.css";

interface ItemProps {
  item: {
    title: string;
    completed: boolean;
  };
  index: number;
  toggleItem: (index: number) => void;
  handleUpdateItem: (index: number, item: Item) => void;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { updateItem } = this.state;
    if (updateItem) {
      this.setState({
        updateItem: {
          ...updateItem,
          title: value,
        },
      });
    }
  };

  renderItem = (item: Item) => {
    const { updateItem } = this.state;
    const { index, handleUpdateItem } = this.props;
    if (updateItem) {
      return (
        <input
          type="text"
          value={updateItem.title}
          onChange={this.handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdateItem(index, updateItem);
              this.setState({
                updateItem: null,
              });
            }
          }}
        />
      );
    }
    return (
      <span
        className={this.checkIsCompleted(item.completed)}
        onDoubleClick={() => this.toggleUpdateItem(item)}
      >
        {item.title}
      </span>
    );
  };

  checkIsCompleted = (completed: boolean) => {
    return completed ? "completed" : "";
  };

  toggleUpdateItem = (item: Item) => {
    this.setState({
      updateItem: item,
    });
  };

  render() {
    const { item, index, toggleItem } = this.props;
    return (
      <li className="todo-item" key={index}>
        <input
          type="checkbox"
          checked={item.completed}
          onClick={() => toggleItem(index)}
        />
        <div>{this.renderItem(item)}</div>
      </li>
    );
  }
}
