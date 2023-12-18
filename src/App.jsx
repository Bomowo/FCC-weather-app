import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [data, setData] = useState(null)

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      function locationSuccess (data) {
        let request = 'https://weather-proxy.freecodecamp.rocks/api/current?lat='+Math.round(data.coords.latitude)+'&lon='+Math.round(data.coords.longitude)
        getWeather(request)
      },
      () => {
        console.log('There was an error getting the current location')
      }
    )
  }, [])

  const getWeather = async (link) => {
    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.name, json.sys.country, json.main.temp, json.weather[0].main)
        setData ({
          place: json.name,
          country: json.sys.country,
          temperature: json.main.temp.toFixed(1),
          celsius: true,
          weather: json.weather[0].main,
          icon: json.weather[0].icon
        })

      })
      .catch((error) => console.log(error))
  }

  const convertorCF = () => {
    if(data.celsius) {
      let farenheit = ((data.temperature * 9 / 5) + 32).toFixed(1)

      setData((prevData)=> {
        return {...prevData,
          temperature: farenheit,
          celsius: !prevData.celsius}
      })
    } else {
      let celsius = ((data.temperature - 32) * 5 / 9).toFixed(1)

      setData((prevData)=> {
        return {...prevData,
          temperature: celsius,
          celsius: !prevData.celsius}
      })
    }
  } 


  return (
    <>
      <h1>FCC Weather App</h1>
      <h2>{data&&data.place}, {data&&data.country}</h2>
      <img src={data&&data.icon} alt="weather icon" />
      <h3>{data&&data.temperature} {data&&data.celsius?'C':'F'}, {data&&data.weather}</h3>
      <button onClick={convertorCF}>convert temp</button>
    </>
  )
}

export default App
