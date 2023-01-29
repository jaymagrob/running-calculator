import React, { useState } from 'react'
import SplitTable from '../../components/splitTable';

export default function splitPace() {
  const [distance, setDistance] = useState('5400');
  const [time, setTime] = useState('20:00');
  const [splits, setSplits] = useState([]);

  function onSubmit(e) {
    e.preventDefault()
    function millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    const [minute, seconds] = time.split(':')
    const milli = (minute * 60 * 1000) + seconds * 1000;
    const newDistance = distance / 1000;
    const pace = milli / newDistance
    console.log(pace)
    console.log(millisToMinutesAndSeconds(pace))
    let loops = []
    for(let i = 1; i <= Math.ceil(newDistance); i++) {
      const newKm = i > newDistance ? (i - 1) + (distance%1000 / 1000) : i;

      loops.push({
        km: i > newDistance ? (i - 1) + parseFloat(distance%1000 / 1000) : i,
        split: millisToMinutesAndSeconds(pace * newKm),
        lapTime: millisToMinutesAndSeconds(pace),
      })
    }
    setSplits(loops)
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <ul>
          <li>
            <label htmlFor="distance">Distance:</label>
            <input type="text" id="distance" name="pace_distance" value={distance} onChange={e => setDistance(e.target.value)} />
          </li>
          <li>
            <label htmlFor="time">time:</label>
            <input type="text" id="time" name="pace_time" value={time} onChange={e => setTime(e.target.value)} />
          </li>
        </ul>
        <input type="submit" value="Submit" />
      </form>

      <SplitTable splits={splits} />
    </>
  )

}