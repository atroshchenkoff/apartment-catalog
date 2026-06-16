# Каталог квартир

React-приложение для фильтрации квартир с имитацией бэкенда через MSW. Позволяет отфильтровать список по комнатам, площади, этажу, типу планировки и статусу сдачи, а также открыть детальную карточку в анимированном попапе.

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

## Сборка и деплой

```bash
npm run build
npm run preview
```

Бэкенда нет — API имитируется MSW (service worker) и в dev, и в production-сборке. После `npm run build` приложение работает на статическом хостинге (Vercel, Netlify и т.д.) без отдельного сервера.

## Тесты

Проект использует [Vitest](https://vitest.dev/) — он встроен в Vite и не требует отдельного конфига сборщика.

```bash
npm test          # один прогон
npm run test:watch  # watch-режим
```

Покрыты фильтрация квартир, сборка query-параметров, теги фильтров, запрос к API (MSW) и компонент `FilterTags`.

## Изображения

Карточки и модалка используют WebP-файлы из `public/images/apartments/`.

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
└── types/         # TypeScript-типы
```
