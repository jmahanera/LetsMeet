// Importing mock data for local development
import mockData from './mock-data';

// Function to extract unique locations from a list of events
export const extractLocations = (events) => {
    // Map events to their locations
    const extractedLocations = events.map((event) => event.location);
    
    // Remove duplicate locations using a Set and spread operator
    const locations = [...new Set(extractedLocations)];
    
    return locations;
};

// Asynchronously checks the validity of an access token
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// Asynchronously obtains an access token using an authorization code
const getToken = async (code) => {
    // Encode the authorization code before appending it to the URL
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    
    // Store the access token in local storage
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};

// Function to asynchronously get an access token from local storage or through the OAuth flow
export const getAccessToken = async () => {
    // Retrieve access token from local storage
    const accessToken = localStorage.getItem('access_token');

    // Check the validity of the token asynchronously
    const tokenCheck = accessToken && (await checkToken(accessToken));

    // If no token or token is invalid, remove it from local storage and initiate OAuth flow
    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        
        // Check if the authorization code is present in the URL
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");

        // If no authorization code, redirect to the OAuth authorization URL
        if (!code) {
            const response = await fetch(
                "https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            
            // Redirect to the authorization URL
            return (window.location.href = authUrl);
        }

        // If authorization code is present, obtain and return the access token
        return code && getToken(code);
    }
    
    // If a valid token exists in local storage, return it
    return accessToken;
};

// Function to asynchronously fetch the list of all events
export const getEvents = async () => {
    // Use mock data for local development
    if (window.location.href.startsWith("http://localhost")) {
        return mockData;
    }

    // Obtain access token using the getAccessToken function
    const token = await getAccessToken();

    // If a valid token is obtained, fetch events using the token
    if (token) {
        const url = "https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        
        // If events are present in the result, return them; otherwise, return null
        if (result) {
            return result.events;
        } else {
            return null;
        }
    }
};
