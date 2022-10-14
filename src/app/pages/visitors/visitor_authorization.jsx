import { format, parse } from "date-fns";
import React from "react";
import {
  ClipboardOutline,
  CloseOutline,
  LogoWhatsapp,
  ShareOutline,
} from "react-ionicons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import { store } from "../../../store/store";

export default function ShareVisitorAuthorizationPage() {
  const { id } = useParams();

  const visitor = store.useState((state) =>
    state.visitors.find((e) => e.id === Number(id))
  );

  function handleShare() {
    const modal = new window.bootstrap.Modal(
      document.querySelector("#shareActionSheet")
    );
    modal.show();
    //shareActionSheet
    return;
  }

  if (!visitor) {
    return (
      <div>
        <Header showGoBack title={"Autorização de Entrada"} rightSide={<></>} />

        <div className="section mt-3">
          <div className="alert alert-danger mb-2 text-center" role="alert">
            Desculpe, autorização não encontrada.
          </div>
        </div>
      </div>
    );
  }

  const dateParsed = (() => {
    console.log({ visitor });
    let message = format(parse(visitor?.initial_date, 'yyyy-MM-dd', Date.now()), "dd/MM/yyyy");
    if (visitor.day_mode == "period")
      message += " até " + format(parse(visitor?.final_date,'yyyy-MM-dd', Date.now()), "dd/MM/yyyy");

    return message;
  })();

  const visitorType = (() => {
    if (visitor?.visitor_type == "tipo_1") return "Tipo 1";
    else if (visitor?.visitor_type == "tipo_2") return "Tipo 2";
    else if (visitor?.visitor_type == "tipo_3") return "Tipo 3";
    else if (visitor?.visitor_type == "tipo_4") return "Tipo 4";
  })();

  return (
    <div>
      <Header
        showGoBack
        title={"Autorização de Entrada"}
        rightSide={<ShareVisitor onClick={handleShare} />}
      />
      <div className="wide-block py-2">
        <div className="row">
          <small className="text-center">Visitante</small>
          <div className="col-12 d-flex justify-content-center">
            <div className="avatar-section">
              <img
                //src={!!visitor ? visitor.visitor_photo : visitorImage}
                src={visitor?.visitor_photo}
                alt="avatar"
                className="imaged rounded"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-12 mt-2 text-center">
            <h3>
              {visitor?.visitor_firstName} {visitor?.visitor_lastName} -{" "}
              {visitorType}
            </h3>
            <div className="row my-3 px-2">
              <div className="col">
                <div className="card">
                  <div className="card-body p-1">
                    <small>Nº Documento</small>
                    <h4 className="text-secondary fw-bold">
                      {visitor?.document_number}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body p-1">
                    <small>Placa Veículo</small>
                    <h4 className="text-secondary fw-bold">
                      {visitor?.car_identification}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <small className="m-0 p-0">
                Entrada autorizada{" "}
                {visitor?.day_mode === "day" ? " para a data:" : " do dia"}
              </small>
              <p className="text-secondary fw-bold">{dateParsed}</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mb-2">
            <img src="/assets/img/sample/qr.png" width={130} />
          </div>
        </div>
      </div>
      <div className="listview-title mt-2">Autorizado por</div>
      <ul className="listview image-listview">
        <li>
          <div className="item">
            <img
              src="/assets/img/avatar.png"
              alt="image"
              className="image"
              width="36px"
              height="36px"
            />
            <div className="in">
              <div>
                <h4 className="my-1">{"Marco Aurélio"}</h4>
                <small className="text-muted">
                  Bloco B1 • Apartamento 102 • Entrada A2
                </small>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {/* <ul className="listview image-listview">
        <li>
          <div className="item">
            <div className="in">
              <div>
                <header>Bloco</header>
                <h4 className="m-0">B1</h4>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="item">
            <div className="in">
              <div>
                <header>Apartamento</header>
                <h4 className="m-0">102</h4>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="item">
            <div className="in">
              <div>
                <header>Entrada</header>
                <h4 className="m-0">A2</h4>
              </div>
            </div>
          </div>
        </li>
      </ul> */}

      <ShareActionSheet />
    </div>
  );
}

function ShareVisitor({ onClick }) {
  return (
    <button className="btn p-0" onClick={onClick}>
      <ShareOutline style={{ color: "#6236FF", fontWeight: "300" }} />
    </button>
  );
}

function ShareActionSheet({ link = "link de exemplo kkkkk" }) {
  const { openDialog } = useAlertDialogContext();
  function onClipboardClick() {
    const type = "text/plain";
    const blob = new Blob([link], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard
      .write(data)
      .then(() => {
        openDialog({
          type: "success",
          title: "Sucesso!",
          message: "Link copiado com sucesso para a área de transferência.",
          buttons: [{ text: "OK", color: "primary" }],
        });
      })
      .catch(() => {
        openDialog({
          type: "error",
          title: "Ops!",
          message: "Não foi possível copiar o link.",
        });
      });
  }

  function onWhatsappShareClick() {
    const message = encodeURI(
      "Marco Aurélio autorizou sua entrada: https://gesconn.com/app/visitor/entrance/ask2354a"
    );
    window.open("https://wa.me/?text=" + message, "_blank");
  }

  return (
    <div
      className="modal fade action-sheet show"
      id="shareActionSheet"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Compartilhar</h5>
          </div>
          <div className="modal-body">
            <ul className="action-button-list">
              <li>
                <a
                  onClick={onWhatsappShareClick}
                  className="btn btn-list"
                  data-bs-dismiss="modal"
                >
                  <span>
                    <LogoWhatsapp cssClasses="md hydrated me-1" />
                    Whatsapp
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={onClipboardClick}
                  className="btn btn-list"
                  data-bs-dismiss="modal"
                >
                  <span>
                    <ClipboardOutline cssClasses="md hydrated me-1" />
                    Copiar link
                  </span>
                </a>
              </li>
              <li className="action-divider"></li>
              <li>
                <a
                  href="#"
                  className="btn btn-list text-danger"
                  data-bs-dismiss="modal"
                >
                  <span>
                    <CloseOutline cssClasses="md hydrated text-danger" />
                    Cancel
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
