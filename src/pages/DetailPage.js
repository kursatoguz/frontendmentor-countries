import { formatNumber } from "../utils/formatNumber";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleCountry } from "../features/countriesSlice";
import { BsArrowLeft } from "react-icons/bs";
import uuid from "react-uuid";
const DetailPage = () => {
  const { ccn3 } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries.country);
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    if (country[0]) {
      setLanguages(Object.values(country[0]?.languages));
      setCurrencies(
        Object.values(country[0]?.currencies).map((currency) => currency.name)
      );
    }
  }, [country]);
  useEffect(() => {
    dispatch(fetchSingleCountry(ccn3));
  }, [ccn3]);

  if (!country[0]) return <h1>Loading...</h1>;
  return (
    <div className="detail-page-container">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="back-btn-container">
          <BsArrowLeft className="back-icon icon" />
          <button className="back-btn">back</button>
        </div>
      </Link>
      <div className="detail-content">
        <div className="flag">
          <img src={country[0].flags.png} alt={country[0].name.common} />
        </div>
        <div className="detail-infos-container">
          <h1>{country[0].name.common}</h1>
          <div className="detail-infos">
            <div className="detail-infos-left">
              <p>
                <span className="info">Native Name: </span>
                {Object.values(country[0].name.nativeName)[0].common}
              </p>
              <p>
                <span className="info">Population: </span>
                {formatNumber(country[0].population)}
              </p>
              <p>
                <span className="info">Region: </span>
                {country[0].region}
              </p>
              <p>
                <span className="info">Sub Region: </span>
                {country[0].subregion}
              </p>
              <p>
                <span className="info">Capital: </span>
                {country[0].capital}
              </p>
            </div>
            <div className="detail-infos-right">
              <p>
                <span className="info">Top Level Domain: </span>
                {country[0].tld[0]}
              </p>
              <p>
                <span className="info">Currencies: </span>
                {country[0].currencies ? currencies?.join(", ") : "N/A"}
              </p>
              <p>
                <span className="info">Languages: </span>
                {country[0].languages ? languages?.join(", ") : "N/A"}
              </p>
            </div>
          </div>
          {country[0].borders?.length > 0 && (
            <div className="border-countries">
              <h4>Border Countries:</h4>
              <div className="border-countries-list">
                {country[0].borders.map((border) => (
                  <Link to={`/country/${border}`} key={uuid()}>
                    <button key={uuid()} className="border-btn">
                      {border}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
