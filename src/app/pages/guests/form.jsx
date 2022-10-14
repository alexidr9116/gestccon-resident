import React, { useEffect, useRef, useState } from "react";
import { Mail, Call, Close, AddOutline } from "react-ionicons";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import { store } from "../../../store/store";
import { addGuest, removeGuest } from "../../services/reservations.service";
import { GuestEmailActionSheet } from "./components/guestEmailActionSheet";

export default function ListaConvidadosForm() {
  const guestEmailActionSheetRef = useRef();
  const { reservation_id } = useParams();
  const { openDialog } = useAlertDialogContext();

  const [guestEmailActionSheet, setGuestEmailActionSheet] = useState();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [error, setError] = useState("");
  const guests = store.useState(
    (state) =>
      state.ambients.find((e) => e.id == Number(reservation_id))?.guests
  );
  const { state } = useLocation();

  function handleNewGuest() {
    if (!nome || !sobrenome) {
      openDialog({
        type: "warning",
        title: "Atenção!",
        message: "Preencha os campos de nome e sobrenome corretamente.",
        buttons: [
          {
            text: "OK",
          },
        ],
      });
      return;
    }
    //setGuests((state) => [...state, nome]);
    setNome("");
    setSobrenome("");
    addGuest(reservation_id, {
      id: new Date().getTime().toString(),
      firstName: nome,
      lastName: sobrenome,
    });
    const el = document.querySelector("#guestInput");
    el.focus();
  }

  function handleDeleteGuest(guest) {
    //const newArr = guests.filter((_guest) => _guest !== guest);
    //setGuests(newArr);
    removeGuest(reservation_id, guest);
  }

  function handleShowGuestEmailActionSheet(guest) {
    if (guestEmailActionSheet) {
      guestEmailActionSheet.show();
    }
  }

  useEffect(() => {
    const modal = new window.bootstrap.Modal("#guestEmailActionSheet");
    setGuestEmailActionSheet(modal);
  }, []);

  return (
    <div>
      <Header showGoBack title={`Convidados`} rightSide={<></>} />
      <div>
        <div className="wide-block mb-2">
          <p className="text-center my-2">
            {state.date} - {state.location}
          </p>
        </div>
        <div className="">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center pb-1">
                Lista de convidados
              </div>
              <p
                className="small text-muted text-center"
                style={{ lineHeight: "1.3", fontSize: 10 }}
              >
                Ao inserir o email do convidado, o sistema enviará a localização
                e código para entrada mais rápida no condomínio
              </p>

              <div className="mt-3">
                <div className="form-group boxed">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="guestInput">
                      <span className="text-danger">* </span>Incluir novo
                      convidado
                    </label>
                    <div className="row align-items-center">
                      <div className="col">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="guestInput"
                          placeholder="Nome"
                          value={nome}
                          onChange={(e) => {
                            setError("");
                            setNome(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="Sobrenome"
                          value={sobrenome}
                          onChange={(e) => {
                            setSobrenome(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-2">
                        <button
                          type="button"
                          className="btn btn-icon btn-primary"
                          onClick={handleNewGuest}
                        >
                          <AddOutline
                            cssClasses="md hydrated"
                            color="#FFFFFF"
                          />
                        </button>
                      </div>
                      {!!error && (
                        <small className="small text-danger">{error}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="wide-block pt-2 pb-2 mt-3">
                <button
                  className="btn btn-primary btn-lg w-100"
                  disabled={!guests?.length}
                >
                  Salvar Lista
                </button>
              </div> */}
              <ul className="listview simple-listview">
                {guests
                  ?.map((guest, i) => (
                    <ListItem
                      key={guest.id}
                      index={i + 1}
                      onDeleteClick={() => handleDeleteGuest(guest)}
                      onEmailClick={() =>
                        handleShowGuestEmailActionSheet(guest)
                      }
                      guest={guest}
                    />
                  ))
                  .reverse()}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <GuestEmailActionSheet
        controller={guestEmailActionSheet}
        onSendEmail={() => {}}
      />
    </div>
  );
}

function ListItem({
  index,
  guest,
  onDeleteClick,
  onEmailClick = () => {},
}) {
  return (
    <li>
      <span>
        <span className="text-muted">{index} </span>
        {guest.firstName} {guest.lastName}
      </span>
      <div className="d-flex gap-3">
        <Mail
          color="#adadad"
          onClick={onEmailClick}
          style={{ width: "16px", height: "16px" }}
        />
        <Close color="#d12626" onClick={onDeleteClick} />
      </div>
    </li>
  );
}
