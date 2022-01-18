import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DayWeatherData } from '@nxtest/data';

const bull = (
   <Box
     component="span"
     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
   >
     •
   </Box>
 );

const WeeklyItem = (props: { data: DayWeatherData }) => {
   const { data } = props;

   return <Card sx={{ width: '10%', minWidth: '159px', flexGrow: '1', margin: '0 10px 10px 0', textAlign: 'center' }}>
   <CardContent>
     <Typography variant="h5" component="div">
       {new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
     </Typography>
     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
     </Typography>
     <Typography variant="h5" component="div">
       {data.weather[0].main}
     </Typography>
     <Typography sx={{ mb: 1.5 }} color="text.secondary">
       {data.weather[0].description}
     </Typography>
     <Typography variant="body2">
       {typeof data.temp === 'object' ? `${Math.round(data.temp.max)} / ${Math.round(data.temp.min)}` : ''}
     </Typography>
   </CardContent>
 </Card>
}

const WeeklyWeather = (props: { data: DayWeatherData[] }) => {
   const { data } = props;

   const weeklyItems = data.map(itemData => <WeeklyItem data={itemData} />);

   return <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: 'calc(100% + 10px)', flexWrap: 'wrap' }}>
      {weeklyItems}
   </div>
}

export default WeeklyWeather;