import { Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  AlertDialog,
  NotificationBar,
  ToastBar,
} from "../../contexts/alert.context";
import AnimalsRoutes from "./animals";
import { AssemblyRoutes } from "./assembly";
import ClassificatesRoutes from "./classificates";
import DocumentsPage from "./documents";
import FamilyRoutes from "./family";
import GuestsPage from "./guests";
import Home from "./home";
import HomeMovingRoutes from "./home_moving";
import { InformativesRoutes } from "./informatives";
import NotificationsPage from "./notifications";
import OccurrencesRoutes from "./occurrences";
import PollsAndResearchesRoutes from "./polls_researches";
import Reservations, { ReservationsRoutes } from "./reservations";
import ReservationsBook from "./reservations/book";
import ResidentPage from "./resident";
import UsersPage from "./user";
import LGPDPreferencies from "./user/lgpd";
import VisitorsPage from "./visitors";

export default function AppPages() {
  return (
    <>
      <div>
        <Header />
        <div
          className="d-flex flex-column"
          style={{ paddingTop: 56, paddingBottom: 100 }}
        >
          <div className="appCapsule">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="user" element={<UsersPage />} />
              <Route path="user/lgpd" element={<LGPDPreferencies />} />
              <Route path="resident" element={<ResidentPage />} />
              <Route path="visitors/*" element={<VisitorsPage />} />
              <Route path="guests/*" element={<GuestsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="reservations/*" element={<ReservationsRoutes />} />
              <Route path="informatives/*" element={<InformativesRoutes />} />
              <Route path="classificates/*" element={<ClassificatesRoutes />} />
              <Route path="assemblies/*" element={<AssemblyRoutes />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route
                path="polls-researches/*"
                element={<PollsAndResearchesRoutes />}
              />
              <Route path="animals/*" element={<AnimalsRoutes />} />
              <Route path="family/*" element={<FamilyRoutes />} />
              <Route path="home-moving/*" element={<HomeMovingRoutes />} />
              <Route path="occurences/*" element={<OccurrencesRoutes />} />
            </Routes>
          </div>
          <Footer />
        </div>

        <AlertDialog />
        <NotificationBar />
        <ToastBar />
      </div>
    </>
  );
}
