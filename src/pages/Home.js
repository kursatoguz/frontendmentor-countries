import React from "react";
import { useEffect } from "react";
import uuid from "react-uuid";
import {
  fetchCountries,
  filterByRegion,
  searchCountry,
} from "../features/countriesSlice";
import { useSelector, useDispatch } from "react-redux";
import Country from "../components/Country";
const Home = () => {
  const options = [
    "Filter by Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const filteredCountriesByRegion = useSelector(
    (state) => state.countries.filteredCountriesByRegion
  );
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value === "filter by region") {
      return;
    }
    dispatch(filterByRegion(e.target.value));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      return;
    }
    dispatch(searchCountry(e.target.value));
  };
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <div className="home">
      <div className="filter-search">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="filter">
          <select name="filter" id="filter" onChange={(e) => handleChange(e)}>
            {options.map((option) => (
              <option key={uuid()} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="countries">
        {filteredCountriesByRegion.length === 0 &&
          countries.map((country) => <Country key={uuid()} {...country} />)}
        {filteredCountriesByRegion &&
          filteredCountriesByRegion.map((country) => (
            <Country key={uuid()} {...country} />
          ))}
      </div>
    </div>
  );
};

export default Home;
