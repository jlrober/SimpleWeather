import { DayWeatherData } from '@nxtest/data';
import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

type WeatherProp = {
	label: string,
	formatValue?: (val: number) => string
}

type mapWeatherKeyToLabelType = {
	[index: string]: WeatherProp
}

const mapWeatherKeyToLabel: mapWeatherKeyToLabelType = {
	dt: {
		label: 'Time'
	},
	sunrise: {
		label: 'Sunrise'
	},
	sunset: {
		label: 'Sunset'
	},
	temp: {
		label: 'Temperature',
		formatValue: (val: number) => `${Math.round(val)} \u00b0F`
	},
	feels_like: {
		label: 'Feels like',
		formatValue: (val: number) => `${Math.round(val)} \u00b0F`
	},
	pressure: {
		label: 'Pressure',
		formatValue: (val: number) => `${val} hPa`
	},
	humidity: {
		label: 'Humidity',
		formatValue: (val: number) => `${val}%`
	},
	dew_point: {
		label: 'Dew point',
		formatValue: (val: number) => `${Math.round(val)} \u00b0F`
	},
	uvi: {
		label: 'UV index'
	},
	clouds: {
		label: 'Clouds',
		formatValue: (val: number) => `${val}%`
	},
	visibility: {
		label: 'Visibility',
		formatValue: (val: number) => `${val} metres`
	},
	wind_speed: {
		label: 'Wind speed',
		formatValue: (val: number) => `${val} miles/hour`
	},
	wind_deg: {
		label: 'Wind degrees',
		formatValue: (val: number) => `${val}\u00b0`
	},
	wind_gust: {
		label: 'Wind gust',
		formatValue: (val: number) => `${val} miles/hour`
	}
}

const valuesToFilter = ['dt', 'sunrise', 'sunset', 'weather']

const CurrentListItem = (props: { itemKey: string, value: DayWeatherData["index"] }) => {
	const { itemKey, value } = props;
	const { label, formatValue = null} = mapWeatherKeyToLabel[itemKey];
	const formattedValue = formatValue && typeof value === 'number' ? formatValue(value) : value;

	return <ListItem secondaryAction={<ListItemText primary={formattedValue} />}>
		<ListItemText primary={label} />
	</ListItem>
}

const CurrentWeather = (props: { data: DayWeatherData }) => {
	const { data } = props;
	console.log(data);
	const listItems = Object.keys(data)
		.filter(itemKey => !!mapWeatherKeyToLabel[itemKey])
		.filter(itemKey => !valuesToFilter.find(filterItem => filterItem === itemKey))
		.map(itemKey => <><Divider /><CurrentListItem itemKey={itemKey} value={data[itemKey]} /></>)

	return (
		<Box sx={{ minWidth: '360px', flexGrow: '1' }}>
			<Card sx={{ minWidth: 275, bgcolor: 'background.paper' }}>
				<CardContent>
					<Typography variant='h4' sx={{ textAlign: 'center' }}>Current</Typography>
					<List>
						{listItems}
					</List>
				</CardContent>
			</Card>
		</Box>
	)
}

export default CurrentWeather;