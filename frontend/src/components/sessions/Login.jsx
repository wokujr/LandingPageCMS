import React, {useEffect, useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import axios from "axios";

const API_URL = 'http://localhost:3000/users/tokens';
const Login = () => {
    const [access_token, setAccessToken] = useState(null);
    const [refresh_token, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
    const [resource_owner, setResourceOwner] = useState(null);
    const [userVisible, setUserVisible] = useState(false);

    const nullOrUndefined = (itemToCheck) => {
        return itemToCheck == null || itemToCheck === "undefined";
    }

    useEffect( () => {
        userSession();
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const email = e.target.querySelector("#signup-email").value;
        const password = e.target.querySelector("#signup-password").value;
        const password_confirm = e.target.querySelector("#signup-password-confirm").value;

        if (password !== password_confirm) {
            alert("Passwords do not match");
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
            console.error("Signup error:", error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.querySelector("#signin-email").value;
        const password = e.target.querySelector("#signin-password").value;

        try {
            const response = await axios.post(`${API_URL}/sign_in`, {
                email,
                password,
            });

            await handleAuthResponse(response);
            userSession();
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleAuthResponse = async (response) => {
        const data = response.data;
        localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner));
        localStorage.setItem("refresh_token", data.refresh_token);
        setAccessToken(data.token);
        setRefreshToken(data.refresh_token);
        setResourceOwner(data.resource_owner);

        // Print the access_token to the console
        console.log("Access Token:", data.token);
    };

    const refreshToken = async () => {
        const token = localStorage.getItem("refresh_token");
        if (nullOrUndefined(token)) {
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/refresh`, null, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                if (response.status === 401) {
                    // Handle the error, such as redirecting to the login page
                } else {
                    throw new Error(response.statusText);
                }
            }

            const data = response.data;
            localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner));
            localStorage.setItem("refresh_token", data.refresh_token);
            setAccessToken(data.token);
            setRefreshToken(data.refresh_token);
            setResourceOwner(data.resource_owner);
        } catch (err) {
            console.log("Error refreshing token: ", err);
            resetTokens();
            userSession();
        }
    };

    const userSession = async () => {
        await refreshToken();
        await requestNewAccessToken();
        setUserVisible(!nullOrUndefined(access_token));
        getUser();
    };

    const getUser = () => {
        const storedResource = localStorage.getItem("resource_owner");
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
        console.log("Logging out");
        resetTokens();
        userSession();
    };

    const resetTokens = () => {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("resource_owner");
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
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refresh_token}`,
                    },
                }
            );

            handleAuthResponse(response);
        } catch (err) {
            console.log("Error refreshing token: ", err);
            resetTokens();
            userSession();
        }
    };

    const userCanAccess = async () => {
        if (nullOrUndefined(access_token)) {
            return;
        }

        try {
            const response = await axios.get("http://localhost:3000/api/v1/companies/restricted", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const data = response.data;

            console.log("%c" + data.message, "color: cyan");
            if (data.error) {
                console.log("Error: ", data.error);
                resetTokens();
                userSession();
            }
        } catch (error) {
            console.error("Access error:", error);
        }
    };


    return (
        <div>
            <h2>Test Session</h2>

            <form id="sign_up_form" onSubmit={handleSignUp} className={`mb-3 ${userVisible ? "d-none" : "d-block"}`}>
                <div className="mb-3">
                    <label htmlFor="signup-email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="signup-email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signup-password" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-password-confirm" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="signup-password-confirm" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>

            <form id="sign_in_form" onSubmit={handleSignIn} className={`mb-3 ${userVisible ? "d-none" : "d-block"}`}>
                <div className="mb-3">
                    <label htmlFor="signin-email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="signin-email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="signin-password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="signin-password" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>

            <button id="sign_out" onClick={signOut} className={`btn btn-danger ${userVisible ? "d-block" : "d-none"}`}>
                Sign Out
            </button>

            <div id="user" className={`alert alert-success ${userVisible ? "d-block" : "d-none"}`}>
                {resource_owner ? `Welcome, ${resource_owner.email}` : null}
            </div>
        </div>

    );
}
export default Login;
