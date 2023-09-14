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
        <div id="carouselMultiItemExample" className="carousel slide carousel-dark text-center" data-mdb-ride="carousel">
            {/* Controls */}
            <div className="d-flex justify-content-center mb-4">
                <button className="carousel-control-prev position-relative" type="button" data-mdb-target="#carouselMultiItemExample" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next position-relative" type="button" data-mdb-target="#carouselMultiItemExample" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* Inner */}
            <div className="carousel-inner py-4">
                {/* Single item */}
                <div className="carousel-item active">
                    <div className="container">
                        <div className="row">
                            {gallery.image_data.map((imageData, index) => (
                                <div key={index} className="col-lg-4">
                                    <div className="card">
                                        <img src={imageData.image_urls} className="card-img-top" alt={`Image ${index}`} />
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p>Image ID: {imageData.image_blob}</p> {/* Display the Image ID */}
                                            <p>Attachment ID: {imageData.image_attach_id}</p> {/* Display the Attachment ID */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowGallery;
