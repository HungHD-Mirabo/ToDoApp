interface InputProps {
  name: string;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps) {
  const { name, handleKeyDown, handleChange } = props;
  return (
    <section className="input-section">
      <input
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What needs to be done?"
        className="todo-input"
      />
    </section>
  );
}
