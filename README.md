
---

# Proyecto de API del Clima con CI/CD Seguro y Testing Automatizado

Este proyecto es una aplicación Node.js que interactúa con la API de OpenWeather para ofrecer datos sobre el clima, pronósticos, humedad y viento. Además, integra un pipeline CI/CD seguro con GitHub Actions y pruebas unitarias automatizadas usando Jest.

Se realizó el despliegue en Render. Para acceder utiliza este link:
https://seguridadtp2.onrender.com/humidity/Mendoza

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [EndPoints de la API](#endpoints-de-la-api)
- [Pruebas Automatizadas](#pruebas-automatizadas)
- [CI/CD con GitHub Actions](#cicd-con-github-actions)
- [Mejores Prácticas de Seguridad](#mejores-prácticas-de-seguridad)

## Tecnologías Utilizadas

- **Node.js**: Plataforma utilizada para el desarrollo del backend.
- **Express.js**: Framework de Node.js para la creación de APIs.
- **Axios**: Cliente HTTP para realizar peticiones a la API de OpenWeather.
- **Jest**: Framework de pruebas para realizar tests unitarios.
- **GitHub Actions**: Servicio de integración y despliegue continuo (CI/CD).
- **Supertest**: Herramienta para pruebas HTTP.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd tu-repositorio/server
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Configura tu API Key de OpenWeather:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade tu clave de API en este archivo:

     ```bash
     OPENWEATHER_API_KEY=tu_api_key_aqui
     ```

5. Inicia la aplicación:

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## Uso

Este proyecto incluye varios endpoints para obtener información del clima usando la API de OpenWeather.

### EndPoints de la API

1. **Clima Actual por Ciudad:**

   ```
   GET /weather/:city
   ```

   Ejemplo:

   ```
   GET /weather/Buenos Aires
   ```

   Respuesta:

   ```json
   {
     "main": {
       "temp": 25
     },
     ...
   }
   ```

2. **Pronóstico por Ciudad:**

   ```
   GET /forecast/:city
   ```

   Ejemplo:

   ```
   GET /forecast/Buenos Aires
   ```

   Respuesta:

   ```json
   {
     "list": [...]
   }
   ```

3. **Clima por Coordenadas:**

   ```
   GET /weatherByCoordinates?lat={lat}&lon={lon}
   ```

   Ejemplo:

   ```
   GET /weatherByCoordinates?lat=-34.61&lon=-58.38
   ```

   Respuesta:

   ```json
   {
     "main": {
       "temp": 18
     }
   }
   ```

4. **Humedad por Ciudad:**

   ```
   GET /humidity/:city
   ```

   Ejemplo:

   ```
   GET /humidity/Buenos Aires
   ```

   Respuesta:

   ```json
   {
     "humidity": 70
   }
   ```

5. **Viento por Ciudad:**

   ```
   GET /wind/:city
   ```

   Ejemplo:

   ```
   GET /wind/Buenos Aires
   ```

   Respuesta:

   ```json
   {
     "wind": {
       "speed": 5
     }
   }
   ```

## Pruebas Automatizadas

El proyecto utiliza Jest y Supertest para realizar pruebas automatizadas de los endpoints.

### Ejecutar Pruebas

1. Para ejecutar las pruebas unitarias:

   ```bash
   npm test
   ```

2. Las pruebas han sido configuradas para mockear las peticiones HTTP a la API de OpenWeather usando spies de Jest, evitando así el consumo de la API real durante las pruebas.

### Pruebas Implementadas

Se incluyen las siguientes pruebas para los endpoints:

- Clima actual por ciudad.
- Pronóstico por ciudad.
- Clima por coordenadas.
- Humedad por ciudad.
- Información del viento por ciudad.

## CI/CD con GitHub Actions

Este proyecto implementa un pipeline de CI/CD usando GitHub Actions. Cada vez que se hace un `push` al branch `main`, el pipeline se ejecuta automáticamente para realizar las siguientes tareas:

### Archivo `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      working-directory: ./server
      run: npm install

    - name: Run tests
      working-directory: ./server
      env:
        OPENWEATHER_API_KEY: ${{ secrets.OPENWEATHER_API_KEY }}
      run: npm test

    - name: Deploy
      working-directory: ./server
      run: npm start
```

### ¿Qué hace el pipeline?

1. **Checkout del código**: Descarga el código desde GitHub.
2. **Set up de Node.js**: Instala la versión 18 de Node.js.
3. **Instalación de dependencias**: Corre `npm install` para instalar las dependencias.
4. **Ejecución de pruebas**: Corre `npm test` y ejecuta los tests unitarios.
5. **Despliegue**: Inicia la aplicación localmente (este paso puede modificarse para despliegue en un entorno como Heroku o Vercel).

### Integración de Secrets

El pipeline utiliza `GitHub Secrets` para almacenar de forma segura la clave de la API de OpenWeather. Esto asegura que las claves no se exponen en el código.

## Mejores Prácticas de Seguridad

### Gestión de Claves Privadas

- **Secrets de GitHub**: Las claves privadas, como la API Key de OpenWeather, están gestionadas a través de `GitHub Secrets`, asegurando que nunca se exponen en el código fuente.
  
  Para agregar un secreto:
  
  1. Ve al repositorio en GitHub.
  2. Haz clic en `Settings` > `Secrets and variables` > `Actions`.
  3. Añade tu clave con el nombre `OPENWEATHER_API_KEY`.

### Pruebas con Mocks

- Durante las pruebas, el proyecto usa spies de Jest para mockear las respuestas de Axios, evitando hacer llamadas reales a la API y optimizando el tiempo de las pruebas.
