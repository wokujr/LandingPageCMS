import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";


// some custom dumb bullshit
import useCostumDispatch from "../../services/customDispatch";
import {Container, Alert,Button, Box, Card, CardActions, CardContent, Divider, FormControl, FormGroup, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
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

        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        const passwordConfirmation = passwordConfirmationRef?.current?.value;


        // if (emailRef?.current === undefined
        //     || emailRef.current.value === ""
        //     || passwordRef?.current === undefined
        //     || passwordRef.current.value === ""
        //     || passwordConfirmationRef?.current === undefined
        //     || passwordConfirmationRef.current.value === "" )
        // {
        //     return setErrors(["Please fill out all fields"])
        // }
        // if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
        //     return setErrors(["Password does not match"])
        // }

        if (!email || !password || !passwordConfirmation) {
            return setErrors(['Please fill out all fields']);
        }

        if (password !== passwordConfirmation) {
            return setErrors(['Password does not match']);
        }

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        // const response = await dispatch(loginUser(payload) )
        // const response =["oops something went wrong"]
        // console.log(response);
        // if (errorMessages.length === 0) {
        //     navigate("/");
        // }else {
        //     return setErrors(errorMessages);
        // }

        try {
            // Your form submission logic here
            // const response = await dispatch(registerUser(payload));
            const response = "response";
            console.log(response);
            if (response.success) {
                navigate('/');
            } else {
                setErrors(['Oops, something went wrong']);
            }
        } catch (error) {
            console.error(error);
            setErrors(['Oops, something went wrong']);
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

    const passwordConfirmationInput =
        <OutlinedInput id="password-confirmation" type={showPassword ? 'text' : 'password'} inputRef={passwordRef} endAdornment={
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
                                    Sign Up
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
                                            <FormHelperText id="email-helper-text"> We&apos;ll not share password </FormHelperText>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup row={true} id="password-group" sx={{marginTop: "1em"}}>
                                        <FormControl fullWidth>
                                            <InputLabel required htmlFor="password" id="password-label">Password</InputLabel>
                                            {passwordInput}
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup row={true} id="password-confirmation-group" sx={{marginTop: "1em"}}>
                                        <FormControl fullWidth>
                                            <InputLabel required htmlFor="password-comfirmation" id="password-confirmation-label"> Password Confirmation </InputLabel>
                                            {passwordConfirmationInput}
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup row={true} id="submit-group" sx={{marginTop: "1em"}}>
                                        <FormControl fullWidth>
                                            <Button
                                                disabled={loading}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                id="submit-button"> Create Account </Button>
                                        </FormControl>
                                    </FormGroup>
                                </form>
                            </Container>
                        </CardContent>
                        <Divider light={false} />
                        <CardActions sx={{marginTop: "1em", justifyContent: 'center' }} disableSpacing >
                            <Box>
                                Already have Account? <Link to="/login" > Login </Link>
                            </Box>
                        </CardActions>
                    </Card>
                </Container>

            </section>
        </div>
    );
}
