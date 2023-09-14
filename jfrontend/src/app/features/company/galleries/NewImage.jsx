import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/v1';

function NewImage() {
    const [gallery, setGallery] = useState(null); // Updated state name to 'gallery'
    const [, setLoading] = useState(true);
    const { id } = useParams();

    // Function to handle selecting a new image
    function handleImageChange(e) {
        const selectedImage = e.target.files[0];
        uploadNewImage(selectedImage);
    }

    // Function to upload a new image
    async function uploadNewImage(newImage) {
        if (!newImage) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('new_image', newImage); // Use 'new_image' as the field name

        try {
            const response = await fetch(`${API_URL}/galleries/${id}/upload_new_image}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedGallery = await response.json();
                setGallery(updatedGallery); // Update the gallery with the new image
                console.log('Image Uploaded');
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error while uploading image:', error);
        }
    }

    // Function to delete a single image
    async function deleteImage(imageId) {
        try {
            const response = await fetch(`${API_URL}/galleries/${imageId}/remove_image/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedGallery = await response.json();
                setGallery(updatedGallery); // Update the gallery after deleting the image
                console.log('Image Deleted');
            } else {
                console.error('Failed to delete image.');
            }
        } catch (error) {
            console.error('Error while deleting image:', error);
        }
    }

    useEffect(() => {
        async function fetchGallery() {
            try {
                const response = await fetch(`${API_URL}/galleries/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setGallery(json);
                    console.log(json);
                }
            } catch (error) {
                console.log('Error when fetching...', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, [id]);

    if (!gallery) return <h2>Loading...</h2>;


    return (
        <div>
            {/* File input for selecting a new image */}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {/* Display existing images and delete buttons */}
            <div className="row">
                {gallery.image_data.map( (image, index) => (
                    <div className="col-lg-4 col-md-12 mb-4 mg-lg-0" key={index}>
                        <img
                            src={image.image_urls}
                            className="w-100 shadow-1-strong rounded mb-4"
                            alt={`${gallery.image_name}_${index}`}
                        />
                        <button onClick={() => deleteImage(image.image_attach_id)}>Delete Image</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewImage;
