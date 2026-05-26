# rpgsaga

Учебный проект на TypeScript с простым RPG-турниром и автотестами на Vitest.

## Перед запуском

1. Установите **[Node.js](https://nodejs.org/)** (рекомендуется LTS, например 20.x).
2. В корне проекта установите зависимости:

```bash
npm install
```

## Запуск и проверки

| Команда         | Назначение                                |
| --------------- | ----------------------------------------- |
| `npm run start` | Запуск примера (`tsx src/index.ts`)       |
| `npm run build` | Проверка типов TypeScript (`tsc`)         |
| `npm test`      | Запуск тестов Vitest                      |

## Структура

- `src/` — исходный код проекта.
- `RPGSagaUnitTests/tests/` — тесты Vitest.
- `package.json` — скрипты и зависимости.

## Рекомендуемый порядок проверки

```bash
npm run build
npm test
```
