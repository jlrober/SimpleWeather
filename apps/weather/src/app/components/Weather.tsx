import { OneCallWeatherData } from "@nxtest/data";
import React, { Fragment, useState } from "react"
import CurrentWeather from "./CurrentWeather";
import WeeklyWeather from "./WeeklyWeather";
import GoogleMap from '../components/GoogleMap';
import Typography from '@mui/material/Typography';

const Weather = (props: { data: OneCallWeatherData, coords: google.maps.LatLngLiteral }) => {
	const { data, coords } = props;
	const [heading, setHeading] = useState<string|null>(null);

	return <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
		{ heading ?
			<Typography variant="h3" component="div" color="textPrimary" sx={{ textAlign: 'center', marginBottom: '14px' }}>
				{heading}
			</Typography>
			: ''
		}
		<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
			<CurrentWeather data={data.current} />
			<div style={{ flexGrow: '35', minWidth: '400px', minHeight: '500px' }}>
				{ coords ? <GoogleMap coords={{ lat: coords.lat, lng: coords.lng }} setHeading={setHeading} /> : '' }
			</div>
		</div>
		<WeeklyWeather data={data.daily} />
	</div>
}

export default Weather;