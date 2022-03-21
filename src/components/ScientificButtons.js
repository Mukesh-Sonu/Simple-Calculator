const ScientificButtons = ({
  toggleScientificMode,
  scientificMode,
  handleClick,
  scientificButtons
}) => {
  return (
    <div className="scientificMode">
      <button onClick={toggleScientificMode}>
        {`Scientific Mode ${scientificMode ? "(off)" : "(on)"}`}
      </button>
      {scientificMode && (
        <>
          {scientificButtons.map((button, index) => {
            return (
              <button key={index} onClick={() => handleClick(button)}>
                {button}
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};
export default ScientificButtons;
