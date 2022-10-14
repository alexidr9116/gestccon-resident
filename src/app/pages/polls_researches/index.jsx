import { addDays, format, subDays } from "date-fns";
import React from "react";
import { CalendarOutline } from "react-ionicons";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../../components/Header";
import PollResearchDetail from "./poll_research_detail";

function PollsAndResearchesList() {
  return (
    <div>
      <Header showGoBack title={`Enquetes e Pesquisas`} rightSide={<></>} />
      <div className="extraHeader pe-0 ps-0">
        <ul className="nav nav-tabs lined" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#next"
              role="tab"
              aria-selected="true"
            >
              Próximas
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              href="#done"
              role="tab"
              aria-selected="false"
            >
              Encerradas
            </a>
          </li>
        </ul>
      </div>
      {/* Header Content Section */}
      <div className="section tab-content mt-5 pt-2 mb-1">
        <div className="tab-pane fade active show" id="next">
          <div className="card">
            <div className="card-header flex-column">
              <div className="text-center pb-1">Enquete de exemplo</div>
              <span className="badge badge-primary">Em Andamento</span>
            </div>
            <ul className="listview image-listview">
              <li>
                <div className="item">
                  <div className="icon-box">
                    <CalendarOutline cssClasses="text-primary" />
                  </div>
                  <div className="in small">
                    <div>Início: <span className="fw-bold">{format(subDays(Date.now(), 1), 'dd/MM/yyyy 00:00')}</span></div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="icon-box">
                    <CalendarOutline cssClasses="text-primary" />
                  </div>
                  <div className="in small">
                    <div>Término: <span className="fw-bold">{format(addDays(Date.now(), 2), 'dd/MM/yyyy 19:00')}</span></div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="card-footer d-flex justify-content-center">
              <Link to="./12345" className="btn btn-primary">
                Visualizar
              </Link>
            </div>
          </div>
        </div>
        <div className="tab-pane fade active" id="done">
          <p className="text-center text-muted pt-3">
            Nenhuma enquete ou pesquisa realizada recentemente
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PollsAndResearchesRoutes() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PollsAndResearchesList />} />
        <Route path="/:id" element={<PollResearchDetail />} />
      </Routes>
    </div>
  );
}
