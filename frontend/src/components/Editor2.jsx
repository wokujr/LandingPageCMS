import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const Editor2 = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            className="mb-4"
            style={{ width: '40rem', height: '20rem' }}
            modules={{ toolbar: true }} // Enable the toolbar
            formats={['bold', 'italic', 'underline', 'list', 'link']} // Optional: Define allowed formats
        />
    );
};

export default Editor2;