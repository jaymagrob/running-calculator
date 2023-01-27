import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';

export default function splitPace() {
const [distance, setDistance ] = useState('00:00');
const [time, setTime ] = useState('00:00');
const [pace, paceTime ] = useState([]);

  function onSubmit(e) {
    e.preventDefault()

    const [minute, seconds] = time.split(':')
    const milli = (minute * 60 * 1000) + seconds * 1000;
    const newDistance = distance / 1000;
    console.log(milli)


  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <ul>
        <li>
            <label htmlFor="distance">Distance:</label>
            <input type="text" id="distance" name="pace_distance" value={distance} onChange={e => setDistance(e.value)}/>
          </li>
          <li>
            <label htmlFor="time">time:</label>
            <input type="text" id="time" name="pace_time" value={time} onChange={setTime}/>
          </li>
        </ul>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )

}