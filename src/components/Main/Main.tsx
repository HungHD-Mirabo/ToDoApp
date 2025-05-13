import React from "react";
import "./Main.css";
import { Result } from "../Result/Result";
import Pagination from "../Pagination/Pagination";
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

interface MainState {
  name: string;
  filter: string;
  items: Item[];
  currentPage: number;
  itemsPage: Item[];
  updateItem: Item | null;
}

export class Main extends React.Component<{}, MainState> {
  itemsPerPage = 5;

  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      items: [],
      itemsPage: [],
      filter: "all",
      currentPage: 1,
      updateItem: null,
    };
  }

  componentDidUpdate(_: {}, prevState: MainState) {
    const { items, filter, currentPage, updateItem } = this.state;

    if (
      prevState.items !== items ||
      prevState.filter !== filter ||
      prevState.currentPage !== currentPage
    ) {
      let filteredItems = items;

      if (filter === "active")
        filteredItems = items.filter((i) => !i.completed);
      else if (filter === "completed")
        filteredItems = items.filter((i) => i.completed);

      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;

      this.setState({ itemsPage: filteredItems.slice(start, end) });
    }

    if (prevState.updateItem !== updateItem) {
      this.setState({ name: updateItem?.title || "" });
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const { name, updateItem, items } = this.state;

    if (updateItem) {
      const updatedItems = items.map((item) =>
        item.title === updateItem.title
          ? { ...item, title: name, completed: false }
          : item
      );
      this.setState({ items: updatedItems, name: "", updateItem: null });
    } else {
      this.setState({
        items: [...items, { title: name, completed: false }],
        name: "",
      });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleChangeFilter = (filter: string) => {
    this.setState({ filter });
  };

  toggleItem = (index: number) => {
    const updatedItems = [...this.state.items];
    const updatedItem = updatedItems[index];
    updatedItems[index] = {
      ...updatedItem,
      completed: !updatedItem.completed,
    };
    this.setState({ items: updatedItems });
  };

  handleClearCompleted = () => {
    const updatedItems = this.state.items.filter((item) => !item.completed);
    this.setState({ items: updatedItems });
  };

  changePage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, this.totalPages));
    this.setState({ currentPage: validPage });
  };

  get totalPages(): number {
    const filteredItems = this.getFilteredItems();
    return Math.ceil(filteredItems.length / this.itemsPerPage);
  }

  getFilteredItems(): Item[] {
    const { items, filter } = this.state;
    if (filter === "active") return items.filter((i) => !i.completed);
    if (filter === "completed") return items.filter((i) => i.completed);
    return items;
  }

  render() {
    const { itemsPage, filter, name, updateItem, currentPage } = this.state;

    const contextValue: UpdateItemContextType = {
      updateItem,
      setUpdateItem: (item) => this.setState({ updateItem: item }),
    };

    return (
      <ThemeContext.Consumer>
        {(themeContext) => {
          const darkMode = themeContext?.darkMode ?? false;
          return (
            <div className={`main-container ${darkMode ? "dark-mode" : ""}`}>
              <UpdateItemContext.Provider value={contextValue}>
                <main>
                  <section className="todo-input">
                    <Input
                      name={name}
                      handleKeyDown={this.handleKeyDown}
                      handleChange={this.handleChange}
                    />
                  </section>

                  <Result
                    items={itemsPage}
                    toggleItem={this.toggleItem}
                    filter={filter}
                    handleChangeFilter={this.handleChangeFilter}
                    handleClearCompleted={this.handleClearCompleted}
                  />
                </main>

                <Pagination
                  currentPage={currentPage}
                  handlePageChange={this.changePage}
                  itemsPerPage={this.itemsPerPage}
                  totalPages={this.totalPages}
                />
              </UpdateItemContext.Provider>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
