/* tslint:disable */
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Head from "next/head";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
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
  const [distance, setDistance] = useState("5");
  const [time, setTime] = useState(dayjs("2022-01-01 00:20:00"));
  const [positiveSplits, setPositiveSplits] = useState(0.05);
  const [splits, setSplits] = useState([]);
  const [isError, setIsError] = useState(false);
  const [metric, setMetric] = useState("k");
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
    const newDistance = distance * 1000;
    const pace = milli / distance;
    const pace1 = pace * (1 - positiveSplits);
    const pace2 = pace * (1 + positiveSplits);
    const halfway = newDistance / 2;
    const loops = [];
    let totalSplit = 0;
    for (let i = 1; i <= Math.ceil(distance); i += 1) {
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
          i > distance ? pace2 * ((newDistance % 1000) / 1000) : pace2;
        loops.push({
          km:
            i > distance ? i - 1 + parseFloat((newDistance % 1000) / 1000) : i,
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
        <title>Positive Split Calculator: Runner&apos;s Calculators</title>
        <meta
          name="description"
          content="If you're a runner looking to take on a challenge, try our positive split calculator to help you pace your runs to finish stronger than you started. Our tool will help you calculate the optimal pace for each half of your run to achieve a positive split. Don't settle for mediocrity, push yourself to new heights with our positive split calculator. Try it now!"
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
            Positive Split
          </Typography>
          <FormControl fullWidth>
            <TextField
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
          >
            <InputLabel id="demo-simple-select-label">
              Positive Split Amount:
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={positiveSplits}
              label="Age"
              onChange={(e) => setPositiveSplits(e.target.value)}
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
          <Button variant="contained" onClick={(e) => onSubmit(e)}>
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
          What are positive splits
        </Typography>
        <Typography align="center" color="text.secondary" paragraph>
          Positive splits in running refer to a strategy where a runner
          completes the first half of a run faster than the second half. This
          means that the runner&apos;s pace gradually decreases over the course
          of the run, potentially leading to a slower overall time. For example,
          a runner might start out a 5K at a fast pace, but then tire out and
          slow down in the second half of the race. Positive splits can occur
          due to a variety of factors, such as starting out too fast, inadequate
          training or preparation, or poor pacing strategies. While positive
          splits may be unavoidable in some situations, they are generally
          considered a less desirable running strategy than negative splits, as
          they can lead to fatigue, injury, and suboptimal performance.
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          align="center"
          color="text.primary"
        >
          What are the benefits of psotive splits
        </Typography>
        <Typography align="center" color="text.secondary" paragraph>
          While negative splits are generally considered a more effective and
          efficient running strategy, there are some potential benefits to
          running positive splits in certain situations. One possible benefit is
          that running at a faster pace in the first half of a run can provide
          an adrenaline boost and create a feeling of excitement and motivation,
          which can be helpful for some runners. Additionally, positive splits
          can be a useful training tool for building mental toughness, as they
          require the runner to push through fatigue and maintain a steady
          effort, even when they are feeling tired. Positive splits can also be
          a useful strategy for runners who are looking to gradually increase
          their pace and build their endurance over time, as they allow the
          runner to gradually increase their effort and intensity. Overall,
          while negative splits are generally considered the most effective and
          efficient running strategy, there are some situations where positive
          splits may be useful or appropriate for certain runners.
        </Typography>
      </Container>
    </>
  );
}
