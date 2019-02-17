const puppeteer = require('puppeteer');

jest.setTimeout(60000);

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 250,
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000')
  // await page.setViewport({ width: 1040, height: 500});
});

test('main title is present', async () => {
  const mainTitleElement = `.taxonomy_container h1`;
  const mainTitleText = await page.$eval(mainTitleElement, e => e.innerHTML);
  await page.waitForSelector(mainTitleElement, 10000);
  expect(mainTitleText).toBe('Thesaurus of International Trade Terms');
});

test('user can search based on text input', async () => {
  
  // enter the word "banks" in the text input element, then click Search button
  const textInput = '.taxonomy_container input[name="queryString"]';
  const searchButton = '.taxonomy_container form button';
  await page.click(textInput);
  await page.type(textInput, "banks");
  await page.click(searchButton);

  // arrive on the Search Results page, click the first item
  const searchResultsHeader = '.taxonomy_container h1';
  await page.waitForSelector(searchResultsHeader, 10000);
  const headerText = await page.$eval(searchResultsHeader, e => e.innerHTML);
  expect(headerText).toBe('Search Results');
  const firstResult = '.taxonomy_container .resultsList ul li a';
  await page.waitForSelector(firstResult, 20000);
  await page.waitFor(1000); // wait for lifecycle method (componentDidUpdate) in ResultsList

  await page.click(firstResult);

  // arrive on the TermInfo page, identify concept group
  const termInfoLabel = '.taxonomy_container .breadcrumbs h1';
  await page.waitForSelector(termInfoLabel, 30000);
  const conceptGroup = '.taxonomy_container .superTerms > p > a';
  await page.waitForSelector(conceptGroup, 10000);
  const ITA_home = '.taxonomy_container .breadcrumbs > h4 > a';
  await page.waitForSelector(ITA_home, 10000);
  await page.click(ITA_home);
});

test('user can search based on a selected category', async () => {
  
  // click the "Industries" box, then click Search button
  const openSelectMenu = '.taxonomy_container .Select__control';
  const secondOption = '.taxonomy_container .Select__menu-list div:nth-child(2)';
  const searchButton = '.taxonomy_container form button';
  await page.waitForSelector(openSelectMenu, 30000)
  await page.click(openSelectMenu);
  await page.click(secondOption);
  await page.click(searchButton);

  // arrive on the Search Results page, click the first item
  const searchResultsHeader = '.taxonomy_container h1';
  await page.waitForSelector(searchResultsHeader, 20000);
  const headerText = await page.$eval(searchResultsHeader, e => e.innerHTML);
  expect(headerText).toBe('Search Results');
  const firstResult = '.taxonomy_container .resultsList ul li a';
  await page.waitForSelector(firstResult, 20000);
  await page.waitFor(1000);  // wait for lifecycle method (componentDidUpdate) in ResultsList

  await page.click(firstResult);

  // arrive on the TermInfo page, identify concept group
  // await page.screenshot({path: 'screenshot.png'})
  const termInfoLabel2 = '.taxonomy_container .breadcrumbs h1';
  await page.waitForSelector(termInfoLabel2, 20000);
  const conceptGroup = '.taxonomy_container .superTerms > p > a';
  await page.waitForSelector(conceptGroup, 10000);
  const ITA_home = '.taxonomy_container .breadcrumbs > h4 > a';
  await page.waitForSelector(ITA_home, 10000);
  await page.click(ITA_home);
});

afterAll(() => browser.close());