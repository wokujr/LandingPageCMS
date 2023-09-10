import React, { useState, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

export default function PublicOnlyRoute({ children }) {
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(false);
    const location = useLocation();
    const fromLocation = (location.state)?.from;
    const previousLocation = fromLocation ? fromLocation : { pathname: '/login' };


    if (!accessToken && !loading) {
        return children;
    } else if (loading) {
        return <h3>Loading...</h3>;
    }else if (!loading && accessToken){
        return <Navigate to={previousLocation} state={{from: location}} replace/>

    }
    else {
        return <h3> Something went wrong</h3>;
    }

}