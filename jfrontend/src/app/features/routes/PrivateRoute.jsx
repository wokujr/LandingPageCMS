import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
    const loading = useSelector(state => state.session.loading)
    const accessToken = useSelector(state => state.session.accessToken)
    const location = useLocation()
    const fromLocation = location.state?.from
    const previousLocation = fromLocation ? fromLocation : { pathname: "/login" }

    if (accessToken) {
        return children
    } else if (loading) {
        return <p>Loading...</p>
    } else if (!accessToken && !loading) {
        return <Navigate to={previousLocation} state={{ from: location }} replace />
    } else {
        return <p>Something went wrong</p>
    }
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute
