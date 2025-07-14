import { Page } from 'playwright';

export abstract class BasePage {
    constructor(readonly page: Page) {}

    async open(path: string) {
        await this.page.goto(path,  { waitUntil: 'networkidle' });
    }
}
