import { Route, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, authenticated, redirectTo }) => {
  return authenticated ? (
    element
  ) : (
    <Navigate to={redirectTo} />
  );
};