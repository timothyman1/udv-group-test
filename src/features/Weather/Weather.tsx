import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/shared/hooks/hooks.ts";
import { setData } from "@/pages/Home/widgetsSlice.ts";

interface WeatherProps {
  widgetId: string;
  city: string;
}
const Weather: React.FC<WeatherProps> = memo(({ widgetId, city }) => {
  const [cityName, setCityName] = useState(city ?? "");
  const [cityData, setCityData] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=feb30c24fd0b6c721e0a4daedbec86d3&units=metric&lang=ru`;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cityName) {
      axios.get(url).then((response) => {
        setCityData(response.data);
      });
    } else {
      setCityData(null);
    }
  }, [cityName, url]);

  useEffect(() => {
    dispatch(setData({ widgetId, city: cityName }));
  }, [cityName, widgetId, dispatch]);

  const handleOnChange = (e: SelectChangeEvent) => {
    setCityName(e.target.value);
  };

  return (
    <Stack>
      <h1>Weather</h1>
      <Stack sx={{ minHeight: 75 }} alignItems="center" justifyContent="center">
        {cityData ? (
          <Typography variant="h2" sx={{ fontSize: { xs: 40, lg: 50 } }}>
            {cityData.main.temp}&#176;C
          </Typography>
        ) : (
          <Typography variant="h5">Pick a city</Typography>
        )}
      </Stack>
      <Stack sx={{ my: 1 }} alignItems="center">
        <FormControl sx={{ width: "100%", flexGrow: 1 }}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select"
            value={cityName}
            onChange={handleOnChange}
            sx={{ textAlign: "left" }}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"Moscow"}>Москва</MenuItem>
            <MenuItem value={"Saint Petersburg"}>Санкт-Петербург</MenuItem>
            <MenuItem value={"Yekaterinburg"}>Екатеринбург</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
});

export default Weather;
