import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player';
import PropTypes from "prop-types";

export default function CompanyDetail(){

    const[edit, setEdit] = useState(null);
    const {id} = useParams();
    const [, setLoading] = useState(true);

    useEffect( ()=> {
        //need to fetch the ID ><
        const fetchCurrentProfile = async ()=>{
            try {
                const response = await fetch(`http://localhost:3000/api/v1/companies/${id}`);
                if (response.ok){
                    const json = await response.json();
                    setEdit(json);
                }else{
                    throw response
                }
            }catch (e){
                console.log("An error occurred Awkward...");
            }finally {
                setLoading(false);
            }
        }
        fetchCurrentProfile();
    }, [id])

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


    if (!edit) return <h2>Loading...</h2>

    return(
        <div>
            <h1>DETAILS HERE</h1>
            <div className="container">
                <div className="card">
                    <div><h2>{edit.title}</h2></div>
                    <p>{edit.body}</p>
                    <div>
                        <img
                            src={edit.image_url}
                            alt="latest post"
                            className="latest-image w-50"
                        />
                        <br/>
                    </div>

                    <div className="mb-5">
                        <VideoPlayer width="320" height="240" videoUrl={edit.video_url} />
                    </div>

                </div>
            </div>
        </div>
    )

}