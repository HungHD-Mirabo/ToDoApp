import React from "react";
import "./Main.css";
import { Result } from "../Result/Result";

export interface Item {
  title: string;
  completed: boolean;
}

interface MainState {
  name: string;
  filter: string;
  items: Item[];
}

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      items: [] as Item[],
      filter: "all",
    };
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

  render() {
    const { name, items, filter } = this.state;
    return (
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
          items={items}
          toggleItem={this.toggleItem}
          handleUpdateItem={this.handleUpdateItem}
          filter={filter}
          handleChangeFilter={this.handleChangeFilter}
          handleClearCompleted={this.handleClearCompleted}
        />
      </main>
    );
  }
}
