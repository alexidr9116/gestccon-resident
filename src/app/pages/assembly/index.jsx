import { format, parse } from "date-fns";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import AssemblySinglePage from "./assembly";

function AssemblyIndexPage() {
  const assemblies = store.useState((state) => state.assemblies);

  const activeAssemblies = assemblies.filter((e) => e.status === "open");
  const closedAssemblies = assemblies.filter((e) => e.status === "closed");

  return (
    <div className="extra-header-active full-height">
      <Header showGoBack title="Assembléia Virtual" rightSide={<></>} />
      {/* Extra Header */}
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
      <div className="section tab-content mt-5 pt-1 mb-1">
        <div className="tab-pane fade active show" id="next">
          {activeAssemblies?.map((el) => (
            <div className="card mt-1" key={el.id}>
              <div className="card-header flex-column">
                <div className="d-flex flex-column flex-wrap gap-2 justify-content-center">
                  <div className="text-center">{el.name}</div>
                  <span className="badge badge-primary">Em Andamento</span>
                </div>
              </div>
              <div className="card-body p-0">
                <ul className="listview flush transparent simple-listview">
                  <li className="d-flex justify-content-center">
                    <div className="text-center small">
                      Início: {format(new Date(el.initialDate), "dd/MM/yyyy")}{" "}
                      <br />
                      Término:{" "}
                      {format(new Date(el.finalDate), "dd/MM/yyyy HH:mm")}
                    </div>
                  </li>
                  <li className="d-flex justify-content-center">
                    Apuração: {el.verification_type || ""}
                  </li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <Link to={el.id} className="btn btn-primary">
                  Discutir e Votar
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Tab Encerradas */}
        <div className="tab-pane fade active" id="done">
          {closedAssemblies?.map((el) => (
            <div className="card mt-1" key={el.id}>
              <div className="card-header flex-column  ">
                <div className="d-flex flex-column  flex-wrap gap-2 justify-content-center">
                  <div className="text-center">{el.name}</div>
                  <span className="badge badge-danger">Encerrada</span>
                </div>
              </div>
              <div className="card-body p-0">
                <ul className="listview flush transparent simple-listview">
                  <li className="d-flex justify-content-center">
                    <div className="text-center small">
                      Início: {format(new Date(el.initialDate), "dd/MM/yyyy")}{" "}
                      <br />
                      Término:{" "}
                      {format(new Date(el.finalDate), "dd/MM/yyyy HH:mm")}
                    </div>
                  </li>
                  <li className="d-flex justify-content-center">
                    Apuração: {el.verification_type || ""}
                  </li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <Link to={el.id} className="btn btn-primary">
                  Visualizar votação
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AssemblyRoutes() {
  return (
    <Routes>
      <Route path="*" element={<AssemblyIndexPage />} />
      <Route path="/:id" element={<AssemblySinglePage />} />
    </Routes>
  );
}
