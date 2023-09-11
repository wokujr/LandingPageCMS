import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/teams')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/teams/${id}/edit`)
    }

    return (
        <div>
            <h1>Employee List</h1>
            <div>
                {teams.map(team => (
                    <div key={team.id}>
                        <h2>{team.name}</h2>
                        <p>Position: {team.title}</p>
                        <img
                            className="w-75"
                            src={`http://localhost:3000${team.image.url}`}  alt={team.name}
                        />
                        <div>
                            <button onClick={() => {handleEdit(team.id)}} className="btn btn-warning mx-2 mt-2 mb-2">Edit</button>

                        </div>
                    </div>

                ))}
            </div>



        </div>
    );
}
