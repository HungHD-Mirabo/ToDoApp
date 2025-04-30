import React from "react";
import "./Result.css";

interface ResultProps {
  items: {
    title: string;
    completed: boolean;
  }[];
}

export class Result extends React.Component<ResultProps> {
  render() {
    return (
      <section>
        <ul className="todo-list">
          {this.props.items.map((item, index) => (
            <li className="todo-item" key={index}>
              <input type="checkbox" checked={item.completed} readOnly />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className="todo-footer">
          <span>{this.props.items.length} Item(s) left!</span>
          <div className="filters">
            <span className="active">All</span>
            <span>Active</span>
            <span>Completed</span>
          </div>
          <span className="clear">Clear completed</span>
        </div>
      </section>
    );
  }
}
