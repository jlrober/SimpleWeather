import React, { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import axios from 'axios';

type GoogleMapProps = {
	coords: google.maps.LatLngLiteral,
	setHeading: (heading: string) => void
}

const GoogleMap = (props: GoogleMapProps) => {
	const { coords, setHeading } = props;
	const [googleKey, setGoogleKey] = useState(null);

	useEffect(() => {
		axios.get('/api/google').then(r => setGoogleKey(r.data));
	}, []);

	useEffect(() => {
		if (googleKey) {
			const loader = new Loader({
				apiKey: googleKey,
				version: "weekly"
			});
			
			loader.load().then(google => {
				const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
					center: { lat: coords.lat, lng: coords.lng },
					zoom: 8,
					fullscreenControl: false,
					mapTypeId: google.maps.MapTypeId.HYBRID,
					disableDefaultUI: true
				});

				const layerID = 'my_custom_layer';
				
				const layer = new google.maps.ImageMapType({
					name: layerID,
					getTileUrl: (coord: google.maps.Point, zoom: number) => {
						const { x, y } = coord;
						return `/api/weathertile/${x}/${y}/${zoom}/clouds_new`;
					},
					tileSize: new google.maps.Size(256, 256),
					minZoom: 1,
					maxZoom: 20
				});

				map.overlayMapTypes.insertAt(0, layer);

				const buildHeading = (locationData: google.maps.GeocoderResponse) => {
					const addressComponents = locationData.results[0].address_components;

					return `${addressComponents[3].long_name}, ${addressComponents[5].long_name}`
				}

				const geocoder = new google.maps.Geocoder();
				geocoder
					.geocode({ location: coords })
					.then((response) => {  setHeading(buildHeading(response)) })
					.catch(err => console.error(err));
			});
		}
	}, [googleKey]);

	return <div id="map" style={{ height: '100%', width: '100%' }} />
}

export default GoogleMap;