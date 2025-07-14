import { chromium } from 'playwright';
import BooksScraper from './scraper/books-scraper';
import path from 'path';
import dotenv from 'dotenv';
import { saveToJsonFile } from './scraper/utils';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        const booksScraper = new BooksScraper();
        const urls = await booksScraper.scrapeURLs(page);
        const products = await booksScraper.scrapeProducts(page, urls.slice(0, 300));
        saveToJsonFile(products, './output/books.json');
        //console.log(products);

        await browser.close();
    } catch (error) {
        console.log(error);
    }
}

main();
