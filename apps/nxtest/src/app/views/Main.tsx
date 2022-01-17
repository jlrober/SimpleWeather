import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Weather from '../components/Weather';
import Header from '../components/Header';
import { DayWeatherData } from '@nxtest/data';
import GoogleMap from '../components/GoogleMap';
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
  const [currentWeatherData, setCurrentWeatherData] = useState<DayWeatherData|null>(null);
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
        .then(res => setCurrentWeatherData(res.data.current))
        .catch(err => console.error(err));
    }
  }, [coords]);

  return (
    <Box sx={{ width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <Typography variant="h2" component="div" color="textPrimary" sx={{ textAlign: 'center', marginTop: '12px' }}>
          {heading}
        </Typography>
        {currentWeatherData ?
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Weather data={currentWeatherData}/>
            <div style={{ width: '100%', margin: '14px' }}>
              { coords ? <GoogleMap coords={{ lat: coords.lat, lng: coords.lng }} setHeading={setHeading} /> : '' }
            </div>
          </div>
          : ''
        }
        
    </Box>
  );
}

export default Main;