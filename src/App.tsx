import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { ThemeContext } from "./ThemeContext";

interface AppState {
  darkMode: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  setDarkMode = (darkMode: boolean) => {
    this.setState({ darkMode });
  };

  render() {
    return (
      <div className={`App ${this.state.darkMode ? "dark-mode" : ""}`}>
        <ThemeContext.Provider
          value={{
            darkMode: this.state.darkMode,
            setDarkMode: this.setDarkMode,
          }}
        >
          <Header />
          <Main />
          <Footer />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default App;
