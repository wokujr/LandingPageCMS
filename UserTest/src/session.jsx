import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://localhost:3000/users/tokens";

function User() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [access_token, setAccessToken] = useState(null);
  const [refresh_token, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [resource_owner, setResourceOwner] = useState(null);

  const [userVisible, setUserVisible] = useState(false);

  const nullOrUndefined = (itemToCheck) => {
    return itemToCheck == null || itemToCheck === 'undefined';
  };

  useEffect(() => {
    userSession();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/sign_up`, {
        email,
        password,
      });

      await handleAuthResponse(response);
      userSession();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post(`${API_URL}/sign_in`, {
        email,
        password,
      });

      await handleAuthResponse(response);
      userSession();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAuthResponse = async (response) => {
    const data = response.data;

    localStorage.setItem('resource_owner', JSON.stringify(data.resource_owner));
    localStorage.setItem('refresh_token', data.refresh_token);
    setAccessToken(data.token);
    setRefreshToken(data.refresh_token);
    setResourceOwner(data.resource_owner);
  };

  const refreshToken = async () => {
    const token = localStorage.getItem('refresh_token');
    if (nullOrUndefined(token)) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/refresh`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle the error, such as redirecting to the login page
        } else {
          throw new Error(response.statusText);
        }
      }

      const data = response.data;
      localStorage.setItem('resource_owner', JSON.stringify(data.resource_owner));
      localStorage.setItem('refresh_token', data.refresh_token);
      setAccessToken(data.token);
      setRefreshToken(data.refresh_token);
      setResourceOwner(data.resource_owner);
    } catch (err) {
      console.log('Error refreshing token: ', err);
      resetTokens();
      userSession();
    }
  };

  const userSession = async () => {
    await refreshToken();
    await requestNewAccessToken();

    if (nullOrUndefined(access_token)) {
      setUserVisible(false);
    } else {
      setUserVisible(true);
    }
    getUser();
  };

  const getUser = () => {
    const storedResource = localStorage.getItem('resource_owner');
    if (nullOrUndefined(storedResource)) {
      toggleUserDiv(false);
      return;
    }
    const parsedResource = JSON.parse(storedResource);
    setResourceOwner(parsedResource);
    toggleUserDiv(true);
  };

  const toggleUserDiv = (isVisible) => {
    setUserVisible(isVisible);
  };

  const signOut = async () => {
    console.log('Logging out');
    resetTokens();
    userSession();
  };

  const resetTokens = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('resource_owner');
    setAccessToken(null);
    setRefreshToken(null);
    setResourceOwner(null);
  };

  const requestNewAccessToken = async () => {
    if (nullOrUndefined(refresh_token)) {
      return;
    }
    if (access_token) {
      return;
    }

    try {
      const response = await axios.post(
          `${API_URL}/refresh`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refresh_token}`,
            },
          }
      );

      handleAuthResponse(response);
    } catch (err) {
      console.log('Error refreshing token: ', err);
      resetTokens();
      userSession();
    }
  };

  const userCanAccess = async () => {
    if (nullOrUndefined(access_token)) {
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/v1/companies/restricted', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = response.data;

      console.log('%c' + data.message, 'color: cyan');
      if (data.error) {
        console.log('Error: ', data.error);
        resetTokens();
        userSession();
      }
    } catch (error) {
      console.error('Access error:', error);
    }
  };

  return (
    <div>
      <form id="sign_up_form" onSubmit={handleSignUp} style={{ display: userVisible ? 'none' : 'block' }}>
        <h2>Sign Up</h2>
        <input
            type="text"
            id="signup-email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
        />
        <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
        />
        <input
            type="password"
            id="signup-password-confirm"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
        />
        <button type="submit">Sign Up</button>
      </form>

      <form id="sign_in_form" onSubmit={handleSignIn} style={{ display: userVisible ? 'none' : 'block' }}>
        <h2>Sign In</h2>
        <input
            type="text"
            id="signin-email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
        />
        <input
            type="password"
            id="signin-password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
        />
        <button type="submit">Sign In</button>
      </form>

      <button id="sign_out" onClick={signOut} style={{ display: userVisible ? 'block' : 'none' }}>
        Sign Out
      </button>

      <div id="user" style={{ display: userVisible ? 'block' : 'none' }}></div>

    </div>
  );
}

export default User;
