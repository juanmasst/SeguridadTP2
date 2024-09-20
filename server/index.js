const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = process.env.OPENWEATHER_API_KEY;
const baseUrl = 'http://api.openweathermap.org/data/2.5';
console.log('Pueba')

// 1. Clima actual por ciudad
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener el clima');
  }
});

// 2. Pronóstico por ciudad
app.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener el pronóstico');
  }
});

// 3. Clima por coordenadas
app.get('/weatherByCoordinates', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener el clima por coordenadas');
  }
});

// 4. Humedad por ciudad
app.get('/humidity/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    res.json({ humidity: response.data.main.humidity });
  } catch (error) {
    res.status(500).send('Error al obtener la humedad');
  }
});

// 5. Viento por ciudad
app.get('/wind/:city', async (req, res) => {
  console.log(apiKey)
  const city = req.params.city;
  try {
    const response = await axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`);
    res.json({ wind: response.data.wind });
  } catch (error) {
    res.status(500).send('Error al obtener la información del viento');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


module.exports = app;