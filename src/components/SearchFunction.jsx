import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Bookmarks from "./Bookmarks";
import SearchForm from "./SearchForm";
import { toast } from "react-hot-toast";

const API_KEY = "9d3d3af16d1544d1acf82850230807";

export default function SearchFunction() {
  const [city, setCity] = useState("");
  const [currentCity, setCurrentCity] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecast, setForecast] = useState({});
  const [expandedItems, setExpandedItems] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [showDashboard, setShowDashboard] = useState(true);
  const [showBookmarks, setShowbookmarks] = useState(false);
  const [bookmarkedCities, setBookmarkedCities] = useState(() => {
    const storedBookmarkedCities = localStorage.getItem("bookmarkedCities");
    return storedBookmarkedCities ? JSON.parse(storedBookmarkedCities) : [];
  });

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
        setSubmit(true);
        setShowDashboard(true);
        setShowbookmarks(false);
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

  const handleDashboard = () => {
    setShowDashboard(true);
    setShowbookmarks(false);
  };

  const handleBookmarks = () => {
    setShowDashboard(false);
    setShowbookmarks(true);
  };

  const toggleBookmark = (index) => {
    const bookmarkedCity = {
      name: currentCity.name,
      date: forecast[index].date,
      currentCity: currentCity,
      currentWeather: currentWeather,
      forecast: forecast[index],
      rain: forecast[index].day.daily_chance_of_rain,
      icon: forecast[index].day.condition.icon,
    };

    const isBookmarked = bookmarkedCities.some(
      (city) => city.name === currentCity.name && city.date === forecast[index].date
    );

    if (isBookmarked) {
      setBookmarkedCities((prevBookmarkedCities) =>
        prevBookmarkedCities.filter(
          (city) => !(city.name === currentCity.name && city.date === forecast[index].date)
        )
      );
    } else {
      setBookmarkedCities((prevBookmarkedCities) => [...prevBookmarkedCities, bookmarkedCity]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarkedCities((prevBookmarkedCities) => {
      const updatedBookmarkedCities = [...prevBookmarkedCities];
      const index = updatedBookmarkedCities.findIndex((city) => city.id === id);
      if (index !== -1) {
        updatedBookmarkedCities.splice(index, 1);
      }
      return updatedBookmarkedCities;
    });
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedCities", JSON.stringify(bookmarkedCities));
  }, [bookmarkedCities]);

  return (
    <section className="lg:h-[700px] lg:w-[1400px] py-10">
      <div className="container mx-auto h-full border-2 rounded-2xl bg-[#f1f1f1] shadow">
        {/* Dashboard */}
        <div className="flex justify-center items-center gap-x-5 pt-10 mb-4 lg:mb-0">
          <button
            onClick={handleDashboard}
            className="hover:underline transition-all duration-150">
            Dashboard
          </button>
          <button
            onClick={handleBookmarks}
            className="hover:underline transition-all duration-150">
            Bookmarks ({bookmarkedCities.length})
          </button>
        </div>
        <div className="h-full w-full flex ">
          {/* Search */}
          <div className="gap-x-4 flex flex-col items-center px-2">
            <div>
              <SearchForm
                city={city}
                setCity={setCity}
                submitHandler={submitHandler}
                showDashboard={showDashboard}
              />
              {showDashboard ? (
                <Dashboard
                  submit={submit}
                  currentCity={currentCity}
                  currentWeather={currentWeather}
                  forecast={forecast}
                  expandedItems={expandedItems}
                  handleShowMore={handleShowMore}
                  toggleBookmark={toggleBookmark}
                />
              ) : (
                <Bookmarks
                  bookmarkedCities={bookmarkedCities}
                  removeBookmark={removeBookmark}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
