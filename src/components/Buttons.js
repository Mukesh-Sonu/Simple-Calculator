const Buttons=({handleClick})=>{
  const buttons = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    "Clear",
    "0",
    "=",
    "/"
  ];
  return(
    <div className="buttons">
    {buttons.map((button, index) => (
      <button key={index} onClick={() => handleClick(button)}>
        {button}
      </button>
    ))}
  </div>
  )
}
export default Buttons;