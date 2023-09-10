import React, { useState, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const location = useLocation();
  const fromLocation = (location.state)?.from;
  const previousLocation = fromLocation ? fromLocation : { pathname: '/login' };

  // const navigate = useNavigate()

  // useEffect(() => {
  //   // Simulate fetching access token (replace this with your actual authentication logic)
  //   setTimeout(() => {
  //     const fakeAccessToken = 'your_access_token_here'; // Replace with your real access token logic
  //     setAccessToken(fakeAccessToken);
  //     setLoading(false);
  //   }, 2000); // Simulating a delay, you can remove this in your actual code
  // }, []);


  // if (accessToken) {
  //   return children;
  // } else if (accessToken) {
  //   return <h1> You are Not Logged in</h1>;
  // } else {
  //   return <Navigate to={previousLocation} state={{ from: location }} replace />;
  // }

  if (accessToken) {
    return children;
  } else if (loading) {
    return <h3>Loading...</h3>;
  }else if (!loading && !accessToken){
    // navigate('/login');
    return <Navigate to={previousLocation} state={{from: location}} replace/>

  }
  else {
    return <h3> Something went wrong</h3>;
  }

}

export default PrivateRoute;