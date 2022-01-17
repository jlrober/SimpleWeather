import 'dotenv/config';
import express from 'express';
import path from 'path';
import { config } from './config';
import axios from 'axios';

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/api/google', (req, res) => {
  res.send(config.googleApiKey);
});

app.get('/api/weathertile/:x/:y/:z/:layer', (req, res) => {
  const url = config.weatherTileUrl(req.params.x, req.params.y, req.params.z, req.params.layer);
  axios.get(url, {responseType: 'stream'}).then(r => r.data.pipe(res));
});

app.get('/api/currentweather/:lat/:lng', (req, res) => {
  const url = config.currentWeatherUrl(req.params.lat, req.params.lng);
    axios.get(url)
      .then(r => res.send(r.data))
      .catch(e => res.status(500).send(e));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
server.on('error', console.error);
