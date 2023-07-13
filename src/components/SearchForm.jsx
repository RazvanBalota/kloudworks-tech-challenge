import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchForm({ city, setCity, submitHandler, showDashboard }) {
  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center justify-center lg:justify-start px-8">
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
  );
}
