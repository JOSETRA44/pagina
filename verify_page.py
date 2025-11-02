
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:8000")
            await page.wait_for_selector(".hero-text", state="visible", timeout=10000)
            screenshot_path = "verification_screenshot.png"
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")
        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="error_screenshot.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
