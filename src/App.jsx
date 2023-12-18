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
          temperature: Math.round(json.main.temp),
          celsius: true,
          weather: json.weather[0].main
        })

      })
      .catch((error) => console.log(error))
  }

  const convertorCF = () => {
    if(data.celsius) {
      let farenheit = (data.temperature * 9 / 5) + 32
      farenheit = Math.round(farenheit)
      setData((prevData)=> {
        return {...prevData,
          temperature: farenheit,
          celsius: !prevData.celsius}
      })
    } else {
      let celsius = (data.temperature - 32) * 5 / 9
      celsius = Math.round(celsius)
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
      <h3>{data&&data.temperature} {data.celsius?'C':'F'}, {data&&data.weather}</h3>
      <button onClick={convertorCF}>convert temp</button>
    </>
  )
}

export default App
