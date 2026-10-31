test.use({ baseURL: 'https://demo.playwright.dev' });

import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

test.describe('TodoMVC', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('add 3 todos', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await expect(todoPage.items).toHaveCount(3);
  });

    test('completing one todo updates the counter', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await todoPage.complete('Buy milk');
    await expect(todoPage.counter).toHaveText('2 items left');
  });

    test('Active and Completed filters show the right items', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await todoPage.complete('Buy milk');

    await todoPage.filterBy('Active');
    await expect(todoPage.items).toHaveCount(2);
    await expect(todoPage.item('Buy milk')).toHaveCount(0);

    await todoPage.filterBy('Completed');
    await expect(todoPage.items).toHaveCount(1);
    await expect(todoPage.item('Buy milk')).toBeVisible();
  });

    test('edit a todo', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await todoPage.edit('Walk the dog', 'Walk the cat');
    await expect(todoPage.item('Walk the cat')).toBeVisible();
    await expect(todoPage.item('Walk the dog')).toHaveCount(0);
  });

  test('delete a todo', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await todoPage.delete('Write tests');
    await expect(todoPage.item('Write tests')).toHaveCount(0);
    await expect(todoPage.items).toHaveCount(2);
  });

    test('clear completed removes only completed todos', async () => {
    await todoPage.addTodos(['Buy milk', 'Walk the dog', 'Write tests']);
    await todoPage.complete('Buy milk');
    await todoPage.clearCompleted();

    await expect(todoPage.items).toHaveCount(2);
    await expect(todoPage.item('Buy milk')).toHaveCount(0);
    await expect(todoPage.item('Walk the dog')).toBeVisible();
    await expect(todoPage.item('Write tests')).toBeVisible();
  });

    const TODOS = ['Buy milk', 'Walk the dog', 'Write tests'];

  for (const text of TODOS) {
    test(`can add todo: ${text}`, async () => {
      await todoPage.addTodo(text);
      await expect(todoPage.item(text)).toBeVisible();
    });
  }
});