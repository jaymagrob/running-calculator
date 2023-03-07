// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Head from "next/head";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";

export default function splitPace() {
  const [mph, setMph] = useState(dayjs("0000-00-00 00:08:00"));
  const [kpm, setKpm] = useState(dayjs("0000-00-00 00:04:58"));

  return (
    <>
      <Head>
        <title>Pace Convertor: Runner&apos;s Calculators</title>
        <meta
          name="description"
          content="Looking to convert your running pace between different units? Our running pace converter tool makes it easy to switch between minutes per kilometer and minutes per mile, so you can accurately track your progress no matter where you're running. Try our free tool today and get started!"
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
            Pace Convertor
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampmInClock
              inputFormat="mm:ss"
              mask="__:__"
              label="Pace Per Mile"
              value={mph}
              onChange={(newTime) => {
                if (!newTime) {
                  return;
                }
                setMph(newTime);
                const a = 1.609344;
                const b = newTime.$m;
                const c = newTime.$s;
                const milli = Math.round(c + (b * 60) / a);
                setKpm(dayjs.unix(milli));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampmInClock
              inputFormat="mm:ss"
              mask="__:__"
              label="Pace Per Km"
              value={kpm}
              onChange={(newTime) => {
                if (!newTime) {
                  return;
                }
                setKpm(newTime);
                const a = 1.609344;
                const b = newTime.$m;
                const c = newTime.$s;
                const milli = Math.round((c + b * 60) * a);
                setMph(dayjs.unix(milli));
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
        </Box>
      </Container>
    </>
  );
}
