const ThemeTogglers = ({ setTheme }) => {
  return (
    <div className="theme">
      <button onClick={() => setTheme(true)}>Light</button>
      <button onClick={() => setTheme(false)}>Dark</button>
    </div>
  );
};
export default ThemeTogglers;
