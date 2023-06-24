import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { JournalApp } from "./component/journalapp.jsx";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { MainPage } from "./pages/mainPage";

import { Meditation } from "./pages/meditation";

import { ResourcePage } from "./pages/resource.jsx"

import injectContext from "./store/appContext";


import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<MainPage />} path="/mainpage" />
                        <Route element={<JournalApp />} path="/journal" />

                        <Route element={<Meditation />} path="/meditation"/>

                        <Route element={<ResourcePage />} path="/resource" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
