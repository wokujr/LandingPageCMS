import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReactPlayer from 'react-player';
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = 'http://localhost:3000/api/v1'

export default function EditProfile(){

    const[edit, setEdit] = useState(null);
    const {id} = useParams();
    const [, setLoading] = useState(true);

    const [newImage, setNewImage] = useState(null);
    const [newVideo, setNewVideo] = useState(null);
    const navigate =useNavigate();


    useEffect( ()=> {
        //need to fetch the ID ><
        const fetchCurrentProfile = async ()=>{
            try {
                const response = await fetch(`${API_URL}/companies/${id}`);
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

    // handle video player
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

    // Update Video And image
    const updateImage = async () => {
        if (!newImage) return;

        const formData = new FormData();
        formData.append('company[image]', newImage);
        try{
            const response = await axios.put(`${API_URL}/companies/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if (response.status === 200){
                console.log("Image updated")
            }
            else {
                console.log("Image upload Error occured")
            }
        }catch (error){
            console.log('An Error Occurred', error)
        }
    };

    const updateVideo = async (e) => {
        e.preventDefault();
        if (!newImage) return;
        const formData = new FormData();
        formData.append('company[video]', newVideo);
        try{
            const response = await axios.put(`${API_URL}/companies/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if (response.status === 200){
                console.log("Video Updated")
            }
            else {
                console.log("Video upload Error occurred")
            }
        }catch (error){
            console.log('An Error Occurred', error)
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company[title]', edit.title);
        formData.append('company[body]', edit.body);

        //if image
        if (newImage) {
            formData.append('company[image]', newImage);
        }
        // if video
        if (newVideo){
            formData.append('company[video]', newVideo);
        }

        try {
            const response = await axios.put(`${API_URL}/companies/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                console.log("Data Updated");
            } else {
                console.log("Data Update Error occurred");
            }
        } catch (error) {
            console.log("An error occurred", error);
        }
        navigate("/company/list")
    };

    if (!edit) return <h2>Loading...</h2>

    return(

        <div>
            <h1> Edit Post Here </h1>
            <form onSubmit={handleEditSubmit}>
                <input
                    className="form-control mt-4 mb-2"
                    type="text"
                    id="company-heading"
                    value={edit?.title}
                    onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                />
                <textarea
                    className="form-control mt-2 mb-4"
                    id="company-heading"
                    value={edit?.body}
                    onChange={(e) => setEdit({ ...edit, body: e.target.value })}
                />
                <div className="row">
                    <div className="col">
                        <div className="mb-5">
                            <img
                                src={edit.image_url}
                                alt="latest post"
                                className="latest-image w-50"
                            />
                            <br/>
                            <input className="mb-5" type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])}/>
                            <button onClick={updateImage}>Update Image</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-5">
                            <VideoPlayer width="320" height="240" videoUrl={edit.video_url}/>
                            <br/>
                            <input type="file" accept="video/*" onChange={(e) => setNewVideo(e.target.files[0])}/>
                            <button onClick={updateVideo}>Update Video</button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}