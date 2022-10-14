import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  PeopleOutline,
  QrCodeOutline,
  PeopleCircleOutline,
  BookmarksOutline,
  CallOutline,
  CloseOutline,
} from "react-ionicons";
import { Link, useLocation } from "react-router-dom";
import { useAlertDialogContext } from "../contexts/alert.context";
import { Copyright } from "./Copyright";
import { isBrowser } from "react-device-detect";

export default function Footer() {
  const location = useLocation();
  const { openDialog } = useAlertDialogContext();
  const [actionSheet, setActionSheet] = useState();
  const [admContactNumbersActionSheet, setAdmContactNumbersActionSheet] =
    useState() ;

  function showActionSheet() {
    actionSheet.show();
  }

  function handleCallAdministration() {
    if (isBrowser) {
      openDialog({
        title: "Ligação somente pelo celular",
        message: "Deseja enviar uma mensagem para a administração?",
        type: "warning",
        buttons: [
          { text: "NÃO" },
          { text: "SIM", color: "primary", onClick: showActionSheet },
        ],
      });
      return;
    }

    /* const windowTel = window.open("tel:81996838547", "_blank");
    windowTel?.close(); */

    admContactNumbersActionSheet?.show()
  }

  useEffect(() => {
    const modal = new window.bootstrap.Modal("#sendAdmMessageActionSheet");
    setActionSheet(modal);

    setAdmContactNumbersActionSheet(() => {
      if (document.querySelector("#admContactNumbersActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#admContactNumbersActionSheet")
        );
      }
    });
  }, []);

  return (
    <div>
      <div
        className="appBottomMenu small"
        style={{ marginBottom: 56, minHeight: "10px" }}
      >
        <Copyright />
      </div>
      <div className="appBottomMenu">
        <Link
          to="/app/reservations"
          className={
            location.pathname.includes("/app/reservations")
              ? "item active"
              : "item"
          }
        >
          <div className="col">
            <BookmarksOutline cssClasses="md hydrated" />
            <strong>Reservas</strong>
          </div>
        </Link>
        <Link
          to="/app/guests"
          className={
            location.pathname.includes("/app/guests") ? "item active" : "item"
          }
        >
          <div className="col">
            <PeopleCircleOutline cssClasses="md hydrated " />
            <strong>Convidados</strong>
          </div>
        </Link>
        <Link
          to="/app/resident"
          className={
            location.pathname.includes("/app/resident") ? "item active" : "item"
          }
        >
          <div className="col">
            <QrCodeOutline cssClasses="md hydrated " />
            <strong>Morador</strong>
          </div>
        </Link>
        <Link
          to="/app/visitors"
          className={
            location.pathname.includes("/app/visitors") ? "item active" : "item"
          }
        >
          <div className="col">
            <PeopleOutline cssClasses="md hydrated" />
            <strong>Visitantes</strong>
          </div>
        </Link>

        <div onClick={handleCallAdministration} className={"item"}>
          <div className="col">
            <CallOutline cssClasses="md hydrated" />
            <strong>Administração</strong>
          </div>
        </div>
      </div>
      <ActionSheetSendAdmMessage />
      <CallAdministrationActionSheet
        controller={admContactNumbersActionSheet}
      />
    </div>
  );
}

function ActionSheetSendAdmMessage() {
  return (
    <div
      className="modal fade action-sheet"
      id="sendAdmMessageActionSheet"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar mensagem à administração</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form onSubmit={() => {}}>
                <div className="form-group basic">
                  <label className="label">Mensagem</label>
                  <div className="input-group">
                    <textarea
                      id="textarea4"
                      rows={3}
                      className="form-control"
                      placeholder="Digite sua mensagem"
                    />
                  </div>
                </div>

                <div className="form-group basic">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    data-bs-dismiss="modal"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallAdministrationActionSheet({ controller }) {
  const numbers = [
    { number: "(11) 9 3125-4562", label: "Manutenção" },
    { number: "(11) 9 4875-4535", label: "Portaria" },
    { number: "(11) 9 3784-3647", label: "Recepção" },
  ];

  function handleCallAdministration(number) {
    const sanitizedNumber = String(number).replace("/D+/g,", "");
    controller?.hide();
    window.open(`tel:${sanitizedNumber}`, "_blank");
  }
  return (
    <div
      className="modal fade action-sheet inset"
      id="admContactNumbersActionSheet"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Escolha um dos números</h5>
          </div>
          <div className="modal-body">
            <ul className="action-button-list">
              {numbers.map((el, index) => (
                <li className="my-2" key = {index}>
                  <a
                    className="btn btn-list justify-content-start"
                    onClick={() => handleCallAdministration(el.number)}
                  >
                    <CallOutline />
                    <div className="d-flex flex-column align-items-start ms-1">
                      <span className="mb-1" style={{fontSize: '0.8rem'}}>{el.label}</span>
                      <strong>{el.number}</strong>
                    </div>
                  </a>
                </li>
              ))}
              <li>
                  <a href="#" className="btn btn-list text-danger" data-bs-dismiss="modal">
                      <span>
                          <CloseOutline cssClasses={"md hydrated text-danger"}/>
                          Cancelar
                      </span>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
