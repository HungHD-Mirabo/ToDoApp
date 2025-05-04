import React from "react";
import { filterOptions, Item } from "../Main/Main";

interface FooterResultProps {
  items: {
    title: string;
    completed: boolean;
  }[];
  filter: string;
  handleChangeFilter: (filter: string) => void;
  handleClearCompleted: () => void;
}

export class FooterResult extends React.Component<FooterResultProps> {
  render() {
    const { items, handleChangeFilter, handleClearCompleted } = this.props;
    const completedCount = items.filter((item: Item) => !item.completed).length;
    return (
      <footer>
        <div className="todo-footer">
          <span>{completedCount} Item(s) left!</span>
          <div className="filters">
            {filterOptions.map((option) => (
              <span
                key={option.value}
                className={`filter ${
                  this.props.filter === option.value ? "active" : ""
                }`}
                onClick={() => handleChangeFilter(option.value)}
              >
                {option.label}
              </span>
            ))}
          </div>
          <span className="clear" onClick={handleClearCompleted}>
            Clear completed
          </span>
        </div>
      </footer>
    );
  }
}
