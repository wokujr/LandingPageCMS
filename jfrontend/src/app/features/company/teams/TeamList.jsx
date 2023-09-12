import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:3000/api/v1'

export default function TeamList() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/teams`)
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

    const handleDeleteTeam = async (id) => {
        try{
            const response = await fetch(`${API_URL}/teams/${id}`,{
                method:"DELETE"
            });
            if (response.ok){
                setTeams(teams.filter( (team)=>team.id !== id ))
            }else{
                throw response;
            }
        }catch (e) {
            console.log("hmm not deleted with error", e)
        }
    }



    return (
        <div>
            <h1>Employee List</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col"> Name</th>
                    <th scope="col"> Position</th>
                    <th scope="col"> Photo</th>
                    <th scope="col"> Action</th>
                </tr>
                </thead>

                {teams.map(team => (
                    <tbody key={team.id}>

                    <tr>
                        <td>{team.name}</td>
                        <td>{team.position}</td>
                        <td><img width={50} height={50} src={team.image_url} alt={team.name}/></td>
                        <td>
                            <div>
                                <button onClick={() => {
                                    handleEdit(team.id)
                                }} className="btn btn-warning mx-2 mt-2 mb-2">Edit
                                </button>
                                <button onClick={() => {
                                    handleDeleteTeam(team.id)
                                }} className="btn btn-danger mx-2 mt-2 mb-2">Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
}
