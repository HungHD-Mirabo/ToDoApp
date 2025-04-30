import React from "react";
import "./Main.css";
import { Result } from "../Result/Result";

interface Item {
  title: string;
  completed: boolean;
}

interface MainState {
  name: string;
  items: Item[];
}

export class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      items: [] as Item[],
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

  render() {
    const { name } = this.state;
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
        <Result items={this.state.items} />
      </main>
    );
  }
}
