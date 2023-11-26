import React, { useState } from "react";

// Component for selecting the number of events to display
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // Event number input change handler
  const handleInputChanged = (event) => {
    const value = event.target.value;

    // Set the current number of events based on the input value
    setCurrentNOE(value);

    // Validate input value and display error message if invalid
    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Number must be more than zero.";
      setErrorAlert(errorText);
    } else {
      // Clear error message and update current number of events if input is valid
      errorText = "";
      setErrorAlert(errorText);
      setCurrentNOE(value);
    }
  };

  // Render the number of events component
  return (
    <div id="number-of-events">
      {/* Label for the number of events input */}
      <p>Number of Events:</p>
      
      {/* Input field for entering the number of events */}
      <input
        data-testid="event-number-input"
        type="text"
        className="event-number"
        defaultValue="32"
        onChange={handleInputChanged}
      />
    </div>
  );
};

// Export the NumberOfEvents component
export default NumberOfEvents;
