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
    await page.waitForSelector('.event', { timeout: 30000 });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('An event element is collapsed by default', async () => {
    await page.waitForSelector('.event');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.waitForSelector('.event');

    const detailsButton = await page.$('.event .details-btn');
    await detailsButton.click();

    await page.waitForFunction(() => document.querySelector('.event .details'));

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeTruthy();
  });

  test('User can collapse an event to hide details', async () => {
    await page.waitForSelector('.event');

    const detailsButton = await page.$('.event .details-btn');
    await detailsButton.click();

    await page.waitForFunction(() => !document.querySelector('.event .details'));

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
