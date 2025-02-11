# Backend Express .mov Converter

[Live deployment](http://express-converter.duckdns.org/api/v1/swagger/) (10 MB file limit)

English | [Русский](https://github.com/volveezz/express-converter/blob/master/README_ru.md)

## Overview

This repository provides a backend solution built with Express.js for converting `.mov` files.

## Table of Contents

-  [Requirements](#requirements)
-  [Installation](#installation)
-  [Configuration](#configuration)
-  [Usage](#usage)
   -  [Production Build](#production-build)
   -  [Development Build](#development-build)
-  [API Documentation](#api-documentation)

## Requirements

-  **Node.js:** Version 22.x or higher
-  **Yarn:** (Recommended) as the package manager
-  **FFmpeg:** Required for the converter to work

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/volveezz/express-converter.git
cd express-converter
```

### 2. Install FFmpeg

-  **Linux (Ubuntu/Debian)**

```bash
sudo apt update
sudo apt install ffmpeg
```

-  **Windows**

```powershell
choco install ffmpeg
```

(or use any other installation method that works for you)

## Configuration

You can modify the project settings by editing the configuration file:

```bash
./config/config.ts
```

## Usage

### Production Build

1. **TypeScript Compilation:**  
   Ensure that `tsc` (`npx tsc`) (the TypeScript compiler) is available.

   ```bash
   yarn add -D typescript
   ```

2. **Build and Start:**  
   Note: During the build process, TypeScript may throw errors related to missing `@types` dependencies. These errors are expected and can be ignored in the production build.

   ```bash
   yarn install --production && yarn run build:prod
   yarn run start:prod
   ```

### Development Build

```bash
yarn install && yarn run start:dev
```

## API Documentation

Once the server is running, you can explore the API using Swagger at:

[http://localhost:3000/api/v1/swagger/](http://localhost:3000/api/v1/swagger/)
