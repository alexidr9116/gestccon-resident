import React, { useEffect, useState } from "react";
import { CloseCircle } from "react-ionicons";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import ListaConvidadosForm from "./form";

function ListaReservas() {
 const reservations = store.useState(state => state.ambients)

  return (
    <div>
      <Header showGoBack rightSide={<></>} title="Lista de convidados" />
      <div className="section p-0">
        <p className="small text-center mt-2">
          Selecione uma reserva para continuar:
        </p>
        <ul className="listview link-listview ">
          {reservations.map((el) => (
            <li key={el.id}>
              <Link to={"./"+el.id} state={el}>{el.date} - {el.location}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function GuestsPage() {
  return (
    <Routes>
      <Route path="/" element={<ListaReservas />} />
      <Route path="/:reservation_id" element={<ListaConvidadosForm />} />
    </Routes>
  );
}
