import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., make an API request)
        try {
            const response = await axios.post('http://localhost:3000/api/users/sign_in', {
                user: {
                    email: formData.email,
                    password: formData.password,
                },
            });

            // Handle success (e.g., store authentication token, redirect)
            console.log('Login success:', response.data);

            // Redirect to another page, update state, etc.
        } catch (error) {
            // Handle error (e.g., display error message)
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
