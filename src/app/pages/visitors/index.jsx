import React, { useState } from "react";
import {
  AddOutline,
  CameraOutline,
  CloseCircle,
  QrCodeOutline,
} from "react-ionicons";
import { parse as parseDate } from "date-fns";
import Header from "../../../components/Header";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { store } from "../../../store/store";
import VisitorItem from "./components/visitor_item";
import VisitorFormPage from "./visitor_form";
import ShareVisitorAuthorizationPage from "./visitor_authorization";

function VisitorsList() {
  const visitors = store.useState((state) => state.visitors);

  return (
    <div>
      <Header
        showGoBack
        title="Visitantes"
        rightSide={<NewVisitorAddButton />}
      />
      <div className="appCapsule ">
        {!visitors.length ? (
          <EmptyVisitors />
        ) : (
          <div className="section mt-3">
            <div className="transactions">
              {visitors.map((el) => (
                <VisitorItem data={el} key={el.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VisitorsPage() {
  return (
    <Routes>
      <Route path="/" element={<VisitorsList />} />
      <Route path="new" element={<VisitorFormPage />} />
      <Route path="edit/:id" element={<VisitorFormPage />} />
      <Route path="share/:id" element={<ShareVisitorAuthorizationPage />} />
      <Route path='*' element={<Navigate to='/app/visitors' replace/>} />
    </Routes>
  );
}

const EmptyVisitors = () => {
  return (
    <div className="mt-5">
      <p className="text-muted small text-center lh-1">
        Nenhum visitante autorizado recentemente. <br />
        Pressione + para autorizar um visitante.
      </p>
    </div>
  );
};

const NewVisitorAddButton = () => {
  return (
    <Link to="new" className="headerButton">
      <AddOutline style={{ color: "#6236FF", fontWeight: "300" }} />
    </Link>
  );
};
