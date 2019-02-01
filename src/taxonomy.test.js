const puppeteer = require('puppeteer');

jest.setTimeout(60000);

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

test('main title is present', async () => {
  const mainTitleElement = `.taxonomy_container h1`;
  const mainTitleText = await page.$eval(mainTitleElement, e => e.innerHTML);
  await page.waitForSelector(mainTitleElement);
  expect(mainTitleText).toBe('Thesaurus of International Trade Terms');
});

test('user can search based on text input', async () => {
  
  // enter the word "banks" in the text input element, then click Search button
  const textInput = '.taxonomy_container input[type="text"]';
  const searchButton = '.taxonomy_container div.center button';
  await page.click(textInput);
  await page.type(textInput, "banks");
  await page.click(searchButton);

  // arrive on the Search Results page, click the first item
  const searchResultsHeader = '.taxonomy_container h1';
  await page.waitForSelector(searchResultsHeader);
  const headerText = await page.$eval(searchResultsHeader, e => e.innerHTML);
  expect(headerText).toBe('Search Results');
  const firstResult = '.taxonomy_container > div > ul:nth-child(3) > li:nth-child(1) > a';
  await page.waitForSelector(firstResult, 20000);
  await page.click(firstResult);

  // arrive on the TermInfo page, identify concept group
  const termInfoLabel = '.taxonomy_container div.breadcrumbs h1';
  await page.waitForSelector(termInfoLabel);
  const conceptGroup = '.taxonomy_container div.superTerms > p > a';
  await page.waitForSelector(conceptGroup);
  const ITA_home = '.taxonomy_container > div > div.breadcrumbs > h4 > a';
  await page.waitForSelector(ITA_home);
  await page.click(ITA_home);
});

test('user can search based on a checkbox input', async () => {
  
  // click the "Industries" box, then click Search button
  const IndustriesCheckbox = '.taxonomy_container input[type="checkbox"]:nth-child(2)';
  const searchButton = '.taxonomy_container div.center button';
  const searchResultsHeader = '.taxonomy_container h1';
  await page.click(IndustriesCheckbox);
  await page.click(searchButton);

  // arrive on the Search Results page, click the first item
  await page.waitForSelector(searchResultsHeader, 20000);
  const headerText = await page.$eval(searchResultsHeader, e => e.innerHTML);
  expect(headerText).toBe('Search Results');
  const firstResult = '.taxonomy_container > div > ul:nth-child(3) > li:nth-child(1) > a';
  await page.waitForSelector(firstResult, 20000);
  await page.click(firstResult);
  
  // arrive on the TermInfo page, identify concept group
  const termInfoLabel = '.taxonomy_container div.breadcrumbs h1';
  await page.waitForSelector(termInfoLabel);
  const conceptGroup = '.taxonomy_container div.superTerms > p > a';
  await page.waitForSelector(conceptGroup);
  const ITA_home = '.taxonomy_container > div > div.breadcrumbs > h4 > a';
  await page.waitForSelector(ITA_home);
  await page.click(ITA_home);
});

afterAll(() => browser.close());