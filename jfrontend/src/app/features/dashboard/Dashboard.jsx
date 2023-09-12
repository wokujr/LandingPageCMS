import React from 'react'
import { useSelector } from "react-redux"

function Dashboard() {
    const currentUser = useSelector(state => state.session.currentUser)
    const accessToken = useSelector(state => state.session.accessToken)
    const refreshToken = useSelector(state => state.session.refreshToken)
    return (
        <section>
            <h1>Dashboard</h1>
            <ul>
                <li>
                    Current User
                    <ul>
                        <li>Id: {currentUser?.id}</li>
                        <li>Email: {currentUser?.email}</li>
                        <li>Role: {currentUser?.role}</li>
                        <li>Created At: {currentUser?.createdAt}</li>
                    </ul>
                </li>
                <li>Access Token: {accessToken}</li>
                <li>Refresh Token: {refreshToken}</li>
            </ul>
        </section>
    )
}

export default Dashboard
