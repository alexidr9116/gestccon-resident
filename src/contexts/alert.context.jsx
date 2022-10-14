import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CheckmarkCircle,
  InformationCircle,
  CloseCircle,
  Warning,
} from "react-ionicons";
import { store } from "../store/store";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";


const AlertDialogContext = createContext({
  alertDialogState: {
    visible: false,
    content: {
      type: "default",
      title: "",
      message: "",
      buttons: [{ text: "OK" }],
    },
  },
  openDialog: () => {},
  closeDialog: () => {},
});

export function AlertDialogProvider({ children }) {
  const [alertDialogState, setAlertDialogState] = useState({
    visible: false,
  });

  const openDialog = (payload) =>
    setAlertDialogState({ content: { ...payload }, visible: true });
  const closeDialog = () =>
    setAlertDialogState((state) => ({
      content: {
        type: "default",
        title: "",
        message: "",
        buttons: [],
      },
      visible: false,
    }));

  return (
    <AlertDialogContext.Provider
      value={{ alertDialogState, openDialog, closeDialog }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  return context;
}

export function AlertDialog() {
  const [modal, setModal] = useState();
  const {
    alertDialogState: { visible, content },
    closeDialog,
  } = useAlertDialogContext();

  useEffect(() => {
    const _modal = new window.bootstrap.Modal(
      document.querySelector("#alertDialogGeneric")
    );
    setModal(_modal);
  }, []);

  useEffect(() => {
    if (visible === true) return modal?.show();
  }, [visible]);

  const Icon = useMemo(() => {
    switch (content?.type) {
      case "success":
        return (
          <CheckmarkCircle
            cssClasses="md hydrated"
            color="#1DCC70"
            style={{ height: 64, width: 64 }}
          />
        );
      case "error":
        return (
          <CloseCircle
            cssClasses="md hydrated"
            color="#d52020"
            style={{ height: 64, width: 64 }}
          />
        );
      case "warning":
        return (
          <Warning
            cssClasses="md hydrated"
            color="#f4e115"
            style={{ height: 64, width: 64 }}
          />
        );
      default:
        return (
          <InformationCircle
            cssClasses="md hydrated"
            color="#b0b0b0"
            style={{ height: 64, width: 64 }}
          />
        );
    }
  }, [content?.type]);

  return (
    <div
      className="modal fade dialogbox"
      id="alertDialogGeneric"
      data-bs-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-icon text-success">{Icon}</div>
          <div className="modal-header">
            <h5 className="modal-title">{content?.title}</h5>
          </div>
          <div className="modal-body">{content?.message}</div>
          <div className="modal-footer">
            <div className="btn-inline">
              {content?.buttons?.map((e, i) => {
                const colorButton = `btn-text-${e.color || "secondary"}`;
                return (
                  <button
                    key={i}
                    className={`btn ${colorButton}`}
                    data-bs-dismiss="modal"
                    onClick={() => {
                      if (e.onClick) e.onClick();
                      closeDialog();
                    }}
                  >
                    {e.text || " OK"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NotificationBar() {
  const props = store.useState((state) => state.ui.notificationBar);
  function close() {
    document.querySelector("#notification-14")?.classList.remove("show");
  }
  return (
    <div id="notification-14" className="notification-box">
      <div className="notification-dialog ios-style bg-secondary">
        <div className="notification-header">
          <div className="in">
            <img
              src="/assets/img/sample/avatar/avatar3.jpg"
              alt="image"
              className="imaged w24 rounded"
            />
            <div className="d-flex flex-column">
              <p className="m-0" style={{ lineHeight: 0.9 }}>
                Marco Aurélio <br />
                <span style={{ fontSize: "0.7rem" }}>
                  Bloco B1 - Apto 56 <br/> (11) 9 3456-1234
                </span>
              </p>
            </div>
          </div>
          <div className="right">
            <span>
              {formatRelative(
                props.notificationDate || new Date(),
                new Date(),
                {
                  locale: ptBR,
                }
              )}
            </span>
            <a
              onClick={close}
              className="close-button"
              aria-label="close circle"
            >
              <CloseCircle cssClasses="md hydrated text-secondary" />
            </a>
          </div>
        </div>
        <div className="notification-content">
          <div className="in">
            <h3 className="subtitle">{props.title || ""}</h3>
            <div className="text">{props.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToastBar() {
  const { variant = "default", message } =
    store.useState((state) => state.ui.toast) || {};

  function close() {
    document.querySelector("#toast")?.classList.remove("show");
  }

  return (
    <div id="toast" className={`toast-box toast-top bg-${variant}`}>
      <div className="in">
        <div className="text">{message}</div>
      </div>
      <button
        onClick={close}
        type="button"
        className="btn btn-sm btn-text-light close-button"
      >
        OK
      </button>
    </div>
  );
}
