import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiHeavyRain } from "react-icons/gi";
import { WiSunset, WiSunrise, WiHumidity } from "react-icons/wi";
import { PiWind } from "react-icons/pi";
import { BsMoon } from "react-icons/bs";
import { AiOutlineInfo, AiOutlineSearch } from "react-icons/ai";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

const API_KEY = "9d3d3af16d1544d1acf82850230807";

export default function SearchFunction() {
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecast, setForecast] = useState({});
  const [expandedItems, setExpandedItems] = useState([]);
  const [weekly, setWeekly] = useState({});
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setCity(city);
        setCurrentCity(response.data.location);
        setCurrentWeather(response.data.current);
        setForecast(response.data.forecast.forecastday);
        setExpandedItems(new Array(response.data.forecast.forecastday.length).fill(false));
        setWeekly(response.data.forecast.forecastday);
        setSubmit(true);
      })
      .catch((error) => setError("Error fetchin weather details. Please try again..."));
  };

  const handleShowMore = (index) => {
    setExpandedItems((prevExpandedItems) => {
      const updatedExpandedItems = [...prevExpandedItems];
      updatedExpandedItems[index] = !prevExpandedItems[index];
      const previouslyExpandedIndex = prevExpandedItems.findIndex((item) => item === true);
      if (previouslyExpandedIndex !== -1 && previouslyExpandedIndex !== index) {
        updatedExpandedItems[previouslyExpandedIndex] = false;
      }
      return updatedExpandedItems;
    });
  };

  return (
    <section className="lg:h-[700px] lg:w-[1200px] py-10">
      <div className="container mx-auto h-full border-2 rounded-2xl bg-[#f1f1f1] shadow">
        {/* Dashboard */}
        <div className="h-full w-full flex ">
          {/* Search */}
          <div className="pt-4 gap-x-4 flex flex-col items-center px-2">
            <div>
              <form onSubmit={submitHandler}>
                <div className="flex items-center justify-center lg:justify-start">
                  <input
                    type="text"
                    placeholder="Enter a city"
                    onChange={(e) => setCity(e.target.value)}
                    className="py-2 px-4 outline-none rounded-lg shadow"
                  />
                  <button className="-ml-10">
                    <AiOutlineSearch size={30} />
                  </button>
                </div>
              </form>

              {submit ? (
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
                    {/* current weather */}
                    <div className="w-72 flex flex-col px-4">
                      <img
                        src={currentWeather.condition.icon}
                        alt=""
                        className=" flex justify-center items-center h-full w-full"
                      />
                      <span className="text-3xl text-center mb-6">
                        {Math.round(currentWeather.temp_c)}°C
                      </span>
                      <h1 className="text-xl font-semibold mb-5 text-center lg:text-left">
                        {currentCity.name}, {currentCity.country}
                      </h1>
                      <hr />
                      <div className="flex justify-between items-center lg:block mb-10">
                        <div className="flex items-center mt-5">
                          <img
                            src={currentWeather.condition.icon}
                            alt=""
                            className="w-10 h-10"
                          />
                          <span className="text-sm text-gray-600">
                            {currentWeather.condition.text}
                          </span>
                        </div>
                        <div className="flex items-center mt-5 ml-3 gap-x-2">
                          <GiHeavyRain size={20} />
                          <span className="text-sm text-gray-600 text-bold">
                            {Math.round(forecast[0].day.daily_chance_of_rain)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* forecast */}
                    <div className="grid grid-cols-3 lg:flex lg:flex-row lg:justify-between gap-7">
                      {forecast.map((day, index) => (
                        <div
                          key={index}
                          className="border-2 rounded-lg w-24 h-32 flex flex-col items-center justify-center">
                          <h2 className="text-xs">{day.date}</h2>
                          <img
                            src={day.day.condition.icon}
                            alt=""
                          />
                          <div className="text-xs flex justify-between items-center gap-4">
                            <span>H: {Math.round(day.day.maxtemp_c)}°</span>
                            <span className="text-gray-400">
                              L: {Math.round(day.day.mintemp_c)}°
                            </span>
                          </div>
                          <button
                            onClick={() => handleShowMore(index)}
                            className="text-xs pt-2 text-gray-500 hover:text-gray-800 transition-colors duration-150">
                            Show more
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* weather info */}
                    <div>
                      {forecast.map((info, index) =>
                        expandedItems[index] ? (
                          <div
                            key={index}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center lg:items-start mt-10 mb-10 ">
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <WiHumidity size={20} /> <span>Humidity</span>
                              </h2>
                              <span className="text-2xl flex justify-center items-center pt-4">
                                {Math.round(info.day.avghumidity)}%
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <PiWind size={20} /> <span>Wind Speed</span>
                              </h2>
                              <span className="text-2xl flex justify-center items-center pt-4">
                                {Math.round(info.day.maxwind_kph)}
                                km/h
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600">Sunrise & Sunset</h2>
                              <div className="flex flex-col justify-center items-center">
                                <div className="text-md flex justify-center items-center gap-x-4">
                                  <WiSunrise size={20} />
                                  <span>{info.astro.sunrise}</span>
                                </div>
                                <div className="text-md flex justify-center items-center gap-x-4 ">
                                  <WiSunset size={20} />
                                  <span> {info.astro.sunset}</span>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <BsMoon />
                                <span>Moon phase</span>
                              </h2>
                              <span className="text-md flex justify-center items-center pt-4">
                                {info.astro.moon_phase}
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <GiHeavyRain />
                                <span>Chances of rain</span>
                              </h2>
                              <span className="text-2xl flex justify-center items-center pt-4">
                                {info.day.daily_chance_of_rain}%
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <AiOutlineInfo />
                                <span>Condition</span>
                              </h2>
                              <span className="text-md flex justify-center items-center pt-4">
                                {info.day.condition.text}
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <FaTemperatureHigh />
                                <span>Highest</span>
                              </h2>
                              <span className="text-2xl flex justify-center items-center pt-4">
                                {Math.round(info.day.maxtemp_c)}°
                              </span>
                            </div>
                            <div className="rounded-lg w-42 h-32 bg-white shadow">
                              <h2 className="px-4 py-2 text-sm text-gray-600 flex items-center gap-x-2">
                                <FaTemperatureLow />
                                <span>Lowest</span>
                              </h2>
                              <span className="text-2xl flex justify-center items-center pt-4">
                                {Math.round(info.day.mintemp_c)}°
                              </span>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-lg tracking-wide pt-10">Please search for a city</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
