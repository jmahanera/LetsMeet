import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the user opens the app', () => {
      // No additional action needed for this step
    });

    then('the user should see the list of all upcoming events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('an event element is collapsed by default', () => {
      // Add your assertions for the default collapsed state
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = within(AppDOM).query('.event .details');
      expect(eventDetails).toBeNull();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, 'Berlin');
    });

    when('the user selects a city (e.g., "Berlin, Germany") from the list', async () => {
      const user = userEvent.setup();
      const suggestionListItems = within(AppDOM).queryAllByRole('listitem');
      await user.click(suggestionListItems[0]);
    });

    then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {
      const citySearchInput = within(AppDOM).queryByRole('textbox');
      expect(citySearchInput.value).toBe('Berlin, Germany');
    });

    then('the user should receive a list of upcoming events in that city', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
        // Add more assertions based on your application logic
      });
    });

    then('the user can expand an event to see its details', () => {
      // Add your assertions for the ability to expand an event
      const eventDetails = within(AppDOM).query('.event .details');
      expect(eventDetails).toBeDefined();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('the user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, 'Berlin');
    });

    when('the user selects a city (e.g., "Berlin, Germany") from the list', async () => {
      const user = userEvent.setup();
      const suggestionListItems = within(AppDOM).queryAllByRole('listitem');
      await user.click(suggestionListItems[0]);
    });

    when('the user can expand an event to see its details', () => {
      // Assuming there's an action to expand an event
      const eventDetailsButton = within(AppDOM).query('.event .details-btn');
      userEvent.click(eventDetailsButton);
    });

    when('the user collapses the event', () => {
      // Assuming there's an action to collapse an event
      const eventDetailsButton = within(AppDOM).query('.event .details-btn');
      userEvent.click(eventDetailsButton);
    });

    then('the event details should be hidden', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const eventDetails = within(EventListDOM).query('.event .details');
        expect(eventDetails).toBeNull();
      });
    });
  });
});
