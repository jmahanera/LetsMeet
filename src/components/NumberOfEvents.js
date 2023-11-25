import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // const [eventsNumber, setEventsNumber] = useState("32");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    console.log("THE VALUE IS:", value);
    setCurrentNOE(value);
    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Number must be more than zero.";
      setErrorAlert(errorText);
    } else {
      errorText = "";
      setErrorAlert(errorText);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="number-of-events">
      <p>Number of Events:</p>
      <input
        data-testid="event-number-imput"
        type="text"
        className="event-number"
        // placeholder="32"
        defaultValue="32"
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;