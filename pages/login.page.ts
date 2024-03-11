import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import messages from "../data/messages.json"

export class LoginPage extends BasePage {
    readonly repositorySelection: Locator;
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.repositorySelection = this.page.locator('#repository');
        this.usernameTextbox = this.page.locator('#username');
        this.passwordTextbox = this.page.locator('#password');
        this.loginButton = this.page.locator('.btn-login');
    }

    async goto() {
        await this.page.goto('/TADashboard/login.jsp');
    }

    async login(repositoryName: string, username: string, password: string) {
        await this.repositorySelection.selectOption(repositoryName);
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async verifyTheErrorMessageIsDisplayed() {
        this.page.once('dialog', dialog => {
            expect.soft(dialog.message().trim()).toBe(messages.loginErrorMessage);
        });
    }
}