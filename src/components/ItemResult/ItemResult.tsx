import React, { useContext } from "react";
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

export function ItemResult({ item, index, toggleItem }: ItemProps) {
  const context = useContext(UpdateItemContext);

  if (!context) {
    throw new Error("UpdateItemContext is not provided");
  }

  const checkIsCompleted = (completed: boolean) => {
    return completed ? "completed" : "";
  };

  return (
    <li className={`todo-item ${checkIsCompleted(item.completed)}`} key={index}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleItem(index)}
      />
      {context.updateItem?.title === item.title ? (
        <input
          type="text"
          value={item.title}
          onChange={(e) => {
            context.setUpdateItem({ ...item, title: e.target.value });
          }}
          onBlur={() => context.setUpdateItem(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              context.setUpdateItem(null);
            }
          }}
          autoFocus
        />
      ) : (
        <div
          className="todo-item-title"
          onDoubleClick={() => context.setUpdateItem(item)}
          style={{
            textDecoration: item.completed ? 'line-through' : 'none'
          }}
        >
          {item.title}
        </div>
      )}
    </li>
  );
}
