import React,{useContext} from "react";
import { BrowserRouter, Route, Routes , Navigate } from "react-router-dom";
import LandingPage from "./views/landingPage";
import TrackingInfoPage from "./views/trackingInfoPage";
import Header from './components/header'
import { Context } from "./components/wrapper";

import "antd/dist/antd.css";
import './App.css';


function App() {

  const context = useContext(Context)

      return (
      <div className="fontTest" dir={context.direction}>
        <BrowserRouter>
              <Header/>
              <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/info" element={<TrackingInfoPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
              </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
