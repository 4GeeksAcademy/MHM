import axios from "axios";
import React, { useState } from "react";

export const Meditation = () => {
    const [condition, setCondition] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const getVideo = () => {
        axios
            .get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    q: search,
                    key: 'AIzaSyC2PlQqnTpfW5zcRsMGVabvkg31tZQesao'
                }
            })
            .then(response => {
                const videoId = response.data.items[0].id.videoId;
                console.log({ videoId });
            })
            .catch(error => {
                console.error(error);
                console.log({ error: 'Internal server error' });
            });
    };



    return (
        <><h1>Welcome to the meditation page</h1>
            <h2>you can watch videos for relaxation by looking up videos through YouTube!</h2></>

    );
};