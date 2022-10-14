import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import {
  LogoWhatsapp,
  ShareOutline,
  ChatbubbleEllipsesOutline,
  SendOutline,
} from "react-ionicons";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import { showNotification } from "../../services/notification.service";

export default function ClassificateVisualization() {
  const { id } = useParams();
  const classificate = store.useState((state) => {
    console.log({ classificates: state.classificates });
    return state.classificates.find((e) => e.id === id);
  });
  const [shareModal, setShareModal] = useState() ;
  const [messageSheet, setMessageSheet] = useState() ;

  useEffect(() => {
    setShareModal(() => {
      if (document.getElementById("actionSheetShare")) {
        return new window.bootstrap.Modal(
          document.getElementById("actionSheetShare")
        );
      }
    });

    setMessageSheet(() => {
      if (document.getElementById("messageActionSheet")) {
        return new window.bootstrap.Modal(
          document.getElementById("messageActionSheet")
        );
      }
    });
  }, []);

  function handleShareButton() {
    shareModal?.show();
  }

  function showMessageActionSheet() {
    messageSheet?.show();
  }

  if (!classificate) {
    return (
      <div>
        <Header showGoBack title={"Classificado"} rightSide={<></>} />

        <div className="section mt-3">
          <div className="alert alert-danger mb-2 text-center" role="alert">
            Desculpe, classificado não encontrado.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header
        showGoBack
        title="Classificado"
        rightSide={<ShareButton onClick={handleShareButton} />}
      />
      <div className="section pt-2">
        <button
          className="btn btn-block btn-outline-primary my-2"
          onClick={showMessageActionSheet}
        >
          <ChatbubbleEllipsesOutline cssClasses="text-primary me-1" />
          Enviar mensagem
        </button>
        <h1 className="mt-1">{classificate?.title}</h1>
        <div className="blog-header-info mt-2 mb-2">
          <div>
            <img
              src="/assets/img/sample/avatar/avatar1.jpg"
              alt="img"
              className="imaged w24 rounded me-05"
            />
            por <a href="#">Marco Aurélio</a>
          </div>
          <div>24, Setembro 2022</div>
        </div>
      </div>

      <div className="section mt-2">
        <p>{classificate?.description}</p>
        {classificate?.images.map((image, index) => (
          <figure key = {index}>
            <img src={image} alt="image" className="imaged img-fluid" />
          </figure>
        ))}
      </div>

      <div className="section my-3 py-3">
        <a
          href="#"
          className="btn btn-block btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#actionSheetShare"
        >
          <ShareOutline cssClasses="md hydrated me-2" color="white" />
          Compartilhe este classificado
        </a>
      </div>

      <ShareActionSheet />
      <MessageActionSheet />
    </div>
  );
}

function ShareButton({ onClick }) {
  return (
    <a onClick={onClick}>
      <ShareOutline />
    </a>
  );
}

function ShareActionSheet() {
  return (
    <div
      className="modal fade action-sheet inset"
      id="actionSheetShare"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Compartilhar com</h5>
          </div>
          <div className="modal-body">
            <ul className="action-button-list">
              <li>
                <a href="#" className="btn btn-list" data-bs-dismiss="modal">
                  <span>
                    <LogoWhatsapp cssClasses="md hydrate me-1" />
                    Whatsapp
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

function MessageActionSheet() {
  const [formState, setFormState] = useImmer({
    message: "",
    error: "",
  });

  function closeActionSheet() {
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("messageActionSheet")
    );
    modal.hide();
  }

  function handleFormSubmit() {
    if (!formState.message) {
      setFormState((state) => {
        state.error = "Por favor, digite sua mensagem";
      });

      return;
    }

    closeActionSheet();
    showNotification({
      notificationDate: new Date(),
      message: formState.message,
      title: "Você recebeu uma mensagem sobre seu classificado!",
    });
  }

  return (
    <div
      className="modal fade action-sheet"
      id="messageActionSheet"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar mensagem</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form>
                <div className="form-group basic">
                  <label className="label">Mensagem</label>
                  <div className="input-group">
                    <textarea
                      id="message"
                      rows={4}
                      className="form-control"
                      placeholder="Digite sua mensagem"
                      onChange={(e) =>
                        setFormState((state) => {
                          state.message = e.target.value;
                          state.error = "";
                        })
                      }
                    ></textarea>
                  </div>
                  {!!formState.error && (
                    <small className="text-small text-danger">
                      {formState.error}
                    </small>
                  )}
                </div>

                <div className="form-group basic">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="btn btn-primary btn-block btn-lg"
                    /* data-bs-dismiss="modal" */
                  >
                    Enviar mensagem
                    <SendOutline cssClasses="ms-1 text-white" />
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
