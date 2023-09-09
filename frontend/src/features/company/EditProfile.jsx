import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReactPlayer from 'react-player';

export default function EditProfile(){

    const[edit, setEdit] = useState(null);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null);

    const [newImage, setNewImage] = useState(null);
    const [newVideo, setNewVideo] = useState(null);

    const navigate = useNavigate();

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

    // handle video player
    function VideoPlayer({ videoUrl }) {
        return (
            <div>
                <ReactPlayer url={videoUrl} controls={true} />
            </div>
        );
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/v1/companies/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(edit),
                });
            if (response.ok){
                const json = await response.json()
                console.log("uuh JSON?", json);
                navigate(`/company/${id}`)
            }else{
                throw response;
            }
        }catch (e) {
            console.log("An error occurred Awkward", e);
        }
    };

    // Update Video And image
    const updateImage = async () => {
        if (!newImage) return;

        const formData = new FormData();
        formData.append('image', newImage);

        try {
            const response = await fetch(`/api/v1/companies/${id}/upload_image`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // ImageForTeam updated successfully, you can update the state or display a success message
                console.log('ImageForTeam updated successfully');
            } else {
                // Handle error here
                console.error('ImageForTeam update failed');
            }
        } catch (error) {
            console.error('An error occurred while updating the image:', error);
        }
    };

    const updateVideo = async () => {
        if (!newVideo) return;

        const formData = new FormData();
        formData.append('video', newVideo);

        try {
            const response = await fetch(`/api/v1/companies/${id}/upload_video`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Video updated successfully, you can update the state or display a success message
                console.log('Video updated successfully');
            } else {
                // Handle error here
                console.error('Video update failed');
            }
        } catch (error) {
            console.error('An error occurred while updating the video:', error);
        }
    };
    // End of upload new video and image

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
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-5">
                            <VideoPlayer width="320" height="240" videoUrl={edit.video_url}/>
                            <br/>
                            <input type="file" accept="video/*" onChange={(e) => setNewVideo(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={updateImage}>Update Image</button>
                    <button onClick={updateVideo}>Update Video</button>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </div>

    )

}