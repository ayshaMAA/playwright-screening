import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly items: Locator;
  readonly counter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByRole('list').first().getByRole('listitem');
    this.counter = page.getByText(/items? left/);
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

    async goto() {
    await this.page.goto('/todomvc');
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  item(text: string): Locator {
    return this.items.filter({ hasText: text });
  }

  async complete(text: string) {
    await this.item(text).getByRole('checkbox', { name: 'Toggle Todo' }).check();
  }

    async filterBy(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }

    async edit(oldText: string, newText: string) {
    await this.item(oldText).getByText(oldText).dblclick();
    const editBox = this.item(oldText).getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Enter');
  }

  async delete(text: string) {
    await this.item(text).hover();
    await this.item(text).getByRole('button', { name: 'Delete' }).click();
  }
    async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}