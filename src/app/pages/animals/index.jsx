import React from "react";
import { AddOutline } from "react-ionicons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import AnimalsForm from "./form";

export default function AnimalsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AnimalsList />} />
      <Route path="/new" element={<AnimalsForm />} />
      <Route path="/:id" element={<AnimalsForm />} />
    </Routes>
  );
}

function AnimalsList() {
  const animals = store.useState((state) => state.animals);
  const navigate = useNavigate();
  function handleNewAnimal() {
    navigate("new");
  }

  return (
    <div>
      <Header
        showGoBack
        title="Meus Animais"
        rightSide={<AddNewAnimal onClick={handleNewAnimal} />}
      />
      <div className="section mt-2">
        {(!!animals.length && (
          <div className="transactions">
            <ul className="listview image-listview media inset mb-2">
              {animals.map((el, i) => (
                <li key={i}>
                  <Link to={"./" + el.id} className="item">
                    <div className="imageWrapper">
                      <img src={el.photo} alt="image" className="imaged w64" />
                    </div>
                    <div className="in py-3">
                      <div>{el.name}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )) || (
          <p className="text-center text-muted">Nenhum animal cadastrado</p>
        )}
      </div>
    </div>
  );
}

function AddNewAnimal({ onClick }) {
  return (
    <a onClick={onClick}>
      <AddOutline cssClasses="text-primary" />
    </a>
  );
}
