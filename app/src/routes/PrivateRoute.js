import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) => {
    const access_token = localStorage.getItem("accesToken")
    const auth = access_token == "true"? true : false;
    console.log(auth)
    return auth ? Component : <Navigate to="/" />
}

export default PrivateRoute


/*
const PrivateRoute = ({ component: Component, ...rest }) => {
  //const token = localStorage.getItem('access_token'); // O donde hayas almacenado el token

  // Verificar si el token existe y es válido
  //const isAuthenticated = token && isTokenValid(token); // Implementa esta función para validar el token

  const isAuthenticated = true
  return (
    <Route {...rest} render={props => (
      isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
    )} />
  );
}*/