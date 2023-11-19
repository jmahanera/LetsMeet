'use strict';

import { google } from 'googleapis';

const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  'https://jmahanera.github.io/LetsMeet/',
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

export async function getAuthURL() {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    // Fetch events using calendar.events.list
    const events = await calendar.events.list({
      calendarId: CALENDAR_ID, 
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('Events:', events.data.items); // Log or handle the events as needed

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        authUrl,
      }),
    };
  } catch (error) {
    console.error('Error generating auth URL or fetching events:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
}
