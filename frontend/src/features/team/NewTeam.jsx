import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function NewTeams(){

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the image as multipart/form-data
        const form = new FormData();
        form.append('team[name]', name);
        form.append('team[title]', title);
        if (image){
            form.append('team[image]', image);
        }
        await fetch('http://localhost:3000/api/v1/teams', {
            method: "POST",
            body: form,
        })
        navigate("/teams")
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    }

    return(
        <>
            <h1>Create New Team</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        className="mt-4 mb-4"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        className="mt-4 mb-4"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        className="mt-4 mb-4"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Create Employee</button>
            </form>

        </>

    )
}