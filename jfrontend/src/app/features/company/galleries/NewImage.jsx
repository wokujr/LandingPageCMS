import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1"

function NewImage() {
    const [image_name, setImage_name] = useState('');
    const imagesRef = useRef([]);
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("gallery[image_name]", image_name)

        for (let i = 0; i < imagesRef.current.files.length; i++){
            formData.append("gallery[images][]", imagesRef.current.files[i]);
        }
        await fetch(`${API_URL}/galleries`, {
            method: "POST",
            body:formData,
        })
        navigate("/gallery/new")
    }


  return (
    <div>
        <form className="form-group">
            <input type="file" name="image" multiple ref={imagesRef}/>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpload}
            >
            Submit
            </button>

            <input
                type="text"
                name="image_name"
                placeholder="Image Name"
                value={image_name}
                onChange={(e)=>setImage_name(e.target.value)}
            />

        </form>
    </div>
  );
}

export default NewImage;
