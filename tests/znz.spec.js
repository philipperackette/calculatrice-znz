/* global gcd, phi, orderMod, unitGroupStructure, isCyclic */
import { test, expect } from "@playwright/test";
import { adresse, surveiller } from "./outils.js";

test.beforeEach(async ({ page }) => {
  await page.goto(adresse("index.html"));
});

test("φ(n), ordres et structure de (ℤ/nℤ)× : cohérents avec un calcul direct", async ({ page }) => {
  const ecarts = await page.evaluate(() => {
    const pgcd = (a, b) => (b ? pgcd(b, a % b) : a);
    const out = [];
    for (let n = 2; n <= 60; n++) {
      const unites = [];
      for (let a = 1; a < n; a++) if (pgcd(a, n) === 1) unites.push(a);
      const ordre = (a) => { let x = a % n, k = 1; while (x !== 1 % n) { x = (x * a) % n; k++; } return k; };
      const cycliqueDirect = unites.some((a) => ordre(a) === unites.length);
      const parts = unitGroupStructure(n);
      if (phi(n) !== unites.length) out.push(`φ(${n})`);
      if (parts.reduce((p, k) => p * k, 1) !== unites.length) out.push(`ordre de la structure pour n=${n}`);
      if (isCyclic(parts) !== cycliqueDirect) out.push(`cyclicité pour n=${n}`);
      for (const a of unites) if (orderMod(a, n) !== ordre(a)) out.push(`ordre de ${a} mod ${n}`);
      if (gcd(n, 6) !== pgcd(n, 6)) out.push(`pgcd(${n}, 6)`);
    }
    return out;
  });
  expect(ecarts).toEqual([]);
});

test("interface : n = 8 non cyclique, n = 7 engendré par 3 et 5", async ({ page }) => {
  const suivi = surveiller(page);
  await page.locator("#n").fill("8");
  await expect(page.locator("#summary")).toContainText("φ(8) = 4");
  await expect(page.locator("#summary")).toContainText("Groupe non cyclique");
  await expect(page.locator("#struct")).toContainText("Aucun générateur");

  await page.click("#minus");
  await expect(page.locator("#nval")).toHaveText("7");
  await expect(page.locator("#struct .generator")).toHaveText(["3", "5"]);
  await page.locator('#units .pill[data-u="3"]').click();
  await expect(page.locator("#cycle")).toContainText("⟨3⟩ = {1, 2, 3, 4, 5, 6}, ordre 6");
  await expect(page.locator("#mulTable tr")).toHaveCount(8);
  suivi.verifier();
});
