import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1"

export default function NewTeams(){

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the image as multipart/form-data
        const form = new FormData();
        form.append('team[name]', name);
        form.append('team[position]', position);
        if (image) {
            form.append('team[image]', image);
        }

        try {
            await axios.post(`${API_URL}/teams`, form);
            navigate("/teams");
        } catch (error) {
            console.error(error);
        }
        navigate("/teams")
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    }

    return(
        <>
            <h1>Create New Team</h1>
            <form onSubmit={handleSubmit} className="container form-group text-lg-start mx-auto">
                <div>
                    <label>Name</label>
                    <input
                        className="form-control w-25"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Position</label>
                    <input
                        className="form-control w-25"
                        type="text"
                        name="title"
                        value={position}
                        onChange={(e) => {setPosition(e.target.value)}}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        className="form-control w-25"
                        type="file"
                        name="image"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleImageChange}
                    />
                </div>
                <button className="btn btn-primary mt-4" type="submit">Create New Team</button>
            </form>

        </>

    )
}