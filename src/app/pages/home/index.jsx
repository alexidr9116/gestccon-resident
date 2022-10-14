import { useEffect, useState } from "react";
import { ChatboxOutline } from "react-ionicons";
import AnimatedPage from "../../../components/AnimatedPage";
import { Copyright } from "../../../components/Copyright";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import LGPDActionSheet from "../../../components/LGPDActionSheet";
import TermsAndServices from "../../../components/TermsAndServices";
import Classificates from "./classificates";
import AdminChat from "./components/AdminChat";
import Informatives from "./informatives";
import Reservations from "./reservations";
import {store} from '../../../store/store';
import useAuth from "../../../hooks/useAuth";
import { HOST_API } from "../../util/axios";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    /* setTimeout(() => {
      var myCollapse = document.getElementById('actionSheetForm')
      var bsCollapse = new window.bootstrap.Modal(myCollapse)
      bsCollapse.show()
    }, 400) */

  }, []);
  /* 
    useEffect(() => {
      console.log(modalOpen)
      if (modalOpen) {
        var myCollapse = document.getElementById('actionSheetForm')
        var bsCollapse = new window.bootstrap.Modal(myCollapse)
        bsCollapse?.hide()
      }
    }, [modalOpen]) */

  return (
    <AnimatedPage>
      <div>
        <div className="w-100" style={{ height: 250, overflow: "hidden" }}>
          <img
            loading="lazy"
            className="w-100"
            // src="/assets/img/verano-local.png"
            src = {`${HOST_API}${user?.condo?.image}`}
            style={{ objectFit: "cover" }}
          />
        </div>
        <Reservations />
        <Informatives />
        <Classificates />
      </div>
      <TermsAndServices opened={modalOpen} />
      <LGPDActionSheet openModal={setModalOpen} />
    </AnimatedPage>
  );
}

export default Home;
