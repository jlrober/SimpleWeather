import { DayWeatherData } from "@nxtest/data";
import React, { Fragment } from "react"
import CurrentWeather from "./CurrentWeather";

const Weather = (props: { data: DayWeatherData }) => {
    const { data } = props;
    return <CurrentWeather data={data} />
}

export default Weather;