import { AddOutline } from "react-ionicons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { store } from "../../../store/store";
import FamilyForm from "./form";

export default function FamilyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FamilyList />} />
      <Route path="/new" element={<FamilyForm />} />
      <Route path="/:id" element={<FamilyForm />} />
    </Routes>
  );
}

function FamilyList() {
  const familyList = store.useState((state) => state.family);
  const navigate = useNavigate();

  return (
    <div>
      <Header showGoBack title="Minha Família" rightSide={<></>} />
      <div className="section mt-2">
        {!!familyList?.length ? (
          <div className="transactions">
            <ul className="listview image-listview media inset mb-2">
              {familyList.map((el) => (
                <li key={el.id}>
                  <Link to={"./" + el.id} className="item">
                    <div className="imageWrapper">
                      <img
                        src={el.photo}
                        alt="image"
                        className="imaged w64"
                        style={{ width: 64, height: 64, objectFit: "cover" }}
                      />
                    </div>
                    <div className="in py-3">
                      <div className="d-flex flex-column">
                        {el.name}
                        <p>{el.relationship}</p> 
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-muted">Nenhum familiar cadastrado</p>
        )}
      </div>
    </div>
  );
}
