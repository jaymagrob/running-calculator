import React, { useState } from 'react'
import SplitTable from '../../components/splitTable';

export default function splitPace() {
  const [distance, setDistance] = useState('5400');
  const [time, setTime] = useState('20:00');
  const [negativeSplits, setNegativeSplits] = useState(0.05);
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
    const pace1 = pace * (1 + negativeSplits)
    const pace2 = pace * (1 - negativeSplits)
    const halfway = distance / 2
    let loops = []
    let totalSplit = 0;
    for (let i = 1; i <= Math.ceil(newDistance); i++) {
      const newKm = i > newDistance ? (i - 1) + (distance % 1000 / 1000) : i;
      if((i - 1) * 1000 <= halfway && i * 1000 >= halfway) {
        const firstPace =  (halfway - ((i - 1) * 1000)) / 1000 * pace1
        const secondPace = ((i) * 1000 - halfway) / 1000 * pace2
        const newPace = firstPace + secondPace;
        totalSplit += newPace
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(newPace),
        })
      } else if(i * 1000 <= halfway) {
        totalSplit += pace1
        loops.push({
          km: i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace1),
        })
      } else {
        totalSplit += i > newDistance ? pace2 * (distance%1000 / 1000): pace2
        loops.push({
          km: i > newDistance ? (i - 1) + parseFloat(distance%1000 / 1000) : i,
          split: millisToMinutesAndSeconds(totalSplit),
          lapTime: millisToMinutesAndSeconds(pace2),
        })
      }
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
          <li>
            <label htmlFor="negative">Negative Split Amount</label>
            <select name="negative" id="negative" value={negativeSplits} onChange={e => setNegativeSplits(e.target.value)}>
              <option value={0.1}>10%</option>
              <option value={0.09}>9%</option>
              <option value={0.08}>8%</option>
              <option value={0.07}>7%</option>
              <option value={0.06}>6%</option>
              <option value={0.05}>5%</option>
              <option value={0.04}>4%</option>
              <option value={0.03}>3%</option>
              <option value={0.02}>2%</option>
              <option value={0.01}>1%</option>
            </select>
          </li>
        </ul>
        <input type="submit" value="Submit" />
      </form>

      <SplitTable splits={splits} />
    </>
  )

}
