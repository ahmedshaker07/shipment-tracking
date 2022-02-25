import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import TrackingInfoPage from "./views/TrackingInfoPage";
import Header from "./components/Header";
import { Context } from "./components/Wrapper";

function App() {
  const context = useContext(Context);

  return (
    <div dir={context.direction}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/track" element={<LandingPage />} />
          <Route path="/track/:id" element={<TrackingInfoPage />} />
          <Route path="*" element={<Navigate to="/track" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
