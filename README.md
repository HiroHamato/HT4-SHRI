# Инструкции по запуску проекта

### Клонирование репозитория:

```
git clone https://github.com/HiroHamato/HT4-SHRI.git
cd HT4-SHRI
```

### Установка зависимостей:

```
npm install
```

## Запуск приложения:

```
npm run dev
```

#### Откройте в браузере:

Приложение будет доступно по адресу, который даст vite, например:
http://localhost:5173/

## Важно!

Не забудь запустить бэк на порте 3000 что бы апи было доступно по адресу
http://127.0.0.1:3000/ или http://localhost:3000/

# Архитектура проекта

## Графика архитектуры проекта:

![image](https://github.com/HiroHamato/HT4-SHRI/blob/main/architecture.png?raw=true)

## Основные компоненты

- ### App (корневой компонент):

Управляет роутингом через react-router-dom

Содержит глобальный `<Header>`

Маршруты:

`/ → HomePage`

`/history → HistoryPage`

`/generate → GeneratePage`

- ### Header:

Навигационная панель с переключением между страницами

Использует `NavLink` для подсветки активного пути

## Страницы:

- ### HomePage:

Основной компонент: `FileProcessor`

Загрузка и обработка CSV-файлов

- ### HistoryPage:

Отображает `HistoryList`

Кнопки управления историей

- ### GeneratePage:

Генерация CSV-отчетов

Управление статусом операции

## Компоненты обработки файлов

- ### FileProcessor:

Координирует процесс `загрузки → обработки → отображения`

#### Состояния:

`selectedFile (текущий файл)`

`isProcessing (статус обработки)`

`lastJson (результат агрегации)`

Интеграция с глобальным состоянием через `useStore`

- ### Dropzone:

Drag-and-drop зона для загрузки файлов

Визуальная обратная связь при ошибках

Интеграция с `FileInfo`,`ProcessingSpinner` и `DropzonePrompt`

- #### FileInfo:

Отображает информацию о загруженном файле

- #### ProcessingSpinner:

Отображает индикатор загрузки

- #### DropzonePrompt:

Отображает текст для загрузки файлов

- ### Stats:

Отображает агрегированные данные

Форматирование чисел через `formatNumber`

Работа с состоянием

## Глобальное состояние (useStore):

Хранилище Zustand с использованием `localStorage` через метод `persist` из `zustand/middleware`

Ключевые сущности:

```
interface StoreState {
    history: HistoryItem[]; // История операций
    currentData: unknown; // Текущие данные
    isLoading: boolean; // Статус загрузки
}
```

Методы:

`addHistoryItem()` - добавление записи

`updateHistoryItem()` - обновление статуса

`removeHistoryItem()` - удаление записи

## Утилиты

Форматирование:

`formatNumber()` - форматирование и округление чисел (1000.5 → "1001")

`formatDayOfYear()` - преобразование дня года в дату ("32" → "1 февраля")

`formatDateTime()` - форматирование даты

## Работа с API:

`generateReport()` - генерация CSV-отчета

`aggregateData()` - агрегация загруженных данных

Базовый URL: http://127.0.0.1:3000

## Компоненты истории операций

- ### HistoryList:

Отображает список операций

Интеграция с `HistoryListItem`

Обработка пустого состояния

- ### HistoryDetailsModal:

Модальное окно с детализацией операции реализование с помощью `React.createPortal`

Отображает статистику аналогично `Stats`

Закрытие по клику вне области
