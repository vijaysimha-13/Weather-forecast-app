import './App.css';
import React from 'react';
import { useState } from 'react';
import Chart from './chart';


const api = {
  key: 'private_key',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [searchContent, setSearchContent] = useState('');
  const [weather, setWeather] = useState({});
  const [tempsArray, setTempsArray] = useState([]);
  const [num, setNum] = useState(0);

  const Search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${searchContent}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setSearchContent('');
        setNum(0);
      });
      fetch(`${api.base}forecast?q=${searchContent}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setTempsArray([...tempsArray.slice(0, 0), result.list[0].main.temp, 
        result.list[1].main.temp,
        result.list[2].main.temp,
        result.list[3].main.temp,
        result.list[4].main.temp]);
        setNum(Number(result.list[0].dt_txt.slice(-8,-6)));
      });
    }
  }

  const getDate = (d) => {
    let months = ['January', 'Febraury', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    return `${day} ${date} ${month} ${year} ${hours}:${minutes}`
  } 


  return (

    <div className="App">
      <div className="search-container">
        <input 
        type="text" 
        className='search-bar' 
        placeholder='Search city name...'
        onChange={e => setSearchContent(e.target.value)}
        onKeyPress={Search}/>
      </div>
      {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='box-container'>
            <div className='location-container'>
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date-container'>
              {getDate(new Date())}
            </div>
          </div>
          <div className="weather-container">
            <div className="num-container">
              <div className="temp-container">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="col-container">
                <div className="humidity-container col-box">
                  {Math.round(weather.main.humidity)}%
                </div>
                <div className="wind-container col-box">
                  {Math.round(weather.wind.speed)}km/h
                </div>
              </div>
            </div>
            <div className="climate-container">
              {weather.weather[0].main}
            </div>
          </div> 
          <div className='chart-container'><Chart temps = {tempsArray} num = {num}/></div>
        </div>
        ) : ('')} 
          
      </div>
     
    
  );
}

export default App;
