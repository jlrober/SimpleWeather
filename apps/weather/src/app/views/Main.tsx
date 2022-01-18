import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Weather from '../components/Weather';
import Header from '../components/Header';
import { DayWeatherData, OneCallWeatherData } from '@nxtest/data';
import Typography from '@mui/material/Typography';

const storeCoords = (coords: google.maps.LatLngLiteral) => {
  localStorage.setItem('coords', JSON.stringify(coords));
}

type MainType = {
	themeMode: PaletteMode,
	setThemeMode: (themeMode: PaletteMode) => void
}

export function Main(props: MainType) {
  const [coords, setCoords] = useState<google.maps.LatLngLiteral|null>(null);
  const [WeatherData, setWeatherData] = useState<OneCallWeatherData|null>(null);
  const [heading, setHeading] = useState('');

  const { themeMode, setThemeMode } = props;

  useEffect(() => {
    const storedCoords = localStorage.getItem('coords');
    if (storedCoords) {
      const coords = JSON.parse(storedCoords);
      if (coords && coords.lat && coords.lng) {
        setCoords(coords);
        return;
      }
    }

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { coords: { latitude, longitude } } = pos;
        const coords = { lat: latitude, lng: longitude };
        setCoords(coords);
        storeCoords(coords);
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (coords && coords.lat && coords.lng) {
      axios.get(`/api/currentweather/${coords.lat}/${coords.lng}`)
        .then(res => setWeatherData(res.data))
        .catch(err => console.error(err));
    }
  }, [coords]);

  return (
    <Box sx={{ height: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      {WeatherData && coords ?
        <Weather data={WeatherData} coords={coords} />
        : ''
      }
    </Box>
  );
}

export default Main;