import React from "react";
import { filterOptions, Item } from "../Main/Main";

export interface FooterResultProps {
  items: Item[];
  filter: string;
  handleChangeFilter: (filter: string) => void;
  handleClearCompleted: () => void;
}

export const FooterResult: React.FC<FooterResultProps> = ({
  items,
  filter,
  handleChangeFilter,
  handleClearCompleted,
}) => {
  const completedCount = items.filter((item) => !item.completed).length;

  return (
    <footer>
      <div className="todo-footer">
        <span>{completedCount} Item(s) left!</span>
        <div className="filters">
          {filterOptions.map((option) => (
            <span
              key={option.value}
              className={`filter ${filter === option.value ? "active" : ""}`}
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
};
