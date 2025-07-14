import { Locator, Page } from 'playwright';
import { BasePage } from './base.page';

export default class ProductDetailsPage extends BasePage {
    readonly page: Page;

    readonly categoryBreadcrumb: Locator;
    readonly title: Locator;
    readonly imageSrc: Locator;
    readonly description: Locator;
    readonly upc: Locator;
    readonly productType: Locator;
    readonly priceExclTax: Locator;
    readonly priceInclTax: Locator;
    readonly tax: Locator;
    readonly availability: Locator;
    readonly numberOfReviews: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;

        this.categoryBreadcrumb = page.locator('.breadcrumb').locator('li').nth(2);
        this.title = page.locator('h1');
        this.imageSrc = page.locator('#product_gallery img');
        this.description = page.locator('#product_description+p');
        this.upc = page.locator('tr th', { hasText: 'UPC' }).locator('..').locator('td');
        this.productType = page.locator('tr th', { hasText: 'Product Type' }).locator('..').locator('td');
        this.priceExclTax = page.locator('tr th', { hasText: 'Price (excl. tax)' }).locator('..').locator('td');
        this.priceInclTax = page.locator('tr th', { hasText: 'Price (incl. tax)' }).locator('..').locator('td');
        this.tax = page.locator('tr', { has: page.locator('th').getByText('Tax', { exact: true }) }).locator('td');
        this.availability = page.locator('tr th', { hasText: 'Availability' }).locator('..').locator('td');
        this.numberOfReviews = page.locator('tr th', { hasText: 'Number of reviews' }).locator('..').locator('td');
    }
}
