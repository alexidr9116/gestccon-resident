import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Login from "./app/pages/authentication/login";
import { DeviceMiddleware } from "./routes";
import { AnimatePresence } from "framer-motion";
import HomeSite from "./site/home";

import { RequiredAuth } from "./routes";
import Home from "./app/pages/home";
import ForgotPassword from "./app/pages/authentication/forgotPassword";
import Reservations from "./app/pages/reservations";
import ReservationsBook from "./app/pages/reservations/book";
import TermsAndServices from "./components/TermsAndServices";
import UsersPage from "./app/pages/user";
import LGPDPreferencies from "./app/pages/user/lgpd";
import NotificationsPage from "./app/pages/notifications";
import AppPages from "./app/pages";
import { AlertDialog, AlertDialogProvider } from "./contexts/alert.context";
import { useEffect, useLayoutEffect } from "react";
import { store } from "./store/store";
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-loading-skeleton/dist/skeleton.css'

import './index.css'
import { AuthProvider } from "./contexts/auth.context";

function App() {
  /*  useEffect(() => {
     const stateInLocalStorage = sessionStorage.getItem("@gestConn-data");
     if (stateInLocalStorage) store.replace(JSON.parse(stateInLocalStorage));
   }, []); */
  return (
    <AuthProvider >
      <BrowserRouter>
        <AnimatePresence exitBeforeEnter>
          <Wrapper>
            <AlertDialogProvider>
              <Routes key={location.pathname} location={location}>
                <Route
                  index
                  element={
                    <DeviceMiddleware>
                      <HomeSite />
                    </DeviceMiddleware>
                  }
                />

                <Route path="app/*" element={<AppPages />} />
                <Route path="app/login" element={<Login />} />
                <Route path="app/recover-password" element={<ForgotPassword />} />
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
            </AlertDialogProvider>
          </Wrapper>
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  );
}

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default App;
