import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function PersistLogin() {
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(false);
    const [refreshToken, setRefreshToken] = useState(false);

    useEffect(() => {
        // Simulate fetching access and refresh tokens from somewhere
        const fetchTokens = async () => {
            try {
                // Replace with your logic to get tokens
                // const response = await fetch('/api/getTokens');
                // const data = await response.json();
                console.log("Refreshing access token")

                // if (data.accessToken) {
                //     setAccessToken(data.accessToken);
                //     setLoading(false);
                // } else {
                //     setLoading(false);
                // }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (!accessToken){
            fetchTokens();
        }
    }, [accessToken, refreshToken]);



    return (
        <div className="container">
            {loading ? <p>Loading...</p> : <Outlet />}
        </div>
    );
}

export default PersistLogin;