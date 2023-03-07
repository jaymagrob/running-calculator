import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Head from "next/head";
import Container from "@mui/material/Container";
import { useState } from "react";
import SplitTable from "../../components/splitTable";
import PopularDropdown from "../../components/form/popularDropdown";
import DistanceInput from "../../components/form/distanceInput";
import MetricInput from "../../components/form/metricInput";
import TimePickerComponent from "../../components/form/timePicker";

export default function splitPace() {
  const [distance, setDistance] = useState(3.2);
  const [time, setTime] = useState(dayjs("2022-01-01 00:20:00"));
  const [splits, setSplits] = useState([]);
  const [isError, setIsError] = useState(false);
  const [metric, setMetric] = useState("m");

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
      <Container sx={{ background: "#eee" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
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
            <DistanceInput
              isError={isError}
              distance={distance}
              onChange={setDistance}
            />
            <MetricInput
              distance={distance}
              metric={metric}
              onDistanceChange={setDistance}
              onMetricChange={setMetric}
            />
            <PopularDropdown metric={metric} onChange={setDistance} />
            <TimePickerComponent time={time} onChange={setTime} />
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
        </Box>
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
