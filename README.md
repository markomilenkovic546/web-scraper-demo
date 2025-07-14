# 📚 Web Scraper Demo – Books to Scrape

This is a demo project that demonstrates a simple **web scraper** built with **TypeScript**, **Playwright**, and **MongoDB**.

The scraper targets the website [books.toscrape.com](https://books.toscrape.com/), which is publicly provided for practicing web scraping techniques.

> ⚠️ **Disclaimer**: This project is for educational and demonstration purposes only. The target website is specifically intended for learning and testing scraping tools.

---

##  Technologies Used

- **[TypeScript](https://www.typescriptlang.org/)** – Static typing for scalable JavaScript development
- **[Playwright](https://playwright.dev/)** – Browser automation library used to navigate and interact with web pages
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database used for storing scraped product data
- **[Mongoose](https://mongoosejs.com/)** – ODM library for MongoDB in Node.js
- **[dotenv](https://github.com/motdotla/dotenv)** – Loads environment variables from a `.env` file
- **[ts-node](https://typestrong.org/ts-node/)** – Runs TypeScript code directly in Node.js
- **[Prettier](https://prettier.io/)** – Code formatter

---

## Project Structure & Key Components

### `index.ts` – Entry Point

The central script that initializes and runs the scraping process. It:
- Loads environment variables
- Launches a Chromium browser via Playwright
- Instantiates the `BooksScraper` class
- Collects all product URLs
- Extracts detailed book data
- Connects to MongoDB
- Inserts or updates data using an **upsert** strategy

---

### `BooksScraper` Class – Scraping Logic

This class contains high-level scraping flow:
- `scrapeURLs(page)` – Gathers URLs of individual product detail pages
- `scrapeProducts(page, urls)` – Visits each URL and scrapes fields such as title, price, availability, description, etc.

---

### Page Object Model (POM)

Selectors and browser interactions are organized using the **Page Object Model** pattern, improving readability and maintainability.  
Each DOM element on the product page (title, price, etc.) is encapsulated into a separate object representation.

---

### MongoDB Integration

- Uses **Mongoose** to define a `Product` model that matches the structure of scraped data.
- Each product has a unique `id` (derived from UPC) used as a key to either **insert new** or **update existing** records in MongoDB.
- Credentials and database URI are loaded from a `.env` file.

---

## GitHub Actions Workflow

A CI workflow is set up using **GitHub Actions**. The scraper can be run in two ways:
- **Manually**, using the `workflow_dispatch` event
- **Automatically**, via a **cron job** scheduled to run weekly at 2:00 AM

The workflow:
- Checks out the repository code
- Sets up Node.js environment on an Ubuntu runner
- Installs dependencies
- Installs Playwright browsers
- Creates the .env file by writing environment variables (BASE_URL, MONGO_URI) from GitHub Secrets
- Launches the scraping process by running `yarn start-scraper` command

