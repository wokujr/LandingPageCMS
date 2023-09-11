import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";

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
                <div key={company.id} className="container">
                    <div className="card mt-4 border-black border-4">
                        <div  className="">
                            <div>
                                <h2>{company.title}</h2>
                            </div>
                            <div>
                                <p>{company.body}</p>
                            </div>
                            <div>
                                <button onClick={() => {handleDelete(company.id)}} className="btn btn-danger mx-2 mt-2 mb-2">Delete</button>
                                <button onClick={() => {handleEdit(company.id)}} className="btn btn-warning mx-2 mt-2 mb-2">Edit</button>
                                <button onClick={() => {handleShowDetail(company.id)}} className="btn btn-success">Show Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
