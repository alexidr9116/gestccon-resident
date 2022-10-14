import { format, formatISO, parse } from "date-fns";
import React from "react";
import {
  CalendarOutline,
  CardOutline,
  CashOutline,
  Hourglass,
  LocationOutline,
  WarningOutline,
} from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useAlertDialogContext } from "../../../contexts/alert.context";
import { addReservation } from "../../services/reservations.service";

export default function ConfirmBook() {
  const { state } = useLocation() ;
  console.log({ state });
  const navigate = useNavigate();
  const { openDialog } = useAlertDialogContext();
  function handleAddReservation() {
    const payload = {
      id: Math.floor(Math.random() * 5000).toString(),
      book_date: state.book_date,
      id_user: state.id_user,
      final_book_period: state.final_book_period,
      initial_book_period: state.initial_book_period,
      guests: state.guests,
    };

    addReservation(payload, state.locationId);

    openDialog({
      type: "success",
      title: "Sucesso!",
      message: "Reserva realizada com sucesso!",
      buttons: [
        {
          text: "OK",
        },
      ],
    });

    navigate("/app/reservations", { replace: true });
  }

  return (
    <div>
      <Header showGoBack title="Confirmar reserva" rightSide={<></>} />
      <div className="section mt-2">
        <div className="card">
          <ul className="listview flush transparent image-listview">
            <li>
              <div className="item">
                <div className="icon-box bg-secondary">
                  <LocationOutline cssClasses="md hydrated text-white" />
                </div>
                <div className="in">
                  <span className="fw-bold">{state.locationName}</span>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="icon-box bg-secondary">
                  <CalendarOutline
                    cssClasses="md hydrated text-white"
                    style={{ fill: "#FFF" }}
                  />
                </div>
                <div className="in">
                  <span className="fw-bold">
                    {format(parse(state.book_date, 'yyyy-MM-dd', Date.now()), 'dd/MM/yyyy')}
                  </span>
                </div>
              </div>
            </li>
            {state.book_type === "hour" && (
              <>
                <li>
                  <div className="item">
                    <div className="icon-box bg-secondary">
                      <Hourglass
                        cssClasses="md hydrated text-white"
                        style={{ fill: "#FFF" }}
                      />
                    </div>
                    <div className="in">
                      <span className="fw-bold">
                        {format(new Date(state.initial_book_period), "HH:mm")}{" "}
                        às {format(new Date(state.final_book_period), "HH:mm")}
                      </span>
                    </div>
                  </div>
                </li>
              </>
            )}
            <li>
              <div className="item">
                <div className="icon-box bg-secondary">
                  <CashOutline
                    cssClasses="md hydrated text-white"
                    style={{ fill: "#FFF" }}
                  />
                </div>
                <div className="in">
                  <span className="fw-bold">R$ {state.tax}</span>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <div className="icon-box bg-secondary">
                  <WarningOutline
                    cssClasses="md hydrated text-white"
                    style={{ fill: "#FFF" }}
                  />
                </div>
                <div className="in">
                  <span>Cancelamento</span>
                  <span className="fw-bold">24h</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="card-footer d-flex justify-content-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddReservation}
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
