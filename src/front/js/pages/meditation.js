import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import "../../styles/meditation.css";

export const Meditation = () => {
    const [condition, setCondition] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const apiYoutube = "YOUTUBE_API_KEY";

    const getVideo = () => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&q=${condition}`)
            .then(response => {
                setResult(response.data);
                setError("");
            })
            .catch(error => {
                console.error(error);
                setResult(null);
                setError("An error occurred. Please try again.");
            });
    };

    return (
        <div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="centered-container">
                <h1>Welcome to the meditation page!</h1>
                <h2>You can watch relaxation videos by searching on YouTube.</h2>
                <div className="input-container">
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        placeholder="Search for a video"
                    />
                    <button onClick={() => getVideo()}>Click to search</button>
                </div>

                <div className="video-container">
                    <div className="video-wrapper">
                        <iframe
                            className="video-iframe"
                            allowFullScreen
                            src={`https://www.youtube.com/embed/zuEW_5eL90s`}
                        />
                    </div>
                </div>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};
