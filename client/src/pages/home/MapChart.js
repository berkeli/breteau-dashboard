import React, { memo } from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import { Box, Heading, Text } from "@chakra-ui/react";

import mapFeatures from "../../assets/mapFeatures.json";

const MapChart = ({ setTooltipContent, countries }) => {
	console.log("countries", countries);
	return (
		<ComposableMap data-tip="">
			<ZoomableGroup>
				<Geographies geography={mapFeatures}>
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								onMouseEnter={() => {
									if (countries[geo.properties.name]) {
										setTooltipContent(
											countryToolTip(
												geo.properties.name,
												countries[geo.properties.name]
											)
										);
									} else {
										setTooltipContent(`${geo.properties.name}`);
									}
								}}
								onMouseLeave={() => {
									setTooltipContent("");
								}}
								style={{
									default: {
										fill:
											geo.properties.name in countries ? "#aeaeb6" : "#D6D6DA",
										outline: "none",
									},
									hover: {
										fill: "#F53",
										outline: "none",
									},
									pressed: {
										fill: "#E42",
										outline: "none",
									},
								}}
							/>
						))
					}
				</Geographies>
			</ZoomableGroup>
		</ComposableMap>
	);
};

const countryToolTip = (name, country) => {
	console.log(country);
	return (
		<Box>
			<Heading as="h4" size="sm">
				{name}
			</Heading>
			<Text>{country.new_students} new students</Text>
			<Text>{country.existing_students} existing students</Text>
			<Text>{country.new_teachers} new teachers</Text>
			<Text>{country.existing_teachers} existing teachers</Text>
			<Text>{country.school_count} schools</Text>
			<Text>
				Earliest Deployment:{" "}
				{new Date(country.earliest_deployment).toDateString()}
			</Text>
		</Box>
	);
};

export default memo(MapChart);
