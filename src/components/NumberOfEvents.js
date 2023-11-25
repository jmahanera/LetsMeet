import { useState } from "react";

const NumberOfEvents = () => {
  const [number, setNumber] = useState(32);
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10);

    if (value.trim() === "") {
      // Clear the input if it's empty
      setAlertMessage("");
      setNumber("");
    } else if (numericValue < 1 || numericValue > 32 || isNaN(numericValue)) {
      setAlertMessage("Wrong input. Number must be between 1 and 32");
    } else {
      setAlertMessage("");
      setNumber(numericValue);
    }
  }

  return (
    <div>
      <div id="number-of-events">
        <label htmlFor="number-of-events-input">Number of Events: </label>
        <input
          type="text"
          id="number-of-events-input"
          className="number-of-events-input"
          value={number}
          onChange={handleInputChanged}
        />
      </div>
      {alertMessage && (
        <div style={{ color: 'red', marginTop: '5px' }}>{alertMessage}</div>
      )}
    </div>
  );
}

export default NumberOfEvents;
