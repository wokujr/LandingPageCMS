import React from 'react'
import { useSelector } from "react-redux"

function Dashboard() {
    const currentUser = useSelector(state => state.session.currentUser)
    const accessToken = useSelector(state => state.session.accessToken)
    const refreshToken = useSelector(state => state.session.refreshToken)
    return (
        <section>
            <h1>Dashboard</h1>


            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Created At</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{currentUser?.id}</td>
                    <td>{currentUser?.email}</td>
                    <td>{currentUser?.role}</td>
                    <td>{currentUser?.createdAt}</td>
                </tr>
                </tbody>
            </table>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Access Token</th>
                    <th scope="col">Refresh Token</th>
                </tr>

                </thead>
                <tbody>
                <tr>
                    <td>:{accessToken}</td>
                    <td>: {refreshToken}</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Dashboard
