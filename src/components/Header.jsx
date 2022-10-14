import React, { useEffect, useState } from "react";
import {
  ChevronBackOutline,
  CloseOutline,
  LogOutOutline,
  MenuOutline,
  NotificationsOutline,
} from "react-ionicons";
import { Link, useNavigate } from "react-router-dom";
import AdminChat from "../app/pages/home/components/AdminChat";

 
export default function Header({
  rightSide,
  showGoBack,
  ...props
}) {
  const [leftPanel, setLeftPanel] = useState() ;
  const [admMessageActionSheet, setAdmMessageActionSheet] = useState();

  useEffect(() => {
    setLeftPanel(
      new window.bootstrap.Modal(document.getElementById("panelLeft"))
    );

    setAdmMessageActionSheet(() => {
      if (document.querySelector("#sendAdmMessageActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#sendAdmMessageActionSheet")
        );
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleNavigateBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  function handleOpenLeftPanel() {
    leftPanel?.show();
  }

  return (
    <>
      <div className="appHeader text-light">
        {!!showGoBack ? (
          <div className="left">
            <a className="headerButton goBack" onClick={handleNavigateBack}>
              <ChevronBackOutline />
            </a>
          </div>
        ) : (
          <div className="left">
            <a
              onClick={handleOpenLeftPanel}
              className="headerButton"
              data-bs-toggle="modal"
              data-bs-target="#sidebarPanel"
            >
              <MenuOutline cssClasses="md hydrated" />
            </a>
          </div>
        )}
        <div className="pageTitle">
          {props.title ? (
            <h4 style={{ margin: 0 }}>{props.title}</h4>
          ) : (
            <img src="/assets/img/verano.png" width={100} />
          )}
        </div>
        {
          <div className="right">
            {!rightSide ? (
              <>
                <Link to="/app/notifications" className="headerButton">
                  <NotificationsOutline cssClasses="md hydrated" />
                  <span className="badge badge-danger">4</span>
                </Link>
                <Link to="/app/user" className="headerButton">
                  <img
                    src="/assets/img/avatar.png"
                    alt="image"
                    className="imaged w32"
                  />
                  <span className="badge badge-danger">6</span>
                </Link>
              </>
            ) : (
              rightSide
            )}
          </div>
        }
      </div>
      <SidePanel controller={leftPanel} adminChatController={admMessageActionSheet}/>
      <AdminChat />
    </>
  );
}

function SidePanel({ controller, adminChatController }) {
  const navigate = useNavigate();
  function hideLeftPanel() {
    controller?.hide();
  }

  function handleSignout() {
    hideLeftPanel()
    navigate("/app/login", { replace: true });
  }
  return (
    <div
      className="modal fade panelbox panelbox-left"
      id="panelLeft"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="profileBox pt-2 pb-2">
              <div className="image-wrapper">
                <img
                  src="/assets/img/avatar.png"
                  alt="image"
                  className="imaged  w36"
                />
              </div>
              <div className="in">
                <strong>Marco Aurélio</strong>
                <div className="text-muted">4029209</div>
              </div>
              <a
                href="#"
                className="btn btn-link btn-icon sidebar-close"
                onClick={hideLeftPanel}
              >
                <CloseOutline cssClasses="md hydrated" color="#6236FF" />
              </a>
            </div>

            <div className="listview-title mt-1">Menu</div>

            <ul className="listview flush transparent no-line image-listview">
              <li>
                <a href="#" className="item">
                  <div className="in">
                    2ª Via boleto
                    {/*  <span className="badge badge-primary">10</span> */}
                  </div>
                </a>
              </li>
              <li>
                <Link to="assemblies" className="item" onClick={hideLeftPanel}>
                  <div className="in">Assembléia Virtual</div>
                </Link>
              </li>
              <li>
                <Link to="documents" className="item" onClick={hideLeftPanel}>
                  <div className="in">Documentos / Atas</div>
                </Link>
              </li>
              <li>
                <Link to="polls-researches" className="item" onClick={hideLeftPanel}>
                  <div className="in">Enquete / Pesquisas</div>
                </Link>
              </li>
              <li>
                <Link to="animals" className="item" onClick={hideLeftPanel}>
                  <div className="in">Meus Animais</div>
                </Link>
              </li>
              <li>
                <Link to="family" className="item" onClick={hideLeftPanel}>
                  <div className="in">Minha Familia</div>
                </Link>
              </li>
              <li>
                <Link to="home-moving" className="item" onClick={hideLeftPanel}>
                  <div className="in">Mudança</div>
                </Link>
              </li>
              <li>
                <Link to="occurences" className="item" onClick={hideLeftPanel}>
                  <div className="in">Registro de Ocorrência</div>
                </Link>
              </li>
              <li>
                <a className="item" onClick={() => {
                  hideLeftPanel()
                  adminChatController?.show()
                }}>
                  <div className="in">Fale com a Administração</div>
                </a>
              </li>
              <li>
                <a
                  className="item"
                  onClick={handleSignout}
                >
                  <div className="icon-box p-0 m-0">
                    <LogOutOutline color="red" cssClasses="md hydrated" />
                  </div>
                  <div className="text-danger">Sair</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* function CustomLink({ children, to }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState() as any;

  function handleNavigate() {
    if (modal) {
      modal.hide();
      navigate(to);
    }
  }

  useEffect(() => {
    setModal(window.bootstrap.Modal.getOrCreateInstance("panelLeft"));
  }, []);
  return (
    <div onClick={handleNavigate}>
      <a className="item">{children}</a>
    </div>
  );
} */
