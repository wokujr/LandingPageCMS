import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReactPlayer from 'react-player';

export default function EditProfile(){

    const[edit, setEdit] = useState(null);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const navigate = useNavigate();

    useEffect( ()=> {
        //need to fetch the ID ><
        const fetchCurrentProfile = async ()=>{
            try {
                const response = await fetch(`http://localhost:3000/api/v1/teams/${id}`);
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
        await fetch(`http://localhost:3000/api/v1/teams/${id}`,{
            method:"PUT",
            body: formData
        })
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
            const response = await fetch(`http://localhost:3000/api/v1/teams/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                // Handle success, e.g., redirect to the team's profile page
                navigate(`/team/${id}`);
            } else {
                throw response;
            }
        } catch (error) {
            console.error("Error updating team:", error);
        }
    };

    if (!edit) return <h2>Loading...</h2>

    return(
        <div>
            <h1> Edit Team </h1>
            <form >
                <input
                    className="form-control mt-4 mb-2"
                    type="text"
                    id="company-heading"
                    value={edit?.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                />
                <textarea
                    className="form-control mt-2 mb-4"
                    id="company-heading"
                    value={edit?.title}
                    onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                />
                <div className="row">
                    <div className="col">
                        <div className="mb-5">
                            <img
                                src={`http://localhost:3000${edit.image.url}`}
                                alt={edit.name}
                                className="latest-image w-50"
                            />
                            <br/>
                            <input className="mb-5" type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <button className="btn btn-success mx-2" onClick={updateImage}>Update Image</button>
                    <button className="btn btn-primary mx-2" onClick={handleFormSubmit}>Save</button>
                </div>
            </form>
        </div>
    )
}