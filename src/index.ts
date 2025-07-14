import { chromium } from 'playwright';
import BooksScraper from './scraper/books-scraper';
import DatabaseClient from './db';
import ProductService from './services/product.service';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const databaseClient = new DatabaseClient();
const productService = new ProductService();

async function main() {
    try {
        await databaseClient.connect();

        const browser = await chromium.launch();
        const page = await browser.newPage();
        const booksScraper = new BooksScraper();
        const urls = await booksScraper.scrapeURLs(page);
        const products = await booksScraper.scrapeProducts(page, urls.slice(0, 50));
        await productService.upsertProducts(products);

        console.log('Products saved/updated in MongoDB');

        await browser.close();
        await databaseClient.disconnect();
    } catch (error) {
        console.log(error);
    }
}

main();
