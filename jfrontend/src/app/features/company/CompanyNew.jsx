import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/v1'

export default function CompanyNew() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('company[title]', title);
        form.append('company[body]', body);

        if (image) {
            form.append('company[image]', image);
        }
        if (video) {
            form.append('company[video]', video);
        }

        await fetch(`${API_URL}/companies`, {
            method: 'POST',
            body: form,
        });
        // Redirect or perform other actions as needed
        navigate('/')

    };

    // Image related
    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };
    const handleDeleteImage = () => {
        // Reset the input field value
        setImage(null);
        formRef.current.reset();
    };
    const handleDeleteVideo = () => {
        // Reset the input field value
        setVideo(null);
        formRef.current.reset();
    };

    const handleVideoChange = (event) => {
        setVideo(URL.createObjectURL(event.target.files[0]));
    };


    return(
        <div className="container mt-5 ">
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mt-4">
                    <label htmlFor="titleInput">Title:</label>
                    <input
                        className="form-control mb-4"
                        style={{ width: '40rem' }}
                        id="titleInput"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea
                        className="form-control mb-4"
                        style={{ width: '40rem', height: '20rem'}}
                        id="bodyInput"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>

                <div className="bordered">
                    <label htmlFor="titleInput">Image</label>
                    <input
                        className="mb-2"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/jpeg, image/jpg, image/png" // Add this to restrict to image files
                        onChange={handleImageChange}
                    />
                    {image && (
                        <div>
                            <div>
                                <img className="w-25 h-25" src={image} alt={title}/>
                            </div>
                            <button className="btn btn-danger mt-2" onClick={handleDeleteImage}>
                                Delete Image
                            </button>

                        </div>
                        )}
                </div>
                <div>
                    <label htmlFor="titleInput">Video:</label>
                    <input
                        className="mb-2"
                        type="file"
                        name="video"
                        id="video"
                        accept="video/mp4, video/mkv" // Add this to restrict to image files
                        onChange={handleVideoChange}
                    />
                    {video && (
                        <div>
                            <div>
                                <video width={200} height={200} src={video} />
                            </div>
                            <button className="btn btn-danger" onClick={handleDeleteVideo}> Delete </button>
                        </div>
                    )}

                </div>

                <br />

                <div>
                    <button className="btn btn-primary mt-3" type="submit">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}
