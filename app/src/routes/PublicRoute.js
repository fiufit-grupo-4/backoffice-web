import { Navigate } from 'react-router-dom';

const PublicRoute = ({Component}) => {
    const accessToken = localStorage.getItem("accesToken")
    //const auth = access_token == undefined? true : false;
    return !accessToken ? Component: <Navigate to="/home" />
}

export default PublicRoute
