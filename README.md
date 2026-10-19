[![CI](https://github.com/philipperackette/calculatrice-znz/actions/workflows/ci.yml/badge.svg)](https://github.com/philipperackette/calculatrice-znz/actions/workflows/ci.yml)

# Calculatrice ℤ/nℤ

Tables d'addition et de multiplication, inversibles, ordres et structure du groupe (ℤ/nℤ)×.

**En ligne :** https://philipperackette.github.io/calculatrice-znz/

## Vérifications automatiques

À chaque push et pull request, GitHub Actions lance ESLint et HTMLHint, puis des tests Playwright dans Chromium, sur écran d'ordinateur et de téléphone. Ils vérifient que chaque page s'ouvre sans erreur JavaScript ni défilement horizontal. Tests propres à ce site : φ(n), les ordres et la structure de (ℤ/nℤ)×, comparés à un calcul direct pour n ≤ 60, et l'interface.

Le site lui-même n'a aucune dépendance : `package.json` ne sert qu'à ces vérifications.

```bash
npm ci
npm run lint
npx playwright install chromium
npm test
```
