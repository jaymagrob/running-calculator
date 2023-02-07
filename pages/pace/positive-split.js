import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState } from 'react'
import SplitTable from '../../components/splitTable';

export default function splitPace() {
  const [distance, setDistance] = useState('5400');
  const [time, setTime] = React.useState(dayjs('2022-01-01'));
  const [positiveSplits, setpositiveSplits] = useState(0.05);
  const [splits, setSplits] = useState([]);

  function onSubmit(e) {
    e.preventDefault()
    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const minute = time.$m
    const seconds = time.$s
    const milli = (minute * 60 * 1000) + seconds * 1000;
    const newDistance = distance / 1000;
    const pace = milli / newDistance
    const pace1 = pace * (1 - positiveSplits)
    const pace2 = pace * (1 + positiveSplits)
    const halfway = distance / 2
    let loops = []
    let totalSplit = 0;
    for (let i = 1; i <= Math.ceil(newDistance); i++) {
      const newKm = i > newDistance ? (i - 1) + (distance % 1000 / 1000) : i;
      if ((i - 1) * 1000 <= halfway && i * 1000 >= halfway) {
        const firstPace = (halfway - ((i - 1) * 1000)) / 1000 * pace1
        const secondPace = ((i) * 1000 - halfway) / 1000 * pace2
        const newPace = firstPace + secondPace;
        totalSplit += newPace
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(newPace),
        })
      } else if (i * 1000 <= halfway) {
        totalSplit += pace1
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace1),
        })
      } else {
        totalSplit += i > newDistance ? pace2 * (distance % 1000 / 1000) : pace2
        loops.push({
          km: i > newDistance ? (i - 1) + parseFloat(distance % 1000 / 1000) : i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace2),
        })
      }
    }
    setSplits(loops)
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          Positive Split
        </Typography>
        <TextField id="distance" label="Distance" value={distance} onChange={e => setDistance(e.target.value)} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            ampmInClock
            views={['minutes', 'seconds']}
            inputFormat="mm:ss"
            mask="__:__"
            label="Minutes and seconds"
            value={time}
            onChange={(newTime) => {
              console.log('here', newTime)
              setTime(newTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <InputLabel id="demo-simple-select-label">Positive Split Amount:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={positiveSplits}
            label="Age"
            onChange={e => setpositiveSplits(e.target.value)}
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
        <Button variant="contained" onClick={onSubmit}>Calculate Splits</Button>
      </Box>
      <SplitTable splits={splits} />
    </>
  )
}
