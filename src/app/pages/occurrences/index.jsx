import React from "react";
import { AddOutline } from "react-ionicons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import OcurrenceForm from "./form";

export default function OccurrencesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OccurrencesList />} />
      <Route path="/new" element={<OcurrenceForm />} />
      <Route path="/:id" element={<OcurrenceForm />} />
    </Routes>
  );
}

function OccurrencesList() {
  const navigate = useNavigate();
  const occurrences = store.useState((state) => state.occurences);
  function handleAddNewOccurence() {
    navigate("new");
  }
  return (
    <div>
      <Header
        showGoBack
        title={"Registro de Ocorrências"}
        rightSide={<AddNewOccurence onClick={handleAddNewOccurence} />}
      />
      <div className="section mt-2">
        {!!occurrences?.length ? (
          <div className="transactions">
            <ul className="listview image-listview media inset mb-2">
              {occurrences.map((el) => (
                <li key={el.id}>
                  <Link to={"./" + el.id} className="item">
                    <div className="imageWrapper">
                      <img
                        src={el.photos[0]}
                        alt="image"
                        className="imaged w64"
                        style={{ width: 64, height: 64, objectFit: "cover" }}
                      />
                    </div>
                    <div className="in py-3">
                      <div>{el.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center small">
            Você não registrou nenhuma ocorrência
          </p>
        )}
      </div>
    </div>
  );
}

function AddNewOccurence({ onClick }) {
  return (
    <a onClick={onClick}>
      <AddOutline cssClasses="text-primary" />
    </a>
  );
}
