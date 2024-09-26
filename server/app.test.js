// test/app.test.js
const request = require('supertest');
const app = require('./index'); // Asegúrate de exportar `app` en index.js
const axios = require('axios');

jest.mock('axios'); // Mock de axios

describe('Pruebas de la API del clima', () => {

  test('GET /weather/:city - Obtener clima de una ciudad', async () => {
    const mockData = {
      data: {
        main: { temp: 25 }
      }
    };
    axios.get.mockResolvedValue(mockData); // Simular respuesta de axios

    const response = await request(app).get('/weather/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('main.temp', 25);
  });

  test('GET /forecast/:city - Obtener pronóstico de una ciudad', async () => {
    const mockData = {
      data: {
        list: []
      }
    };
    axios.get.mockResolvedValue(mockData); // Simular respuesta de axios

    const response = await request(app).get('/forecast/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('list');
  });

  test('GET /weatherByCoordinates - Obtener clima por coordenadas', async () => {
    const mockData = {
      data: {
        main: { temp: 18 }
      }
    };
    axios.get.mockResolvedValue(mockData); // Simular respuesta de axios

    const response = await request(app).get('/weatherByCoordinates?lat=-34.61&lon=-58.38');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('main.temp', 18);
  });

  test('GET /humidity/:city - Obtener humedad de una ciudad', async () => {
    const mockData = {
      data: {
        main: { humidity: 70 }
      }
    };
    axios.get.mockResolvedValue(mockData); // Simular respuesta de axios

    const response = await request(app).get('/humidity/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('humidity', 70);
  });

  test('GET /wind/:city - Obtener información del viento de una ciudad', async () => {
    const mockData = {
      data: {
        wind: { speed: 5 }
      }
    };
    axios.get.mockResolvedValue(mockData); // Simular respuesta de axios

    const response = await request(app).get('/wind/Buenos Aires');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('wind.speed', 5);
  });
});
