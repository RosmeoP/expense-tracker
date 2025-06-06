import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const accessToken = localStorage.getItem('accessToken');  
  return (
    <Route
      {...rest}
      render={(props: any) =>
        accessToken ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace />  
        )
      }
    />
  );
};

export default PrivateRoute;
