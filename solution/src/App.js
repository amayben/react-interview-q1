import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {getLocations, isNameValid} from './mock-api/apis';

function App() {
  const [nameValid, setNameValid] = useState(true);
  const [locations, setLocations] = useState([]);

  const checkName = useCallback(async event => {
    const nameTaken = await isNameValid(event.target.value);
    setNameValid(nameTaken);
  }, [setNameValid]);

  const getLocationsCallback = useCallback(async () => {
    const locations = await getLocations();
    setLocations(locations);
  }, setLocations);

  useEffect(() => {
    getLocationsCallback();
  }, [])

  return (
    <form>
      <label>
        <div>Name: <input onChange={checkName}/></div>
        {!nameValid && <div>this name has already been taken</div>}
      </label>
      <label>
        Location: 
        <select>
          {locations.map((location, index) => {
            return <option id={index} value={index}>{location}</option>;
          })}
        </select>
      </label>
    </form>
  );
}

export default App;
