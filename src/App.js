import React,{useContext} from "react";
import { BrowserRouter, Route, Routes , Navigate } from "react-router-dom";
import LandingPage from "./views/landingPage";
import TrackingInfoPage from "./views/trackingInfoPage";
import Header from './components/header'
import { Context } from "./components/wrapper";


function App() {

  const context = useContext(Context)

      return (
        <div dir={context.direction}>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path="/track" element={<LandingPage/>} />
              <Route path="/track/:id" element={<TrackingInfoPage />} />
              <Route
                  path="*"
                  element={<Navigate to="/track" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
  );
}

export default App;
