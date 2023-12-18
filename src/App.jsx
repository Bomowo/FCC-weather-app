import { useEffect, useState } from 'react'
import './App.css'


function App() {
  let request = ' https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139'
  const [data, setData] = useState(null)

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = async () => {
    fetch(request)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.name, json.sys.country, json.main.temp, json.weather[0].main)
        setData ({
          place: json.name,
          country: json.sys.country,
          temperature: json.main.temp,
          weather: json.weather[0].main
        })

      })
      .catch((error) => console.log(error))
  }


  return (
    <>
      <h1>Hello World !</h1>
      <h2>{data&&data.place}, {data&&data.country}</h2>
      <h3>{data&&data.temperature} C, {data&&data.weather}</h3> 
    </>
  )
}

export default App
