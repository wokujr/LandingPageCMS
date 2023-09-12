import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";

export default function CompanyAbout (  ) {
    const [about, setAbout] = useState({});
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    useEffect(() => {
        async function loadAbout() {
            try {
                const response = await fetch('http://localhost:3000/api/v1/latest');
                if (response.ok) {
                    const json = await response.json();
                    setAbout(json);
                    setLoading(false);
                    console.log(json)
                } else {
                    throw response;
                }
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.log("an error", e);
            }
        }
        loadAbout();
    }, []);
    // const renderHTML = (html) => {
    //     const sanitizedHTML = DOMPurify.sanitize(html);
    //     return { __html: sanitizedHTML };
    // };

    function VideoPlayer({ videoUrl }) {
        return (
            <div>
                <ReactPlayer url={videoUrl} controls={true} />
            </div>
        );
    }

    VideoPlayer.propTypes = {
      videoUrl: PropTypes.string.isRequired //can adjust the PropTypes based on the actual type of videoUrl you expect.
    };

    return (
        <>
            <div className="container">
                <div className="card mt-4">
                    <h1>ABOUT HERE </h1>
                    <h2>{about.title}</h2>
                    <p>{about.body}</p>
                    <img
                        src={about.image_url}
                        alt="latest post"
                        className="latest-image mb-4 w-50"
                    />

                    <div>
                        <h1>Video Player</h1>
                        <VideoPlayer width="320" height="240" videoUrl={about.video_url} />
                    </div>

                </div>
            </div>
        </>
    )
}

