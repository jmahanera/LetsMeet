Feature: Show/Hide an Event's Details

    Scenario: An event element is collapsed by default
        Given the main page is open
        When the user opens the app
        Then the user should see the list of all upcoming events
        And an event element is collapsed by default

    Scenario: User can expand an event to see its details
        Given the main page is open
        When the user starts typing in the city textbox
        And the user selects a city (e.g., "Berlin, Germany") from the list
        Then their city should be changed to that city (i.e., "Berlin, Germany")
        And the user should receive a list of upcoming events in that city
        And the user can expand an event to see its details

    Scenario: User can collapse an event to hide details
        Given the main page is open
        When the user starts typing in the city textbox
        And the user selects a city (e.g., "Berlin, Germany") from the list
        Then their city should be changed to that city (i.e., "Berlin, Germany")
        And the user should receive a list of upcoming events in that city
        And the user can expand an event to see its details
        When the user collapses the event
        Then the event details should be hidden

