import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useCostumDispatch from "../../services/customDispatch";

function Login2() {
    const emailRef = useRef();
    const passwordRed = useRef();

    const errorMessages = useState([]);
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState([]);
    const loading = false;
    const navigate = useNavigate();
    const dispatch = useCostumDispatch();

    useEffect( () => {

    })

  return (
    <div>

    </div>
  );
}

export default Login2;
