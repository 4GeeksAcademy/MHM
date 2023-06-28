import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../component/navbar";

export const Meditation = () => {
    const [condition, setCondition] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const apiYoutube = "AIzaSyC2PlQqnTpfW5zcRsMGVabvkg31tZQesao"
    const getVideo = () => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&q=${condition}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, locale',
                    'Access-Control-Allow-Methods': 'GET, POST',
                }
            })
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
            <Navbar />
            <h1>Welcome to the meditation page!</h1>
            <h2>You can watch relaxation videos by searching on YouTube.</h2>
            <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="Search for a video"
            />
            <button onClick={() => getVideo()}>Click to search</button>


            <div className="HitchhikerProductProminentVideo-videoWrapper">
                <iframe
                    className="HitchhikerProductProminentVideo-video"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/zuEW_5eL90s`}
                />
            </div>


            {error && <p>{error}</p>}
        </div>
    );
};