import { Navigate } from 'react-router-dom';

const PublicRoute = ({Component}) => {
    const access_token = localStorage.getItem("accesToken")
    const auth = access_token == undefined? true : false;
    return auth ? Component: <Navigate to="/home" />
}

export default PublicRoute
