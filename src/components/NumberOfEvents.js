import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState("32"); // Set a default value of 32

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    setCurrentNOE(value);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = 'Please enter a valid number greater than 0.';
      setErrorAlert(infoText);
    } else {
      infoText = '';
      setErrorAlert(infoText);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="numberOfEvents" className="number-of-events">
      <label htmlFor="eventNumberInput">Number of Events:</label>
      <input 
        id="eventNumberInput"
        type="text"
        value={numberOfEvents}
        onChange={handleInputChanged}
        data-testid="numberOfEventsInput"
        className="event-number-input"
      />
    </div>
  );
};

export default NumberOfEvents;