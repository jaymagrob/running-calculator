import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Head from "next/head";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import SplitTable from "../../components/splitTable";

function convertKtM(a) {
  return a / 1.609344;
}

function convertMtK(a) {
  return a * 1.609344;
}

const popularList = [
  { value: "0", label: "5km", k: 5, m: convertKtM(5) },
  { value: "1", label: "10km", k: 10, m: convertKtM(10) },
  { value: "2", label: "5 miles", k: convertMtK(5), m: 5 },
  { value: "3", label: "15km", k: 15, m: convertKtM(15) },
  { value: "4", label: "10 miles", k: convertMtK(10), m: 10 },
  { value: "5", label: "Half Marathon", k: convertMtK(13.1), m: 13.1 },
  { value: "6", label: "Marathon", k: convertMtK(26.2), m: 26.2 },
  { value: "7", label: "50km", k: 50, m: convertKtM(50) },
];

export default function splitPace() {
  const [distance, setDistance] = useState(3.2);
  const [time, setTime] = useState(dayjs("2022-01-01 00:20:00"));
  const [splits, setSplits] = useState([]);
  const [isError, setIsError] = useState(false);
  const [metric, setMetric] = useState("m");
  const [popular, setPopular] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    function millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    if (parseFloat(distance) > 0 && parseFloat(distance) <= 200) {
      setIsError(false);
    } else {
      setIsError(true);
      return;
    }
    const minute = time.$m;
    const seconds = time.$s;
    const milli = minute * 60 * 1000 + seconds * 1000;
    const newDistance = distance;
    const pace = milli / newDistance;
    const loops = [];
    for (let i = 1; i <= Math.ceil(newDistance); i += 1) {
      const newKm = i > newDistance ? distance : i;

      loops.push({
        km: i > newDistance ? distance : i,
        split: millisToMinutesAndSeconds(pace * newKm),
        lapTime: millisToMinutesAndSeconds(pace),
      });
    }
    setSplits(loops);
  }
  return (
    <>
      <Head>
        <title>Split Pace Calculator: Runner&apos;s Calculators</title>
        <meta
          name="description"
          content="Take your running to the next level with our split pace calculator. Whether you're looking to achieve a negative split or a positive split, our tool will help you calculate the optimal pace for each half of your run. Stay on track, set new personal bests, and become a stronger runner with our split pace calculator. Try it now!"
        />
      </Head>
      <Container sx={{ minHeight: "calc(100vh - 100px)" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: "200px",
            margin: "0 auto",
          }}
        >
          <Typography component="h1" variant="h5">
            Split Pace
          </Typography>
          <FormControl fullWidth>
            <TextField
              type="number"
              inputProps={{ min: "0", max: "200", step: "1" }}
              id="distance"
              label="Distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              error={isError}
              helperText={isError ? "Between 0 and 200" : null}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="metric-select-label">Metric</InputLabel>
            <Select
              labelId="metric-select-label"
              id="metric-select"
              value={metric}
              label="Metric"
              onChange={(e) => {
                const metric2 = e.target.value;
                if (metric2 === "k") {
                  setDistance(convertMtK(distance));
                }
                if (metric2 === "m") {
                  setDistance(convertKtM(distance));
                }
                setMetric(metric2);
              }}
            >
              <MenuItem value="k">Kilometers</MenuItem>
              <MenuItem value="m">Miles</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="popular-select-label">Popular</InputLabel>
            <Select
              labelId="popular-select-label"
              id="popular-select"
              value={popular}
              label="popular"
              onChange={(e) => {
                const { value } = e.target;
                setPopular(value);
                const data = popularList.find((i) => i.value === value);
                setDistance(data[metric]);
              }}
            >
              {popularList.map((item) => (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampmInClock
              views={["minutes", "seconds"]}
              inputFormat="mm:ss"
              mask="__:__"
              label="Minutes and seconds"
              value={time}
              onChange={(newTime) => {
                setTime(newTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          />
          <Button variant="contained" onClick={(e) => onSubmit(e)}>
            Calculate Splits
          </Button>
        </Box>
        <SplitTable splits={splits} />
      </Container>
      <Container maxWidth="sm">
        <Typography
          component="h3"
          variant="h6"
          align="center"
          color="text.primary"
        >
          What are running splits
        </Typography>
        <Typography align="center" color="text.secondary" paragraph>
          A running pace is a measure of how quickly a runner is covering a
          certain distance, typically expressed in terms of minutes per mile or
          kilometers. It represents the amount of time it takes for a runner to
          cover each unit of distance, such as a mile or a kilometer, and is
          often used as a benchmark for measuring running performance and
          setting goals. Running pace can vary depending on a number of factors,
          such as terrain, weather conditions, elevation, and the runner&apos;s
          physical fitness and training level. Runners often use pace as a way
          to monitor and adjust their effort during a run, in order to maintain
          a steady and sustainable pace over a certain distance or time period.
        </Typography>
      </Container>
    </>
  );
}
