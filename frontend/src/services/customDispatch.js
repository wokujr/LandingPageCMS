import {useState} from 'react';
import {useNavigate} from "react-router-dom";

function useCostumDispatch() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const costumDispatch = (action) => {
        if (action.type === 'LOGIN'){
            if (action.email === 'something@email.com' && action.password === 'password'){
                navigate("/");
            }else{
                setErrors(["invalid credentials"]);
            }
        }
    }

  return (costumDispatch , errors);

}

export default useCostumDispatch;
