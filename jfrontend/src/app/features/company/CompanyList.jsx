import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const API_URL = 'http://localhost:3000/api/v1'

export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        async function loadAbout() {
            try {
                const response = await fetch(`${API_URL}/companies`);
                if (response.ok) {
                    const json = await response.json();
                    setCompanies(json);
                    setLoading(false);
                } else {
                    throw response;
                }
            } catch (e) {
                setError("An error occurred. Awkward...");
                console.log("an error", e);
            }finally {
                setLoading(false);
            }
        }
        loadAbout();
    }, []);


    const handleEdit = (id) => {
        navigate(`/company/${id}/edit`)
    }

    const handleShowDetail = (id) => {
        navigate(`/company/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/companies/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setCompanies(companies.filter( (company) => company.id !== id));
            } else {
                throw response;
            }
        } catch (e) {
            console.log("Well, that can't be deleted.", e);
        }

        navigate('/company');
    };
    return (
        <div>
            <h1>Company List</h1>
            {companies.map((company) => (
                <div key={company.id} className="">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="mx-2" scope="col">Title</th>
                            <th className="mx-2" scope="col">Content</th>
                            <th className="mx-2" scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{company.title}</td>
                            <td>{company.body}</td>
                            <td>
                                <div>
                                    <button onClick={() => {
                                        handleDelete(company.id)
                                    }} className="btn">
                                        <DeleteIcon />
                                    </button>
                                    <button onClick={() => {
                                        handleEdit(company.id)
                                    }} className="btn">
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => {
                                        handleShowDetail(company.id)
                                    }} className="btn">
                                        <VisibilityIcon/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
