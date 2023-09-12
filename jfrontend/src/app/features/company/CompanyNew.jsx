import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

// import DOMPurify from 'dompurify';

export default function CompanyNew() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

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

        await fetch('http://localhost:3000/api/v1/companies', {
            method: 'POST',
            body: form,
        });
        // Redirect or perform other actions as needed
        navigate('/')

    };
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleVideoChange = (event) => {
        const selectedVideo = event.target.files[0];
        setVideo(selectedVideo);
    };

    // Render HTML safetly? idk
    // const renderHTML = (html) => {
    //     const sanitizedHTML = DOMPurify.sanitize(html);
    //     return { __html: sanitizedHTML };
    // };

    return(
        <div className="container mt-5 ">
            <form onSubmit={handleSubmit}>
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

                <div>
                    <label htmlFor="titleInput">Image:</label>
                    <input
                        className="mb-2"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/jpeg/ image/jpg image/png" // Add this to restrict to image files
                        onChange={handleImageChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="titleInput">Video:</label>
                    <input
                        className="mb-2"
                        type="file"
                        name="video"
                        id="video"
                        accept="video/*" // Add this to restrict to image files
                        onChange={handleVideoChange}
                    />
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
    // const navigate = useNavigate();
    //
    // const [editor, setEditor] = useState(null);
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');
    // const [image, setImage] = useState(null);
    // const [video, setVideo] = useState(null);
    //
    //
    // useEffect(() => {
    //     if (editorRef.current) {
    //         const editor = new EditorJS({
    //             holder: editorRef.current,
    //             tools: {
    //                 header: {
    //                     class: Header,
    //                 },
    //                 list: {
    //                     class: List,
    //                 },
    //                 paragraph: {
    //                     class: Paragraph,
    //                     config: {
    //                         inlineToolbar: true,
    //                     },
    //                 },
    //                 code: CodeTool,
    //             },
    //         });
    //     }
    // }, []);
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const form = new FormData();
    //     form.append('company[title]', title);
    //     form.append('company[body]', body);
    //
    //     if (image) {
    //         form.append('company[image]', image);
    //     }
    //     if (video) {
    //         form.append('company[video]', video);
    //     }
    //
    //     await fetch('http://localhost:3000/api/v1/companies', {
    //         method: 'POST',
    //         body: form,
    //     });
    //     // Redirect or perform other actions as needed
    //     navigate('/company')
    //
    // };
    // const handleImageChange = (event) => {
    //     const selectedImage = event.target.files[0];
    //     setImage(selectedImage);
    // };
    //
    // return (
    //     <div className="container mt-5 ">
    //         <form onSubmit={handleSubmit}>
    //             <div className="mt-4">
    //                 <label htmlFor="titleInput">Title:</label>
    //                 <input
    //                     className="form-control mb-4 text-center"
    //                     style={{ width: '40rem' }}
    //                     id="titleInput"
    //                     type="text"
    //                     value={title}
    //                     onChange={(e) => setTitle(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             {/*<input*/}
    //             {/*    className="mb-2"*/}
    //             {/*    type="file"*/}
    //             {/*    name="image"*/}
    //             {/*    id="image"*/}
    //             {/*    accept="image/*" // Add this to restrict to image files*/}
    //             {/*    onChange={handleImageChange}*/}
    //             {/*/>*/}
    //             <br />
    //
    //
    //             <div>
    //                 <button className="btn btn-primary mt-3" type="submit">
    //                     Create Post
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // );
}
