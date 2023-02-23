import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Head from "next/head";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import SplitTable from "../../components/splitTable";

export default function splitPace() {
  const [distance, setDistance] = useState("5000");
  const [time, setTime] = useState(dayjs("2022-01-01 00:20:00"));
  const [splits, setSplits] = useState([]);
  const [isError, setIsError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    function millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    if (parseFloat(distance) > 0 && parseFloat(distance) <= 100000) {
      setIsError(false);
    } else {
      setIsError(true);
      return;
    }
    const minute = time.$m;
    const seconds = time.$s;
    const milli = minute * 60 * 1000 + seconds * 1000;
    const newDistance = distance / 1000;
    const pace = milli / newDistance;
    const loops = [];
    for (let i = 1; i <= Math.ceil(newDistance); i += 1) {
      const newKm = i > newDistance ? i - 1 + (distance % 1000) / 1000 : i;

      loops.push({
        km: i > newDistance ? i - 1 + parseFloat((distance % 1000) / 1000) : i,
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
          }}
        >
          <Typography component="h1" variant="h5">
            Split Pace
          </Typography>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            id="distance"
            label="Distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            error={isError}
            helperText={isError ? "Between 1 and 100,000" : null}
          />
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