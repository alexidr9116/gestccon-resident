import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import InformativePostPage from "./informative_post";
import { informativesMock } from "./mock";

export default function InformativesPage() {
  const informatives = store.useState(state => state.informatives)
  return (
    <>
      <Header showGoBack title="Informativos" rightSide={<></>} />
      <div className="section mt-2">
        <div className="section-title">Hoje</div>
        <div className="transactions">
          <ul className="listview image-listview media inset mb-2">
            {informatives.map((el, i) => (
              <li key={i}>
                <Link to={"./" + el.id} state={el} className="item">
                  <div className="imageWrapper">
                    <img src={el.image} alt="image" className="imaged w64" />
                  </div>
                  <div className="in py-3">
                    <div>{el.title}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function InformativesRoutes() {
  return (
    <Routes>
      <Route path="*" element={<InformativesPage />} />
      <Route path="/:id" element={<InformativePostPage />} />
    </Routes>
  );
}
