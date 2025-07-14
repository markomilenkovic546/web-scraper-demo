import { Page } from 'playwright';
import ProductDetailsPage from '../page-objects/product-details.page';
import ProductListingPage from '../page-objects/product-listing.page';
import { Product } from '../types';

export default class BooksScraper {
    // Scrapes product details page URL of each product card
    async scrapeURLs(page: Page): Promise<string[]> {
        const plp = new ProductListingPage(page);
        const hrefs: string[] = [];

        // Open Product Listing Page
        await plp.open();

        while (true) {
            try {
                const countOfProductsPerPage = await plp.productCardAnchors.count();

                // Scrape product details page URL of each product on the page and push it to array
                for (let i = 0; i < countOfProductsPerPage; i++) {
                    const href = await plp.productCardAnchors.nth(i).getAttribute('href');
                    const fullUrl = new URL(href!, page.url()).href;

                    if (fullUrl) {
                        hrefs.push(fullUrl);
                    }
                }

                // If the current product page is last one and next button is not displayed/enabled, brake the loop
                if ((await plp.pagination.nextButton.count()) === 0 || (await plp.pagination.nextButton.isDisabled())) {
                    break;
                }

                // Click next to load other products
                await plp.goToNextPage();
                await page.waitForLoadState('networkidle');
            } catch (error) {
                console.error(error);
            }
        }

        return hrefs;
    }

    async scrapeProducts(page: Page, urls: string[]) {
        const products: Product[] = [];
        const invalidPages: { url: string; responseStatus?: number; error: any }[] = [];
        const pdp: ProductDetailsPage = new ProductDetailsPage(page);

        const scrapeSingleProduct = async (url: string) => {
            let response;
            try {
                response = await page.goto(url);
                await page.waitForTimeout(1000);
                await page.waitForLoadState('networkidle');

                const category = await pdp.categoryBreadcrumb.textContent();
                const title = await pdp.title.textContent();
                const imageSrc = await pdp.imageSrc.getAttribute('src');
                const description = await pdp.description.textContent();
                const upc = await pdp.upc.textContent();
                const productType = await pdp.productType.textContent();
                const priceExclTax = await pdp.priceExclTax.textContent();
                const priceInclTax = await pdp.priceInclTax.textContent();
                const tax = await pdp.tax.textContent();
                const availability = await pdp.availability.textContent();
                const numberOfReviews = await pdp.numberOfReviews.textContent();

                const product: Product = {
                    id: upc!.trim(),
                    title: title!.trim(),
                    category: category!.trim(),
                    imageSrc: imageSrc?.trim(),
                    description: description?.trim() ?? '',
                    information: {
                        upc: upc!.trim(),
                        productType: productType!.trim(),
                        priceExclTax: priceExclTax!.trim(),
                        priceInclTax: priceInclTax!.trim(),
                        tax: tax!.trim(),
                        availability: availability!.trim(),
                        numberOfReviews: numberOfReviews!.trim()
                    }
                };

                products.push(product);
            } catch (error) {
                invalidPages.push({ url, responseStatus: response?.status(), error });
                console.error(`Failed to scrape ${url}`, error);
            }
        };

        for (const url of urls) {
            await scrapeSingleProduct(url);
        }

        await page.waitForTimeout(5000);

        if (invalidPages.length > 0) {
            const failedUrls = invalidPages.map((p) => p.url);
            for (const url of failedUrls) {
                await scrapeSingleProduct(url);
            }
        }

        return products;
    }
}
