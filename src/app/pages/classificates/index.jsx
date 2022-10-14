import React from "react";
import { AddOutline } from "react-ionicons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import ClassificateFormPage from "./classificate_form";
import ClassificateVisualization from "./classificate_visualization";

export default function ClassificatesRoutes() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ClassificatesPageList />} />
        <Route path="new" element={<ClassificateFormPage />} />
        <Route path="edit/:id" element={<ClassificateFormPage />} />
        <Route path="/:id" element={<ClassificateVisualization />} />
      </Routes>
    </div>
  );
}

function ClassificatesPageList() {
  const navigate = useNavigate();
  const myClassificates = store.useState((state) =>
    state.classificates.filter((e) => e.id_user === 1)
  );
  const otherClassificates = store.useState((state) =>
    state.classificates.filter((e) => e.id_user !== 1)
  );

  function handleNewClassificate() {
    navigate("new");
  }
  return (
    <div>
      <Header
        showGoBack
        title="Classificados"
        rightSide={<AddNewClassificate onClick={handleNewClassificate} />}
      />

      {!!myClassificates.length && (
        <>
          <div className="listview-title mt-2">Meus classificados</div>
          <ul className="listview image-listview media">
            {myClassificates.map((el, i) => (
              <li key={i}>
                <Link to={"edit/11223344"} className="item">
                  <div className="imageWrapper">
                    <img
                      src={el.images[0] || "/assets/img/sample/photo/1.jpg"}
                      alt="image"
                      className="imaged"
                      style={{width: 64, height: 64, objectFit: 'cover'}}
                    />
                  </div>
                  <div className="in">
                    <div>
                      {el.title}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {!!otherClassificates.length && (
        <>
          <div className="listview-title mt-2">Recentes</div>
          <ul className="listview image-listview media">
            {otherClassificates.map((el, i) => (
              <li key={i}>
                <Link to={"./" + el.id} className="item">
                  <div className="imageWrapper">
                    <img
                      src={el.images[0] || "/assets/img/sample/photo/1.jpg"}
                      alt="image"
                      className="imaged"
                      style={{width: 64, height: 64, objectFit: 'cover'}}
                    />
                  </div>
                  <div className="in">
                    <div>
                      {el.title}
                     {/*  <div className="text-muted">subtext</div> */}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function AddNewClassificate({ onClick }) {
  return (
    <a onClick={onClick}>
      <AddOutline />
    </a>
  );
}
