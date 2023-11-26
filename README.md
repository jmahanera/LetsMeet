## Meet App (LetsMeet)

Welcome to LetsMeet, an innovative event discovery application built using React on the frontend and AWS Lambda on the backend. LetsMeet allows users to explore a dynamic list of events retrieved from the Google Calendar API, providing a seamless and user-friendly experience for event enthusiasts. Whether you're looking for events in a specific city, interested in a particular number of events, or want to visualize event data, LetsMeet has you covered.

## Prerequisites

Before getting started with LetsMeet, ensure that you have Node.js installed on your machine.

## Installation

Clone the LetsMeet repository.

bash
Copy code
git clone https://github.com/jmahanera/LetsMeet.git
Navigate to the project directory in the terminal.

bash
Copy code
cd LetsMeet
Run the following command to install the necessary dependencies.

## Technologies Used

- React
- Jest
- React testing library
- Puppeteer
- Atatus App Monitoring
- ![atatus-sidebar](https://github.com/jmahanera/LetsMeet/assets/122871245/6c2fa6df-d955-43fd-8a4e-ac7bc2e73736)


## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:3000/LetsMeet`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## FrontEnd Server 
http-server

## Deployment

Run `npm run deploy` to deploy to github pages

## Meet App and their user stories and features

## FEATURE 1: FILTER EVENTS BY CITY

As a user, I should be able to filter events by city. So that I can see a list of events taking place in that city.

- **Scenario 1:** User opens the app and has searched a city.

- **Given** the main page with search option has been opened, **when** the user entered a city, **then** they should be shown upcoming events for that city.

- **Scenario 2:** User opens the app and hasn't searched a city.

- **Given** the main page with search option has been opened, **when** the user opens the app, **then** they should be shown a list of all events for all the cities available.

- **Scenario 3:** User can select a city from the suggested list.

- **Given** user was typing "Berlin" in the city textbox _AND_ the list of suggested cities is showing, **when** the user selects a city (e.g., "Berlin, Germany") from the list, **then** their city should be changed to that city (i.e., "Berlin, Germany") _AND_ the user should receive a list of upcoming events in that city.

## FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

As a user I should be able to show or hide event details, after I have selected a city I wanted to look up the events for.

- **Scenario 1:** An event element is collapsed by default
  - **Given** the user first opens the app **when** the user recieves the full list of events (specific for the city or all events), **then** all events will colapse by default.
- **Scenario 2:** User can expand an event to see its details
  - **Given** the user gets a list of events, **when** a user selects an event's details, **then** the details will show up for that choosen event.
- **Scenario 3:** User can collapse an event to hide its details
  - **Given** the user sees the details of an event, **when** the user presses a button to hide event's details, **then** the details of that even will be hidden.

## FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user, I should be able to specify the number of displayed events, after I have selected the number of displayed events.

- **Scenario 1:** When user hasn't specified a number, 32 is the default number.
  - **Given** the user hasn't specified or filtered the number of events, **when** the user sees the list of events **then** the default number of displayed events will be 32.
- **Scenario 2:** User can change the number of events they want to see.
  - **Given** the user has events displayed, **when** the user chooses to change the number of events displayed, **then** the number of events displayed will update to the number the user selected.

## FEATURE 4: USE THE APP WHEN OFFLINE

As a user, I should be able to get events information when offline, that was fetched while having internet connection.

- **Scenario 1:** Show cached data when there's no internet connection.
  - **Given** the user has no internet connection, **when** the user is accessing the app, **then** cached data, stored inside the app, will be provided to the user.
- **Scenario 2:** Show error when user changes the settings (city, time range).
  - **Given** the user has no internet connection, **when** the user is trying to access new event information (change the city, etc.), **then** the app will show an error.

## FEATURE 5: ADD AN APP SHORTCUT TO THE HOME SCREEN

As a user I should be able to add a shortcut of the app to the home screen, so I can access the app quicker.

- **Scenario 1:** User can install the meet app as a shortcut on their device home screen.
  - **Given** the user wants to install the app, **when** the user selects to install the app as a shortcut, **then** a shortcut is created on users homescreen.

## FEATURE 6: DISPLAY CHARTS VISUALIZING EVENT DETAILS

As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

- **Scenario 1:** Show a chart with the number of upcoming events in each city.
  - **Given** the user is in the events detail page, **when** the user clicks the button to see a chart of those events in all the cities as a comparison, **then** a chart with the number of upcoming events for every city, will be shown to the user.

**USE OF SERVERLESS FUNCTION IN THE MEET APP**

- **The Meet App** can use serverless functions for event notifications, real-time data processing, user authentication, event recommendations, , and scalability. By leveraging serverless technology, the app can efficiently handle backend processes, provide personalized experiences, and scale according to user demand.

- ## Note: **Continuous Integration (CI)** **AND** **Continuous Delivery (CD),**
- **Continuous Integration (CI)** stands as a fundamental software development practice wherein developers locally craft code and subsequently commit changes to a shared version control system, such as Git. Automated CI tools then scrutinize the code for compilation errors; if any are detected, developers receive immediate notifications. Conversely, if no errors are identified, the code is deemed ready for deployment or further testing. This systematic approach substantially diminishes the likelihood of intricate errors, upholds the quality of products/services, and economizes time and resources.
- 
**Continuous Delivery (CD),** on the other hand, is a software development practice that guarantees the perpetual readiness of software for deployment, even in the face of daily alterations made by multiple developers. Emphasizing frequent and incremental releases over infrequent large-scale deployments, CD mitigates risks associated with each deployment by rendering smaller changes more comprehensible and manageable, thus facilitating troubleshooting.
  
The utilization of CI and CD tools during the development process bestows various advantages. CI tools furnish prompt feedback to developers subsequent to each code commit, simplifying the identification and rectification of errors in the early stages of development. Frequent integration of code changes also mitigates the intricacies of merging. CD ensures that every modification to the software can be safely delivered to production, reducing risks associated with deployments through faster and more frequent software releases. Moreover, CI/CD fosters enhanced collaboration among development, testing, and operations teams, diminishes system downtime, and ensures smoother user experiences.
**To implement CI/CD`** practices in the development of the Meet app, several key steps can be followed:
**1.	Store all code in a version control system like Git to meticulously track every change.**
**2.	Develop new features on separate branches, subsequently merging them into the main codebase upon completion.**
**3.	Integrate automated testing to scrutinize every code submission to Git.**
**4.	Promptly notify developers of conflicts or errors detected during automated testing, enabling swift resolution.**
**5.	Regularly monitor automated tests, build processes, and deployments to ensure ongoing efficiency.**
**6.	Once the code successfully passes all automated tests and quality checks, prepare it for release.**
This approach to CI/CD not only ensures the sustained quality of the code but also facilitates timely feature releases.

