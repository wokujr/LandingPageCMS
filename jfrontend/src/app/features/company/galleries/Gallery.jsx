import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = 'http://localhost:3000/api/v1';

function Gallery() {
    const [images, setImages] = useState([]);
    const [, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        async function loadImages() {
            try {
                const response = await fetch(`${API_URL}/galleries`);
                if (response.ok) {
                    const json = await response.json();
                    setImages(json);
                    setLoading(false);
                    console.log(json);
                } else {
                    throw response;
                }
            } catch (err) {
                console.log("Well, that's embarrassing, ", err);
            }
        }

        loadImages();
    }, []);

    async function handleDelete(id) {
        try {
            const response = await fetch(`${API_URL}/galleries/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error Deleting...');
            }
            setImages(images.filter((image) => image.id !== id));
        } catch (error) {
            console.log("Well, that's embarrassing delete", error);
        }
    }

    function handleShowDetail(id) {
        navigate(`/gallery/${id}`)
    }

    function handleAddGallery() {
        navigate('/gallery/new');
    }

    function handleEditImage(id) {
        navigate(`/gallery/${id}/edit`)
    }

    return (
        <div>
            <h1>Galleries</h1>

            {images.length > 0 ? (
                <div className="row">
                    <div className="col-md-12">
                        <div className="mb-3 d-flex flex-wrap">
                            {images.map((image) => (
                                <div key={image.id} className="card mx-2" style={{ width: "18rem" }}>
                                    <img src={image.image_data[0].image_urls} className="card-img-top" alt={image.image_name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{image.image_name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => handleShowDetail(image.id)} className="btn btn-primary mx-1">
                                                Show
                                            </button>
                                            <button onClick={() => handleEditImage(image.id)} className="btn rounded btn-warning mx-1">
                                                Add
                                            </button>
                                            <button onClick={() => handleDelete(image.id)} className="btn btn-outline-danger mx-1">
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No images found.</p>
            )}
        </div>
    );
}

export default Gallery;
