import puppeteer from 'puppeteer';

jest.setTimeout(30000); // Set a timeout for the entire test suite

describe('show/hide event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    // Wait for the initial content to load
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    await browser.close();
  });

  // SCENARIO 1
  test('An event element is collapsed by default', async () => {
    // Use page.evaluate to access the DOM context inside the browser
    const eventDetails = await page.evaluate(() => {
      const detailsElement = document.querySelector('.event .details');
      return detailsElement ? true : false;
    });
    expect(eventDetails).toBe(false);
  });

  // SCENARIO 2
  test('User can expand an event to see its details', async () => {
    // Use page.evaluate to interact with the DOM
    await page.evaluate(() => {
      const detailsButton = document.querySelector('.event .details-btn');
      detailsButton.click();
    });

    // Wait for the details to appear
    await page.waitForSelector('.event .details');

    const eventDetails = await page.evaluate(() => {
      const detailsElement = document.querySelector('.event .details');
      return detailsElement ? true : false;
    });
    expect(eventDetails).toBe(true);
  });

  // SCENARIO 3
  test('User can collapse an event to hide details', async () => {
    // Use page.evaluate to interact with the DOM
    await page.evaluate(() => {
      const detailsButton = document.querySelector('.event .details-btn');
      detailsButton.click();
    });

    // Wait for the details to disappear
    await page.waitForSelector('.event .details', { hidden: true });

    const eventDetails = await page.evaluate(() => {
      const detailsElement = document.querySelector('.event .details');
      return detailsElement ? true : false;
    });
    expect(eventDetails).toBe(false);
  });
});
