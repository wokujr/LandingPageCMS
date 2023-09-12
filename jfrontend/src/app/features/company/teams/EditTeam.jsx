import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const API_URL= 'http://localhost:3000/api/v1'
export default function EditProfile(){

    const[edit, setEdit] = useState(null);
    const {id} = useParams();
    const [, setLoading] = useState(true);
    const [newImage, setNewImage] = useState(null);
    const navigate = useNavigate();

    useEffect( ()=> {
        //need to fetch the ID ><
        const fetchCurrentProfile = async ()=>{
            try {
                const response = await fetch(`${API_URL}/teams/${id}`);

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

    // Update Video And image
    const updateImage = async () => {
        if (!newImage) return;
        const formData = new FormData();
        formData.append('team[image]', newImage);
        try{
            const response = await axios.put(`${API_URL}/teams/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
        }catch (error){
            console.log('An Error Occurred', error)
        }
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object for the form data
        const formData = new FormData();
        formData.append("team[name]", edit.name);
        formData.append("team[title]", edit.title);

        // If a new image is selected, append it to the FormData
        if (newImage) {
            formData.append("team[image]", newImage);
        }
        try {
            const response = await axios.put(`${API_URL}/teams/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("Error updating team:", error);
        }
        navigate(`/teams`);
    };

    if (!edit) return <h2>Loading...</h2>

    return(
        <div>
            <h1> Edit Team </h1>
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
                            <br />
                            <input className="mb-5" type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
                            <button onClick={updateImage}>Update Image</button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}