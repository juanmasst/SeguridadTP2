const request = require('supertest');
const express = require('express');
const app = require('./index'); // Asegúrate de exportar `app` en index.js

describe('Pruebas de la API del clima', () => {

  test('GET /weather/:city - Obtener clima de una ciudad', async () => {
    const response = await request(app).get('/weather/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('main.temp');
  });

  test('GET /forecast/:city - Obtener pronóstico de una ciudad', async () => {
    const response = await request(app).get('/forecast/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('list');
  });

  test('GET /weatherByCoordinates - Obtener clima por coordenadas', async () => {
    const response = await request(app).get('/weatherByCoordinates?lat=-34.61&lon=-58.38');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('main.temp');
  });

  test('GET /humidity/:city - Obtener humedad de una ciudad', async () => {
    const response = await request(app).get('/humidity/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('humidity');
  });

  test('GET /wind/:city - Obtener información del viento de una ciudad', async () => {
    const response = await request(app).get('/wind/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('wind');
  });
});
