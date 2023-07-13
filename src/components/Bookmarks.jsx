import React from "react";

export default function Bookmarks({ bookmarkedCities, removeBookmark }) {
  return (
    <div className="lg:h-[500px] lg:w-[1150px] pt-10 min-h-screen w-[400px] ">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold">Your bookmarks</h2>
      </div>
      {/* container */}
      <div className="pt-8 lg:px-10 grid grid-cols-2 lg:grid-cols-5 gap-5">
        {bookmarkedCities.map((city, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg w-48 h-42 flex justify-between">
            <div className="flex flex-col p-2">
              <h2>{city.name} </h2>
              <p className="text-xs text-gray-500"> {city.date}</p>
              <p className="text-sm mt-2 ">{city.currentWeather.condition.text}</p>
              <div className="text-xs flex gap-x-4 items-center mb-2">
                <span>H: {Math.round(city.forecast.day.maxtemp_c)}°</span>
                <span className="text-gray-400">L: {Math.round(city.forecast.day.mintemp_c)}°</span>
              </div>
              <p className="text-xs text-gray-500">
                Chances of rain: <span className="text-gray-800">{city.rain}%</span>
              </p>
              <button
                className="text-left text-xs pt-2 text-red-500 hover:text-red-800 transition-colors duration-150"
                onClick={() => removeBookmark(city.id)}>
                Remove
              </button>
            </div>
            <img
              src={city.icon}
              alt=""
              className="w-12 h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
