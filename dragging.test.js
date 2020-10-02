const puppeteer = require("puppeteer");
const ScreenshotTester = require("puppeteer-screenshot-tester");
// const app = require("./index.js");

jest.setTimeout(20000);
const path = `file://${__dirname}/playground.html`;
test("Can drag and move the window", async () => {
  const screenTester = await ScreenshotTester(0.15);
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 800 });
  await page.goto(path);

  await page.mouse.move(211, 211); // 200,200 is top corner. 10px are max stretch zones, 1px to make sure mouse is inside.
  await page.mouse.down();
  await page.mouse.move(250, 250);
  await page.mouse.up();

  const result = await screenTester(page, "moveTestState", {
    fullPage: true,
  });
  await page.close();
  await browser.close();

  expect(result).toBe(true);
});
