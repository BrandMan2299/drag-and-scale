const puppeteer = require("puppeteer");

test("sasa", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const url =
    "file:///C:/Users/itaib/Desktop/cyber4s/Mine/drag-and-scale/dragging-test/index.html";
  const page = await browser.newPage();
  await page.goto(url);

  const header = await page.$('#mydivheader');

  const { top, left } = await page.evaluate((header) => {
    const { top, left } = header.getBoundingClientRect();
    return { top, left };
  }, header);


  await page.mouse.move(left, top);
  await page.mouse.down();
  await page.mouse.move(2 * left, 2 * top);
  await page.mouse.up();


  const { newTop, newLeft } = await page.evaluate((header) => {
    const { top, left } = header.getBoundingClientRect();
    return { newTop: top, newLeft: left };
  }, header);

  expect(newLeft).toBe(2 * left)
  expect(newTop).toBe(2 * top)

  await browser.close();
});

