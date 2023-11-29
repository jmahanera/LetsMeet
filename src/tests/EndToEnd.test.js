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
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  // Wait for the initial content to load
  await page.waitForSelector('.event', { timeout: 30000 }); // Adjust the timeout value as needed
});


  afterAll(async () => {
    // Ensure that the browser is open before attempting to close
    if (browser) {
      await browser.close();
    }
  });

  // SCENARIO 1
  test('An event element is collapsed by default', async () => {
    // Wait for the event selector in the context of this test
    await page.waitForSelector('.event');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  // SCENARIO 2
  test('User can expand an event to see its details', async () => {
    // Wait for the event selector in the context of this test
    await page.waitForSelector('.event');

    const detailsButton = await page.$('.event .details-btn');
    await detailsButton.click();

    // Wait for a short time to allow the DOM to settle
    await page.waitForTimeout(500);

    // Wait for the details to appear
    await page.waitForSelector('.event .details');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeTruthy();
  });

  // SCENARIO 3
  test('User can collapse an event to hide details', async () => {
    // Wait for the event selector in the context of this test
    await page.waitForSelector('.event');

    const detailsButton = await page.$('.event .details-btn');
    await detailsButton.click();

    // Wait for a short time to allow the DOM to settle
    await page.waitForTimeout(500);

    // Wait for the details to disappear
    await page.waitForSelector('.event .details', { hidden: true });

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
