import React, { useState, useContext } from "react";
import "./Main.css";
import { Result } from "../Result/Result";
import { Input } from "../Input/Input";
import { ThemeContext } from "../../ThemeContext";

export interface Item {
  title: string;
  completed: boolean;
}

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

interface UpdateItemContextType {
  updateItem: Item | null;
  setUpdateItem: (item: Item | null) => void;
}

export const UpdateItemContext =
  React.createContext<UpdateItemContextType | null>(null);

export default function Main() {
  const itemsPerPage = 5;
  const [name, setName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [updateItem, setUpdateItem] = useState<Item | null>(null);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  const loadMoreItems = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setDisplayCount(prev => {
      const newCount = Math.min(prev + itemsPerPage, filteredItems.length);
      return newCount;
    });
  };

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (updateItem) {
      const updatedItems = items.map((item) =>
        item.title === updateItem.title
          ? { ...item, title: name, completed: false }
          : item
      );
      setItems(updatedItems);
      setName("");
      setUpdateItem(null);
    } else {
      setItems([...items, { title: name, completed: false }]);
      setName("");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
    setDisplayCount(itemsPerPage);
  };

  const toggleItem = (index: number) => {
    const updatedItems = [...items];
    const updatedItem = updatedItems[index];
    updatedItems[index] = {
      ...updatedItem,
      completed: !updatedItem.completed,
    };
    setItems(updatedItems);
  };

  const handleClearCompleted = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
  };

  const contextValue: UpdateItemContextType = {
    updateItem,
    setUpdateItem,
  };

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { darkMode } = themeContext;

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : ""}`}>
      <UpdateItemContext.Provider value={contextValue}>
        <main>
          <section className="todo-input">
            <Input
              name={name}
              handleKeyDown={handleAddItem}
              handleChange={handleChangeInput}
            />
          </section>

          <Result
            items={filteredItems.slice(0, displayCount)}
            toggleItem={toggleItem}
            filter={filter}
            handleChangeFilter={handleChangeFilter}
            handleClearCompleted={handleClearCompleted}
            loadMore={loadMoreItems}
            hasMore={displayCount < filteredItems.length}
          />
        </main>
      </UpdateItemContext.Provider>
    </div>
  );
}
