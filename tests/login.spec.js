import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobject/login.po';

test('valid_login', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.locator('input[name="email"]').fill('lumana@example.com');
  await page.locator('input[name="pass"]').fill('sfdsf');
  await page.locator('button[name="login"]').click();
  await page.waitForTimeout(100000000)
  await expect(page).not.toHaveURL('https://www.facebook.com/');
});

test('invalid_login', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.locator('input[name="email"]').fill('aaaaasd@example.com');
  await page.locator('input[name="pass"]').fill('wrongpassword');
  await page.waitForTimeout(100000000)
  await page.locator('button[name="login"]').click();
  await expect(page).toHaveURL('https://www.facebook.com/');
});
