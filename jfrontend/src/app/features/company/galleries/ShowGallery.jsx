import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/v1';

function ShowGallery() {
    const [gallery, setGallery] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGallery() {
            try {
                const response = await fetch(`${API_URL}/galleries/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setGallery(json);
                }
            } catch (e) {
                console.log("An error occurred Awkward...", e);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>Gallery Detail</h1>
            <h2>{gallery.image_name}</h2>
            <div className="image-container d-flex">
                {gallery.images.map((imageUrl, index) => (
                    <div key={index} className="card mx-2" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <img className="w-100" src={imageUrl} alt={`Image ${index}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowGallery;
