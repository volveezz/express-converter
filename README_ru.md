# Backend Express .mov конвертер

[Деплой](http://express-converter.duckdns.org/api/v1/swagger/) (ограничение для файлов: 10 Мб)

[English](https://github.com/volveezz/express-converter/blob/master/README.md) | Русский

## Обзор

Этот репозиторий предоставляет серверное решение, построенное на Express.js для конвертации файлов `.mov`.

## Содержание

-  [Требования](#requirements)
-  [Установка](#installation)
-  [Конфигурация](#configuration)
-  [Использование](#usage)
   -  [Сборка для продакшена](#production-build)
   -  [Сборка для разработки](#development-build)
-  [Документация API](#api-documentation)

## Требования

-  **Node.js:** версия 22.x или выше
-  **Yarn:** (рекомендуется) в качестве менеджера пакетов
-  **FFmpeg:** необходим для работы конвертера

Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/volveezz/express-converter.git
cd express-converter
```

### 2. Установка FFmpeg

-  **Linux (Ubuntu/Debian)**

```bash
sudo apt update
sudo apt install ffmpeg
```

-  **Windows**

```powershell
choco install ffmpeg
```

(либо через любые другие удобные для вас способы)

## Конфигурация

Вы можете изменить настройки проекта, отредактировав файл конфигурации:

```bash
./config/config.ts
```

## Использование

### Сборка для продакшена

1. **Компиляция TypeScript:**  
   Убедитесь, что `tsc` (`npx tsc`) (компилятор TypeScript) доступен.

   ```bash
   yarn add -D typescript
   ```

2. **Сборка и запуск:**  
   Примечание: Во время сборки TypeScript может выдавать ошибки, связанные с отсутствием зависимостей `@types`. Эти ошибки ожидаемы и могут быть проигнорированы при сборке.

   ```bash
   yarn install --production && yarn run build:prod
   yarn run start:prod
   ```

### Сборка для разработки

```bash
yarn install && yarn run start:dev
```

## Документация API

После запуска сервера вы можете ознакомиться с API используя Swagger по адресу:

[http://localhost:3000/api/v1/swagger/](http://localhost:3000/api/v1/swagger/)
