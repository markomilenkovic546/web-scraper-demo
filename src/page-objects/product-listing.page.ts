import { Locator, Page } from 'playwright';
import { BasePage } from './base.page';

export default class ProductListingPage extends BasePage {
    readonly page: Page;
    readonly productCardAnchors: Locator;
    readonly pagination: {
        nextButton: Locator;
        backButton: Locator;
    };

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productCardAnchors = this.page.locator('article div a');
        this.pagination = {
            nextButton: this.page.getByRole('link', {
                name: 'next',
                exact: true
            }),
            backButton: this.page.getByRole('link', {
                name: 'back',
                exact: true
            })
        };
    }

    async open(): Promise<void> {
        await super.open(process.env.BASE_URL!);
    }

    async goToNextPage(): Promise<void> {
        await this.pagination.nextButton.click();
    }

    async goToPreviousPage(): Promise<void> {
        await this.pagination.backButton.click();
    }
}
