import mockData from './mock-data';

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
      { mode: 'no-cors' } // Add 'no-cors' mode here
    );

    if (!response.ok) {
      throw new Error('Token check failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking token:', error);
    throw error;
  }
};

const removeQuery = () => {
  try {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
      newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }
  } catch (error) {
    console.error('Error removing query:', error);
    throw error;
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      'https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api' + '/' + encodeCode,
      { mode: 'no-cors' } // Add 'no-cors' mode here
    );

    if (!response.ok) {
      throw new Error('Token retrieval failed');
    }

    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");

      if (!code) {
        const response = await fetch(
          "https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url",
          { mode: 'no-cors' } // Add 'no-cors' mode here
        );

        if (!response.ok) {
          throw new Error('Failed to get authentication URL');
        }

        const result = await response.json();
        const { authUrl } = result;
        return (window.location.href = authUrl);
      }

      return code && getToken(code);
    }

    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    if (window.location.href.startsWith('http://localhost')) {
      return mockData;
    }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url =
        "https://a0u7kwigrc.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
        "/" + token;

      const response = await fetch(url, { mode: 'no-cors' }); // Add 'no-cors' mode here

      if (!response.ok) {
        throw new Error('Failed to get events');
      }

      const result = await response.json();

      if (result) {
        return result.events;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error('Error getting events:', error);
    throw error;
  }
};
