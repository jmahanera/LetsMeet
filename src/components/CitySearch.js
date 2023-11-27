import React, { useState, useEffect } from "react";

// Component for city search functionality
const CitySearch = ({ allLocations, setCurrentCity }) => {
  // State variables for managing input, suggestions, and visibility of suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [infoAlert, setInfoAlert, setCurrentNOE] = useState("");

  // Handler for input changes in the search bar
  const handleInputChanged = (event) => {
    const value = event.target.value;

    // Filter locations based on input value
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().indexOf(value.toUpperCase()) > -1
        )
      : [];

    // Update state with input value, filtered suggestions, and info alert
    setQuery(value);
    setSuggestions(filteredLocations);

    // Display info alert if no matching cities are found  
    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = " Selected City cannot be found in our database. Please try another city";
      setInfoAlert(infoText);
    } else {
      infoText = "";
      setInfoAlert(infoText);
      setCurrentNOE(value);
    }
  };

  // Handler for item click in the suggestions list
  const handleItemClicked = (event) => {
    const value = event.target.textContent;

    // Update state with selected suggestion, hide suggestions, and set current city
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);

    // Clear info alert when an item is clicked
    setInfoAlert("");
  };

  // Effect to filter suggestions based on input query and allLocations
  useEffect(() => {
    const filteredLocations = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().indexOf(query.toUpperCase()) > -1
        )
      : [];
    setSuggestions(filteredLocations);
  }, [allLocations, query]);

  // Render the city search component
  return (
    <div id="city-search">
      {/* Input field for city search */}
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />

      {/* Display suggestions if showSuggestions is true */}
      {showSuggestions ? (
        <ul className="suggestions">
          {/* Map through suggestions and create list items */}
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}

          {/* 'See all cities' option */}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}

      {/* Display info alert if present */}
      {infoAlert && <div className="info-alert">{infoAlert}</div>}
    </div>
  );
};

// Export the CitySearch component
export default CitySearch;
