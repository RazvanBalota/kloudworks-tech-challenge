import axios from "axios";
import React, { useState } from "react";
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import { PiWind } from "react-icons/pi";
import { BsCloudRainHeavy } from "react-icons/bs";

const API_KEY = "9d3d3af16d1544d1acf82850230807";

export default function SearchCity() {
  const [cityToday, setCityToday] = useState({
    name: undefined,
    country: undefined,
    temp: undefined,
    condition: undefined,
    icon: undefined,
    highest: undefined,
    lowest: undefined,
    humidity: undefined,
    wind: undefined,
    sunrise: undefined,
    sunset: undefined,
    rain: undefined,
  });
  const [cityTomorrow, setCityTomorrow] = useState({
    name: undefined,
    country: undefined,
    temp: undefined,
    condition: undefined,
    icon: undefined,
    highest: undefined,
    lowest: undefined,
    humidity: undefined,
    wind: undefined,
    sunrise: undefined,
    sunset: undefined,
    rain: undefined,
  });
  const [cityAfterTomorrow, setCityAfterTomorrow] = useState({
    name: undefined,
    country: undefined,
    temp: undefined,
    condition: undefined,
    icon: undefined,
    highest: undefined,
    lowest: undefined,
    humidity: undefined,
    wind: undefined,
    sunrise: undefined,
    sunset: undefined,
    rain: undefined,
  });

  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showMoreToday, setShowMoreToday] = useState(false);
  const [showMoreTomorrow, setShowMoreTomorrow] = useState(false);
  const [showMoreAfterTomorrow, setShowMoreAfterTomorrow] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (name !== "") {
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${name}&days=3`;
      axios
        .get(API_URL)
        .then((response) => {
          console.log(response.data);
          setCityToday({
            ...cityToday,
            name: response.data.location.name,
            country: response.data.location.country,
            temp: response.data.current.temp_c,
            condition: response.data.current.condition.text,
            icon: response.data.current.condition.icon,
            wind: response.data.current.wind_kph,
            highest: response.data.forecast.forecastday[0].day.maxtemp_c,
            lowest: response.data.forecast.forecastday[0].day.mintemp_c,
            sunrise: response.data.forecast.forecastday[0].astro.sunrise,
            sunset: response.data.forecast.forecastday[0].astro.sunset,
            humidity: response.data.forecast.forecastday[0].day.avghumidity,
            rain: response.data.forecast.forecastday[0].day.daily_chance_of_rain,
          });
          setCityTomorrow({
            ...cityTomorrow,
            name: response.data.location.name,
            country: response.data.location.country,
            temp: response.data.forecast.forecastday[1].day.avgtemp_c,
            condition: response.data.forecast.forecastday[1].day.condition.text,
            icon: response.data.forecast.forecastday[1].day.condition.icon,
            wind: response.data.forecast.forecastday[1].day.maxwind_kph,
            highest: response.data.forecast.forecastday[1].day.maxtemp_c,
            lowest: response.data.forecast.forecastday[1].day.mintemp_c,
            sunrise: response.data.forecast.forecastday[1].astro.sunrise,
            sunset: response.data.forecast.forecastday[1].astro.sunset,
            humidity: response.data.forecast.forecastday[1].day.avghumidity,
            rain: response.data.forecast.forecastday[1].day.daily_chance_of_rain,
          });
          setCityAfterTomorrow({
            ...cityTomorrow,
            name: response.data.location.name,
            country: response.data.location.country,
            temp: response.data.forecast.forecastday[2].day.avgtemp_c,
            condition: response.data.forecast.forecastday[2].day.condition.text,
            icon: response.data.forecast.forecastday[2].day.condition.icon,
            wind: response.data.forecast.forecastday[2].day.maxwind_kph,
            highest: response.data.forecast.forecastday[2].day.maxtemp_c,
            lowest: response.data.forecast.forecastday[2].day.mintemp_c,
            sunrise: response.data.forecast.forecastday[2].astro.sunrise,
            sunset: response.data.forecast.forecastday[2].astro.sunset,
            humidity: response.data.forecast.forecastday[2].day.avghumidity,
            rain: response.data.forecast.forecastday[2].day.daily_chance_of_rain,
          });
          setSubmitted(true);
          setShowMoreToday(false);
          setShowMoreTomorrow(false);
          setShowMoreAfterTomorrow(false);
          setError("");
        })
        .catch((error) => {
          console.log(error);
          setError("Invalid city name. Please try searching another one...");
          setSubmitted(false);
          setShowMoreToday(false);
          setShowMoreTomorrow(false);
          setShowMoreAfterTomorrow(false);
        });
    }
  };

  const handleShowMoreToday = () => {
    setShowMoreToday(!showMoreToday);
  };

  const handleShowMoreTomorrow = () => {
    setShowMoreTomorrow(!showMoreTomorrow);
  };

  const handleShowMoreAfterTomorrow = () => {
    setShowMoreAfterTomorrow(!showMoreAfterTomorrow);
  };

  return (
    <section className="h-full">
      <div className="container mx-auto">
        <form onSubmit={handleClick}>
          <div className="flex flex-col justify-center items-center mt-8">
            <div className="flex gap-x-4">
              <input
                type="text"
                placeholder="Enter a city"
                onChange={(e) => setName(e.target.value)}
                className="outline-none rounded-lg px-4 py-2 bg-[#f1f1f1]"
              />
              <button>Search city</button>
            </div>
          </div>
        </form>
        {submitted ? (
          <div className="flex flex-col lg:flex-row gap-x-4">
            <div className="w-[900px] h-full bg-slate-600 rounded mt-5 flex flex-col px-6 py-3 text-white font-medium tracking-wide justify-center items-center">
              <span>Today</span>
              <img
                src={cityToday.icon}
                alt=""
                className="w-1/3"
              />
              <span className="text-xl mb-2 text-center">
                {cityToday.name}, {cityToday.country}
              </span>
              <span className="text-3xl mb-2">{cityToday.temp}°C</span>
              <span className="mb-2">{cityToday.condition}</span>
              <div className="flex gap-x-5">
                <span>H: {Math.round(cityToday.highest)}°</span>
                <span>L: {Math.round(cityToday.lowest)}°</span>
              </div>
              <button
                className="mt-6"
                onClick={handleShowMoreToday}>
                Show more
              </button>
              <div
                className={`transition-all duration-300 ease-linear ${
                  showMoreToday ? "h-56" : "h-0"
                } w-full overflow-hidden flex flex-col`}>
                <div className="h-full w-full transition-all duration-300 ease-linear  flex flex-col pt-5 text-slate-200 ">
                  <div className="flex justify-between items-center gap-x-5">
                    <div className="flex flex-col items-center">
                      <WiSunrise size={30} />
                      <span>{cityToday.sunrise}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <WiSunset size={30} />
                      <span>{cityToday.sunset}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <BsCloudRainHeavy size={30} />
                    <span>{cityToday.rain}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <WiHumidity size={30} />
                    <span>{cityToday.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <PiWind size={30} />
                    <span>{cityToday.wind} kph</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[900px] h-full bg-slate-600 rounded mt-5 flex flex-col px-6 py-3 text-white font-medium tracking-wide justify-center items-center">
              <span>Tomorrow</span>
              <img
                src={cityTomorrow.icon}
                alt=""
                className="w-1/3"
              />
              <span className="text-xl mb-2 text-center">
                {cityTomorrow.name}, {cityTomorrow.country}
              </span>
              <span className="text-3xl mb-2">{Math.round(cityTomorrow.temp)}°C</span>
              <span className="mb-2">{cityTomorrow.condition}</span>
              <div className="flex gap-x-5">
                <span>H: {Math.round(cityTomorrow.highest)}°</span>
                <span>L: {Math.round(cityTomorrow.lowest)}°</span>
              </div>
              <button
                className="mt-6"
                onClick={handleShowMoreTomorrow}>
                Show more
              </button>
              <div
                className={`transition-all duration-300 ease-linear ${
                  showMoreTomorrow ? "h-56" : "h-0"
                } w-full overflow-hidden flex flex-col`}>
                <div className="h-full w-full transition-all duration-300 ease-linear  flex flex-col pt-5 text-slate-200 ">
                  <div className="flex justify-between items-center gap-x-5">
                    <div className="flex flex-col items-center">
                      <WiSunrise size={30} />
                      <span>{cityTomorrow.sunrise}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <WiSunset size={30} />
                      <span>{cityTomorrow.sunset}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <BsCloudRainHeavy size={30} />
                    <span>{cityTomorrow.rain}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <WiHumidity size={30} />
                    <span>{cityTomorrow.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <PiWind size={30} />
                    <span>{cityTomorrow.wind} kph</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[900px] h-full bg-slate-600 rounded mt-5 flex flex-col px-6 py-3 text-white font-medium tracking-wide justify-center items-center">
              <span>After Tomorrow</span>
              <img
                src={cityAfterTomorrow.icon}
                alt=""
                className="w-1/3"
              />
              <span className="text-xl mb-2 text-center">
                {cityAfterTomorrow.name}, {cityAfterTomorrow.country}
              </span>
              <span className="text-3xl mb-2">{Math.round(cityAfterTomorrow.temp)}°C</span>
              <span className="mb-2">{cityAfterTomorrow.condition}</span>
              <div className="flex gap-x-5">
                <span>H: {Math.round(cityAfterTomorrow.highest)}°</span>
                <span>L: {Math.round(cityAfterTomorrow.lowest)}°</span>
              </div>
              <button
                className="mt-6"
                onClick={handleShowMoreAfterTomorrow}>
                Show more
              </button>
              <div
                className={`transition-all duration-300 ease-linear ${
                  showMoreAfterTomorrow ? "h-56" : "h-0"
                } w-full overflow-hidden flex flex-col`}>
                <div className="h-full w-full transition-all duration-300 ease-linear  flex flex-col pt-5 text-slate-200 ">
                  <div className="flex justify-between items-center gap-x-5">
                    <div className="flex flex-col items-center">
                      <WiSunrise size={30} />
                      <span>{cityAfterTomorrow.sunrise}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <WiSunset size={30} />
                      <span>{cityAfterTomorrow.sunset}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <BsCloudRainHeavy size={30} />
                    <span>{cityAfterTomorrow.rain}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <WiHumidity size={30} />
                    <span>{cityAfterTomorrow.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <PiWind size={30} />
                    <span>{cityAfterTomorrow.wind} kph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="text-2xl text-red-500 font-bold pt-10">{error}</div>
      </div>
    </section>
  );
}
