import React from "react";
import "./header.css";
import { ThemeContext } from "../../ThemeContext";

export class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context) =>
          context && (
            <header className={`header ${context.darkMode ? "dark-mode" : ""}`}>
              <h1>Todo List</h1>
              <button
                className="header__theme-toggle"
                onClick={() => context.setDarkMode(!context.darkMode)}
              >
                {context.darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </header>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}
