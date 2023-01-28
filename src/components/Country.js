import { formatNumber } from "../utils/formatNumber";
import React from "react";
import { Link } from "react-router-dom";
const Country = ({ ...country }) => {
  return (
    <Link
      to={`/country/${country.ccn3}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="home-page-coutry">
        <div className="home-page-coutry-flag">
          <img src={country.flags.png} alt={country.name.common} />
        </div>
        <div className="home-page-coutry-infos">
          <h3>{country.name.common}</h3>
          <p>
            <span className="info">Population: </span>
            {formatNumber(country.population)}
          </p>
          <p>
            <span className="info">Region: </span>
            {country.region}
          </p>
          <p>
            <span className="info">Capital: </span>
            {country.capital}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
