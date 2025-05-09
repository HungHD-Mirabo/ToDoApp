import React from "react";
import "./Main.css";
import { Result } from "../Result/Result";
import Pagination from "../Pagination/Pagination";

export interface Item {
  title: string;
  completed: boolean;
}

interface MainState {
  name: string;
  filter: string;
  items: Item[];
  currentPage: number;
  itemsPage: Item[];
}

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export class Main extends React.Component<any, MainState> {
  itemsPerPage: number = 5;
  totalPages: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      items: [] as Item[],
      itemsPage: [] as Item[],
      filter: "all",
      currentPage: 1,
    };
  }

  componentDidMount(): void {
    this.totalItems = this.state.items.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<MainState>
  ): void {
    const { items, filter, currentPage } = this.state;

    if (
      prevState.items !== items ||
      prevState.filter !== filter ||
      prevState.currentPage !== currentPage
    ) {
      let filteredItems = items;
      if (filter === "active") {
        filteredItems = items.filter((item) => !item.completed);
      } else if (filter === "completed") {
        filteredItems = items.filter((item) => item.completed);
      }

      const totalItems = filteredItems.length;
      const totalPages = Math.ceil(totalItems / this.itemsPerPage);

      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      const itemsPage = filteredItems.slice(start, end);

      this.totalItems = totalItems;
      this.totalPages = totalPages;
      this.setState({ itemsPage });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  hanndleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.setState({
        items: [
          ...this.state.items,
          { title: this.state.name, completed: false },
        ],
      });
      this.setState({ name: "" });
    }
  };

  handleChangeFilter = (filter: string) => {
    this.setState({ filter });
  };

  handleUpdateItem = (index: number, item: Item) => {
    const updatedItems = [...this.state.items];
    const updatedItem = updatedItems[index];
    updatedItems[index] = {
      ...updatedItem,
      title: item.title,
      completed: item.completed,
    };
    this.setState({ items: updatedItems, name: "" });
  };

  toggleItem = (index: number) => {
    const updatedItems = [...this.state.items];
    updatedItems[index].completed = !updatedItems[index].completed;
    this.setState({ items: updatedItems });
  };

  handleClearCompleted = () => {
    const updatedItems = this.state.items.filter((item) => !item.completed);
    this.setState({ items: updatedItems });
  };

  changePage = (page: number) => {
    if (page === 1) {
      this.currentPage = 1;
    }
    if (page === this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.setState({ currentPage: this.currentPage });
  };

  render() {
    const { name, items, itemsPage, filter } = this.state;
    return (
      <div>
        <main>
          <section className="todo-input">
            <select>
              <option>▼</option>
            </select>
            <input
              value={name}
              onChange={this.handleChange}
              onKeyDown={this.hanndleKeyDown}
              type="text"
              placeholder="What needs to be done?"
            ></input>
          </section>
          <Result
            items={itemsPage}
            toggleItem={this.toggleItem}
            handleUpdateItem={this.handleUpdateItem}
            filter={filter}
            handleChangeFilter={this.handleChangeFilter}
            handleClearCompleted={this.handleClearCompleted}
          />
        </main>
        <Pagination
          currentPage={this.currentPage}
          handlePageChange={this.changePage}
          itemsPerPage={this.itemsPerPage}
          totalPages={this.totalPages}
        />
      </div>
    );
  }
}
