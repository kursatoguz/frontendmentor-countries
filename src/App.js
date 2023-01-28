import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/country/:ccn3" element={<DetailPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
