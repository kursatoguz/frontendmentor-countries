import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  () => {
    return axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => res.data);
  }
);
export const fetchSingleCountry = createAsyncThunk(
  "countries/fetchSingleCountry",
  (ccn3) => {
    return axios
      .get(`https://restcountries.com/v3.1/alpha/${ccn3}`)
      .then((res) => res.data);
  }
);

const initialState = {
  countries: [],
  filteredCountriesByRegion: [],
  country: {},
  loading: false,
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    filterByRegion: (state, action) => {
      state.filteredCountriesByRegion = state.countries.filter(
        (country) => country.region === action.payload
      );
    },
    searchCountry: (state, action) => {
      state.filteredCountriesByRegion = state.countries.filter((country) =>
        country.name.common.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = "true";
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.loading = "false";
      state.error = null;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = "false";
      state.error = action.error.message;
    });
    builder.addCase(fetchSingleCountry.pending, (state) => {
      state.loading = "true";
    });
    builder.addCase(fetchSingleCountry.fulfilled, (state, action) => {
      state.country = action.payload;
      state.loading = "false";
      state.error = null;
    });
    builder.addCase(fetchSingleCountry.rejected, (state, action) => {
      state.loading = "false";
      state.error = action.error.message;
    });
  },
});

export default countriesSlice.reducer;
export const { filterByRegion, searchCountry } = countriesSlice.actions;
