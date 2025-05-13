import React from "react";

interface InputProps {
  name: string;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Input extends React.Component<InputProps> {
  render() {
    const { handleChange, handleKeyDown, name } = this.props;

    return (
      <section>
        <select>
          <option>▼</option>
        </select>
        <input
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="What needs to be done?"
        ></input>
      </section>
    );
  }
}
