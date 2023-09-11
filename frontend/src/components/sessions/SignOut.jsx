// app/javascript/components/Signout.js

import React from 'react';

const Signout = () => {
    const handleSignOut = async () => {
        try {
            // Send a DELETE request to your Rails API to sign the user out
            const response = await fetch('http://localhost:3000/users/sign_out', {
                method: 'DELETE',
            });

            if (response.ok) {
                // Handle successful sign-out, e.g., redirect the user
                console.log('Sign-out successful');
            } else {
                // Handle sign-out error, e.g., display an error message
                console.error('Sign-out failed');
            }
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Signout;
