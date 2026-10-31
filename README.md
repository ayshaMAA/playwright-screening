# Playwright Automation Screening Task

Automated tests for [playwright.dev](https://playwright.dev) and the
[TodoMVC demo app](https://demo.playwright.dev/todomvc), written with
Playwright Test and TypeScript.

## Prerequisites

- Node.js 18 or higher
- Git (optional, to clone the repo)

## Install

```bash
npm install
npx playwright install chromium
```

## Run the tests

```bash
npx playwright test
```

## View the HTML report

```bash
npx playwright show-report
```

## Project structure

```
tests/
  docs.spec.ts          Part 1: playwright.dev tests
  todomvc.spec.ts       Part 2: TodoMVC tests
  pages/TodoPage.ts     Page Object for the TodoMVC app
playwright.config.ts    Chromium only, HTML report, trace on first retry
.github/workflows/      GitHub Actions workflow (bonus)
```

## What is covered

**Part 1 (docs site):** title check, "Get started" navigation, Installation
heading, and site search for "locators".

**Part 2 (TodoMVC):** add todos, complete a todo and check the counter,
Active/Completed filters, edit, delete, and "Clear completed".

## Notes

- Locators use `getByRole`, `getByPlaceholder` and `getByText` only.
- No hard sleeps; Playwright's auto-waiting and retrying assertions are used.
- `baseURL` is set in `playwright.config.ts`, and overridden for the
  TodoMVC file with `test.use`.

## Bonus items

- Data-driven test: adds todos from an array in `todomvc.spec.ts`.
- GitHub Actions workflow that runs the tests on push and pull request.