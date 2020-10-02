const puppeteer = require("puppeteer");
describe("dragging box", () => {
  test("dragging", async () => {
    const browser = await puppeteer.launch(
      {
        headless: false,
        slowMo: 100,
      }
    );
    const url =
      "file:///C:/Users/itaib/Desktop/cyber4s/Mine/drag-and-scale/dragging-test/index.html";
    const page = await browser.newPage();
    await page.goto(url);

    const header = await page.$('#mydivheader');

    const { top, left } = await page.evaluate((header) => {
      let { top, left } = header.getBoundingClientRect();
      top += header.clientHeight / 2;
      left += header.clientWidth / 2;
      return { top, left };
    }, header);

    await page.mouse.move(left, top);
    await page.mouse.down();
    await page.mouse.move(2 * left, 2 * top);
    await page.mouse.up();


    const { newTop, newLeft } = await page.evaluate((header) => {
      const { top, left } = header.getBoundingClientRect();
      return { newTop: top + header.clientHeight / 2, newLeft: left + header.clientWidth / 2 };
    }, header);

    expect(newLeft).toBe(2 * left)
    expect(newTop).toBe(2 * top)

    await browser.close();
  });
  test("can't go past the borders", () => {
    const browser = await puppeteer.launch(
      // {
      //   headless: false,
      //   slowMo: 100,
      // }
    );
    const url = "file:///C:/Users/itaib/Desktop/cyber4s/Mine/drag-and-scale/dragging-test/index.html";
    const page = await browser.newPage();
    await page.goto(url);

    const vpWidth = page.viewport().width;
    const vpHeight = page.viewport().height;
    const header = await page.$('#mydivheader');

    const { top, left } = await page.evaluate((header) => {
      let { top, left } = header.getBoundingClientRect();
      top += header.clientHeight / 2;
      left += header.clientWidth / 2;
      return { top, left };
    }, header);

    await page.mouse.move(left, top);
    await page.mouse.down();
    await page.mouse.move(2 * left, 2 * top);
    await page.mouse.up();
  })
})
