# Backend Express .mov Converter

English | [Русский](https://github.com/volveezz/express-converter/blob/master/README_ru.md)

## Overview

This project provides a backend solution built with Express.js for converting `.mov` files. The following guide will help you set up, configure, and run the project in both production and development environments.

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

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/volveezz/express-converter.git
cd express-converter
```

## Configuration

You can tweak the project settings by editing the configuration file:

```bash
./config/config.ts
```

## Usage

### Production Build

1. **TypeScript Compilation:**  
   Ensure that `tsc` (TypeScript compiler) is available.

   ```bash
   yarn add -D typescript
   ```

2. **Build and Start:**  
   Note: During the build process, TypeScript may throw a lot of errors related to missing `@types` dependencies. These errors are expected and can be ignored in the production build.

   ```bash
   yarn install --production && yarn run build:prod
   yarn run start:prod
   ```

### Development Build

```bash
yarn install && yarn run start:dev
```

## API Documentation

Once the server is running, you can explore the API via Swagger at:

[http://localhost:3000/api/v1/swagger/](http://localhost:3000/api/v1/swagger/)
