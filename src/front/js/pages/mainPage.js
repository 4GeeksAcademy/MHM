import React, { useContext } from "react";
import { Navbar } from "../component/navbar";

import { ReactDOM } from "react-dom";
import { Context } from "../store/appContext";

export const MainPage = () => {
    const { store, actions } = useContext(Context)
    return (
        <div className="Navbar">
            <Navbar />
            <div>

                <p>MainPage</p>
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
