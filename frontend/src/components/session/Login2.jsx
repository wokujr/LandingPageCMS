import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";


// some custom dumb bullshit
import useCostumDispatch from "../../services/customDispatch";
import {Button, Container, Alert, Box, Card, CardActions, CardContent, Divider, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


function Login2() {
    const emailRef = useRef();
    const passwordRef = useRef();

    let errorMessages = [];
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const loading = false;
    const navigate = useNavigate();
    const dispatch = useCostumDispatch();

    useEffect( () => {
        emailRef?.current?.focus();
        if (errorMessages.length > 0){
            setErrors(errorMessages);
            errorMessages = [];
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors( [] );
        if (emailRef?.current === undefined
            || emailRef.current.value === ""
            || passwordRef?.current === undefined
            || passwordRef.current.value === "") {
            return setErrors(["Please fill out all fields"])
        }
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        // const response = await dispatch(loginUser(payload) )
        const response =["oops something went wrong"]
        console.log(response);
        if (errorMessages.length > 0) {
            navigate("/");
        }else {
            return setErrors(errorMessages);
        }
    }


    const passwordInput =
        <OutlinedInput id="password" type={showPassword ? 'text' : 'password'} inputRef={passwordRef} endAdornment={
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password vissiblity"
                    onClick={()=> setShowPassword(!showPassword)}
                    onMouseDown={()=>setShowPassword(!showPassword)}
                    edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff /> }
                </IconButton>
            </InputAdornment> } >
        </OutlinedInput>

  return (
    <div>
        <section style={{marginTop:"2em"}}>
            <Container maxwidth="md">
                <Card sx={{boxShadow:1, maxwidth: 'md'}}>
                    <CardContent>
                        <Container maxwidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                                Login
                            </Typography>
                            {errors.length > 0 ?
                                <Alert severity="error" aria-live="assertive">
                                    {errors.map((error, index) => {
                                        return <p key={`alert-${index}`}>
                                            {error}
                                        </p>
                                    })}
                                </Alert>
                                : <>  </>}
                            <form onSubmit={handleSubmit}>
                                <FormGroup row={true} id="email-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="email" id="email-label">Email Address</InputLabel>
                                        <Input id="email" type="email" inputRef={emailRef}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                                        {passwordInput}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                                    <FormControl fullWidth>
                                        <Button
                                            disabled={loading}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            id="submit-button">Login</Button>
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Container>
                    </CardContent>
                    <Divider light={false} />
                    <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                        <Box>
                            <Typography variant="body2" color="text.secondary" align="center">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </Typography>
                            <Link to="/signup">Create an Account!</Link>
                        </Box>
                    </CardActions>
                </Card>
            </Container>

        </section>
    </div>
  );
}

export default Login2;
