import { store } from "./store/store";
import { Navigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

export const RequiredAuth = ({ children }) => {
  const isAuthenticated = store.useState((e) => e.user.token);
  console.log({ isAuthenticated })
  return isAuthenticated ? children : <Navigate to='/app/login' replace />
};

export const DeviceMiddleware = ({ children }) => {
  if (isMobile) {
    return <Navigate to='/app' replace />
  }

  return children
}
