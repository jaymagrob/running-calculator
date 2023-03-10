/* tslint:disable */
import Box from "@mui/material/Box";
import Head from "next/head";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useState } from "react";
import SplitTable from "../../components/splitTable";
import PopularDropdown from "../../components/form/popularDropdown";
import DistanceInput from "../../components/form/distanceInput";
import MetricInput from "../../components/form/metricInput";
import TimePickerComponent from "../../components/form/timePicker";
import SplitAmount from "../../components/form/splitAmount";

export default function splitPace() {
  const [distance, setDistance] = useState("5");
  const [time, setTime] = useState(dayjs("2022-01-01 00:20:00"));
  const [positiveSplits, setPositiveSplits] = useState(0.05);
  const [splits, setSplits] = useState([]);
  const [isError, setIsError] = useState(false);
  const [metric, setMetric] = useState("k");

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
              Positive Split
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
            <SplitAmount
              split={positiveSplits}
              onChange={setPositiveSplits}
              label="Positive Split Amount:"
            />
            <Button variant="contained" onClick={(e) => onSubmit(e)}>
              Calculate Splits
            </Button>
          </Box>
          <SplitTable splits={splits} />
        </Box>
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
