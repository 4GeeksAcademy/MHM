import React, { useContext } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import "../../styles/mainPage.css";

export const MainPage = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="Navbar">
      <Navbar />
      <div>
        <h1>Welcome to the Main Page!</h1>
        <h2>Use this page to navigate to your desired function!</h2>
        
        <div className="main-feature">
          <img
            src="https://www.aucegypt.edu/sites/default/files/styles/large_widget/public/2022-10/966280794-website_widgets_mental_health_campaign_04-10.jpg?itok=aP1SXBaj"
            alt="Main Feature"
            className="main-feature-image"
          />
        </div>

        <button
          onClick={actions.logout}
          className="btn btn-warning"
          style={{ margin: '3rem' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
