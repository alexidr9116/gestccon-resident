import React, {
  HTMLInputTypeAttribute,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import Header from "../../../components/Header";
import { CameraOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import { store } from "../../../store/store";
import { updateUser } from "../../services/user.service";

export default function UsersPage() {
  const userInfo = store.useState((state) => state.user);
  const [fieldUpdateActionSheet, setFieldUpdateActionSheet] = useState();
  const [fieldUpdate, setFieldUpdate] = useState({
    label: "",
    name: "",
    value: "",
    type: "text",
  });

  function handleOpenFieldUpdate(field) {
    if (field === "email") {
      setFieldUpdate({
        label: "Email",
        name: "email",
        value: userInfo.email || "",
        type: "text",
      });
    } else if (field === "phone") {
      setFieldUpdate({
        label: "Celular",
        name: "phone",
        value: userInfo.phone || "",
        type: "text",
      });
    } else {
      return;
    }

    fieldUpdateActionSheet?.show();
  }

  function handleFieldEdited({ field, value }) {
    store.update((state) => {
      state.user[field] = value;
    });
  }

  useEffect(() => {
    setFieldUpdateActionSheet(() => {
      if (document.querySelector("#FieldUpdateActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#FieldUpdateActionSheet")
        );
      }
    });
  }, []);

  return (
    <div className="pt-1">
      <Header showGoBack title="Configurações" rightSide={<></>} />
      <div className="section mt-3 text-center">
        <div className="avatar-section">
          <a href="#">
            <img
              src="/assets/img/avatar.png"
              alt="avatar"
              className="imaged w100 rounded"
            />
            <span className="button">
              <CameraOutline cssClasses="md hydrated" color="white" />
            </span>
          </a>
        </div>
      </div>
      <div className="listview-title mt-1">Seus dados</div>
      <ul className="listview image-listview inset">
        <li>
          <a href="#" className="item">
            <div className="in">
              <div>
                <header>Nome</header>
                <h4 className="m-0">John Fonseca</h4>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className="item">
            <div className="in">
              <div>
                <header>Bloco</header>
                <h4 className="m-0">B1</h4>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" className="item">
            <div className="in">
              <div>
                <header>Apartamento</header>
                <h4 className="m-0">Apartamento 4</h4>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="item"
            onClick={() => handleOpenFieldUpdate("phone")}
          >
            <div className="in">
              <div>
                <header>Celular</header>
                <h4 className="m-0">{userInfo.phone}</h4>
              </div>
              <span className="text-muted">Editar</span>
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="item"
            onClick={() => handleOpenFieldUpdate("email")}
          >
            <div className="in">
              <div>
                <header>Email</header>
                <h4 className="m-0">{userInfo.email}</h4>
              </div>
              <span className="text-muted">Editar</span>
            </div>
          </a>
        </li>
        {/* <li>Bloco B1</li>
        <li>Apartamento 4</li>
        <li>(81) 9 9458-2566</li>
        <li>email@email.com</li> */}
      </ul>
      <div className="listview-title mt-1">Segurança</div>
      <ul className="listview image-listview inset">
        <li>
          <Link to="/app/recover-password" className="item">
            <div className="in">
              <div>Redefinir senha</div>
            </div>
          </Link>
        </li>
      </ul>
      <div className="listview-title mt-1">Privacidade</div>
      <ul className="listview image-listview inset">
        <li>
          <Link to="/app/user/lgpd" className="item">
            <div className="in">
              <div>Preferências</div>
              <span className="text-muted small">Editar</span>
            </div>
          </Link>
        </li>
      </ul>
      <EditField
        field={fieldUpdate}
        actionSheetController={fieldUpdateActionSheet}
        onFieldEdited={handleFieldEdited}
      />
    </div>
  );
}



function EditField({
  title,
  field,
  onFieldEdited,
  actionSheetController,
}) {
  const [fieldError, setFieldError] = useState();
  const inputRef = useRef();

  const handleFieldEdited = () => {
    const fieldValue = inputRef.current.value;
    if (!fieldValue) {
      setFieldError("Por favor, preencha o campo");
      return;
    }
    setFieldError(undefined);
    if (onFieldEdited)
      onFieldEdited({
        field: field.name,
        value: fieldValue,
      });

    actionSheetController?.hide();
  };

  useEffect(() => {
    if (field.value) {
      inputRef.current.value = field.value;
      setFieldError(undefined);
    }
  }, [field.value]);

  return (
    <div
      className="modal fade action-sheet"
      id="FieldUpdateActionSheet"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title || "Editar"}</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      ref={inputRef}
                      className="form-control"
                      defaultValue={field.value || ""}
                    />
                  </div>
                  {!!fieldError && (
                    <div className="input-info text-danger">{fieldError}</div>
                  )}
                </div>
                <div className="form-group basic">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={handleFieldEdited}
                  >
                    Editar
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
