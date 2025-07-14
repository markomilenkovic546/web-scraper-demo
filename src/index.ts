import { chromium } from 'playwright';
import BooksScraper from './scraper/books-scraper';
import ProductModel from './models/Product';
import { Product } from './types';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function connectMongo() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not set in .env');
    }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
}

async function upsertProducts(products: Product[]) {
    for (const product of products) {
        await ProductModel.findOneAndUpdate({ id: product.id }, product, { upsert: true, new: true });
    }
}

async function main() {
    try {
        await connectMongo();

        const browser = await chromium.launch();
        const page = await browser.newPage();
        const booksScraper = new BooksScraper();
        const urls = await booksScraper.scrapeURLs(page);
        const products = await booksScraper.scrapeProducts(page, urls.slice(0, 50));
        await upsertProducts(products);

        console.log('Products saved/updated in MongoDB');

        await browser.close();
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}

main();
