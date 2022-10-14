import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { CloseOutline, TrashBinOutline } from "react-ionicons";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import useAuth from "../../../hooks/useAuth";
import { store } from "../../../store/store";
import { cancelReservation } from "../../services/reservations.service";
import ReservationsBook from "./book";
import ConfirmBook from "./confirm_book";
import axios, { HOST_API } from '../../util/axios'


export const ReservationsRoutes = () => (
  <Routes>
    <Route path="/" element={<Reservations />} />
    <Route path="/book/:id" element={<ReservationsBook />} />
    <Route path="/book/:id/confirm" element={<ConfirmBook />} />
  </Routes>
);

export default function Reservations() {
  const { openDialog } = useAlertDialogContext();
  const idUser = store.useState((state) => state.user.id);
  const [reservationActionSheet, setReservationActionSheet] = useState() ;
  const [selectedReservation, setSelectedReservation] = useState({
    reservationId: undefined,
    ambientId: undefined,
  });
  const [environments, setEnvironments] = useState([]);
  const { user } = useAuth()
  useEffect(() => {
    axios.get('/resident/environment/gets').then(res => {
      if (res.status === 200 && res.data.data) {
        setEnvironments(res.data.data.environments)
        store.update(e => {
          e.ambients = res.data?.data?.environments;
        })
      }
    }).catch(err => {

    }).finally(() => {

    })
  }, [user]);
  const myReservations = store.useState((state) => {
    let ambients = state.ambients.filter((ambient) =>
      ambient.reservations?.find((e) => e.id_user === idUser)
    );

    return ambients.map((ambient) => ({
      ...ambient,
      reservations: ambient.reservations?.filter((e) => e.id_user === idUser),
    }));
  });

  function handleReservationClick({ reservation_id, ambientId }) {
    setSelectedReservation({ ambientId, reservationId: reservation_id });
    reservationActionSheet?.show();
  }

  const handleCancelReservation = useCallback(() => {
    cancelReservation(
      selectedReservation.reservationId,
      selectedReservation.ambientId
    );

    openDialog({
      type: "success",
      title: "Sucesso!",
      message: "Sua reserva foi cancelada com sucesso!",
      buttons: [
        {
          text: "OK",
        },
      ],
    });
  }, [selectedReservation]);

  

  useEffect(() => {
    setReservationActionSheet(() => {
      if (document.querySelector("#ReservationActionSheet")) {
        return new window.bootstrap.Modal(
          document.querySelector("#ReservationActionSheet")
        );
      }
    });
  }, []);

  return (
    <div>
      <Header showGoBack title="Reservas" rightSide={<></>} />
      <div className="extraHeader pe-0 ps-0">
        <ul className="nav nav-tabs lined" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#reservations"
              role="tab"
              aria-selected="true"
            >
              Ambientes para Reserva
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              href="#my-reservations"
              role="tab"
              aria-selected="false"
            >
              Minhas Reservas
            </a>
          </li>
        </ul>
      </div>

      <div className="section tab-content p-0" style={{ marginTop: 50 }}>
        <div
          className="tab-pane fade active show"
          id="reservations"
          role="tabpanel"
        >
          <div className="row p-1">
            {environments.map((el, index) => {
              return (
                <div className="col-6 mb-2" key={el.id}>
                  <Link to={"/app/reservations/book/" + el.id} state={el}>
                    <div className="blog-card">
                      <div
                        style={{
                          display: "flex",
                          overflow: "hidden",
                          height: "150px",
                        }}
                      >
                        <img
                          style={{ objectFit: "cover" }}
                          src={`${HOST_API}${el.image}`} 
                          alt="image"
                          className="imaged w-100"
                        />
                      </div>
                      <div className="text">
                        <h4 className="title">{el.name}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab-pane fade" id="my-reservations" role="tabpanel">
          {!!myReservations.length ? (
            <div className="section mt-2">
              {myReservations.map((ambient) => (
                <div className="card mb-2">
                  <img src={ambient.image} alt="" className="card-img-top" />
                  <div className="card-title p-1 m-0 text-center">
                    {ambient.location}
                  </div>
                  <ul className="listview link-listview">
                    {ambient.reservations?.map((reservation) => (
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleReservationClick({
                              reservation_id: reservation.id,
                              ambientId: ambient.id,
                            });
                          }}
                        >
                          <div className="d-flex flex-column self-center">
                            <span className="fw-bold">
                              {format(
                                parse(
                                  reservation.book_date,
                                  "yyyy-MM-dd",
                                  Date.now()
                                ),
                                "dd/MM/yyyy"
                              )}
                            </span>
                            {ambient.book_type === "hour" && (
                              <p className="m-0 small">
                                {format(
                                  new Date(reservation.initial_book_period),
                                  "HH:mm"
                                )}{" "}
                                às{" "}
                                {format(
                                  new Date(reservation.final_book_period),
                                  "HH:mm"
                                )}
                              </p>
                            )}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Nenhuma reserva encontrada</p>
          )}
        </div>
      </div>
      <ReservationActionSheet
        controller={reservationActionSheet}
        reservation_id={selectedReservation}
        onCancelReservation={handleCancelReservation}
      />
    </div>
  );
}


function ReservationActionSheet({
  controller,
  onCancelReservation,
  reservation_id,
}) {
  function handleCancelReservation() {
    if (onCancelReservation) onCancelReservation(reservation_id);
    controller?.hide();
  }
  return (
    <div
      className="modal fade action-sheet"
      id="ReservationActionSheet"
      tabIndex={-1}
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{"Ações"}</h5>
          </div>
          <div className="modal-body">
            <ul className="action-button-list">
              <li>
                <a className="btn btn-list" onClick={handleCancelReservation}>
                  <span>
                    <TrashBinOutline />
                    Cancelar reserva
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
                    <CloseOutline cssClasses={"md hydrated text-danger"} />
                    Voltar
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
