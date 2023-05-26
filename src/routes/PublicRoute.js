import { Navigate } from 'react-router-dom';
import { TOKEN } from '../utils/constants';

const PublicRoute = ({Component}) => {
    const accessToken = localStorage.getItem(TOKEN)
    //const auth = access_token == undefined? true : false;
    return !accessToken ? Component: <Navigate to="/home" />
}

export default PublicRoute
