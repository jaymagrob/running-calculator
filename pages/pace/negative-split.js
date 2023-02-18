import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import SplitTable from "../../components/splitTable";

export default function splitPace() {
  const [distance, setDistance] = useState("5400");
  const [time, setTime] = useState(dayjs("2022-01-01"));
  const [negativeSplits, setNegativeSplits] = useState(0.05);
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
    const pace1 = pace * (1 + negativeSplits);
    const pace2 = pace * (1 - negativeSplits);
    const halfway = distance / 2;
    const loops = [];
    let totalSplit = 0;
    for (let i = 1; i <= Math.ceil(newDistance); i++) {
      const newKm = i > newDistance ? i - 1 + (distance % 1000) / 1000 : i;
      if ((i - 1) * 1000 <= halfway && i * 1000 >= halfway) {
        const firstPace = ((halfway - (i - 1) * 1000) / 1000) * pace1;
        const secondPace = ((i * 1000 - halfway) / 1000) * pace2;
        const newPace = firstPace + secondPace;
        totalSplit += newPace;
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(newPace),
        });
      } else if (i * 1000 <= halfway) {
        totalSplit += pace1;
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace1),
        });
      } else {
        totalSplit +=
          i > newDistance ? pace2 * ((distance % 1000) / 1000) : pace2;
        loops.push({
          km:
            i > newDistance ? i - 1 + parseFloat((distance % 1000) / 1000) : i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace2),
        });
      }
    }
    setSplits(loops);
  }
  return (
    <>
      <Head>
        <title>Negative Split Calculator: Runner's Calculators</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Looking to improve your running performance? Use our negative split calculator to calculate the optimal pace for each half of your run and achieve a negative split. Get faster, stronger and smarter with our tool. Try it now!"
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
            Negative Split
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
                console.log("here", newTime);
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
          >
            <InputLabel id="demo-simple-select-label">
              Negative Split Amount:
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={negativeSplits}
              label="Age"
              onChange={(e) => setNegativeSplits(e.target.value)}
            >
              <MenuItem value={0.1}>10%</MenuItem>
              <MenuItem value={0.09}>9%</MenuItem>
              <MenuItem value={0.08}>8%</MenuItem>
              <MenuItem value={0.07}>7%</MenuItem>
              <MenuItem value={0.06}>6%</MenuItem>
              <MenuItem value={0.05}>5%</MenuItem>
              <MenuItem value={0.04}>4%</MenuItem>
              <MenuItem value={0.03}>3%</MenuItem>
              <MenuItem value={0.02}>2%</MenuItem>
              <MenuItem value={0.01}>1%</MenuItem>
            </Select>
          </Box>
          <Button variant="contained" onClick={onSubmit}>
            Calculate Splits
          </Button>
        </Box>
        <SplitTable splits={splits} />
      </Container>
      <Container maxwidth="sm">
        <Typography
          component="h3"
          variant="h6"
          align="center"
          color="text.primary"
        >
          What are negative splits
        </Typography>
        <Typography align="center" color="text.secondary" paragraph>
          Negative splits are a running strategy where a runner completes the
          second half of a run faster than the first half. This means that the
          runner's pace gradually increases over the course of the run, allowing
          them to finish strong and potentially achieve a faster overall time.
          For example, a runner might aim to run the first half of a 10K at a
          slower pace than the second half, in order to conserve energy and then
          pick up the pace later on. Negative splits can be an effective
          strategy for runners who want to improve their endurance, speed, and
          mental toughness, as it requires a certain level of discipline and
          self-awareness to maintain a steady pace early on and then increase it
          later in the run.
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          align="center"
          color="text.primary"
        >
          Benefits of negative splits
        </Typography>
        <Typography align="center" color="text.secondary" paragraph>
          The benefits of negative splits when running are numerous. First, by
          starting out slower, the runner conserves energy and reduces the risk
          of burning out early in the run. This can lead to a more consistent
          overall pace and prevent the runner from hitting a "wall" later on.
          Second, running negative splits can help build mental toughness and
          confidence, as the runner gains momentum and energy throughout the
          run. Third, it can lead to faster overall times, as the runner is able
          to maintain a faster pace in the second half of the run. Finally,
          negative splits can be a useful training tool for building endurance
          and improving speed, as they require the runner to maintain a steady
          pace and gradually increase their effort over the course of the run.
          Overall, running negative splits can be an effective strategy for
          runners who want to improve their performance and reach their goals.
        </Typography>
      </Container>
    </>
  );
}
