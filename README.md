# Каталог квартир

React-приложение для фильтрации квартир с имитацией бэкенда через MSW. Позволяет отфильтровать список по комнатам, площади, этажу, типу планировки и статусу сдачи, а также открыть детальную карточку в анимированном попапе.

## Демо

[apartment-catalog-neon.vercel.app](https://apartment-catalog-neon.vercel.app)

## Репозиторий

[github.com/atroshchenkoff/apartment-catalog](https://github.com/atroshchenkoff/apartment-catalog)

## Стек

- Vite + React + TypeScript
- MSW (Mock Service Worker)
- Radix UI (Checkbox, Select, Slider, Dialog)
- BEM + SCSS

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

Бэкенда нет — API имитируется MSW (service worker) в dev и production.

## Тесты

Проект использует [Vitest](https://vitest.dev/) с настройкой в `vite.config.ts`.

```bash
npm test            # один прогон
npm run test:watch  # watch-режим
```

Покрыты фильтрация квартир, сборка query-параметров, теги фильтров, запрос к API (MSW) и компонент `FilterTags`.

## API (мок)

`GET /api/apartments` — возвращает список квартир с учётом query-параметров:

| Параметр | Описание |
|----------|----------|
| `rooms` | Количество комнат (можно передать несколько раз) |
| `areaMin`, `areaMax` | Диапазон площади |
| `floorMin`, `floorMax` | Диапазон этажей |
| `layoutType` | `studio`, `euro`, `classic` |
| `deliveryStatus` | `delivered`, `not_delivered` |

## Структура

```
src/
├── api/           # Запросы к API
├── components/    # UI-компоненты (фильтры, карточки, модалка)
├── hooks/         # React-хуки
├── mocks/         # MSW handlers и мок-данные
├── styles/        # BEM-стили (SCSS)
├── test/          # setup Vitest и MSW для тестов
├── types/         # TypeScript-типы
└── utils/         # фильтрация, query-параметры, форматирование
```
