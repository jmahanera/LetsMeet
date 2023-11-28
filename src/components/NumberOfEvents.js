import React, { useState } from "react";

// Component for selecting the number of events to display
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // Event number input change handler
  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value, 10);

    // Validate input value and display error message if invalid
    if (isNaN(value) || value < 1 || value > 32) {
      const errorText = "Number must be between 1 and 32.";
      setErrorAlert(errorText);
    } else {
      // Clear error message and update current number of events if input is valid
      setErrorAlert("");
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
        type="number" // Change type to "number" to enforce numeric input
        className="event-number"
        defaultValue="32"
        onChange={handleInputChanged}
        min="1"
        max="32"
      />
    </div>
  );
};

// Export the NumberOfEvents component
export default NumberOfEvents;
