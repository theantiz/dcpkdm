import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import DcpKdmLanding from "./pages/landingPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DcpKdmLanding />} />
      </Routes>

    </Router>
  );
}

export default App;
